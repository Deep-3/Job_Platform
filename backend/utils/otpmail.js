const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepkalathiya03@gmail.com',
      pass: 'rbxf ewaf kkoi nqmk'
    }
  });

const sendOtp = (email, otp) => {
  const mailOptions = {
    from: 'deepkalathiya03@gmail.com',
    to: email,
    subject: 'Your OTP for Account Verification',
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtp };
