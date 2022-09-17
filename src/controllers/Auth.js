const jwt = require('jsonwebtoken');
const User = require('@src/models/User');
const { sendError } = require('@src/helpers/response');

const loginController = (req, res) => {
	const { identity, password } = req.body;

	User.findOne({
		$or: [{ email: identity }, { username: identity }],
	}).exec((err, user) => {
		if (err || !user || !user.authenticate(password)) {
			return sendError(res, 400, 'You have entered an invalid credentials');
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '3h',
		});

		user.hashed_password = undefined;
		user.salt = undefined;
		return res.json({
			message: 'Login successfully',
			data: { token, user },
		});
	});
};

const registerController = (req, res) => {
	const { username, name, email, password } = req.body;
	User.findOne({
		$or: [{ email }, { username }],
	}).then((result) => {
		if (result) {
			return sendError(
				res,
				400,
				`${
					email === result.email ? 'Email' : 'Username'
				} has already been taken`
			);
		}

		const user = new User({
			username,
			name,
			email,
			password,
		});

		user.save((err, user) => {
			if (err) return sendError(res, 400);

			user.hashed_password = undefined;
			user.salt = undefined;
			return res.json({
				message: 'Register success',
				data: {},
			});
		});
	});
};

module.exports = { loginController, registerController };
