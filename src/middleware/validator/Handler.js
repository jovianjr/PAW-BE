const { validationResult } = require('express-validator');

const handler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const firstError = errors.array().map((error) => error.msg)[0];
		res.status(422).json({
			errors: firstError,
		});
		return;
	}

	next();
};

module.exports = handler;
