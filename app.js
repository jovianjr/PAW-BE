// add mod alias
require('module-alias/register');

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const connectDB = require('@src/config/database');

// initialize config
dotenv.config({ path: '.env' });
connectDB();

// initialize app
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Selamat Datang Di PAW!');
});

// 404
app.use((req, res, next) => {
	res.status(404).send('NOT FOUND!');
});

// Global error handling
app.use(function (err, _req, res) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// server run
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
