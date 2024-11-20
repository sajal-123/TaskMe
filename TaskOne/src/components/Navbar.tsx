import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from './UserAvatar';
import { setOpenSideBar } from '../redux/Slices/AuthSlice';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineSearch } from 'react-icons/md';
import NotificationPanel from './NotificationPanel';


function Navbar() {
  const dispatch = useDispatch();
  const { user, isSideBarOpen } = useSelector((state: any) => state.auth);


  return (
    <div className='w-full gap-2 bg-gray-300 h-16 flex justify-between items-center py-2 px-4 2xl:py-4'>
      {/* Search Section */}
      <div className='flex gap-2 items-center'>
        <button className=' md:hidden' onClick={() => {
          dispatch(setOpenSideBar())
          console.log(isSideBarOpen)
        }}>
          <IoMdMenu />

        </button>
        <div className="rounded-full overflow-hidden w-full border border-gray-300 2xl:w-[300px] bg-white flex items-center gap-2 px-4 py-2">
          <MdOutlineSearch className="text-gray-500 font-bold" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>

      </div>
      <div className='flex gap-2 items-center'>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  )
}

export default Navbar
