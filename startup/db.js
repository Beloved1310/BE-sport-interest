const mongoose = require('mongoose')
const debug = require('debug')('app')

const { MONGODBURI } = require('../config')

module.exports = async () => {
  const mongooseConnect = await mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  if (mongooseConnect) {
    console.log('Connected to Database')
  } else {
    console.log('Not Connected to Database')
  }
}