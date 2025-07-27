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
			default:
				"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=0a284fef-c4f1-4f0b-ba1c-187339fac0d4&query=User+Profile",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("USer", UserSchema);
module.exports = User;
