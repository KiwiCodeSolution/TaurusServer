const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
	order_number: { type: Number, required: true, unique: true },
	order_date: {
		type: Date,
		required: true,
		default: () => {
			const now = new Date();
			now.setHours(now.getHours() + 3); // Смещение для Киева (UTC+3)
			return now;
		}
	},
	delivery_type: { type: String, enum: ["На месте", "Доставка"], required: true },
	products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
	message: { type: String },
	consent: { type: Boolean, required: true }
});

module.exports = model("Order", OrderSchema);
