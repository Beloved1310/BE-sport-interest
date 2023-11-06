
const User = require('../model/user')

module.exports = {
  async getOneUser(queryParams ) {
    return User.findOne(queryParams)
  },

  async createdUser(queryParams){
    return User.create(queryParams)
  },

  async updateUser(queryParams){
    return User.updateOne(queryparams)
  }
}
