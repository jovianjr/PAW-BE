const mongoose = require('mongoose');

// artwork schema
const artworkSchema = new mongoose.Schema(
	{
		title: { type: String,required: true,},
		img: {
			data: Buffer,
			contentType: String,
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