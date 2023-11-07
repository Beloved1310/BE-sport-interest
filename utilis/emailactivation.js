const transporter = require("./mail");
const activate = (email, host) => {
  const data = {
    to: email,
    from: "adeoluwafisayomi@gmail.com",
    subject: "Confirmation Email",
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your email is activated, kindly proceed to login</title>
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
          <h2>Your account is activated!</h2>
        </div>
        <div class="email-content">
        <p> Welcome to Sport Website, Do proceed to the <a href = "https://${host}/login">Login Page</a></p>
        </div>
      </div>
    </body>
    </html> `,
  };
  return data;
};

const activationData = async (email, host) => {
  await transporter.sendMail(activate(email, host));
};
module.exports = activationData;
