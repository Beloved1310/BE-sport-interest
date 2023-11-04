const dotenv = require('dotenv')

dotenv.config()
const { env } = process

module.exports = {
  PORT: env.PORT || 8080,
  MONGODBURI: env.MONGODBURI,
  TESTMONGODBURI: env.MONGODBURI,
  debug: env.debug,
  CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
  JWT: env.JWT,
}