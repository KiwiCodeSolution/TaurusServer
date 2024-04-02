const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		message: { type: String },
		consent: { type: Boolean, required: true }
	},
	{ timestamps: true }
);

module.exports = model("Feedback", FeedbackSchema);


