
const emailData = require('../utilis/sendEmail');
const activationEmail = require('../utilis/emailactivation');
const userValidation = require('../validation/user.validation');
const userRepository = require('../repository/user.repository');
const userService = require('../service/user.service');
const {initiateVerification,checkVerification } = require('../utilis/otp')
const jwt = require('jsonwebtoken');
const {sendEmailFunc} = require('../utilis/sendEmail');
const ResponseService =require('../service/response.service');
const { updateUser } = require('../repository/user.repository');

module.exports = {
async register (req, res) {
  const { value, error } = userValidation.create.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
 const {phone , email, username} = value
 const{host} = req.headers
  value.phoneNumber = `${phone.countryCode}${phone.localFormat}`
  await userService.registerUser(value)
  await initiateVerification(`+${phone.countryCode}${phone.localFormat}`, 'sms')
  const token = jwt.sign({ email }, process.env.ACTIVATION_KEY);
  await emailData(email, username, token, host);
  return ResponseService.success(res, 'Email has been sent, kindly activate your email');
},

async login (req, res){
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { email, password } = value;
    const token = await userService.loginUser(value)
    const data = { email, token };
    return res.send({ message: 'Login Successful', data });
  },
  
  async emailActivation (req, res){
    const { value, error } = activatePassword(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { token, otp, phone } = value;
    await checkVerification(`+${phone.countryCode}${phone.localFormat}`, otp)
    const decodedToken = jwt.verify(token, process.env.ACTIVATION_KEY);
    const { email } = decodedToken;
     await activationEmail(email, req);
    return res.status(200).send({ message: 'Email Activated', data: null });
  },

  async resetPassword(req, res){
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired!" });
    }
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message })
   await userService.resetPassword(value)
   return ResponseService.success(res, 'Password Updated');

  },

  async updateUser(req, res){
    const { user } = req.user;
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message })
    await userService.updateUser(value)
   return ResponseService.success(res, 'Password Updated');
  },
  async getUser(req, res){
    const { user } = req.user;
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message })
    await userService.updateUser(value)
   return ResponseService.success(res, 'Password Updated');
  }
}