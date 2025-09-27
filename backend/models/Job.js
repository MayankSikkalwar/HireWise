const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    user: { // Link to the user who created the job
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);