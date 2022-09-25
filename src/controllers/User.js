const User = require('@src/models/User');

const findUserController = async (req, res) => {
	const findUserController = await User.find({
		name: {
			$regex: req.params.name,
			$options: 'i',
		},
	});

	res.send(findUserController);
};

module.exports = { findUserController };
