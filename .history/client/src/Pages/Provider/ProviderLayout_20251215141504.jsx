import { Bell, CalendarDays, HandHelpingIcon, LayoutDashboard } from 'lucide-react';
import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { ProviderContext } from '../../context/ProviderContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function dashboardLayout() {
  const navigate = useNavigate()
  const { setPToken, loading, pToken, profileData, backendURL, getProfileData } = useContext(ProviderContext)

  const [showDropdown, setShowDropdown] = useState(false)


  const logout = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/provider/logout`, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        setPToken(false)
        navigate('/auth/login')
        await getProfileData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu')) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])



  if (loading) return <p>Loading...</p>;

  return (
    <div className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen max-w-full'>
      <nav className='w-full bg-white py-3 px-6 flex justify-between items-center sticky top-0 border-b border-gray-200 shadow z-10'>
        {/* left part  */}
        <div className='flex items-center gap-10'>
          <div className='flex items-center space-x-8'>
            <Link to='/' className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                <HandHelpingIcon className='w-5 h-5 text-white' />
              </div>
              <div className='heading text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                HelpHive
              </div>
            </Link>
          </div>
          <NavLink to={'/provider/dashboard'} className={({ isActive }) =>
            `${isActive ? "font-bold" : ""} hidden md:flex gap-2 items-center justify-center text-[#2E50ED] hover:text-[#0e38f1]`}>
            <LayoutDashboard className='h-10' /><p>Dashboard</p>
          </NavLink>
          <NavLink to={'/provider/dashboard/all-appointments'}  className={({ isActive }) =>
            `${isActive ? "font-bold" : ""} hidden md:flex gap-2 items-center justify-center text-[#2E50ED] hover:text-[#0e38f1]`}>
            <CalendarDays className='h-10' /><p>Appointment</p>
          </NavLink>

           <NavLink to={'/provider/dashboard/my-shop'}  className={({ isActive }) =>
            `${isActive ? "font-bold" : ""} hidden md:flex gap-2 items-center justify-center text-[#2E50ED] hover:text-[#0e38f1]`}>
            <CalendarDays className='h-10' /><p>Shop Listing</p>
          </NavLink>

           <NavLink to={'/provider/dashboard/my-property'}  className={({ isActive }) =>
            `${isActive ? "font-bold" : ""} hidden md:flex gap-2 items-center justify-center text-[#2E50ED] hover:text-[#0e38f1]`}>
            <CalendarDays className='h-10' /><p>Property Listing</p>
          </NavLink>
        </div>

        {/* right side  */}
        <div className='flex gap-9 items-center'>
          <div className='relative'>
            <Bell className='h-10' />
            <span className='absolute right-[-4px] top-0 bg-red-600 text-white h-5 w-5 flex justify-center items-center rounded-full'>5</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer relative profile-menu hover:bg-[#F5F5F5] p-1 rounded"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <img src={profileData.image} className="w-10 h-10 object-cover rounded-full" />

            <div className='hidden md:flex flex-col justify-center'>
              <p className='font-semibold m-0 leading-tight'>{profileData.name}</p>
              <p className='text-zinc-600 text-xs font-semibold m-0 leading-tight'>Provider</p>
            </div>
            {/* Dropdown */}
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 transition-all duration-200 ${showDropdown ? 'block' : 'hidden'
                }`}
            >
              <div className="min-w-48 bg-white rounded-lg flex flex-col gap-4 p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <p
                  onClick={() => {
                    navigate('/provider/dashboard');
                    setShowDropdown(false)
                  }}
                  className="hover:text-black cursor-pointer font-semibold"
                >
                  Dashboard
                </p>
                <p
                  onClick={() => {
                    navigate('/provider/dashboard/my-profile')
                    setShowDropdown(false)
                  }}
                  className="hover:text-black cursor-pointer font-semibold"
                >
                  My Profile
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer font-semibold"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>


      </nav>


      {/* outlet part  */}
      <div className='w-full p-2'>
        <Outlet />
      </div>





    </div>
  )
}

export default dashboardLayout