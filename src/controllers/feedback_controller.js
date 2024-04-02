const FeedbackModel = require('../mongoDB/models/Feedback');
const { NotFound, Conflict } = require("http-errors");

exports.createFeedback = async (req, res) => {
	try {
		const { name, email, phone, message, consent } = req.body;
		const feedback = new FeedbackModel({ name, email, phone, message, consent });
		const savedFeedback = await feedback.save();
		res.status(201).json(savedFeedback);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
exports.getAllFeedbacks = async (req, res) => {
	try {
		const feedbacks = await FeedbackModel.find();
		res.status(200).json(feedbacks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getFeedbackById = async (req, res) => {
	try {
		const feedback = await FeedbackModel.findById(req.params.id);
		if (!feedback) {
			res.status(404).json({ message: 'Feedback not found' });
		} else {
			res.status(200).json(feedback);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteFeedbackById = async (req, res) => {
	try {
		await FeedbackModel.findByIdAndDelete(req.params.id);
		res.status(204).json({ message: 'Feedback deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
