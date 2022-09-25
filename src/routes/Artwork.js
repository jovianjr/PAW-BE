const express = require('express');
const router = express.Router();

const {
	findArtworkController,
	findArtworkByIdController,
} = require('@src/controllers/artwork');

router.get('/', findArtworkController);
router.get('/:id', findArtworkByIdController);

module.exports = router;
