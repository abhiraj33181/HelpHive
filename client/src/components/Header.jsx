import { Calendar, HandHelpingIcon } from 'lucide-react'
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

function Header() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

    return (
        <header className="border-b border-slate-900/20 bg-white/95 backdrop:blur-sm fixed top-0 left-0 right-0 z-50">
            <div className='container mx-auto px-4 h-16 flex items-center justify-between'>

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

                <ul className='hidden md:flex items-start gap-5 font-medium'>
                    <NavLink to='/' >
                        <li className='py-1 uppercase'>Home</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/providers' >
                        <li className='py-1 uppercase'>Providers</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/about' >
                        <li className='py-1 uppercase'>About</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/contact' >
                        <li className='py-1 uppercase'>Contact</li>
                        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-4'>
                    {token ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img src={assets.profile_pic} className='w-10 rounded-full' />
                            <img src={assets.dropdown_icon} className='w-2.5' />

                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-white rounded-lg flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer font-semibold'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointment')} className='hover:text-black cursor-pointer font-semibold'>My Appointments</p>
                                    <p onClick={() => {setToken(false); navigate('/')}} className='hover:text-black cursor-pointer font-semibold'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/auth/login')} className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer text-white px-8 py-3 rounded-full hidden md:block transition-all duration-300 shadow-md hover:shadow-lg font-medium'>Create Account</button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header