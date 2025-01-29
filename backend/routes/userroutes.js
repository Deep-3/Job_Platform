const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

// Route for user registration and OTP sending
router.post('/', userController.createUser);

// Route for OTP verification
router.post('/verifyotp', userController.verifyOtp);

module.exports = router;
