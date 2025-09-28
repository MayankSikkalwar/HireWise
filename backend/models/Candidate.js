
const mongoose = require('mongoose');

const scoreBreakdownSchema = new mongoose.Schema({
  criteria: { type: String, required: true },
  score: { type: Number, required: true },
  justification: { type: String, required: true },
  weightedScore: { type: Number, required: true }
});

const CandidateSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Job' },
    name: { type: String, default: 'Anonymous Candidate' },
    email: { type: String, default: 'No email found' },
    // --- NEW FIELDS ---
    totalScore: { type: Number, default: 0 },
    scoreBreakdown: [scoreBreakdownSchema],
    shortlisted: { type: Boolean, default: false },
    // --- END NEW FIELDS ---
    resumeText: { type: String, required: true },
    // We can now remove the old, simple score fields
    // geminiScore: ...
    // geminiSummary: ...
    // geminiGaps: ...
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);