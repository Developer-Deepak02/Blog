const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/user.route.js");
const authRoutes = require("./Routes/auth.route.js");

// database connection and server setup
dotenv.config();
mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// routes
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// middleware for handling errors

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	res.status(statusCode).json({
		success: false,
		status: statusCode,
		message: message,
	});
});
