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

const Google = async (req, res, next) => {
	const { name, email, googlePhotoUrl } = req.body;
	try {
		const user = await User.findOne({ email }); // ✅ typo fixed
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			const { password: _, ...rest } = user._doc;
			return res
				.status(200)
				.cookie("access_token", token, { httpOnly: true })
				.json({ user: rest });
		} else {
			const genratedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(genratedPassword, 10);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email,
				password: hashedPassword, // ✅ don't leave null
				profilePicture: googlePhotoUrl,
			});
			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			const { password: _, ...rest } = newUser._doc;
			return res
				.status(201)
				.cookie("access_token", token, { httpOnly: true })
				.json({ user: rest }); // ✅ consistent output
		}
	} catch (error) {
		console.error("Google auth error:", error);
		next(error);
	}
};

module.exports = { SignUp, SignIn, Google };
