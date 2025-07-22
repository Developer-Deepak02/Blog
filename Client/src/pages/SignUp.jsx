import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<div className="min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 px-4">
			<div className="flex p-6 max-w-4xl w-full flex-col md:flex-row md:items-start gap-12">
				{/* Left Section */}
				<div className="md:w-1/2 flex flex-col space-y-6">
					<Link
						to="/"
						className="font-bold text-black dark:text-white text-4xl"
					>
						<span className="px-2 py-1 border-2 border-white mr-2 rounded-lg text-2xl text-blue-400">
							Mind
						</span>
						Draft
					</Link>

					<p className="text-xl font-semibold text-white">
						<span className="font-light text-gray-300">Turn</span> Thoughts into{" "}
						<span className="text-blue-400 font-bold">Reality</span>
					</p>

					<p className="text-sm text-gray-400 leading-relaxed">
						Draft your ideas, notes, or blogs — all in one place with MindDraft.
					</p>

					<div className="mt-6 bg-gray-800 p-6 rounded-full w-fit">
						<img
							src="/undraw_book-writer_ri5u.svg"
							alt="idea"
							className="w-40"
						/>
					</div>
				</div>

				{/* Right Section */}
				<div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
					<h2 className="text-xl font-semibold text-white mb-2">
						Create your account
					</h2>

					<form className="space-y-4 flex flex-col">
						<div>
							<Label htmlFor="username" className="text-white">
								Username
							</Label>
							<TextInput
								id="username"
								type="text"
								placeholder="Enter your username"
								required
							/>
						</div>

						<div>
							<Label htmlFor="email" className="text-white">
								Email
							</Label>
							<TextInput
								id="email"
								type="email"
								placeholder="Enter your email"
								required
							/>
						</div>

						<div>
							<Label htmlFor="password" className="text-white">
								Password
							</Label>
							<TextInput
								id="password"
								type="password"
								placeholder="Enter your password"
								required
							/>
						</div>

						<Button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
						>
							Sign Up
						</Button>
					</form>

					<div className="flex gap-2 text-sm mt-4 text-gray-400">
						<span>Have an account?</span>
						<Link
							to="/signin"
							className="text-blue-400 hover:text-blue-300 underline"
						>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
