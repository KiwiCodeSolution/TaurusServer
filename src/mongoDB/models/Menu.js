const menuSchema = new mongoose.Schema({
	name: { type: String, required: true },
	positions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Position' }]
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
