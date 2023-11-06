const transporter = require('./mail');
const activate = (email, req) => {
  const data = {
    to: email,
    from: 'adeoluwafisayomi@gmail.com',
    subject: 'Confirmation Email',
    html: `<p> Welcome to Sport Website, Do proceed to the <a href = "https://${req.headers.host}/login">Login Page</a></p>`,
  };
  return data;
};

const activationData = async (email, req) => {
  await transporter.sendMail(activate(email, req));
};
module.exports = activationData;