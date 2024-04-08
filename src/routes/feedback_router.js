const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback_controller');

router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedbacks);
router.get('/:id', feedbackController.getFeedbackById);
router.put('/:id', feedbackController.updateFeedbackById);
router.delete('/:id', feedbackController.deleteFeedbackById);

module.exports = router;
