const express = require('express');
const router = express.Router();

const {
	loginController,
	registerController,
	activationController,
	forgotPasswordController,
	resetPasswordController,
} = require('../controllers/auth');
const authValidator = require('../middleware/validator/auth');

router.post('/login', authValidator.login, loginController);
router.post('/register', authValidator.register, registerController);
router.get('/activate/:token', activationController);
router.post('/forgot-password', forgotPasswordController);
router.post(
	'/reset-password/:token',
	authValidator.resetPassword,
	resetPasswordController
);

module.exports = router;
