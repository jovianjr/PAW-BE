const User = require('../models/User');
const { sendError } = require('../helpers/response');

const findUserController = async (req, res) => {
	try {
		const data = await User.find({
			name: {
				$regex: req.params.name,
				$options: 'i',
			},
		}).select('username name');

		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

const findByUsernameController = async (req, res) => {
	try {
		const data = await User.findOne({
			username: req.params.username,
		}).select('username name');

		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

module.exports = { findUserController, findByUsernameController };
