import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import MobileSidebar from "../components/MobileSidebar";
const Layout: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);

    return (
        <div className="w-full">
            <MobileSidebar />
            <div className=" w-full min-h-screen flex flex-col md:flex-row">
                <div className=" w-1/5 sticky top-0 hidden md:block">
                    {/* Sidebar */}
                    <SideBar />
                </div>

                <div className=" flex-1 oevrflow-y-hidden bg-gray-400">

                    {/* Side Navbar */}
                    <Navbar />
                    <div className="p-4 2xl:px-10 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
