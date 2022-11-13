const express = require('express');
const router = express.Router();

const {
	findUserController,
	findByUsernameController,
} = require('../controllers/User');

router.get('/search/:name', findUserController);
router.get('/:username', findByUsernameController);

module.exports = router;
