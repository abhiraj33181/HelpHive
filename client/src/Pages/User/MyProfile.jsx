import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
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
    Loader2 
} from "lucide-react";

// Move constant outside to prevent re-creation
const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const MyProfile = () => {
    const { userData, setUserData, backendURL, axios, loadUserProfileData } = useContext(AppContext);
    
    const [activeTab, setActiveTab] = useState('About');
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle Address Fields specifically
    const handleAddressChange = (key, value) => {
        setUserData(prev => ({
            ...prev,
            address: { ...prev.address, [key]: value }
        }));
    };

    const updateUserProfileData = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('street', userData.address.street);
            formData.append('city', userData.address.city);
            formData.append('state', userData.address.state);
            formData.append('pincode', userData.address.pincode);
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            if (image) formData.append('image', image);

            const { data } = await axios.post(`${backendURL}/api/user/updateProfile`, formData, { withCredentials: true });
            
            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (!userData) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Header --- */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile details and preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* --- Left Sidebar (Profile Card & Nav) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center relative overflow-hidden">
                            <div className="relative inline-block">
                                <img 
                                    src={image ? URL.createObjectURL(image) : userData.image} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md" 
                                />
                                {isEdit && (
                                    <label htmlFor="image" className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                    </label>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-slate-900">{userData.name}</h2>
                            <p className="text-slate-500 text-sm">Member since 2024</p>
                        </div>

                        {/* Navigation Tabs */}
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

                    {/* --- Right Content Area --- */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
                            
                            {/* Header Row */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900">{activeTab}</h3>
                                
                                {activeTab !== 'Reviews' && (
                                    !isEdit ? (
                                        <button 
                                            onClick={() => setIsEdit(true)} 
                                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => { setIsEdit(false); loadUserProfileData(); setImage(false); }} 
                                                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={updateUserProfileData} 
                                                disabled={loading}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                Save
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
                                            value={userData.name} 
                                            icon={User}
                                            isEdit={isEdit}
                                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField 
                                                label="Date of Birth" 
                                                type="date"
                                                value={userData.dob} 
                                                icon={Calendar}
                                                isEdit={isEdit}
                                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                            />
                                            
                                            {/* Gender Radio Group */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</label>
                                                <div className="flex gap-4 pt-1">
                                                    {["Male", "Female", "Others"].map((g) => (
                                                        <label key={g} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                                                            userData.gender === g 
                                                                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                                                                : 'bg-slate-50 border-transparent text-slate-500'
                                                            } ${!isEdit ? 'opacity-75 pointer-events-none' : ''}`}
                                                        >
                                                            <input 
                                                                type="radio" 
                                                                name="gender" 
                                                                value={g}
                                                                checked={userData.gender === g}
                                                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                                                disabled={!isEdit}
                                                                className="hidden"
                                                            />
                                                            <span className="text-sm font-medium">{g}</span>
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
                                        {/* Contact Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputField 
                                                label="Email Address" 
                                                type="email"
                                                value={userData.email} 
                                                icon={Mail}
                                                disabled={true} // Email usually not editable
                                            />
                                            <InputField 
                                                label="Phone Number" 
                                                type="number"
                                                value={userData.phone} 
                                                icon={Phone}
                                                isEdit={isEdit}
                                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                            />
                                        </div>

                                        <div className="border-t border-slate-100 pt-6">
                                            <h4 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-blue-600" /> Address Details
                                            </h4>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <InputField 
                                                        label="Street / House No." 
                                                        value={userData.address.street} 
                                                        isEdit={isEdit}
                                                        onChange={(e) => handleAddressChange('street', e.target.value)}
                                                    />
                                                </div>
                                                <InputField 
                                                    label="City" 
                                                    value={userData.address.city} 
                                                    isEdit={isEdit}
                                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                                />
                                                 <InputField 
                                                    label="Pincode" 
                                                    type="number"
                                                    value={userData.address.pincode} 
                                                    isEdit={isEdit}
                                                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                                                />
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 ml-1">State</label>
                                                    <div className="relative">
                                                        <select 
                                                            value={userData.address.state}
                                                            onChange={(e) => handleAddressChange('state', e.target.value)}
                                                            disabled={!isEdit}
                                                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none ${
                                                                isEdit 
                                                                ? 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10' 
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
                                        {/* Mock Data - replace with real data mapping */}
                                        <ReviewCard 
                                            name="Akshay Kumar" 
                                            date="25 Dec, 2025" 
                                            rating={5} 
                                            text="Great service! The provider was very professional and finished the task on time. Highly recommended."
                                            image="https://randomuser.me/api/portraits/men/32.jpg"
                                        />
                                        <ReviewCard 
                                            name="Priya Sharma" 
                                            date="20 Jan, 2026" 
                                            rating={4} 
                                            text="Good experience overall. Communication could be slightly better but work was solid."
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

// --- Helper Components ---

const InputField = ({ label, value, onChange, type = "text", isEdit = false, disabled = false, icon: Icon }) => (
    <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 ml-1">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />}
            <input 
                type={type} 
                value={value} 
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
                    <span className="text-xs text-slate-500">{date}</span>
                </div>
                <div className="flex text-amber-400 my-1.5">
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