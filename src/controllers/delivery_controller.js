const Delivery = require('../mongoDB/models/Delivery');
const { NotFound, Conflict } = require("http-errors");

exports.getAllDeliveries = async (req, res) => {
	try {
		const deliveries = await Delivery.find();
		res.status(200).json(deliveries);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


module.exports.createDelivery = async (req, res) => {
	try {
		const { body } = req;
		const newDelivery = { ...body };
		const existingDelivery = await Delivery.findOne({
			name: newDelivery.name,
		});
		if (existingDelivery) {
			throw new Conflict("Доставка с таким названием уже существует");
		}

		const savedDelivery = await Delivery.create({ ...newDelivery });
		res.status(201).json({ delivery: savedDelivery, message: "Доставка успешно создана" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getDeliveryById = async (req, res) => {
	try {
		const delivery = await Delivery.findById(req.params.id);
		if (!delivery) {
			return res.status(404).json({ message: 'Delivery not found' });
		}
		res.status(200).json(delivery);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


exports.updateDelivery = async (req, res) => {
	try {
		const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.status(200).json(updatedDelivery);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


exports.deleteDelivery = async (req, res) => {
	try {
		await Delivery.findByIdAndDelete(req.params.id);
		res.status(204).json({ message: 'Delivery deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
