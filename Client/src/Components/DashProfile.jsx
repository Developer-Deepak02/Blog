import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="mx-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl text-white">Profile</h1>
			<form className="flex flex-col gap-4">
				<div className="w-32 h-32 self-center cursor-pointer mb-4 shadow-2xl overflow-hidden rounded-full">
					<img
						src={currentUser.user.profilePicture}
						alt="user"
						className="rounded-full w-full h-full border-8 border-gray-400 object-cover"
					/>
				</div>
        <div className=" flex flex-col gap-4 mx-auto lg:w-1/2 md:w-full sm:w-full">
				<TextInput
					type="text"
					id="username"
					placeholder="Username"
					defaultValue={currentUser.user.username}
				/>
				<TextInput
					type="email"
					id="email"
					placeholder="email"
					defaultValue={currentUser.user.email}
				/>
				<TextInput type="password" id="password" placeholder="Password" />
        <Button>Update</Button>
      <div className="text-red-500 mt-4 flex justify-between">
        <span className="cursor-pointer">Delete account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
        </div>
			</form>
		</div>
	);
};

export default DashProfile;
