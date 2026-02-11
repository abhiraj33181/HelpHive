import React, { useContext, useEffect, useState } from 'react';
import { 
    Bell, 
    CalendarDays, 
    HandHelpingIcon, 
    LayoutDashboard, 
    Store, 
    Building2, 
    Menu, 
    X, 
    ChevronDown, 
    LogOut,
    User
} from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ProviderContext } from '../../context/ProviderContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function DashboardLayout() {
    const navigate = useNavigate();
    const { setPToken, loading, profileData, backendURL, getProfileData } = useContext(ProviderContext);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Define Navigation Links Configuration
    const navLinks = [
        { path: '/provider/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }, // end: true for exact match
        { path: '/provider/dashboard/all-appointments', label: 'Appointments', icon: CalendarDays },
        { path: '/provider/dashboard/my-shop', label: 'My Shop', icon: Store },
        { path: '/provider/dashboard/my-property', label: 'My Property', icon: Building2 },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/provider/logout`, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                setPToken(false);
                navigate('/auth/login');
                await getProfileData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Close Dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.profile-menu')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className='bg-slate-50 min-h-screen flex flex-col'>
            
            {/* --- Navbar --- */}
            <nav className='bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 h-16 flex justify-between items-center shadow-sm'>
                
                {/* Left: Logo & Desktop Nav */}
                <div className='flex items-center gap-8'>
                    <Link to='/' className='flex items-center gap-2 group'>
                        <div className='w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform'>
                            <HandHelpingIcon className='w-5 h-5 text-white' />
                        </div>
                        <span className='text-xl font-bold text-slate-800 tracking-tight hidden sm:block'>HelpHive</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:flex items-center gap-1'>
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.path}
                                to={link.path}
                                end={link.end}
                                className={({ isActive }) => `
                                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isActive 
                                        ? 'bg-blue-50 text-blue-600' 
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }
                                `}
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    {/* Notification */}
                    <button className='relative p-2 text-slate-400 hover:text-slate-600 transition-colors'>
                        <Bell className='w-5 h-5' />
                        <span className='absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white'></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative profile-menu">
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 p-1 pl-2 pr-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                        >
                            <div className="hidden lg:flex flex-col items-end mr-1">
                                <span className="text-sm font-semibold text-slate-700 leading-none">{profileData?.name}</span>
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Provider</span>
                            </div>
                            <img 
                                src={profileData?.image} 
                                alt="Profile" 
                                className="w-8 h-8 object-cover rounded-full border border-slate-200 bg-slate-100" 
                            />
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden sm:block ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Content */}
                        <div className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 transform origin-top-right transition-all duration-200 ${showDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            <div className="p-2">
                                <div className="px-3 py-2 border-b border-slate-100 mb-1 lg:hidden">
                                    <p className="font-semibold text-slate-800">{profileData?.name}</p>
                                    <p className="text-xs text-slate-500">Provider Account</p>
                                </div>
                                
                                <button onClick={() => { navigate('/provider/dashboard/my-profile'); setShowDropdown(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <User className="w-4 h-4" /> My Profile
                                </button>
                                
                                <div className="h-px bg-slate-100 my-1"></div>
                                
                                <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setShowMobileMenu(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* --- Mobile Drawer Navigation --- */}
            {/* Overlay */}
            <div className={`fixed inset-0 bg-slate-900/50 z-50 transition-opacity duration-300 md:hidden ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMobileMenu(false)} />
            
            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-lg text-slate-800">Menu</span>
                    <button onClick={() => setShowMobileMenu(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.path}
                            to={link.path}
                            end={link.end}
                            onClick={() => setShowMobileMenu(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}
                            `}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => { logout(); setShowMobileMenu(false); }} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-100 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            {/* --- Main Content --- */}
            <main className='flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
                <Outlet />
            </main>

        </div>
    );
}

export default DashboardLayout;