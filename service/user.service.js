const userRepository = require("../repository/user.repository");
const ValidationError = require("../utilis/validation-error");
const NotFoundError = require("../utilis/exists-error")
const bcrypt = require('bcrypt');

module.exports = {
  async registerUser(values) {
    const { email, username } = values;
    const userEmailStored = await userRepository.getOneUser({email});
    const userNameStored = await userRepository.getOneUser({username});
    if ( userEmailStored || userNameStored ) throw new ValidationError("User already registered");
    const salt = await bcrypt.genSalt(10);
    values.password = await bcrypt.hash(values.password, salt);
    const createdUser = await userRepository.createdUser(values);
    return createdUser;
  },

  async loginUser (value){
    const {email, password} = value
    const user = await User.findOne({ email });
    if (!user) throw new ValidationError("username or password not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)  throw new ValidationError("username or password not found ");
    const token = user.generateAuthToken();
    return token
  },

  async resetPassword(value){
    const {username, password} = values
    const userNameStored = await userRepository.getOneUser({username});
    if ( !userEmailStored) throw new NotFoundError("Username not Found");
    const updatePassword = {
      username
    }
    const salt = await bcrypt.genSalt(10);
    updatePassword.password = await bcrypt.hash(password, salt);
    const updatedUser = await userRepository.updateUser(updatePassword);
    return updatedUser
  }
};
