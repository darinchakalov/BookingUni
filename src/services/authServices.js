const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/constants.js");

const register = function (email, username, password) {
	return User.create({ email, username, password });
};

const login = async function (username, password) {
	try {
		let user = await User.findOne({ username: username });
		let isPasswordCorrect = await user.confirmPassword(password);
		if (isPasswordCorrect) {
			return user;
		}
	} catch (error) {
		throw new Error("Username or password are incorrect", error);
	}
};

const userExists = function (username) {
	return User.exists({ username });
};

const createToken = function (user) {
	const payload = {
		id: user._id,
		username: user.username,
	};
	return jwt.sign(payload, SECRET);
};

const getUser = function (id) {
	return User.findById(id).lean();
};

const authServices = {
	register,
	login,
	userExists,
	createToken,
	getUser,
};

module.exports = authServices;
