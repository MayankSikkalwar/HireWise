const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const Groq = require('groq-sdk');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

// --- Groq AI Setup ---
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

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

// Create Job
exports.createJob = async (req, res) => {
    const { title, description, scoringCriteria } = req.body;
    try {
        const job = new Job({
            title,
            description,
            scoringCriteria,
            user: req.user._id,
        });
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Upload Resume + AI Analysis
exports.uploadResume = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (!req.file) return res.status(400).json({ message: 'Please upload a resume file' });

        const resumeText = await parseResume(req.file.buffer, req.file.mimetype);

        const criteriaPrompt = job.scoringCriteria.map((c, index) => 
            `- Criteria ${index + 1}: "${c.criteria}" (Weight: ${c.weight})`
        ).join('\n');

        const prompt = `
Analyze the following resume by comparing job description, scoring criteria, and resume content.
Return ONLY valid JSON.

Job Title: ${job.title}
Job Description: ${job.description}

Scoring Criteria:
${criteriaPrompt}

Resume:
${resumeText.substring(0, 4000)}

Return JSON:
{
"name": "",
"email": "",
"summary": "",
"matchPercentage": 0,
"missingSkills": [],
"strengths": [],
"scoreBreakdown": [
{
"criteria": "",
"score": 1,
"justification": ""
}
]
}
`;

        const completion = await groq.chat.completions.create({
            model:"llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You are an ATS resume analyzer." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3,
        });

        const text = completion.choices[0].message.content;

        // --- SAFE JSON EXTRACTION (NEW) ---
        let cleanedText = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
        }

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(cleanedText);
        } catch (e) {
            console.error("AI returned invalid JSON:", cleanedText);
            return res.status(500).json({ message: "AI response format error" });
        }
        // --- END SAFE JSON EXTRACTION ---

        const matchPercentage = Math.min(100, Math.max(0, Number(jsonResponse.matchPercentage) || 0));
        const missingSkills = Array.isArray(jsonResponse.missingSkills) ? jsonResponse.missingSkills : [];
        const strengths = Array.isArray(jsonResponse.strengths) ? jsonResponse.strengths : [];
        const scoreBreakdown = Array.isArray(jsonResponse.scoreBreakdown) ? jsonResponse.scoreBreakdown : [];

        let totalScore = 0;
        const detailedBreakdown = scoreBreakdown.map((item) => {
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
            summary: jsonResponse.summary,
            matchPercentage,
            missingSkills,
            strengths,
            resumeText,
            totalScore,
            scoreBreakdown: detailedBreakdown,
            shortlisted: false
        });

        await candidate.save();
        res.status(201).json(candidate);

    } catch (error) {
        console.error('Error during resume analysis:', error);
        res.status(500).json({ message: 'Error analyzing resume' });
    }
};

// Get Candidates
exports.getCandidatesForJob = async (req, res) => {
    try {
        const candidates = await Candidate.find({ job: req.params.id }).sort({ totalScore: -1 });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get My Jobs
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
