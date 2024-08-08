const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback_controller');
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware");
const superadmin = require("../middlewares/superuer_middleware");

router.post('/', ctrlWrapper(feedbackController.createFeedback));
router.get('/', auth, feedbackController.getAllFeedbacks);
router.get('/:id', auth, feedbackController.getFeedbackById);
router.delete('/:id', auth, superadmin, feedbackController.deleteFeedbackById);
//router.put('/:id', auth, superadmin, feedbackController.updateFeedbackById);

module.exports = router;
