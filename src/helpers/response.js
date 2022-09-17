// error response template
const sendError = (res, code, message) => {
	return res.status(code).json({
		errors: message ?? 'Something went wrong',
	});
};

module.exports = { sendError };
