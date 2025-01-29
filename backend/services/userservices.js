const db = require('../models');
const User=db.User;
const { sendOtp } = require('../utils/otpmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.createUser = async (userData,res) => {
    const transaction = await db.sequelize.transaction();

    try {
    const validUser=await User.findOne({where:{email:userData.email}});
    console.log(validUser)
    if(validUser){
        return {error:"User already exists"};
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10); // Ensure saltRounds (10 here) is provided
          }
    

  const user = await User.create({
    ...userData,
    isVerified: false,  
  },{transaction});

  if (userData.role === 'jobseeker') {
    await db.JobSeekerProfile.create({
      userId: user.id,  // Reference the user created above
      skills: userData.skills || null,
      education: userData.education || null,
      experience: userData.experience || null,
      certifications: userData.certifications || null,
      // resumeUrl: resumeUrl,  // Will be added later for resume upload
    }, { transaction });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
  await user.save({ transaction });

  await sendOtp(userData.email, otp);
  await transaction.commit();

//   console.log("user is",user);
  return user;
}catch (error) {

    // console.log("this is error",error)
    // If anything fails, rollback the transaction to ensure no partial data
    await transaction.rollback();
    // console.error("Error in createUser:", error); // Log full error for debugging
    if (error.name === 'SequelizeValidationError') {
     return {  error:error.errors[0].message };
      }

    return { error: error.message || "An unexpected error occurred" };

  }
};

exports.verifyOtp = async (email, otpInput,req, res) => {
  try {
      const user = await db.User.findOne({ where: { email } });
      
      if (!user) {
          return res.json({
              success: false,
              message: 'User not found'
          });
      }
      
      if(user.isVerified) {
          return res.json({
              success: false,
              message: 'User already verified'
          });
      }

      // Check OTP expiry
      if (new Date() > user.otpExpiry) {
          await db.User.update(
              { otp: null, otpExpiry: null },
              { where: { email } }
          );

          const newOtp = crypto.randomInt(100000, 999999).toString();
          const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

          await db.User.update(
              { otp: newOtp, otpExpiry },
              { where: { email } }
          );

          await sendOtp(email, newOtp);

          return res.json({
              success: false,
              message: 'OTP has expired. A new OTP has been sent.'
          });
      }

      if (user.otp !== otpInput) {
          return res.json({
              success: false,
              message: 'Invalid OTP'
          });
      }

      // Update user verification status
      try {
          await db.User.update({
              isVerified: true,
              otp: null,
              otpExpiry: null
          }, {
              where: { email }
          });

          // Fetch updated user
          const updatedUser = await db.User.findOne({ where: { email } });
          delete req.session.verifyEmail;


          req.login(updatedUser, (err) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Error logging in user'
                });
            }
            req.flash('success','login successfully')
            
            res.redirect('/');
        });


        //   return res.json({
        //       success: true,
        //       message: 'OTP verified successfully',
        //       user: updatedUser
        //   });

      } catch (updateError) {
          console.error('Error updating user:', updateError);
          return res.json({
              success: false,
              message: 'Error updating user verification status'
          });
      }

  } catch (error) {
      console.error('OTP verification error:', error);
      return res.json({
          success: false,
          message: 'Error verifying OTP'
      });
  }
};