const { Schema, model } = require("mongoose");

const FeedbackSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		message: { type: String },
		consent: { type: Boolean, required: true },
		status: { type: String, enum: ["new", "in_progress", "completed"], default: "new" }, // Добавляем статусы: новый, в работе, выполнен
		archive: { type: Boolean, default: false } // Поле для архивирования
	},
	{ timestamps: true }
);

module.exports = model("Feedback", FeedbackSchema);
