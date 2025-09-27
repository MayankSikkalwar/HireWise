const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createJob, uploadResume, getCandidatesForJob, getMyJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// All routes here are protected and require a valid token
router.route('/').post(protect, createJob).get(protect, getMyJobs);
router.route('/:id/upload').post(protect, upload.single('resume'), uploadResume);
router.route('/:id/candidates').get(protect, getCandidatesForJob);

module.exports = router;