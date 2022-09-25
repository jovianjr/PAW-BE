const express = require('express');
const router = express.Router();

const {
	findUserController,
    
} = require('@src/controllers/user');


router.get('/:name', findUserController);

module.exports = router;
