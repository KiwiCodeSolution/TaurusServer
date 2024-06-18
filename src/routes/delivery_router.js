const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/delivery_controller');
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.post('/', ctrlWrapper(deliveryController.createDelivery));
router.get('/', auth, ctrlWrapper(deliveryController.getAllDeliveries));
router.get('/:id', auth, ctrlWrapper(deliveryController.getDeliveryById));
router.delete('/:id', auth, superadmin, ctrlWrapper(deliveryController.deleteDelivery));
//router.put('/:id',auth, ctrlWrapper(deliveryController.updateDelivery));
module.exports = router;
