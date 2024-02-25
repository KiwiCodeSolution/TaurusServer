const promotionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	discount: { type: Number, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true }
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;
