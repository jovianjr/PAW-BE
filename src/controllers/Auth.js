const jwt = require('jsonwebtoken');
const User = require('@src/models/User');
const _ = require('lodash');
const { sendError } = require('@src/helpers/response');
const { sendMail } = require('@src/config/mail');

const loginController = (req, res) => {
	const { identity, password } = req.body;

	User.findOne({
		$or: [{ email: identity }, { username: identity }],
	}).exec((err, user) => {
		if (err || !user || !user.authenticate(password)) {
			return sendError(res, 400, 'You have entered an invalid credentials');
		}

		// generate token
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
	}).then(async (result) => {
		if (result) {
			return sendError(
				res,
				400,
				`${
					email === result.email ? 'Email' : 'Username'
				} has already been taken`
			);
		}

		try {
			// Generate Token
			const token = jwt.sign(
				{ username, name, email, password },
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			// send email
			await sendMail({
				to: email,
				subject: 'Account Activation',
				body: ` <p style="color: #000; font-size: 20px; margin-bottom: 30px">
						Please click the button bellow to active your account
					</p>
					<a
						href="http://localhost:${process.env.PORT}/auth/activate/${token}"
						style="padding: 5px 10px; background-color: #0098ff; text-decoration: none; color: white; border-radius: 10px"
						>Activate</a
					>
					<p style="color: #0f1319; margin: 30px 0 20px; font-size: 14px">
						or click the following link <br /><br />
						<a style="font-size: 12px; text-decoration: none; word-break: break-all" href="http://localhost:${process.env.PORT}/auth/activate/${token}"> http://localhost:${process.env.PORT}/auth/activate/${token} </a>
					</p>
					<p style="color: #000; font-size: 12px; font-style: italic">This link will expired after 1 hours</p>
					`,
			});

			return res.json({
				message: 'Activation Link Sent',
				data: null,
			});
		} catch (e) {
			console.log(e);
			return sendError(res, 400, 'Something went wrong');
		}
	});
};

const activationController = (req, res) => {
	const { token } = req.params;
	try {
		//verify tokens
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				console.log('Activation error');
				return sendError(res, 400, 'Activation error, invalid / expired token');
			}
		});

		// decode token
		const { username, name, email, password } = jwt.decode(token);

		User.findOne({
			$or: [{ email }, { username }],
		}).then(async (result) => {
			if (result) {
				return sendError(
					res,
					400,
					`${
						email === result.email ? 'Email' : 'Username'
					} has already been taken`
				);
			}

			// save new user
			const user = new User({
				username,
				name,
				email,
				password,
			});

			user.save((err, user) => {
				if (err) return sendError(res, 400);
				else {
					user.hashed_password = undefined;
					user.salt = undefined;
					return res.json({
						message: 'Register success',
						data: null,
					});
				}
			});
		});
	} catch (e) {
		console.log(e);
		return sendError(res, 400, 'Something went wrong');
	}
};

const forgotPasswordController = (req, res) => {
	const { email } = req.body;
	User.findOne({
		$or: [{ email }],
	}).then(async (result) => {
		if (!result) return sendError(res, 400, `Email does not exist`);

		try {
			// Generate Token
			const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			});

			// send email
			await sendMail({
				to: email,
				subject: 'Password Reset',
				body: ` <p style="color: #000; font-size: 20px; margin-bottom: 30px">
						Please click the button bellow to Reset your account password
					</p>
					<a
						href="http://localhost:${process.env.PORT}/auth/reset/${token}"
						style="padding: 5px 10px; background-color: #0098ff; text-decoration: none; color: white; border-radius: 10px"
						>Reset password</a
					>
					<p style="color: #0f1319; margin: 30px 0 20px; font-size: 14px">
						or click the following link <br /><br />
						<a style="font-size: 12px; text-decoration: none; word-break: break-all" href="http://localhost:${process.env.PORT}/auth/reset/${token}"> http://localhost:${process.env.PORT}/auth/reset/${token} </a>
					</p>
					<p style="color: #000; font-size: 12px; font-style: italic">This link will expired after 1 hours</p>
					`,
			});

			return res.json({
				message: 'Reset Password Link Sent',
				data: null,
			});
		} catch (e) {
			console.log(e);
			return sendError(res, 400, 'Something went wrong');
		}
	});
};

const resetPasswordController = (req, res) => {
	const { token } = req.params;
	const { password } = req.body;
	try {
		// verify token
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return sendError(
					res,
					400,
					'Reset password error, invalid / expired token'
				);
			}
		});

		// decode token
		const { _id } = jwt.decode(token);

		User.findOne({
			$or: [{ _id }],
		}).then(async (result) => {
			if (!result) return sendError(res, 400, `Email does not exist`);

			// update password
			user = _.extend(result, { password });
			user.save((err, user) => {
				if (err) return sendError(res, 400, 'Something went wrong');
				else {
					user.hashed_password = undefined;
					user.salt = undefined;
					return res.json({
						message: 'Reset Password success',
						data: null,
					});
				}
			});
		});
	} catch (e) {
		console.log(e);
		return sendError(res, 400, 'Something went wrong');
	}
};

module.exports = {
	loginController,
	registerController,
	activationController,
	forgotPasswordController,
	resetPasswordController,
};
