import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSideBar } from '../redux/Slices/AuthSlice';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { IoMdClose } from 'react-icons/io';
import SideBar from './SideBar';


function MobileSidebar() {
    console.log('MobileSidebar')
    const dispatch = useDispatch();
    const { isSideBarOpen } = useSelector((state: any) => state.auth);

    const handleCloseSidebar = () => {
        dispatch(setOpenSideBar()); 
    };

    return (
        <Transition
            show={true}
            as={Fragment}
            enter="transition-opacity duration-75"
            enterFrom="opacity-x-0"
            enterTo="opacity-x-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-x-100"
            leaveTo="opacity-x-0"
        >
            <div 
                className={clsx(
                    'w-3/4 md:hidden h-screen bg-black/40 absolute top-0 transition-all duration-700 transform', 
                    isSideBarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                onClick={handleCloseSidebar} 
            >
                <div className="bg-white w-full h-full relative">
                    <div className="w-full flex justify-end px-5 mt-4 cursor-pointer">
                        <button onClick={handleCloseSidebar} >
                            <IoMdClose className="text-2xl cursor-pointer" />
                        </button>
                    </div>
                    <div className="-mt-10">
                        <SideBar />
                    </div>
                </div>
            </div>
        </Transition>
    );
}

export default MobileSidebar;
