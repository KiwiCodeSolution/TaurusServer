const orderSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	time: { type: String, required: true },
	amount: { type: Number, required: true },
	paymentMethod: { type: String, required: true },
	status: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Position' }]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
