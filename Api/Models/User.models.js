const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default: "https://www.istockphoto.com/photos/user-avatar",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("USer", UserSchema);
module.exports = User;
