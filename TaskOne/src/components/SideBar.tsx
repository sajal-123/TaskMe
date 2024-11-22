import React from 'react';
import Links from '../utils/Constants'; // Importing the links array
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpenSideBar } from '../redux/Slices/AuthSlice';
import { MdOutlineAddTask } from 'react-icons/md';


interface LinkItem {
  name: string;
  link: string;
  icon: JSX.Element;
}

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Function to close the sidebar when a link is clicked
  const closeNavbar = () => {
    dispatch(setOpenSideBar());
  };

  // Component for individual navigation link
  const Navlink = ({ el: el }: { el: LinkItem }) => {
    return (
      <Link
        to={el.link}
        onClick={closeNavbar}
        className={`flex items-center gap-3 rounded-md p-2 hover:bg-gray-200 ${location.pathname === el.link && 'bg-gray-200'
          }`}
      >
        {el.icon}
        <span>{el.name}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-screen sticky top-0 left-0 flex flex-col gap-6 p-5 bg-gray-100">
      {/* Header */}
      <h1 className="flex gap-2 items-center text-lg font-semibold">
        <span className="bg-blue-600 p-2 rounded-full text-white">
          <MdOutlineAddTask size={24} />
        </span>
        <span>Task Manager</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex flex-col gap-3 ">
        {Links.map((el, index) => (
          <Navlink key={index} el={el} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
