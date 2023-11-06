const nodemailer = require('nodemailer');
const myemail = process.env.SENDER_EMAIL;
const mypassword = process.env.GOGGLE_PASS_KEY;

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: myemail,
      pass: mypassword,
    },
});

module.exports = transporter;