import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { auth } from "../firebase.js"; // Import auth from firebase.js
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
	const auth = getAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleGoogleClick = async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: "select_account",
		});

		try {
			const resultFromGoogle = await signInWithPopup(auth, provider);
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: resultFromGoogle.user.email,
					name: resultFromGoogle.user.displayName,
					googlePhotoUrl : resultFromGoogle.user.photoURL,
				}),
			});
			const data = await res.json();
			if (res.ok || data.success === true){
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			console.error("Google sign-in error:", error);
		}
	};

	return (
		<Button
			type="button"
			className="w-full flex items-center justify-center gap-2"
			outline
			onClick={handleGoogleClick}
		>
			<AiFillGoogleCircle className="w-6 h-6" />
			Sign in with Google
		</Button>
	);
};

export default OAuth;
