const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.models.js");
const errorHandler = require("../utils/error.js");

const SignUp = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return next(errorHandler(400, "All fields are required"));
	}

	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.status(201).json("User created successfully");
	} catch (error) {
		next(error);
	}
};

const SignIn = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(errorHandler(400, "All fields are required"));
	}

	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "User not found"));
		}

		const validPassword = bcryptjs.compareSync(password, validUser.password); // Fix: Compare password with hashed password
		if (!validPassword) {
			return next(errorHandler(400, "Invalid password"));
		}

		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
const { password: _, ...userDetails } = validUser._doc; // Exclude password from user details
		
		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.json({ user: userDetails });
	} catch (error) {
		next(error);
	}
};

module.exports = { SignUp, SignIn };
