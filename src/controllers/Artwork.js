const Artwork = require('@src/models/Artwork');

const findArtworkController = async (req, res) => {
	const filter = {};

	// if any filter
	if (req.query.artist) filter.artist = req.query.artist;
	if (req.query.user_id) filter.user_id = req.query.user_id;

	const findArtworkByArtist = await Artwork.find(filter)
		.sort(req.query.sort)
		.exec();

	return res.send(findArtworkByArtist);
};

const findArtworkByIdController = async (req, res) => {
	const findArt = await Artwork.findById(req.params.id).exec();
	return res.send(findArt);
};

module.exports = { findArtworkController, findArtworkByIdController };
