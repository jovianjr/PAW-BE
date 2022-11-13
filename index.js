require('module-alias/register'); // module alias

const dotenv = require('dotenv');
const connectDB = require('@src/config/database');
const { verifyNodemailer } = require('@src/config/mail');

// initialize config
dotenv.config({ path: '.env' });

// server run
const { app } = require('@src/app');
app().listen(process.env.PORT, async () => {
	await connectDB();
	verifyNodemailer();
	console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
