const mongoose = require("mongoose");
const config = require("../../config/mongoConfig.json");

module.exports = mongoose
	.connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
	// .connect(`mongodb+srv://eapoduzova:Twu36OS5yKa5UsbG@cluster0.rcujeqa.mongodb.net/`)
	.then(() => {
		console.log("mongodb up");
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
