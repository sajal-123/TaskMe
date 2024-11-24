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
        <div className='sticky top-0 left-0 md:hidden z-20'>
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
                    <div className="bg-gray-100 relative w-full h-full">
                            <button className='absolute top-8 z-40 right-8 hover:border-2' onClick={() => handleCloseSidebar} >
                                <IoMdClose className="text hover:scale-125 font-bold duration-400-2xl cursor-pointer" />
                            </button>
                        <div className="">
                            <SideBar/>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default MobileSidebar;
