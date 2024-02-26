const positionSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	availability: { type: String, required: true },
	promotion: { type: Boolean, default: false }
});

const Position = mongoose.model('Position', positionSchema);
module.exports = Position;
