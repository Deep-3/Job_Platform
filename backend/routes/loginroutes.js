const express = require('express');
const loginController = require('../controllers/logincontroller');
const auth=require('../middleware/auth')
const router = express.Router();

// Route for user registration and OTP sending
router.post('/login', auth.isAuthenticated,loginController.login);

// Route for OTP verification
router.get('/logout',loginController.logout);
    
module.exports = router;
