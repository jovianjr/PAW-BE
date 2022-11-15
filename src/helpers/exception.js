// error response template
const CustomError = (message, code) => {
	const error = new Error('Reset password error, invalid / expired token');
	error.code = code;

	return error;
};

module.exports = { CustomError };
