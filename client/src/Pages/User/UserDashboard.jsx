import React, { useContext, useEffect, useState } from 'react';
import { 
    Bell, 
    CalendarDays, 
    HandHelpingIcon, 
    LogOut, 
    LayoutDashboard, 
    User, 
    ChevronDown 
} from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const UserDashboard = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { backendURL, axios, navigate, loadUserProfileData, userData } = useContext(AppContext);

    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/logout`, {}, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.profile-menu')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (!userData) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50">Loading...</div>;
    }

    return (
        <div className='bg-zinc-50 min-h-screen w-full flex flex-col'>
            
            {/* --- Navbar --- */}
            <nav className='w-full bg-white border-b border-zinc-200 sticky top-0 z-50 px-4 sm:px-6 py-3 flex justify-between items-center shadow-sm'>
                
                {/* Left Side: Logo & Navigation */}
                <div className='flex items-center gap-8'>
                    {/* Logo */}
                    <Link to='/' className='flex items-center gap-2 group'>
                        <div className='w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform'>
                            <HandHelpingIcon className='w-5 h-5 text-white' />
                        </div>
                        <span className='text-xl font-bold text-slate-800 tracking-tight'>HelpHive</span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <div className='hidden md:flex items-center gap-6'>
                        <Link 
                            to='/dashboard/my-appointments' 
                            className='flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors'
                        >
                            <CalendarDays className='w-5 h-5' />
                            <span>Appointments</span>
                        </Link>
                    </div>
                </div>

                {/* Right Side: Actions & Profile */}
                <div className='flex items-center gap-6'>
                    
                    {/* Notification Bell */}
                    <button className='relative p-2 text-slate-400 hover:text-slate-600 transition-colors'>
                        <Bell className='w-6 h-6' />
                        <span className='absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white'>
                            5
                        </span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative profile-menu">
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 p-1 pl-2 pr-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                        >
                            <div className="hidden md:flex flex-col items-end mr-1">
                                <span className="text-sm font-semibold text-slate-700 leading-none">{userData.name}</span>
                                <span className="text-xs text-slate-400 font-medium mt-0.5">User</span>
                            </div>
                            <img 
                                src={userData.image} 
                                alt="Profile" 
                                className="w-9 h-9 object-cover rounded-full border border-slate-200 bg-slate-100" 
                            />
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden sm:block ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Content */}
                        <div 
                            className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 transform origin-top-right transition-all duration-200 ${
                                showDropdown 
                                ? 'opacity-100 scale-100 visible' 
                                : 'opacity-0 scale-95 invisible'
                            }`}
                        >
                            <div className="p-2">
                                <div className="px-3 py-2 border-b border-slate-100 mb-1 md:hidden">
                                    <p className="font-semibold text-slate-800">{userData.name}</p>
                                    <p className="text-xs text-slate-500">User Account</p>
                                </div>
                                
                                <button 
                                    onClick={() => { navigate('/dashboard'); setShowDropdown(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </button>
                                
                                <button 
                                    onClick={() => { navigate('/dashboard/my-profile'); setShowDropdown(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <User className="w-4 h-4" /> My Profile
                                </button>

                                <div className="h-px bg-slate-100 my-1"></div>
                                
                                <button 
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Main Content Outlet --- */}
            <main className='flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
                <Outlet />
            </main>

        </div>
    );
};

export default UserDashboard;