import React, { useEffect, useState } from "react";
import {
	HiUser,
	HiArrowSmRight,
	HiDocumentText,
	HiAnnotation,
	HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSucess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	Sidebar,
	SidebarItem,
	SidebarItems,
	SidebarItemGroup,
} from "flowbite-react";

export default function DashSidebar() {
	const location = useLocation();
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [tab, setTab] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

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

	const menuItems = [
		currentUser?.isAdmin && {
			to: "/dashboard?tab=dash",
			icon: HiChartPie,
			label: "Dashboard",
			active: tab === "dash" || !tab,
		},
		{
			to: "/dashboard?tab=profile",
			icon: HiUser,
			label: "Profile",
			active: tab === "profile",
			labelText: currentUser?.isAdmin ? "Admin" : "User",
		},
		currentUser?.isAdmin && {
			to: "/dashboard?tab=posts",
			icon: HiDocumentText,
			label: "Posts",
			active: tab === "posts",
		},
		currentUser?.isAdmin && {
			to: "/dashboard?tab=comments",
			icon: HiAnnotation,
			label: "Comments",
			active: tab === "comments",
		},
	].filter(Boolean);

	return (
		<>
			{/* Desktop Sidebar */}
			<div className="hidden md:flex w-64 min-h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
				<Sidebar className="w-full h-full !bg-gray-50 dark:!bg-gray-800 !p-0 !rounded-none border-none shadow-none">
					<SidebarItems className="!bg-gray-50 dark:!bg-gray-800 m-0 p-0">
						<SidebarItemGroup className="flex flex-col gap-1">
							{menuItems.map((item, idx) => (
								<Link key={idx} to={item.to}>
									<SidebarItem
										active={item.active}
										icon={item.icon}
										label={item.labelText}
										labelColor="dark"
										as="div"
										className="hover:bg-gray-200 transition-colors"
									>
										{item.label}
									</SidebarItem>
								</Link>
							))}
							<SidebarItem
								icon={HiArrowSmRight}
								className="cursor-pointer hover:bg-red-100 text-red-600 transition-colors"
								onClick={handleSignout}
							>
								Sign Out
							</SidebarItem>
						</SidebarItemGroup>
					</SidebarItems>
				</Sidebar>
			</div>

			{/* Mobile Navigation */}
			<div className="md:hidden w-full bg-white dark:bg-gray-800  shadow-md z-10 p-3 space-y-3">
				{/* First Row: Dashboard + Profile */}
				<div className="grid grid-cols-2 gap-2">
					{menuItems.slice(0, 2).map((item, idx) => (
						<Link key={idx} to={item.to}>
							<button
								className={`flex flex-col items-center text-sm rounded-lg p-2 transition-colors w-full dark:text-gray-100 border border-gray-300 dark:border-gray-700 ${
									item.active
										? "bg-blue-500 text-white hover:cursor-pointer"
										: "text-gray-600 hover:bg-gray-600 hover:text-white hover:cursor-pointer"
								}`}
							>
								<item.icon className="text-lg" />
								<span className="text-xs mt-1">{item.label}</span>
							</button>
						</Link>
					))}
				</div>

				{/* Second Row: Posts + Comments */}
				<div className="grid grid-cols-2 gap-2">
					{menuItems.slice(2, 4).map((item, idx) => (
						<Link key={idx} to={item.to}>
							<button
								className={`flex flex-col items-center text-sm rounded-lg p-2 transition-colors w-full dark:text-gray-100 border border-gray-300 dark:border-gray-700  ${
									item.active
										? "bg-blue-500 text-white hover:cursor-pointer"
										: "text-gray-600 hover:bg-gray-600 hover:text-white hover:cursor-pointer"
								}`}
							>
								<item.icon className="text-lg" />
								<span className="text-xs mt-1">{item.label}</span>
							</button>
						</Link>
					))}
				</div>

				{/* Third Row: Sign Out (full width) */}
				<div>
					<button
						onClick={handleSignout}
						className="flex justify-center items-center gap-2 text-sm rounded-lg p-2 w-full text-red-600 hover:bg-red-100 transition-colors border border-gray-300 dark:border-gray-700 hover:cursor-pointer"
					>
						<HiArrowSmRight className="text-lg" />
						<span>Sign Out</span>
					</button>
				</div>
			</div>
		</>
	);
}
