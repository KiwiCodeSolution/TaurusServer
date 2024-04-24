
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
	{
		topCategory: { type: String },
		subCategory: { type: String },
		category: { type: String },
		weight: { type: String },
		name: { type: String, required: true, unique: true },
		englishName: { type: String },
		description: { type: String },
		price: { type: Number, required: true },
		action: { type: String },
		actionSection: { type: String },
		// deliveryMenu: { type: String },
		favourite: { type: Boolean, default: true },
		available: { type: Boolean, default: false },
		delivery: { type: Schema.Types.ObjectId, ref: "Delivery" },
		quantity: { type: Number },

	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = model("Product", ProductSchema);
