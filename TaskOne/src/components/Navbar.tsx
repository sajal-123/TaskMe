import { useDispatch, useSelector } from 'react-redux'
import UserAvatar from './UserAvatar';
import { setOpenSideBar } from '../redux/Slices/AuthSlice';
import { IoMdMenu } from "react-icons/io";
import { MdOutlineSearch } from 'react-icons/md';


function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);


  return (
    <div className='w-full bg-gray-300 h-16 flex justify-between items-center py-3 px-4 2xl:py-4'>
      {/* Search Section */}
      <div className='flex gap-4'>
        <button className=' md:hidden ' onClick={() => dispatch(setOpenSideBar())}>
          <IoMdMenu />
        </button>
        <div className="rounded-full overflow-hidden border border-gray-300 w-64 2xl:w-[200px] bg-white flex items-center gap-2 px-4 py-2">
          <MdOutlineSearch className="text-gray-500 font-bold" />
          <input
            type="text"
            placeholder="Enter your text here"
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>

      </div>
      <div className='flex-2 gap-2 items-center'>

        {/* NOtification */}


        <UserAvatar />

      </div>
    </div>
  )
}

export default Navbar
