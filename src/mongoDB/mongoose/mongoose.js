const mongoose = require("mongoose");
const config = require("../../config/mongoConfig.json");

module.exports = mongoose
	.connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
	.then(() => {
		console.log("mongodb up");
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
