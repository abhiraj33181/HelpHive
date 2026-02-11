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
import { assets } from '../assets/assets'; // Keep strictly for user avatars if needed

function Header() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Local state for search if not provided by context yet
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
            // FIXED: Changed bitwise & to logical &&
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

    // Handle search input (Checks if setSearchQuery exists in context, else uses local)
    const handleSearch = (e) => {
        setLocalSearch(e.target.value);
        if(setSearchQuery) setSearchQuery(e.target.value);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300">
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

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setShowMenu(true)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* --- Mobile Sidebar (Drawer) --- */}
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowMenu(false)}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full">
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
                            className="w-full bg-slate-100 py-2.5 pl-10 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 border border-transparent focus:border-blue-500 transition-all" 
                            type="text" 
                            placeholder="Search provider..." 
                        />
                    </div>

                    {/* Mobile Nav Links */}
                    <ul className="space-y-2 flex-1">
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

                    {/* Mobile Footer Actions */}
                    <div className="mt-auto border-t border-slate-100 pt-6">
                        {!token && !pToken && (
                            <button 
                                onClick={() => { navigate('/auth/login'); setShowMenu(false); }}
                                className='w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform'
                            >
                                Login <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                        {(token || pToken) && (
                            <button 
                                onClick={() => { logout(); setShowMenu(false); }}
                                className='w-full flex justify-center items-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors'
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

// Helper component for Dropdown Items to reduce repetition
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