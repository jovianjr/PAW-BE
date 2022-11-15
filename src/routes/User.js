const express = require('express');
const router = express.Router();

const {
	findUserController,
	findByUsernameController,
	getCurrentUserController,
	updateUserController,
} = require('../controllers/User');
const { authCheck } = require('../middleware/auth');

router.get('/search/:name', findUserController);
router.get('/:username', findByUsernameController);
router.get('/', authCheck, getCurrentUserController);
router.patch('/', authCheck, updateUserController);

module.exports = router;
