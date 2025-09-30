const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { protect } = require('../middleware/authMiddleware');

// @desc    Toggle a candidate's shortlist status
// @route   PATCH /api/candidates/:id/shortlist
router.patch('/:id/shortlist', protect, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Toggle the boolean status
    candidate.shortlisted = !candidate.shortlisted; 
    
    await candidate.save();
    res.json(candidate); // Send back the updated candidate
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;