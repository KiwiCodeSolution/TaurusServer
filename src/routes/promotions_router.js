const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotions_controller');
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.get("/:id", ctrlWrapper(promotionController.getPromotionById));
router.get("/", auth, ctrlWrapper(promotionController.getAllPromotions));
router.post("/", auth, ctrlWrapper(promotionController.createPromotion));
router.put("/:id", auth, ctrlWrapper(promotionController.updatePromotionById));
router.delete("/:id", auth, superadmin, ctrlWrapper(promotionController.deletePromotionById));

module.exports = router;
