const mongoose = require('mongoose');

// artwork schema
const artworkSchema = new mongoose.Schema(
	{
		artwork_id: { type: String, unique: true },
		title: {
			type: String,
			required: true,
		},
		img: {
			data: Buffer,
			contentType: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		created_at: {
			type: Date,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		updated_at: {
			type: Date.now,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);