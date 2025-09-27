const Job = require('../models/job');
const Candidate = require('../models/Candidate');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// --- Gemini AI Setup ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// After
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Helper to parse different resume file types
const parseResume = async (fileBuffer, mimetype) => {
    if (mimetype === 'application/pdf') {
        const data = await pdf(fileBuffer);
        return data.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
        return value;
    }
    throw new Error('Unsupported file type');
};


// @desc    Create a new job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
    const { title, description } = req.body;
    try {
        const job = new Job({
            title,
            description,
            user: req.user._id, // req.user comes from our auth middleware
        });
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Upload a resume for a job and analyze with Gemini
// @route   POST /api/jobs/:id/upload
exports.uploadResume = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume file' });
        }

        const resumeText = await parseResume(req.file.buffer, req.file.mimetype);

        const prompt = `
            Analyze the following resume against the provided job description and return a JSON object.
            
            Job Description:
            ---
            Title: ${job.title}
            Description: ${job.description}
            ---

            Candidate's Resume:
            ---
            ${resumeText.substring(0, 3000)}
            ---

            Based on the analysis, provide a JSON object with the following structure and nothing else:
            {
                "score": <a suitability score from 1 to 10>,
                "summary": "<a 2-3 sentence summary of the candidate's strengths for this role>",
                "gaps": "<a 1-2 sentence summary of potential gaps or areas that are not a strong match>"
            }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response text to ensure it's valid JSON
        const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());

        const candidate = new Candidate({
            job: job._id,
            resumeText,
            geminiScore: jsonResponse.score,
            geminiSummary: jsonResponse.summary,
            geminiGaps: jsonResponse.gaps,
        });

        const createdCandidate = await candidate.save();
        res.status(201).json(createdCandidate);

    } catch (error) {
        console.error('Error during resume analysis:', error);
        res.status(500).json({ message: 'Error analyzing resume' });
    }
};

// @desc    Get all candidates for a specific job
// @route   GET /api/jobs/:id/candidates
exports.getCandidatesForJob = async (req, res) => {
    try {
        const candidates = await Candidate.find({ job: req.params.id }).sort({ geminiScore: -1 });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all jobs created by the logged-in user
// @route   GET /api/jobs
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};