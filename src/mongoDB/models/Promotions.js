const { Schema, model } = require("mongoose");

const PromotionSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		newPrice: { type: Number, required: true },
		oldPrice: { type: Number, required: true },
		label: { type: String },
		image: { type: String },
		isFeatured: { type: Boolean, default: false },
		defaultImage: { type: String },
	},
	{ timestamps: true }
);

module.exports = model("Promotion", PromotionSchema);


