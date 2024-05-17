const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
	customerName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
	numberOfPeople: { type: Number, required: true },
	tableNumber: { type: Number, required: true },
	specialRequests: { type: String },
	message: { type: String },
	status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'progress'], default: 'pending' },
	consentToProcessPersonalData: { type: Boolean, required: true },
	archive: { type: Boolean, default: false } // Добавлено поле для архивации
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
