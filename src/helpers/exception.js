// error response template
const CustomError = (message, code) => {
	const error = new Error(message ?? 'Something went wrong');
	error.code = code;

	return error;
};

module.exports = { CustomError };
