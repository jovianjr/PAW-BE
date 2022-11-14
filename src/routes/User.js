const express = require('express');
const router = express.Router();

const {
	findUserController,
	findByUsernameController,
	updateUserController,
} = require('../controllers/User');
const { authCheck } = require('../middleware/auth');

router.get('/search/:name', findUserController);
router.get('/:username', findByUsernameController);
router.post('/update', authCheck, updateUserController);

module.exports = router;
