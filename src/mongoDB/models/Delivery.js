const { Schema, model } = require("mongoose");

// Модель для доставки
const DeliverySchema = new Schema(
	{
		name: { type: String, required: true }, // Название способа доставки
		address: { type: String, required: true }, // Адрес доставки
		deliveryDate: { type: Date, required: true }, // Дата доставки
		estimatedDeliveryTime: { type: String }, // Предполагаемое время доставки
		status: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" }, // Статус доставки
	},
	{ timestamps: true }
);

module.exports = model("Delivery", DeliverySchema);
