import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashbord from "./pages/Dashbord";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./Components/Header";
import { ThemeModeScript } from "flowbite-react";

const App = () => {
	return (
		<>
			<ThemeModeScript />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/dashboard" element={<Dashbord />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
