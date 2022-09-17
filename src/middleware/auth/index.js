const { expressjwt: expressJwt } = require('express-jwt');
const { sendError } = require('@src/helpers/response');

const authCheck = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	credentialsRequired: false,
	getToken: function fromHeaderOrQuerystring(req) {
		if (
			req.headers.authorization &&
			req.headers.authorization.split(' ')[0] === 'Bearer'
		) {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		}
		return null;
	},
});

const authHandler = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		sendError(res, 401, 'invalid / expired token');
	} else {
		next();
	}
};

module.exports = { authCheck, authHandler };
