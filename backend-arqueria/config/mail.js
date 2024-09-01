const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
};

module.exports = sendEmail;
