const express = require('express');
const router = express.Router();

const {
	getArtworkController,
    findArtworkByIdController
} = require('@src/controllers/artwork');

router.get('/', getArtworkController);
router.get('/:id', findArtworkByIdController);

module.exports = router;
