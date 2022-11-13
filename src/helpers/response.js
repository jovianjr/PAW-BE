// error response template
const sendError = (res, code, message, details) => {
	return res.status(code).json({
		errors: message ?? 'Something went wrong',
		details,
	});
};

module.exports = { sendError };
