const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		Username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		pasword: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("USer", UserSchema);
export default User;
