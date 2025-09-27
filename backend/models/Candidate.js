const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    job: { // Link to the job they applied for
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    resumeText: { type: String, required: true },
    // Fields to store the analysis from the Gemini API
    geminiScore: { type: Number, default: 0 },
    geminiSummary: { type: String, default: 'Analysis pending.' },
    geminiGaps: { type: String, default: 'Analysis pending.' },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);