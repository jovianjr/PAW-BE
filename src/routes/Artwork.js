const express = require('express');
const router = express.Router();

const {
	findArtworkController,
	findArtworkByIdController,
	newArtworkController,
	editArtworkController,
	deleteArtworkController,
} = require('@src/controllers/artwork');
const { authCheck } = require('@src/middleware/auth');

router.get('/', findArtworkController);
router.get('/:id', findArtworkByIdController);
router.post('/', authCheck, newArtworkController);
router.patch('/:id', authCheck, editArtworkController);
router.delete('/:id', authCheck, deleteArtworkController);

module.exports = router;
