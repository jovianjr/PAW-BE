require('module-alias/register'); // module alias

const dotenv = require('dotenv');
const connectDB = require('@src/config/database');

// initialize config
dotenv.config({ path: '.env' });
connectDB();

// server run
const { app } = require('@src/app');
app().listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
