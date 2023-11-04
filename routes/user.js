
const express = require('express');
const asyncMiddleware = require('../middleware/async');

const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/register', asyncMiddleware(userController.register));


module.exports = router;