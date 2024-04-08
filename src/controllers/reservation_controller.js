const Reservation = require('../mongoDB/models/Reservation');
const { NotFound, Conflict } = require('http-errors');

exports.getAllReservations = async (req, res) => {
	try {
		const reservations = await Reservation.find();
		res.status(200).json(reservations);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createReservation = async (req, res) => {
	try {
		const { body } = req;
		const newReservation = new Reservation(body);
		const savedReservation = await newReservation.save();
		res.status(201).json(savedReservation);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getReservationById = async (req, res) => {
	try {
		const reservation = await Reservation.findById(req.params.id);
		if (!reservation) {
			throw new NotFound('Reservation not found');
		}
		res.status(200).json(reservation);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateReservation = async (req, res) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const updatedReservation = await Reservation.findByIdAndUpdate(id, body, { new: true });
		res.status(200).json(updatedReservation);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


exports.deleteReservation = async (req, res) => {
	try {
		const { id } = req.params;
		await Reservation.findByIdAndDelete(id);
		res.status(204).json({ message: 'Успешно удалено' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

