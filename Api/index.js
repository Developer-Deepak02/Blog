import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.route.js";
import authRoutes from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// routes
app.use(express.json());
app.use("/api/users", userRoutes);
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
