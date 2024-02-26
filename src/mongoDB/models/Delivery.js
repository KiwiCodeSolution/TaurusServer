const deliverySchema = new mongoose.Schema({
	address: { type: String, required: true },
	deliveryTime: { type: String, required: true },
	deliveryCost: { type: Number, required: true }
});

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
