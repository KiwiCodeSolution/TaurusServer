const { Schema, model } = require("mongoose");

// Модель для акций
const PromotionSchema = new Schema(
	{
		title: { type: String, required: true }, // Заголовок акции
		description: { type: String }, // Описание акции
		newPrice: { type: Number, required: true }, // Новая цена
		oldPrice: { type: Number, required: true }, // Старая цена
		label: { type: String }, // Метка акции
		image: { type: String }, // Изображение акции
		isFeatured: { type: Boolean, default: false }, // Является ли акция особенной
		defaultImage: { type: String }, // Изображение по умолчанию
		available: { type: Boolean }, // Возможность скрыть акцию
		archive: { type: Boolean }, // Архивировать акцию
	},
	{ timestamps: true }
);

module.exports = model("Promotion", PromotionSchema);