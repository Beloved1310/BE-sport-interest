
const express = require('express');
const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth')

const router = express.Router();

const userController = require('../controller/user.controller');

router.post('/register', asyncMiddleware(userController.register));
router.post('/login', asyncMiddleware(userController.login));
router.post('/authentication/activate', asyncMiddleware(userController.emailActivation));
router.put('/reset-password', asyncMiddleware(userController.resetPassword));
router.put('/settings/update', auth,asyncMiddleware(userController.updateUser));

module.exports = router;