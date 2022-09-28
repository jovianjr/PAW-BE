const express = require('express');
const router = express.Router();

const {
	findArtworkController,
	findArtworkByIdController,
	newArtworkController,
	editArtworkController,
	deleteArtworkController,
} = require('@src/controllers/artwork');

router.get('/', findArtworkController);
router.get('/:id', findArtworkByIdController);
router.post('/', newArtworkController);
router.patch('/', editArtworkController);
router.delete('/', deleteArtworkController);

module.exports = router;
