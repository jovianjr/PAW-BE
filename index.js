const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const { verifyNodemailer } = require('./src/config/mail');

// initialize config
dotenv.config({ path: '.env' });

// setup
const setup = async () => {
	await connectDB();
	verifyNodemailer();
};

setup();

// server run
const { app } = require('./src/app');
app().listen(process.env.PORT, async () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
