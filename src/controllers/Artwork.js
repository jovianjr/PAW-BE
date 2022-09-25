const Artwork = require('@src/models/Artwork');

const getArtworkController = async (req, res) => {
    const findArtworkByArtist = await Artwork.find(
        {artist: req.query.artist ?? null,user_id : req.query.user_id ?? null}
    ).sort(req.query.sort).exec();

    console.log(req.query.sort);
    res.send(findArtworkByArtist);
}

const findArtworkByIdController = async (req,res) => {
    const findArt = await Artwork.findById( req.params.id).exec();
    res.send(findArt);


}
module.exports = {getArtworkController, findArtworkByIdController};