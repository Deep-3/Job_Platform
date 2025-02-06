const nodemailer = require('nodemailer');

exports.sendMail = async (email, html) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'deepkalathiya03@gmail.com',
                pass: 'rbxf ewaf kkoi nqmk'
            }
        });

        // Configure mail options
        const mailOptions = {
            from: 'deepkalathiya03@gmail.com',
            to: email,
            subject: 'New Job Application',
            html: html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        return {
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        };

    } catch (error) {
        console.error('Email sending failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
};