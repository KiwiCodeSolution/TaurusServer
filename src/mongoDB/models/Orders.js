const { Schema, model } = require("mongoose");

const OrderProductSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
	quantity: { type: Number, required: true }
});

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
	delivery_type: { type: String, enum: ["У ресторані", "Доставка"], required: true },
	products: [OrderProductSchema], // Массив объектов заказанных продуктов
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
	message: { type: String },
	consent: { type: Boolean, required: true },
	total_cost: { type: Number, required: true }, // Добавлено поле общей стоимости
	address: { type: String, required: false }, // Добавлено поле адреса
	status: { type: String, enum: ['pending', 'progress', 'confirmed', 'cancelled'], default: 'pending' }, // Добавлено поле статуса
	archive: { type: Boolean, default: false } // Добавлено поле для архивации
});

module.exports = model("Order", OrderSchema);