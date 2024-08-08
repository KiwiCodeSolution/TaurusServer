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
		action: { type: Boolean, default: false },
		new: { type: Boolean, default: false },
		discount: { type: Boolean, default: false },
		archive: { type: Boolean, default: false },
		delivery: { type: Schema.Types.ObjectId, ref: "Delivery" },
		displayInDeliveryMenu: { type: Boolean, default: true },
		hideInMenu: { type: Boolean, default: false },
		quantity: { type: Number },
		available: { type: Boolean , default: true}
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = model("Product", ProductSchema);
