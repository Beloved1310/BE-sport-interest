const transporter = require('./mail');
const activate = (email, host) => {
  const data = {
    to: email,
    from: 'adeoluwafisayomi@gmail.com',
    subject: 'Confirmation Email',
    html: `<p> Welcome to Sport Website, Do proceed to the <a href = "https://${host}/login">Login Page</a></p>`,
  };
  return data;
};

const activationData = async (email, host) => {
  await transporter.sendMail(activate(email, host));
};
module.exports = activationData;