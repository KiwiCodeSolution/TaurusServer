const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation_controller');
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.post('/', reservationController.createReservation);
router.get('/', auth, reservationController.getAllReservations);
router.get('/:id', auth, reservationController.getReservationById);
router.put('/:id', auth, reservationController.updateReservation);
router.delete('/:id', auth, superadmin, reservationController.deleteReservation);

module.exports = router;
