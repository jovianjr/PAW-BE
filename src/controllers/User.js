const User = require('@src/models/User');
const { sendError } = require('@src/helpers/response');

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
	} catch (e) {
		return sendError(res, 400, 'Something went wrong');
	}
};

module.exports = { findUserController };
