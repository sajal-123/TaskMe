import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
const Layout: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);

    return (
        <div className=" w-full h-screen flex flex-col md:flex-row">
            <div className=" w-1/5 h-screen bg-white sticky top-0 hidden md:block">
                {/* Sidebar */}
                <SideBar/>
            </div>

            {/* MobileSidebar */}
            <div className=" flex-1 oevrflow-y-auto">

                {/* Side Navbar */}
                <Navbar/>


                <div className="p-4 2xl:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
