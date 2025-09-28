const Job = require('../models/job');
const Candidate = require('../models/Candidate');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// --- Gemini AI Setup ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

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
    // Now accepting scoringCriteria from the frontend
    const { title, description, scoringCriteria } = req.body;
    try {
        const job = new Job({
            title,
            description,
            scoringCriteria, // Add criteria to the new job
            user: req.user._id,
        });
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Upload a resume and get a detailed AI analysis
// @route   POST /api/jobs/:id/upload
exports.uploadResume = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (!req.file) return res.status(400).json({ message: 'Please upload a resume file' });

        const resumeText = await parseResume(req.file.buffer, req.file.mimetype);

        // Dynamically create the criteria part of the prompt
        const criteriaPrompt = job.scoringCriteria.map((c, index) => 
            `- Criteria ${index + 1}: "${c.criteria}" (Weight: ${c.weight})`
        ).join('\n');

        // --- THE NEW, ADVANCED PROMPT ---
        const prompt = `
            Analyze the following resume against the provided job description and specific scoring criteria.
            Return ONLY a valid JSON object.

            Job Description:
            ---
            Title: ${job.title}
            Description: ${job.description}
            ---

            Scoring Criteria:
            ---
            ${criteriaPrompt}
            ---

            Candidate's Resume:
            ---
            ${resumeText.substring(0, 4000)}
            ---

            Based on this, provide a JSON object with the following structure:
            {
                "name": "<The candidate's full name>",
                "email": "<The candidate's email address>",
                "summary": "<A 2-3 sentence overall summary of the candidate's suitability>",
                "scoreBreakdown": [
                    {
                        "criteria": "<The exact text of Criteria 1>",
                        "score": <An integer score from 1-10 for this specific criterion>,
                        "justification": "<A 1-2 sentence justification for why you gave this score>"
                    },
                    {
                        "criteria": "<The exact text of Criteria 2>",
                        "score": <An integer score from 1-10 for this specific criterion>,
                        "justification": "<A 1-2 sentence justification for why you gave this score>"
                    }
                ]
            }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());

        // --- Calculate Weighted Scores ---
        let totalScore = 0;
        const detailedBreakdown = jsonResponse.scoreBreakdown.map((item) => {
            const criterion = job.scoringCriteria.find(c => c.criteria === item.criteria);
            const weight = criterion ? criterion.weight : 0;
            const weightedScore = item.score * weight;
            totalScore += weightedScore;
            return { ...item, weightedScore };
        });

        const candidate = new Candidate({
            job: job._id,
            name: jsonResponse.name,
            email: jsonResponse.email,
            resumeText,
            totalScore,
            scoreBreakdown: detailedBreakdown,
        });

        await candidate.save();
        res.status(201).json(candidate);

    } catch (error) {
        console.error('Error during resume analysis:', error);
        res.status(500).json({ message: 'Error analyzing resume' });
    }
};

// ... keep getCandidatesForJob and getMyJobs, but update the sort key
exports.getCandidatesForJob = async (req, res) => {
    try {
        const candidates = await Candidate.find({ job: req.params.id }).sort({ totalScore: -1 }); // Sort by new score
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// @desc    Get all jobs created by the logged-in user
// @route   GET /api/jobs
exports.getMyJobs = async (req, res) => {
    try {
        // Find jobs where the 'user' field matches the logged-in user's ID
        const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// ...