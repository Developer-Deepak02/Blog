const User = require("../Models/User.models.js");
const bcryptjs = require("bcryptjs");
const SignUp = async (req, res) => {
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
		return res.status(400).json({
			message: "Please fill all the fields",
		});
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
		res.status(500).json({
			message: "Error creating user",
			error: error.message,
		});
	}
};

module.exports = { SignUp };
