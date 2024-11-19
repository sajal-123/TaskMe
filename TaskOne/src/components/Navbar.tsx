import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
    const dispatch=useDispatch();
    const {user}=useSelector((state: any) => state.auth);
  return (
    <div>
      
    </div>
  )
}

export default Navbar
