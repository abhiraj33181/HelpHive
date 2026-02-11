import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { 
    Camera, 
    User, 
    Phone, 
    Star, 
    Mail, 
    MapPin, 
    Calendar, 
    Edit2, 
    Save, 
    X, 
    Loader2,
    Briefcase
} from "lucide-react";
import { ProviderContext } from "../../context/ProviderContext";
import { AppContext } from "../../context/AppContext";

// Defined outside to prevent re-creation on render
const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const MyProfile = () => {
    const { pToken, profileData, setProfileData, getProfileData, backendURL, axios } = useContext(ProviderContext);
    
    const [activeTab, setActiveTab] = useState('About');
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    // Simplify Address Update Logic
    const handleAddressChange = (key, value) => {
        setProfileData(prev => ({
            ...prev,
            address: { ...prev.address, [key]: value }
        }));
    };

    const updateUserProfileData = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('phone', profileData.phone);
            formData.append('street', profileData.address.street);
            formData.append('city', profileData.address.city);
            formData.append('state', profileData.address.state);
            formData.append('pincode', profileData.address.pincode);
            formData.append('gender', profileData.gender);
            formData.append('dob', profileData.dob);

            if (image) formData.append('image', image);

            const { data } = await axios.post(`${backendURL}/api/provider/update-profile`, formData, { withCredentials: true });
            
            if (data.success) {
                toast.success(data.message);
                await getProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!profileData) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Header --- */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information and account details.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* --- LEFT SIDEBAR (Card & Nav) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center relative overflow-hidden">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 rounded-full p-1 border-2 border-dashed border-blue-200">
                                    <img 
                                        src={image ? URL.createObjectURL(image) : profileData.image} 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover" 
                                    />
                                </div>
                                {isEdit && (
                                    <label htmlFor="image" className="absolute bottom-1 right-1 bg-blue-600 p-2.5 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg z-10">
                                        <Camera className="w-4 h-4" />
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                    </label>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-slate-900">{profileData.name}</h2>
                            <p className="text-slate-500 text-sm flex items-center justify-center gap-1 mt-1">
                                <Briefcase className="w-3 h-3" /> {profileData.service || 'Service Provider'}
                            </p>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            {[
                                { name: 'About', icon: User },
                                { name: 'Contact Information', icon: Phone },
                                { name: 'Reviews', icon: Star }
                            ].map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => { setActiveTab(tab.name); setIsEdit(false); }}
                                    className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-l-4 ${
                                        activeTab === tab.name 
                                        ? 'bg-blue-50 text-blue-700 border-blue-600' 
                                        : 'text-slate-600 hover:bg-slate-50 border-transparent'
                                    }`}
                                >
                                    <tab.icon className={`w-5 h-5 ${activeTab === tab.name ? 'text-blue-600' : 'text-slate-400'}`} />
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT CONTENT AREA --- */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
                            
                            {/* Content Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900">{activeTab}</h3>
                                
                                {activeTab !== 'Reviews' && (
                                    !isEdit ? (
                                        <button 
                                            onClick={() => setIsEdit(true)} 
                                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit Details
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => { setIsEdit(false); getProfileData(); setImage(false); }} 
                                                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Cancel"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={updateUserProfileData} 
                                                disabled={loading}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                Save Changes
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="p-6 sm:p-8">
                                
                                {/* --- ABOUT TAB --- */}
                                {activeTab === 'About' && (
                                    <div className="space-y-6 max-w-2xl">
                                        <InputField 
                                            label="Full Name" 
                                            value={profileData.name} 
                                            icon={User}
                                            isEdit={isEdit}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField 
                                                label="Date of Birth" 
                                                type="date"
                                                value={profileData.dob} 
                                                icon={Calendar}
                                                isEdit={isEdit}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, dob: e.target.value }))}
                                            />
                                            
                                            {/* Gender Selection */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 ml-1">Gender</label>
                                                <div className="flex gap-2 pt-1">
                                                    {["Male", "Female", "Others"].map((g) => (
                                                        <label key={g} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                                                            profileData.gender === g 
                                                                ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                                                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                                            } ${!isEdit ? 'opacity-60 pointer-events-none' : ''}`}
                                                        >
                                                            <input 
                                                                type="radio" 
                                                                name="gender" 
                                                                value={g}
                                                                checked={profileData.gender === g}
                                                                onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                                                                disabled={!isEdit}
                                                                className="hidden"
                                                            />
                                                            <span className="text-sm">{g}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- CONTACT TAB --- */}
                                {activeTab === "Contact Information" && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField 
                                                label="Email Address" 
                                                type="email"
                                                value={profileData.email} 
                                                icon={Mail}
                                                disabled={true} 
                                                isEdit={false} // Force read-only styling
                                            />
                                            <InputField 
                                                label="Phone Number" 
                                                type="number"
                                                value={profileData.phone} 
                                                icon={Phone}
                                                isEdit={isEdit}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                            />
                                        </div>

                                        <div className="border-t border-slate-100 pt-6">
                                            <h4 className="text-slate-900 font-bold mb-5 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-blue-600" /> Address Details
                                            </h4>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <InputField 
                                                        label="Street / House No." 
                                                        value={profileData.address.street} 
                                                        isEdit={isEdit}
                                                        onChange={(e) => handleAddressChange('street', e.target.value)}
                                                    />
                                                </div>
                                                <InputField 
                                                    label="City" 
                                                    value={profileData.address.city} 
                                                    isEdit={isEdit}
                                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                                />
                                                <InputField 
                                                    label="Pincode" 
                                                    type="number"
                                                    value={profileData.address.pincode} 
                                                    isEdit={isEdit}
                                                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                                                />
                                                
                                                {/* State Dropdown */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 ml-1">State</label>
                                                    <div className="relative">
                                                        <select 
                                                            value={profileData.address.state}
                                                            onChange={(e) => handleAddressChange('state', e.target.value)}
                                                            disabled={!isEdit}
                                                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none ${
                                                                isEdit 
                                                                ? 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900' 
                                                                : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'
                                                            }`}
                                                        >
                                                            {statesOfIndia.map((state) => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- REVIEWS TAB --- */}
                                {activeTab === 'Reviews' && (
                                    <div className="space-y-6">
                                        <ReviewCard 
                                            name="Akshay Kumar" 
                                            date="25 Dec, 2025" 
                                            rating={5} 
                                            text="Great service! The provider was very professional and finished the task on time. Highly recommended."
                                            image="https://randomuser.me/api/portraits/men/32.jpg"
                                        />
                                        <ReviewCard 
                                            name="Sarah Jenkins" 
                                            date="14 Jan, 2026" 
                                            rating={4} 
                                            text="Good communication and decent pricing. Would hire again."
                                            image="https://randomuser.me/api/portraits/women/44.jpg"
                                        />
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components for Cleaner Code ---

const InputField = ({ label, value, onChange, type = "text", isEdit = false, disabled = false, icon: Icon }) => (
    <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 ml-1">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
            <input 
                type={type} 
                value={value || ''} 
                onChange={onChange}
                disabled={!isEdit || disabled}
                className={`w-full py-3 pr-4 rounded-xl border outline-none transition-all ${Icon ? 'pl-10' : 'pl-4'} ${
                    isEdit && !disabled
                    ? 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'
                }`}
            />
        </div>
    </div>
);

const ReviewCard = ({ name, date, rating, text, image }) => (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all">
        <div className="flex items-start gap-4">
            <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900">{name}</h4>
                    <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-200">{date}</span>
                </div>
                <div className="flex text-amber-400 my-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    </div>
);

export default MyProfile;