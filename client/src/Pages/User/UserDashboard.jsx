import { Bell, Calendar, CalendarDays, ChevronDown, Clock, ContactRound, FileText, HandHelpingIcon, MapPin } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'

const UserDashboard = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isAppointment, setIsAppointment] = useState(true)
    const { backendURL, token, axios, getProvidersData, navigate, loadUserProfileData, userData } = useContext(AppContext)


    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/logout`, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                navigate('/')
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
    return userData && (
        <div className='bg-zinc-100 min-h-screen max-w-full'>
            <nav className='w-full bg-white py-3 px-6 flex justify-between items-center'>
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
                    <div className='hidden  md:flex gap-2 items-center justify-center text-[#2E50ED] hover:text-[#0e38f1] font-semibold'>
                        <CalendarDays className='h-10' /><p>Appointment</p>
                    </div>
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
                        <img src={userData.image} className="w-10 h-10 object-cover rounded-full" />

                        <div className='hidden md:flex flex-col justify-center'>
                            <p className='font-semibold m-0 leading-tight'>{userData.name}</p>
                            <p className='text-zinc-600 text-xs font-semibold m-0 leading-tight'>User</p>
                        </div>
                        {/* Dropdown */}
                        <div
                            className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 transition-all duration-200 ${showDropdown ? 'block' : 'hidden'
                                }`}
                        >
                            <div className="min-w-48 bg-white rounded-lg flex flex-col gap-4 p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
                                <p
                                    onClick={() => {
                                        navigate('/dashboard');
                                        setShowDropdown(false)
                                    }}
                                    className="hover:text-black cursor-pointer font-semibold"
                                >
                                    Dashboard
                                </p>
                                <p
                                    onClick={() => {
                                        navigate('/dashboard/my-profile')
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
            <Outlet/>





        </div>
    )
}

export default UserDashboard