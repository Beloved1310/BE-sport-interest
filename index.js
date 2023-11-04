const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const console.log = require('console.log')('app')
const { PORT } = require('./config')

const app = express()
require('./startup/db')()


const user = require('./routes/user')

process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use('/api/user', user)

app.listen(PORT, () => {
  console.log(`Web server is running ${PORT}`)
})