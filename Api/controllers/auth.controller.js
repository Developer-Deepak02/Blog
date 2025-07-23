const User = require("../Models/User.models.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const SignUp = async (req, res, next) => {
	const { username, email, password } = req.body;
	// Check if all fields are filled
	if (
		!username ||
		!email ||
		!password ||
		username === "" ||
		email === "" ||
		password === ""
	) {
		return next(errorHandler(400, "All fileds are required"));
	}

	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.json("User created successfully");
	} catch (error) {
		next(error);
	}
};

module.exports = { SignUp };
