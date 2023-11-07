const emailData = require("../utilis/sendEmail");
const activationEmail = require("../utilis/emailactivation");
const userValidation = require("../validation/user.validation");
const userService = require("../service/user.service");
const { initiateVerification, checkVerification } = require("../utilis/otp");
const jwt = require("jsonwebtoken");
const ResponseService = require("../service/response.service");


module.exports = {
  async register(req, res) {
    const { value, error } = userValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { phone, email, username } = value;
    const  host = 'localhost:3000';
    value.phoneNumber = `${phone.countryCode}${phone.localFormat}`;
    await userService.registerUser(value);
    await initiateVerification(
      `+${phone.countryCode}${phone.localFormat}`,
      "sms"
    );
    const token = jwt.sign({ email }, process.env.ACTIVATION_KEY);
    await emailData(email, username, token, host);
    return ResponseService.success(
      res,
      "Email has been sent, kindly activate your email"
    );
  },

  async login(req, res) {
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { email, password, phone } = value;
    if (phone){
      value.phoneNumber = `${phone.countryCode}${phone.localFormat}`;
    }
    const data = await userService.loginUser(value);
    return ResponseService.success(
      res,
      "Login Successful", data
    );
  },

  async emailActivation(req, res) {
    const { value, error } = userValidation.verify.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { token, otp, phone } = value;
    const  host = 'localhost:3000';
    await checkVerification(`+${phone.countryCode}${phone.localFormat}`, otp);
    const decodedToken = jwt.verify(token, process.env.ACTIVATION_KEY);
    const { email } = decodedToken;
     await activationEmail(email, host);
     return ResponseService.success(
      res,
      "Email Activated, kindly check your mail"
    );
  },

  async resetPassword(req, res) {
    const { value, error } = userValidation.reset.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    await userService.resetPassword(value);
    return ResponseService.success(res, "Password Updated");
  },

  async updateUser(req, res) {
    const host = 'localhost:3000'
    const { user } = req;
  const {phoneNumber, username} = req.user
    const { value, error } = userValidation.update.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    if (value.email){
      const {email} = value
      await initiateVerification(
        `+${phoneNumber}`,
        "sms"
      );
      const token = jwt.sign({ email }, process.env.ACTIVATION_KEY);
      await emailData(email, username, token, host);
    }
    await userService.updateUser(value, user);
    const displayUsername = value.username || username;
    return ResponseService.success(res,`${displayUsername}, your data is updated`);
  },

  async getUser(req, res) {
    const {_id, username} = req.user
    const data = await userService.getUser(_id)
    return ResponseService.success(res, `${username}, profile`, data);
  },
};
