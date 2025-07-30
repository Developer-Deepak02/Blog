import React, { use } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";

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
		<div className="min-h-screen flex felx-col md:flex-row">
			<div className="md:w-56">
				{/*sidebar  */}
				<DashSidebar />
			</div>
			{/* profile.... */}
			{tab === "profile" && <DashProfile />}
		</div>
	);
};

export default Dashbord;
