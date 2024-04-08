const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotions_controller');
const ctrlWrapper = require("../middlewares/ctrlWrapper");

router.get("/", ctrlWrapper(promotionController.getAllPromotions));
router.get("/:id", ctrlWrapper(promotionController.getPromotionById));
router.post("/", ctrlWrapper(promotionController.createPromotion));
router.put("/:id", ctrlWrapper(promotionController.updatePromotionById));
router.delete("/:id", ctrlWrapper(promotionController.deletePromotionById));

module.exports = router;
