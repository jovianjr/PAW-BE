const express = require('express');
const router = express.Router();

const {
	loginController,
	registerController,
} = require('@src/controllers/auth');
const authValidator = require('@src/middleware/validator/auth');

router.post('/login', authValidator.login, loginController);
router.post('/register', authValidator.register, registerController);

module.exports = router;
