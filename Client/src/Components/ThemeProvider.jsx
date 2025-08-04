// components/ThemeProvider.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
	const theme = useSelector((state) => state.theme.theme);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen transition-all duration-300">
			{children}
		</div>
	);
};

export default ThemeProvider;
