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
		}).select('username name image');

		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

const getCurrentUserController = async (req, res) => {
	try {
		const result = await User.findOne({ _id: req.auth._id });

		return res.status(200).json({
			message: 'success',
			data: result,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

const updateUserController = async (req, res) => {
	try {
		const { image, name, title, bio, instagram, twitter, youtube, facebook } =
			req.body;

		const data = await User.findOneAndUpdate(
			{ _id: req.auth._id },
			{
				$set: {
					image,
					name,
					title,
					bio,
					instagram,
					twitter,
					youtube,
					facebook,
				},
			}
		);

		const result = await User.findOne({ _id: req.auth._id });

		return res.status(200).json({
			message: 'update user success',
			data: result,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

module.exports = {
	findUserController,
	findByUsernameController,
	getCurrentUserController,
	updateUserController,
};
