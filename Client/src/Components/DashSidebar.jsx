import React from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const DashSidebar = () => {
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
		<Sidebar aria-label="Sidebar" className="w-full md:w-56">
			<SidebarItemGroup>
				<Link to="/dashboard?tab=profile">
					<SidebarItem
						active={tab === "profile"}
						icon={HiUser}
						label={"user"}
						labelColor="dark"
						as={"div"}
					>
						Profile
					</SidebarItem>
				</Link>
				<SidebarItem icon={HiArrowSmRight}>Sign Out</SidebarItem>
			</SidebarItemGroup>
		</Sidebar>
	);
};

export default DashSidebar;
