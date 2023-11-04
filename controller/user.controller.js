const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { ACTIVATION_KEY } = require('../config');
// const emailData = require('../../utilis/activation');
const userValidation = require('../validation/user.validation');
const userRepository = require('../repository/user.repository');

module.exports = {
async register (req, res) {
  const { value, error } = userValidation.create.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { fullname, email, password, gender } = value;

  const createdUser = new User({
    fullname,
    email,
    password,
    gender,
  });
  const user = await userRepository.getOneUser({queryParams:{ email }});
  if (user) return res.status(400).send({ error: 'User already registered' });
  const salt = await bcrypt.genSalt(10);
  createdUser.password = await bcrypt.hash(createdUser.password, salt);
  const savedUser = await createdUser.save();
  if (!savedUser) return res.status(422).send({ error: 'Unsaved User' });

  const token = jwt.sign({ email }, ACTIVATION_KEY);
  const sendEmail = emailData(email, token, req);

  if (!sendEmail) return res.send({ error: error.message });
  const data = { fullname, email };
  return res.send({
    message: 'Email has been sent, kindly activate your email',
    data,
  });
},

// async login (req, res){
//     const { value, error } = userValidation.login.validate(req.body);
//     if (error) return res.status(400).send({ error: error.details[0].message });
//     const { email, password } = value;
  
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).send({ error: 'username or password not found' });
  
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword)
//       return res.status(400).send({ error: 'username or password not found ' });
  
//     const token = user.generateAuthToken();
//     res.header('x-auth-token', token);
//     const data = { email, token };
//     return res.send({ message: 'Login Successful', data });
//   },
  
//   async emailActivation (req, res){
//     const { value, error } = activatePassword(req.body);
//     if (error) return res.status(400).send({ error: error.details[0].message });
//     const { token } = value;
  
//     const decodedToken = jwt.verify(token, ACCTIVATION_KEY);
//     const { email } = decodedToken;
  
//     activationData(email, req);
  
//     return res.status(200).send({ message: 'Email Activated', data: null });
//   },

//   async forgetPassword (req, res){
//     const { value, error } = forgetPassword(req.body);
//     if (error) return res.status(400).send({ error: error.details[0].message });
  
//     const { email } = value;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res
//         .status(400)
//         .send({ error: 'User with this email does not exists' });
  
//     const token = jwt.sign({ _id: user._id }, FORGOT_PASSWORD, {
//       expiresIn: '20m',
//     });
//     const update = await User.updateOne({ resetLink: token });
//     if (!update)
//       return res.status(400).send({ error: 'reset password link error' });
  
//     mailData(email, token, req);
  
//     const data = { email };
//     return res.send({
//       message: 'Email has been sent, kindly follow the instructions',
//       data,
//     })},

}