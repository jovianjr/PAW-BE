const Artwork = require('@src/models/Artwork');

const getArtworkController = async (req, res) => {
    const displayArtwork = await Artwork.find(
        
    )
    console.log(displayArtwork);
    res.send("test test 123")
}

const findArtworkController = async (req,res) => {
    const findArtworkByArtist = await Artwork.find(
        {artist : 'aulia'}
    ).sort(req.params.artist).exec();
    console.log(findArtworkByArtist);
    res.send(findArtworkByArtist);
}
module.exports = {getArtworkController, findArtworkController};