import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import DashPosts from "../Components/DashPosts";
import DashComments from "../Components/DashComments";
import DashboardComp from "../Components/DashboardComp";

const Dashbord = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-800">
			{/* Sidebar */}
			<div className="md:w-56 w-full">
				<DashSidebar />
			</div>

			{/* Main Content */}
			<main className="flex-1 p-4">
				{tab === "profile" && <DashProfile />}
				{tab === "posts" && <DashPosts />}
				{tab === "comments" && <DashComments />}
				{(tab === "dash" || tab === "") && <DashboardComp />}
			</main>
		</div>
	);
};

export default Dashbord;
