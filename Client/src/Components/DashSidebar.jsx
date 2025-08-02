import React from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { signoutSucess } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
	const location = useLocation();
	const [tab, setTab] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

		// handle signout	-->	-->	-->
			const handleSignout = async () => {
				try {
					const res = await fetch("/api/user/signout", {
						method: "POST",
					});
					const data = await res.json();
					if (!res.ok) {
						console.log(data.message);
					} else {
						dispatch(signoutSucess());
					}
				} catch (error) {
					console.log(error.message);
				}
			};

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
				<SidebarItem onClick={handleSignout} icon={HiArrowSmRight} className="cursor-pointer">
					Sign Out
				</SidebarItem>
			</SidebarItemGroup>
		</Sidebar>
	);
};

export default DashSidebar;
