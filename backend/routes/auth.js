const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// When a POST request is made to /api/auth/register, run the registerUser function
router.post('/register', registerUser);

// When a POST request is made to /api/auth/login, run the loginUser function
router.post('/login', loginUser);

module.exports = router;