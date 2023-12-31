// Import necessary modules and dependencies
const userRepository = require("../repository/user.repository");
const ValidationError = require("../utilis/validation-error");
const NotFoundError = require("../utilis/exists-error");
const bcrypt = require("bcrypt");

module.exports = {
  // Register a new user
  async registerUser(values) {
    const { email, username } = values;
    const userEmailStored = await userRepository.getOneUser({ email });
    const userNameStored = await userRepository.getOneUser({ username });
    if (userEmailStored || userNameStored)
      throw new ValidationError("User already registered");
    const salt = await bcrypt.genSalt(10);
    values.password = await bcrypt.hash(values.password, salt);
    const createdUser = await userRepository.createdUser(values);
    return createdUser;
  },

  // Login a user
  async loginUser(value) {
    let user;
    const { email, password, phoneNumber } = value;
    if (email) {
      user = await userRepository.getOneUser({ email });
    }

    if (phoneNumber) {
      user = await userRepository.getOneUser({ phoneNumber });
    }

    if (!user) throw new ValidationError("Username or password not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new ValidationError("Username or password not found");
    const token = user.generateAuthToken();
    return { username: user.username, token };
  },

  // Reset a user's password
  async resetPassword(value) {
    const { email, password } = value;
    const userNameStored = await userRepository.getOneUser({ email });
    if (!userNameStored) throw new NotFoundError("Email not found");
    const updatePassword = {};
    const salt = await bcrypt.genSalt(10);
    updatePassword.password = await bcrypt.hash(password, salt);
    const updatedUser = await userRepository.updateUserData(updatePassword, {
      email,
    });
    return updatedUser;
  },

  // Update a user's information
  async updateUser(value, user) {
    const { _id } = user;
    const updateUser = {};

    if (value.username) {
      updateUser.username = value.username;
    }

    if (value.password) {
      const { password } = value;
      const salt = await bcrypt.genSalt(10);
      updateUser.password = await bcrypt.hash(password, salt);
    }
    if (value.email) {
      updateUser.email = value.email;
    }
    if (value.phone) {
      updateUser.phoneNumber = `${phone.countryCode}${phone.localFormat}`;
    }
    const updatedUser = await userRepository.updateUserData(updateUser, {
      _id,
    });
    return updatedUser;
  },

  // Get user profile by ID
  async getUser(_id) {
    const userProfile = await userRepository.getOneUser({ _id });
    const { password, ...profile } = userProfile.toObject();
    return profile;
  },
};
