const crypto = require('crypto');
const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true },
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		salt: String,
		hashed_password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// virtual field for hashing password
userSchema
	.virtual('password')
	.set(function (password) {
		_password = this.password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

// additional user method
userSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			console.log(err);
			return '';
		}
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + '';
	},
};

module.exports = mongoose.model('User', userSchema);
