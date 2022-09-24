const Artwork = require('@src/models/Artwork');

const getArtworkController = async (req, res) => {
    const findArtworkByArtist = await Artwork.find(
        {artist: req.query.artist ?? null}
    ).sort(req.query.sort).exec();

    console.log(req.query.sort);
    res.send(findArtworkByArtist);
}

const findArtworkController = async (req,res) => {
    
}
module.exports = {getArtworkController, findArtworkController};