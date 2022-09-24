const express = require('express');
const router = express.Router();

const {
	getArtworkController,
    findArtworkController
} = require('@src/controllers/artwork');

router.get('/', getArtworkController);
router.get('/:artist', findArtworkController);

module.exports = router;
