
const express = require('express');
const asyncMiddleware = require('../middleware/async');

const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/register', asyncMiddleware(userController.register));
router.post('/login', asyncMiddleware(userController.login));
router.post('/authentication/activate', asyncMiddleware(userController.emailActivation));



module.exports = router;