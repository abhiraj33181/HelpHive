import { ArrowRight, Calendar, HandHelpingIcon, Search } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { ProviderContext } from '../context/ProviderContext';

function Header() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const { token, setToken, userData, axios, backendURL, loadUserProfileData } = useContext(AppContext)
    const { pToken, profileData, getProfileData, setPToken } = useContext(ProviderContext);

    const logout = async () => {
        try {
            if (token & !pToken) {
                const { data } = await axios.post(`${backendURL}/api/user/logout`, { withCredentials: true })
                if (data.success) {
                    toast.success(data.message)
                    await loadUserProfileData()
                    navigate('/')
                }
            }
            if (pToken & !token) {
                const { data } = await axios.get(`${backendURL}/api/provider/logout`, { withCredentials: true })
                if (data.success) {
                    toast.success(data.message)
                    setPToken(false)
                    navigate('/')
                    await getProfileData()
                }
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

                {/* right side  */}
                <div className='flex justify-center gap-10'>

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
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input onChange={(e) => setSearchQuuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search provider" />
                        <Search className='w-4 h-4' />
                    </div>

                    <div className='flex items-center gap-4'>
                        {token && userData ? (
                            <div
                                className="flex items-center gap-2 cursor-pointer relative profile-menu"
                                onClick={() => setShowDropdown(prev => !prev)}
                            >
                                <img src={userData.image} className="w-10 h-10 object-cover rounded-full" />
                                <img src={assets.dropdown_icon} className="w-2.5" />

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
                                                navigate('/my-profile')
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

                        ) : pToken && profileData ? (
                            <div
                                className="flex items-center gap-2 cursor-pointer relative profile-menu"
                                onClick={() => setShowDropdown(prev => !prev)}
                            >
                                <img src={profileData.image} className="w-10 h-10 object-cover rounded-full" />
                                <img src={assets.dropdown_icon} className="w-2.5" />

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
                                            className="hover:text-black cursor-pointer font-semibold border-b border-slate-200 pb-2"
                                        >
                                            Dashboard
                                        </p>
                                        <p
                                            onClick={() => {
                                                navigate('/provider/dashboard/my-shop');
                                                setShowDropdown(false)
                                            }}
                                            className="hover:text-black cursor-pointer font-semibold border-b border-slate-200 pb-2"
                                        >
                                            My Shop
                                        </p>
                                        <p
                                            onClick={() => {
                                                navigate('/provider/dashboard/my-property');
                                                setShowDropdown(false)
                                            }}
                                            className="hover:text-black cursor-pointer font-semibold border-b border-slate-200 pb-2"
                                        >
                                            My Property
                                        </p>
                                        <p
                                            onClick={() => {
                                                navigate('/provider/dashboard/my-profile')
                                                setShowDropdown(false)
                                            }}
                                            className="hover:text-black cursor-pointer font-semibold border-b border-slate-200 pb-2"
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
                        ) : (
                            <button onClick={() => navigate('/auth/login')} className='md:flex gap-2 justify-center items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer text-white px-8 py-2 rounded-full hidden transition-all duration-300 shadow-md hover:shadow-lg font-medium'>Login <ArrowRight /></button>
                        )}

                        <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className="w-6 md:hidden" />
                        {/* mobile menu  */}
                        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                            <div className='flex items-center justify-between px-5 py-6'>
                                <Link to='/' onClick={() => setShowMenu(false)} className='flex items-center space-x-2'>
                                    <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                                        <HandHelpingIcon className='w-5 h-5 text-white' />
                                    </div>
                                    <div className='heading text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                                        HelpHive
                                    </div>
                                </Link>
                                <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} />
                            </div>
                            <div>
                                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text=lg font-medium'>
                                    <NavLink onClick={() => setShowMenu(false)} to='/'><p className={`px-4 py-2 rounded-full inline-block uppercase`}>Home</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/providers'><p className={`px-4 py-2 rounded-full inline-block uppercase`}>Providers</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/about'><p className={`px-4 py-2 rounded-full inline-block uppercase`}>About</p></NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className={`px-4 py-2 rounded-full inline-block uppercase`}>Contact</p></NavLink>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </header>
    )
}

export default Header