const Artwork = require('@src/models/Artwork');
const { sendError } = require('@src/helpers/response');

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
	} catch (e) {
		return sendError(res, 400, 'Something went wrong');
	}
};

const findArtworkByIdController = async (req, res) => {
	try {
		const data = await Artwork.findById(req.params.id).exec();
		return res.json({
			message: 'success',
			data,
		});
	} catch (e) {
		return sendError(res, 400, 'Something went wrong');
	}
};

module.exports = { findArtworkController, findArtworkByIdController };
