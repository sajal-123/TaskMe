import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { getInitials } from '../utils';
import { FaUser } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";

function UserAvatar() {
  const [isShowing, setIsShowing] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShowing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left" ref={menuRef}>
        <MenuButton
          className="flex items-center w-10 h-10 2xl:w-12 2xl:h-12 justify-center rounded-full bg-blue-600"
          onClick={() => setIsShowing((prev) => !prev)}
        >
          <span className="text-white font-semibold">{getInitials('John Doe')}</span>
        </MenuButton>

        <Transition
          as={Fragment}
          show={isShowing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setIsShowing(false)} // Close on click
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  <FaUser className="mr-2" aria-hidden="true" />
                  Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setIsShowing(false)} // Close on click
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  <FaUser className="mr-2" aria-hidden="true" />
                  Settings
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setIsShowing(false)} // Close on click
                  className={`${
                    active ? 'bg-blue-500 text-red-900' : 'text-red-500'
                  } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                >
                  <IoMdLogOut className="mr-2" aria-hidden="true" />
                  Logout
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default UserAvatar;
