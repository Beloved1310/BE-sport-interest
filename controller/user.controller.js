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
    const { host } = req.headers;
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
    const { email, password } = value;
    const token = await userService.loginUser(value);
    const data = { email, token };
    return ResponseService.success(
      res,
      "Login Successful", data
    );
  },

  async emailActivation(req, res) {
    const { value, error } = userValidation.verify.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { token, otp, phone } = value;
    const { host } = req.headers;
    await checkVerification(`+${phone.countryCode}${phone.localFormat}`, otp);
    const decodedToken = jwt.verify(token, process.env.ACTIVATION_KEY);
    const { email } = decodedToken;
     await activationEmail(email, host);
     return ResponseService.success(
      res,
      "Email Activated", data
    );
  },

  async resetPassword(req, res) {
    const { value, error } = userValidation.reset.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    await userService.resetPassword(value);
    return ResponseService.success(res, "Password Updated");
  },

  async updateUser(req, res) {
    const { user } = req;
    const { value, error } = userValidation.update.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    await userService.updateUser(value, user);
    return ResponseService.success(res, `$(user.username}, your data is updated`);
  },

  async getUser(req, res) {
    const host = 'localhost:3000'
    const { username } = req.user;
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    if (value.email){
      const {email} = value
      await initiateVerification(
        `+${phone.countryCode}${phone.localFormat}`,
        "sms"
      );
      const token = jwt.sign({ email }, process.env.ACTIVATION_KEY);
      await emailData(email, username, token, host);
    }
    await userService.updateUser(value);
    return ResponseService.success(res, "Password Updated");
  },
};
