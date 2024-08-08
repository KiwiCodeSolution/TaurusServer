const { Unauthorized } = require('http-errors');
const Admin = require('../mongoDB/models/Admin');

module.exports = async function (req, res, next) {
	try {
		const user = req.user;

		if (!user) {
			throw new Unauthorized('User not authorized');
		}

		if (user.role !== 'admin') { // проверяем роль пользователя
			throw new Unauthorized('Access denied: insufficient permissions');
		}

		next();
	} catch (error) {
		res.status(error.status || 401).json({ message: error.message });
	}
};
