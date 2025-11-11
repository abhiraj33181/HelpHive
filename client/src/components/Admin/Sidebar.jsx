import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { ProviderContext } from '../../context/ProviderContext'
import { assets } from '../../assets/assets'

function Sidebar() {
  const { aToken } = useContext(AdminContext)
  const { pToken } = useContext(ProviderContext)

  return (
    <div className="min-h-screen bg-white border-r fixed md:relative">
      {/* ✅ Admin Sidebar */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to="/admin/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to="/admin/add-provider"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="add provider" />
            <p className="hidden md:block">Add Provider</p>
          </NavLink>

          <NavLink
            to="/admin/provider-list"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="provider list" />
            <p className="hidden md:block">Provider List</p>
          </NavLink>
        </ul>
      )}

      {/* ✅ Provider Sidebar */}
      {pToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/provider/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to="/provider/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to="/provider/my-profile"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F2FF] border-r-4 border-[#5F6FFF]' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="profile" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
