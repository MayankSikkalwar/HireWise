
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
    summary: { type: String, default: 'No summary generated.'},
    // --- NEW FIELDS ---
    totalScore: { type: Number, default: 0 },
    scoreBreakdown: [scoreBreakdownSchema],
    shortlisted: { type: Boolean, default: false },
    // --- END NEW FIELDS ---
    resumeText: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);