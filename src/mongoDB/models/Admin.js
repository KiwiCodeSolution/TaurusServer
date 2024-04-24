
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	phone: { type: String, required: false },
	email: { type: String, required: false, unique: true },
	role: { type: String, enum: ['admin', 'restaurant_staff', 'user'], default: 'user' }, // Добавлено поле роли
	password: { type: String, required: true },
	token: { type: String },
	active: { type: Boolean, default: true } // Добавлено поле активности пользователя
});

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});


userSchema.methods.comparePassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;