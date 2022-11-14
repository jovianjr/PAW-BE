const Artwork = require('../models/Artwork');
const { sendError } = require('../helpers/response');

// find all / by filter
const findArtworkController = async (req, res) => {
	const filter = {};

	// if any filters
	if (req.query.title) filter.title = new RegExp(req.query.title, 'i');
	if (req.query.artist) filter.artist = req.query.artist;
	if (req.query.user_id) filter.user_id = req.query.user_id;

	try {
		const data = await Artwork.find(filter)
			.select('title img date_created createdAt')
			.populate('user_id', 'name')
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
		const data = await Artwork.findById(req.params.id)
			.populate('user_id', 'image name')
			.exec();

		return res.json({
			message: 'success',
			data,
		});
	} catch (err) {
		console.log(err.message);
		return sendError(res, 400, 'Something went wrong', err.message);
	}
};

// find by slug
const findArtworkBySlugController = async (req, res) => {
	try {
		const data = await Artwork.findOne({ slug: req.params.slug })
			.populate('user_id', 'image name')
			.exec();

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
		const { title, description, artist, date_created, imgSrc, genre } =
			req.body;
		if (
			!title ||
			!description ||
			!artist ||
			!date_created ||
			!imgSrc ||
			!genre
		) {
			throw new Error('You must fill in all of the required fields');
		}

		const slug = title.toLowerCase().replace(/\s/g, '-');
		const artwork = new Artwork({
			slug,
			title,
			description,
			artist,
			genre,
			date_created,
			imgSrc,
			user_id: req.auth._id,
		});
		const data = await artwork.save();

		return res.status(201).json({
			message: 'success',
			data: data,
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
	findArtworkBySlugController,
	editArtworkController,
	newArtworkController,
	deleteArtworkController,
};
