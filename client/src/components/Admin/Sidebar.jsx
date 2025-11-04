import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

function Sidebar() {

  const {aToken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken  && <ul className='text-[#515151] mt-5'>
          <NavLink to='/admin/dashboard' className={({isActive}) => `flex itms-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursoir-pointer ${isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''}`}>
            <img src={assets.home_icon} />
            <p>Dashboard</p>
          </NavLink>
          
          <NavLink to='/admin/all-appointments' className={({isActive}) => `flex itms-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursoir-pointer ${isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''}`}>
            <img src={assets.appointment_icon} />
            <p>Appointments</p>
          </NavLink>

          <NavLink to='/admin/add-provider' className={({isActive}) => `flex itms-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursoir-pointer ${isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''}`}>
            <img src={assets.add_icon} />
            <p>Add Provider</p>
          </NavLink>

          <NavLink to='/admin/provider-list' className={({isActive}) => `flex itms-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursoir-pointer ${isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''}`}>
            <img src={assets.people_icon} />
            <p>Provider List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar