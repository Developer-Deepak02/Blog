import mongoose from "mongoose";

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
			default: "/userPic.jpg",
		},
		isAdmin: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("USer", UserSchema);
export default User;
