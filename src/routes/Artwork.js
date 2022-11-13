const express = require('express');
const router = express.Router();

const {
	findArtworkController,
	findArtworkByIdController,
	newArtworkController,
	editArtworkController,
	deleteArtworkController,
} = require('../controllers/Artwork');
const { authCheck } = require('../middleware/auth');

router.get('/', findArtworkController);
router.get('/:id', findArtworkByIdController);
router.post('/', authCheck, newArtworkController);
router.patch('/:id', authCheck, editArtworkController);
router.delete('/:id', authCheck, deleteArtworkController);

module.exports = router;
