const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('mongodb connected');
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

module.exports = connectDB;
