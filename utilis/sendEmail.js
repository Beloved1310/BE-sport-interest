const transporter = require('./mail');

const emailData = (email, username, token, host) => {
  const data = {
    to: email,
    from: 'adeoluwafisayomi@gmail.com',
    subject: `Email Activation`,
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kindly Activate Your Email to View Sports Available</title>
      <style>
        body {
          background-color: #f0f5f9;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        .email-container {
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          margin: 20px;
          padding: 20px;
        }

        .email-header {
          background-color: #647dee;
          color: #fff;
          text-align: center;
          padding: 10px;
          border-radius: 10px 10px 0 0;
        }

        .email-content {
          padding: 20px;
        }

        p {
          color: #333;
        }

        strong {
          color: #647dee;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h2>Let's get you started!</h2>
        </div>
        <div class="email-content">
          <p><strong>Hello, ${username}</p>
          <p>At <strong>Sport Nation,</strong> we prioritize your gamming life and we would love to make you win!</p>
          <p> Click on this <a href = "http://localhost:3000/verify/${token}">link </a>to verify your email address</p>
        </div>
      </div>
    </body>
    </html> `,
  };
  return data;
};
const sendEmail = async (email, username, token, host) => {
 await transporter.sendMail(emailData(email, username, token, host));
};
module.exports = sendEmail;
