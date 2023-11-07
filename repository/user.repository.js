// Import necessary modules and dependencies
const { query } = require("express");
const User = require("../model/user");

module.exports = {
  // Find and return a single user based on query parameters
  async getOneUser(queryParams) {
    return User.findOne(queryParams);
  },

  // Create a new user with the provided query parameters
  async createdUser(queryParams) {
    return User.create(queryParams);
  },

  // Update a user based on the provided query parameters
  async updateUser(queryParams) {
    return User.updateOne(queryParams);
  },

  // Update user data using the specified query parameters and field values
  async updateUserData(queryParams, fields) {
    return User.updateOne(fields, {
      $set: queryParams,
    });
  },
};
