const Promotion = require('../mongoDB/models/Promotions');
const { NotFound, Conflict } = require("http-errors");

// Создание акции
exports.createPromotion = async (req, res) => {
	try {
		const { title, description, newPrice, oldPrice, label, image, isFeatured, defaultImage } = req.body;
		const promotion = new Promotion({ title, description, newPrice, oldPrice, label, image, isFeatured, defaultImage });
		const savedPromotion = await promotion.save();
		res.status(201).json(savedPromotion);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Получение всех акций
exports.getAllPromotions = async (req, res) => {
	try {
		const promotions = await Promotion.find();
		res.status(200).json(promotions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Получение акции по ID
exports.getPromotionById = async (req, res) => {
	try {
		const promotion = await Promotion.findById(req.params.id);
		if (!promotion) {
			res.status(404).json({ message: 'Promotion not found' });
		} else {
			res.status(200).json(promotion);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Обновление акции по ID
exports.updatePromotionById = async (req, res) => {
	try {
		const { title, description, newPrice, oldPrice, label, image, isFeatured, defaultImage ,available,  archive} = req.body;
		const updatedPromotion = await Promotion.findByIdAndUpdate(
			req.params.id,
			{ title, description, newPrice, oldPrice, label, image, isFeatured, defaultImage ,available,  archive},
			{ new: true }
		);
		if (!updatedPromotion) {
			throw new NotFound("Promotion not found");
		}
		res.status(200).json(updatedPromotion);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Удаление акции по ID
exports.deletePromotionById = async (req, res) => {
	try {
		const promotion = await Promotion.findByIdAndDelete(req.params.id);
		if (!promotion) {
			throw new NotFound("Promotion not found");
		}
		res.status(204).json({ message: 'Promotion deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
