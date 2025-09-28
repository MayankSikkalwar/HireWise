
const mongoose = require('mongoose');

const scoringCriterionSchema = new mongoose.Schema({
  criteria: { type: String, required: true },
  weight: { type: Number, required: true, min: 1, max: 10 }
});

const JobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // --- NEW FIELD ---
    scoringCriteria: [scoringCriterionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);