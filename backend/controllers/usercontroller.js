const userService = require('../services/userservices');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body, res);
   console.log("user is user",user)
    if (user?.error) {
      return res.status(400).json({ error: user.error });
    }
    req.session.verifyEmail=user.email;
    res.status(201).json({
      message: 'User created successfully. OTP sent to your email.',
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
      const {  otp } = req.body;
      
      // If email not in body, use session email
      const userEmail =req.session.verifyEmail;
      
      if (!userEmail) {
          return res.status(400).json({ 
              success: false, 
              message: 'Email is required' 
          });
      }

      // Call service function
      await userService.verifyOtp(userEmail, otp,req, res);
      
  } catch (error) {
      res.status(400).json({ 
          success: false, 
          error: error.message 
      });
  }
};