const Admin = require("../mongoDB/models/Admin");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
require('dotenv').config();

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existing_user = await Admin.findOne({ username });
    if (existing_user) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const user = await Admin.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!user.active) {
        return res.status(401).json({ message: "Your access is restricted. Please contact the administrator." });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    user.token = token;
    await user.save();

    res.json({ token });
};
module.exports.logout = async (req, res) => {
    req.user.token = null;
    await req.user.save();
    res.json({ message: `User ${req.user.username} logged out successfully` });
};

module.exports.getCurrent = async (req, res) => {
    res.json({
        message: `Current user - ${req.user.username}`,
        userId: req.user._id,
        role: req.user.role,
        token: req.user.token
    });
};
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await Admin.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get users" });
    }
};


module.exports.toggleUserActivation = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.active = !user.active;
        await user.save();

        const newStatus = user.active ? "activated" : "deactivated";

        res.json({ message: `User ${user.username} ${newStatus} successfully`, active: user.active });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to toggle user activation" });
    }
};

module.exports.resetPassword = async (req, res) => {
    const { userId, newPassword } = req.body;

    try {
        const user = await Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = newPassword;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to reset password" });
    }
};