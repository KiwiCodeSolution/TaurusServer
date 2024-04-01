const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		topCategory: { type: String },
		subCategory: { type: String },
		weight: { type: String },
		translation: { type: String },
		category: { type: String },
		name: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		unit: { type: String },
		discount_price: { type: String },
		description: { type: String },
		favourite: { type: Boolean, default: true },
		available: { type: Boolean, default: false },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = model("Product", ProductSchema);
