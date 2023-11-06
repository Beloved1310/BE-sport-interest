
const { query } = require('express')
const User = require('../model/user')

module.exports = {
  async getOneUser(queryParams ) {
    return User.findOne(queryParams)
  },

  async createdUser(queryParams){
    return User.create(queryParams)
  },

  async updateUser(queryParams){
    return User.updateOne(queryParams)
  },
  async updateUserData (queryParams, fields){
    return User.updateOne(
      fields,
      {
        $set: queryParams
      }
    )
  }
}
