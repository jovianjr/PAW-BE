const Artwork = require('../models/Artwork');
const { sendError } = require('../helpers/response');

// find all / by filter
const findArtworkController = async (req, res) => {
	const filter = {};

	// if any filter
	if (req.query.artist) filter.artist = req.query.artist;
	if (req.query.user_id) filter.user_id = req.query.user_id;

	try {
		const data = await Artwork.find(filter)
			.select('title img artist date_created')
			.sort(req.query.sort)
			.exec();

		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

// find by id
const findArtworkByIdController = async (req, res) => {
	try {
		const data = await Artwork.findById(req.params.id).exec();
		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

// menambahkan data artwork
const newArtworkController = async (req, res) => {
	try {
		const { title, description, artist, date_created, imgSrc } = req.body;
		if (!title || !description || !artist || !date_created || !imgSrc) {
			throw new Error('You must fill in all of the required fields');
		}

		const artwork = new Artwork({
			title,
			description,
			artist,
			date_created,
			imgSrc,
			user_id: req.auth._id,
		});
		const data = await artwork.save();
		return res.status(201).json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

// edit artwork
const editArtworkController = async (req, res) => {
	try {
		const { title, description, artist, date_created, imgSrc } = req.body;
		const data = await Artwork.findOneAndUpdate(
			{ _id: req.params.id, user_id: req.auth._id },
			{
				$set: {
					title,
					description,
					artist,
					date_created,
					imgSrc,
				},
			}
		);
		return res.status(200).json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

// Menghapus data artwork
const deleteArtworkController = async (req, res) => {
	try {
		const data = await Artwork.remove({
			_id: req.params.id,
			user_id: req.auth._id,
		});
		return res.status(200).json({
			message: 'success',
			data: null,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

module.exports = {
	findArtworkController,
	findArtworkByIdController,
	editArtworkController,
	newArtworkController,
	deleteArtworkController,
};
