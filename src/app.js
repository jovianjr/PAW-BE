const cors = require('cors');
const express = require('express');
const { authHandler } = require('@src/middleware/auth');


const app = () => {
	const app = express();
	app.use(cors());
	app.use(express.json());

	// router
	const { AuthRouter, ArtworkRouter, UserRouter } = require('@src/routes');
	app.get('/', LandingPage);
	app.use('/auth', AuthRouter);
	app.use('/artwork', ArtworkRouter);
	app.use('/user', UserRouter);
	app.use(authHandler);


	// 404
	app.use((req, res, next) => {
		res.status(404).send('Not found!');
	});

	// Global error handling
	app.use(function (err, _req, res) {
		console.error(err.stack);
		res.status(500).send('Something broke!');
	});

	return app;
};

const LandingPage = (req, res) => {
	res.send('Selamat Datang Di PAW!');
};

module.exports = { app };
