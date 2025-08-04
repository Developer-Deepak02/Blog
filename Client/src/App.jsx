import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashbord from "./pages/Dashbord";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./Components/Header";
import { ThemeModeScript } from "flowbite-react";
import FooterCompoment from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import CreatePost from './pages/CreatePost';


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
					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<Dashbord />} />
					</Route>
					<Route element={<AdminPrivateRoute />}>
						<Route path="/create-post" element={<CreatePost />} />
					</Route>
				</Routes>
				<FooterCompoment />
			</BrowserRouter>
		</>
	);
};

export default App;
