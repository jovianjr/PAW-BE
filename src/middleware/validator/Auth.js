const { check } = require('express-validator');
const handler = require('./Handler');

const required = (field) => {
	return check(
		field,
		`${field[0].toUpperCase() + field.substr(1)} field is required`
	).notEmpty();
};

const authValidator = {};

authValidator.register = [
	required('username')
		.isLength({
			min: 4,
			max: 20,
		})
		.withMessage('username must be between 3 to 36 characters'),
	required('name')
		.isLength({
			min: 2,
			max: 36,
		})
		.withMessage('name must be between 3 to 36 characters'),
	required('email').isEmail().withMessage('Must be a valid email address'),
	required('password')
		.isLength({ min: 8 })
		.withMessage('Password must contain at least 8 characters')
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-_!@#$%^&*]{8,}$/, 'i')
		.withMessage(
			'Password should contain at least 1 uppercase, 1 lowercase, and 1 numeric'
		),
	required('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('password and confirmPassword does not match');
		}
		return true;
	}),
	handler,
];

authValidator.login = [required('identity'), required('password'), handler];

module.exports = authValidator;
