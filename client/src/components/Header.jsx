<<<<<<< HEAD
import React, { useEffect, useState, useContext } from 'react';
import { 
    ArrowRight, 
    HandHelpingIcon, 
    Search, 
    Menu, 
    X, 
    ChevronDown, 
    LayoutDashboard, 
    User, 
    Store, 
    Building2, 
    LogOut 
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ProviderContext } from '../context/ProviderContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; 

function Header() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Local state for search
    const [localSearch, setLocalSearch] = useState(""); 

    const { token, userData, axios, backendURL, loadUserProfileData, setSearchQuery } = useContext(AppContext);
    const { pToken, profileData, getProfileData, setPToken } = useContext(ProviderContext);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showMenu]);

    const logout = async () => {
        try {
            if (token && !pToken) {
                const { data } = await axios.post(`${backendURL}/api/user/logout`, {}, { withCredentials: true });
                if (data.success) {
                    toast.success(data.message);
                    await loadUserProfileData();
                    navigate('/');
                }
            }
            if (pToken && !token) {
                const { data } = await axios.get(`${backendURL}/api/provider/logout`, { withCredentials: true });
                if (data.success) {
                    toast.success(data.message);
                    setPToken(false);
                    navigate('/');
                    await getProfileData();
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSearch = (e) => {
        setLocalSearch(e.target.value);
        if(setSearchQuery) setSearchQuery(e.target.value);
    };

    return (
        // Header Z-index 40 rakha hai taaki mobile menu (Z-50) iske upar aa sake
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300">
            <div className='container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between'>

                {/* --- Logo Section --- */}
                <Link to='/' className='flex items-center space-x-2.5 group'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105'>
                        <HandHelpingIcon className='w-6 h-6 text-white' />
                    </div>
                    <span className='text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight'>
                        HelpHive
                    </span>
                </Link>

                {/* --- Desktop Navigation --- */}
                <nav className='hidden md:flex items-center gap-8'>
                    {['Home', 'Providers', 'About', 'Contact'].map((item) => (
                        <NavLink 
                            key={item} 
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className={({ isActive }) => 
                                `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>

                {/* --- Right Actions --- */}
                <div className='flex items-center gap-4'>
                    
                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:flex items-center bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all w-64">
                        <Search className='w-4 h-4 text-slate-400 mr-2' />
                        <input 
                            onChange={handleSearch} 
                            value={localSearch}
                            className="bg-transparent text-sm outline-none w-full text-slate-700 placeholder:text-slate-400" 
                            type="text" 
                            placeholder="Find a provider..." 
                        />
                    </div>

                    {/* Authentication Logic */}
                    {token && userData ? (
                        // --- USER LOGGED IN ---
                        <div className="relative group">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                            >
                                <img src={userData.image || assets.default_avatar} alt="User" className="w-9 h-9 object-cover rounded-full border border-slate-200" />
                                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right ${showDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                        <p className="text-sm font-semibold text-slate-800">Hello, User</p>
                                    </div>
                                    <MenuItem icon={LayoutDashboard} label="Dashboard" onClick={() => navigate('/dashboard')} />
                                    <MenuItem icon={User} label="My Profile" onClick={() => navigate('/my-profile')} />
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <MenuItem icon={LogOut} label="Logout" onClick={logout} isDestructive />
                                </div>
                            </div>
                        </div>

                    ) : pToken && profileData ? (
                        // --- PROVIDER LOGGED IN ---
                        <div className="relative group">
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                            >
                                <img src={profileData.image} alt="Provider" className="w-9 h-9 object-cover rounded-full border border-slate-200" />
                                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right ${showDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                        <p className="text-sm font-semibold text-slate-800">Provider Account</p>
                                    </div>
                                    <MenuItem icon={LayoutDashboard} label="Dashboard" onClick={() => navigate('/provider/dashboard')} />
                                    <MenuItem icon={Store} label="My Shop" onClick={() => navigate('/provider/dashboard/my-shop')} />
                                    <MenuItem icon={Building2} label="My Property" onClick={() => navigate('/provider/dashboard/my-property')} />
                                    <MenuItem icon={User} label="Profile" onClick={() => navigate('/provider/dashboard/my-profile')} />
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <MenuItem icon={LogOut} label="Logout" onClick={logout} isDestructive />
                                </div>
                            </div>
                        </div>

                    ) : (
                        // --- GUEST ---
                        <button 
                            onClick={() => navigate('/auth/login')} 
                            className='hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20'
                        >
                            Login <ArrowRight className="w-4 h-4" />
                        </button>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button onClick={() => setShowMenu(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* --- Mobile Sidebar (Drawer) --- */}
            
            {/* 1. Overlay (High Z-Index) */}
            <div 
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[50] transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowMenu(false)}
            />

            {/* 2. Drawer (Higher Z-Index + overflow-y-auto for scrolling) */}
            <div className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className='flex items-center space-x-2'>
                            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                                <HandHelpingIcon className='w-5 h-5 text-white' />
                            </div>
                            <span className='text-xl font-bold text-slate-800'>HelpHive</span>
                        </div>
                        <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <div className="relative mb-8">
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                        <input 
                            onChange={handleSearch}
                            value={localSearch}
                            className="w-full bg-slate-100 py-3 pl-10 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 border border-transparent focus:border-blue-500 transition-all" 
                            type="text" 
                            placeholder="Search provider..." 
                        />
                    </div>

                    {/* Mobile Nav Links */}
                    <ul className="space-y-2">
                        {['Home', 'Providers', 'About', 'Contact'].map((item) => (
                            <NavLink 
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) => 
                                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`
                                }
                            >
                                {item}
                            </NavLink>
                        ))}
                    </ul>
                </div>

                {/* Mobile Footer Actions (Sticky Bottom inside drawer) */}
                <div className="p-6 border-t border-slate-100 bg-white">
                    {!token && !pToken && (
                        <button 
                            onClick={() => { navigate('/auth/login'); setShowMenu(false); }}
                            className='w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform'
                        >
                            Login <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                    {(token || pToken) && (
                        <button 
                            onClick={() => { logout(); setShowMenu(false); }}
                            className='w-full flex justify-center items-center gap-2 bg-red-50 text-red-600 py-3.5 rounded-xl font-medium hover:bg-red-100 transition-colors'
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

// Helper component for Dropdown Items
function MenuItem({ icon: Icon, label, onClick, isDestructive = false }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                isDestructive 
                ? 'text-red-600 hover:bg-red-50' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
            <Icon className={`w-4 h-4 ${isDestructive ? 'text-red-500' : 'text-slate-400'}`} />
            {label}
        </button>
    );
}

export default Header;
=======
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
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
