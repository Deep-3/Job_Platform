const passport = require('../passport/paaport');
const { sendOtp } = require('../utils/otpmail');
const crypto = require('crypto');
// Login Controller
exports.login = async(req, res, next) => {
  passport.authenticate('local', async(err, user, info) => {
      try {
          if (err) return next(err);
          if (!user) return res.status(401).json({ error: info.message });

          // Check if user needs verification
          if(user && user.isVerified ==false) {
              // Store email in session
              req.session.verifyEmail = user.email;
              console.log("hello",req.session.verifyEmail)
              
              // Generate new OTP only if needed
              if (!user.otp || new Date() > user.otpExpiry) {
                  const otp = crypto.randomInt(100000, 999999).toString();
                  user.otp = otp;
                  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
                  await user.save();
                  await sendOtp(user.email, otp);
              }
                 return res.send("please verified your account");
              // return res.redirect('/users/verifyotp');
          }

          // If verified, login the user
          req.login(user, (err) => {
              if (err) return next(err);
              req.flash('success','login successfully')
              return res.redirect('/');
          });
      } catch (error) {
          next(error);
      }
  })(req, res, next);
};


// Logout Controller
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed.' });
    res.json({ session:req.session,message: 'Logout successful.' });
  });
};
