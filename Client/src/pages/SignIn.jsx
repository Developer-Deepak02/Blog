import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

const SignIn = () => {
	// Handle input change
	const [formData, setFormData] = useState({});
	const { loading, error: errorMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			return dispatch(signInFailure("Please fill all fields"));
		}

		try {
			dispatch(signInStart());
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok || data.success === false) {
				return dispatch(signInFailure(data.message || "Login failed"));
			}

			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(signInFailure("Something went wrong"));
		}
	};

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
						Login to your account
					</h2>

					<form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="email" className="text-white">
								Email
							</Label>
							<TextInput
								id="email"
								type="email"
								placeholder="Enter your email"
								onChange={handleChange}
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
								onChange={handleChange}
							/>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
						>
							{loading ? (
								<>
									<Spinner size="sm" />
									<span className="pl-3">Loading</span>
								</>
							) : (
								"Sign In"
							)}
						</Button>
						<OAuth/>
					</form>

					<div className="flex gap-2 text-sm mt-4 text-gray-400">
						<span>Don't Have an account?</span>
						<Link
							to="/signup"
							className="text-blue-400 hover:text-blue-300 underline"
						>
							Sign Up
						</Link>
					</div>
					{errorMessage && (
						<Alert color="failure" className="mt-5">
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignIn;
