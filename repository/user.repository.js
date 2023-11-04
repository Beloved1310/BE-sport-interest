const { NotFoundError } = require('../utils/error.utils')
const { STATUSES } = require('../models/status')
const User = require('../model/user')

module.exports = {
  async getOneUser({ queryParams }) {
    return User.findOne({
      where: queryParams,
    })
  },
}
