const mongoose = require('mongoose');

// artwork schema
const artworkSchema = new mongoose.Schema(
	{
		imgSrc: {
			type: String,
			required: true,
		},
		slug: { type: String, required: true },
		title: { type: String, required: true },
		description: {
			type: String,
		},
		artist: {
			type: String,
			trim: true,
		},
		genre: [
			{
				type: String,
				trim: true,
			},
		],
		date_created: {
			type: Date,
			required: true,
		},
		user_id: {
			type: mongoose.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Artwork', artworkSchema);
