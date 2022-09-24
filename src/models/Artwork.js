const mongoose = require('mongoose');

// artwork schema
const artworkSchema = new mongoose.Schema(
	{
		title: { type: String,required: true,},
		img: {
			type: String,
			required: true,
		},
		description: {
			type: String
		},
		artist: {
			type: String,
			required: true,
		},
		date_created: {
			type: Date,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Artwork', artworkSchema);
