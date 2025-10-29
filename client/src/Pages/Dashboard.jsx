import React, { useState } from "react";
import {
    Home,
    CalendarCheck,
    Briefcase,
    MessageSquare,
    Star,
    User,
    Settings,
    LogOut,
    Bell,
    Moon,
    Sun,
    Pencil,
    Camera,
    Eye,
    EyeOff,
} from "lucide-react";

const SIDEBAR_NAV = [
    { name: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { name: "My Bookings", icon: <CalendarCheck size={20} />, key: "bookings" },
    { name: "My Services", icon: <Briefcase size={20} />, key: "services" },
    { name: "Messages", icon: <MessageSquare size={20} />, key: "messages" },
    { name: "Reviews", icon: <Star size={20} />, key: "reviews" },
    { name: "Profile", icon: <User size={20} />, key: "profile" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
    { name: "Logout", icon: <LogOut size={20} />, key: "logout" },
];

const user = {
    name: "Priya Sharma",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "Boring Road, Patna, Bihar",
};

const dashboardStats = [
    { label: "Total Bookings", value: 24, icon: <CalendarCheck size={24} />, color: "bg-blue-100" },
    { label: "Active Services", value: 7, icon: <Briefcase size={24} />, color: "bg-green-100" },
    { label: "Pending Reviews", value: 3, icon: <Star size={24} />, color: "bg-yellow-100" },
    { label: "Average Rating", value: "4.6", icon: <Star size={24} className="text-yellow-500" />, color: "bg-gray-100" },
];

const bookings = [
    { id: 1, name: "AC Repair", provider: "Ravi Kumar", date: "27 Oct 2025", status: "Completed" },
    { id: 2, name: "House Cleaning", provider: "Asha Devi", date: "30 Oct 2025", status: "Pending" },
    { id: 3, name: "Plumbing", provider: "Sunil Singh", date: "25 Oct 2025", status: "Cancelled" },
];

const services = [
    {
        id: 51,
        name: "Electrician Visit",
        thumbnail: "https://picsum.photos/seed/electrician/80",
        price: 350,
        provider: "Manish Kumar",
    },
    {
        id: 52,
        name: "Gardening",
        thumbnail: "https://picsum.photos/seed/gardening/80",
        price: 250,
        provider: "Poonam Sinha",
    },
    {
        id: 53,
        name: "Laptop Repair",
        thumbnail: "https://picsum.photos/seed/laptoprepair/80",
        price: 650,
        provider: "Sandeep Tech",
    },
];

const messages = [
    {
        id: 1,
        contact: "Ravi Kumar",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        lastMsg: "Service completed, feedback?", unread: 0,
        history: [
            { self: false, msg: "Thank you for booking AC Repair.", time: "10:02 AM" },
            { self: true, msg: "Thanks! Will leave feedback soon.", time: "10:05 AM" },
        ],
    },
    {
        id: 2,
        contact: "Asha Devi",
        avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        lastMsg: "Cleaning is pending", unread: 1,
        history: [
            { self: false, msg: "Can we reschedule cleaning?", time: "9:30 AM" },
            { self: true, msg: "Sure, next week please.", time: "9:35 AM" },
            { self: false, msg: "Noted!", time: "9:40 AM" },
        ],
    },
];

const reviews = [
    { id: 1, type: "given", name: "AC Repair", to: "Ravi Kumar", rating: 5, review: "Quick and professional service!" },
    { id: 2, type: "received", from: "Sunil Singh", name: "Plumbing", rating: 4, review: "Good customer!" },
];

function Sidebar({ current, setCurrent }) {
    return (
        <aside className="fixed md:static left-0 top-0 h-screen md:h-auto w-20 md:w-56 p-4 bg-gray-100 flex flex-col gap-2 shadow-md transition-all z-30">
            <div className="mb-4 hidden md:block text-2xl font-semibold text-blue-600">HelpHive</div>
            {SIDEBAR_NAV.map(nav => (
                <button
                    key={nav.key}
                    className={`flex items-center gap-3 p-3 w-full rounded-xl text-sm transition duration-200 hover:bg-blue-100 hover:shadow
            ${current === nav.key ? "bg-white shadow border border-blue-300" : ""}`}
                    onClick={() => setCurrent(nav.key)}
                >
                    <span className="text-blue-600">{nav.icon}</span>
                    <span className="hidden md:inline">{nav.name}</span>
                </button>
            ))}
        </aside>
    );
}

function Navbar({ user, darkMode, setDarkMode }) {
    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b flex items-center p-4 px-6 justify-between shadow-sm z-20">
            <div className="flex items-center gap-3">
                <img src={user.profilePic} alt="profile" className="w-10 h-10 rounded-full object-cover shadow" />
                <div className="hidden sm:block font-medium text-base">{user.name}</div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative text-blue-500 hover:bg-blue-100 p-2 rounded-full transition">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="text-blue-600 p-2 rounded-full transition hover:bg-blue-100" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>
            </div>
        </nav>
    );
}

function DashboardHome() {
    return (
        <section className="p-4 grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {dashboardStats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`flex flex-col items-start justify-between gap-2 p-5 rounded-2xl shadow-md ${stat.color} hover:scale-105 hover:shadow-lg transition`}
                    >
                        <span className="text-blue-600">{stat.icon}</span>
                        <span className="text-3xl font-bold">{stat.value}</span>
                        <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Bookings() {
    const [filter, setFilter] = useState("All");
    const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

    return (
        <section className="p-4">
            <div className="mb-4 flex gap-3">
                {["All", "Completed", "Pending", "Cancelled"].map(status => (
                    <button key={status}
                        className={`px-4 py-2 rounded-full border hover:bg-blue-50 transition font-medium
              ${filter === status ? "bg-blue-100 border-blue-400" : "border-gray-300"}`}
                        onClick={() => setFilter(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto shadow rounded-xl">
                <table className="w-full min-w-[520px] text-sm">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="p-3 text-left">Service</th>
                            <th className="p-3 text-left">Provider</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(booking => (
                            <tr className="border-b hover:bg-blue-100 transition" key={booking.id}>
                                <td className="p-3">{booking.name}</td>
                                <td className="p-3">{booking.provider}</td>
                                <td className="p-3">{booking.date}</td>
                                <td className={`p-3 font-medium ${booking.status === "Completed" ? "text-green-600" : booking.status === "Pending" ? "text-yellow-700" : "text-red-500"}`}>{booking.status}</td>
                                <td className="p-3">
                                    {booking.status === "Pending" && (
                                        <button className="text-red-500 hover:text-red-700 px-3 py-1 rounded transition hover:bg-red-100">Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section className="p-4 grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="flex items-center gap-4 bg-white rounded-lg shadow p-4 hover:scale-105 transition">
                        <img src={service.thumbnail} alt="service" className="w-16 h-16 rounded-md object-cover shadow" />
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-lg">{service.name}</div>
                            <div className="text-sm text-gray-500">Provider: {service.provider}</div>
                            <div className="text-blue-600 font-bold">₹{service.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Messages() {
    const [active, setActive] = useState(messages[0]);
    const [input, setInput] = useState("");
    return (
        <section className="flex h-full">
            <aside className="w-1/3 max-w-xs border-r bg-gray-50 p-4 flex flex-col gap-3">
                {messages.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setActive(m)}
                        className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-100 transition ${active.id === m.id ? "bg-blue-50" : ""}`}
                    >
                        <img src={m.avatar} className="w-10 h-10 rounded-full object-cover shadow" alt={m.contact} />
                        <div>
                            <div className="font-semibold">{m.contact}</div>
                            <div className="text-xs text-gray-500 truncate">{m.lastMsg}</div>
                        </div>
                        {m.unread > 0 && <span className="ml-auto bg-blue-500 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center">{m.unread}</span>}
                    </button>
                ))}
            </aside>
            <div className="flex-1 flex flex-col h-full">
                <header className="flex items-center gap-4 p-4 bg-white border-b shadow-sm">
                    <img src={active.avatar} className="w-10 h-10 rounded-full object-cover shadow" alt={active.contact} />
                    <div className="font-semibold">{active.contact}</div>
                </header>
                <main className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                    {active.history.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.self ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[60%] px-4 py-2 rounded-lg ${msg.self ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-black"} shadow-sm`}>
                                <span>{msg.msg}</span>
                                <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                            </div>
                        </div>
                    ))}
                </main>
                <footer className="p-4 bg-gray-100 border-t flex gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Type a message…"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring focus:ring-blue-200 transition"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Send</button>
                </footer>
            </div>
        </section>
    );
}

function Reviews() {
    return (
        <section className="p-4">
            <div className="grid gap-6 mb-4">
                <div className="text-lg font-semibold">Reviews Given</div>
                {reviews.filter(r => r.type === 'given').map(r => (
                    <div key={r.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <div className="font-medium">{r.name}</div>
                            <div className="text-gray-500 text-sm">To: {r.to}</div>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: r.rating }, (_, i) => (<Star key={i} size={18} className="text-yellow-400" />))}
                            </div>
                            <div className="mt-2 text-gray-600 text-sm italic">{r.review}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid gap-6">
                <div className="text-lg font-semibold">Reviews Received</div>
                {reviews.filter(r => r.type === 'received').map(r => (
                    <div key={r.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <div className="font-medium">{r.name}</div>
                            <div className="text-gray-500 text-sm">From: {r.from}</div>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: r.rating }, (_, i) => (<Star key={i} size={18} className="text-yellow-400" />))}
                            </div>
                            <div className="mt-2 text-gray-600 text-sm italic">{r.review}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Profile() {
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState(user);
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    function handlePic(e) {
        setValues({ ...values, profilePic: URL.createObjectURL(e.target.files[0]) });
    }
    return (
        <section className="p-4">
            <div className="bg-white p-6 rounded-xl shadow flex gap-8 items-center flex-col md:flex-row">
                <div className="relative">
                    <img src={values.profilePic} className="w-32 h-32 rounded-full shadow-lg object-cover" alt="Profile" />
                    {edit && (
                        <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                            <Camera size={18} />
                            <input type="file" hidden onChange={handlePic} />
                        </label>
                    )}
                </div>
                <form className="flex flex-col gap-4 flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3">
                        <input
                            className={`border-b py-2 px-3 text-lg w-full font-medium focus:outline-none transition ${!edit ? "bg-transparent" : "bg-blue-50"}`}
                            name="name" value={values.name} disabled={!edit} onChange={handleChange}
                        />
                        <button type="button" className="text-blue-500 px-3 py-1 rounded transition hover:bg-blue-100" onClick={() => setEdit(!edit)}>
                            <Pencil size={18} />
                        </button>
                    </div>
                    <input className="border-b py-2 px-3" name="email" value={values.email} disabled={!edit} onChange={handleChange} />
                    <input className="border-b py-2 px-3" name="phone" value={values.phone} disabled={!edit} onChange={handleChange} />
                    <input className="border-b py-2 px-3" name="address" value={values.address} disabled={!edit} onChange={handleChange} />
                    {edit && <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2" type="submit">Save Changes</button>}
                </form>
            </div>
        </section>
    );
}

function UserSettings({ darkMode, setDarkMode }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className="p-4 max-w-xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Dark Mode</span>
                    <button
                        className="flex items-center gap-2 text-blue-500 hover:bg-blue-100 px-3 py-1 rounded transition"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">Notification Preferences</span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
                        <span className="ml-2">Enable Notifications</span>
                    </label>
                </div>
                <div>
                    <span className="font-medium block mb-2">Change Password</span>
                    <div className="flex gap-3 items-center">
                        <input type={showPassword ? "text" : "password"} className="border rounded px-3 py-2 flex-1" placeholder="New password" />
                        <button className="text-blue-500 hover:text-blue-700" type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600">Update Password</button>
                </div>
            </div>
        </section>
    );
}

export default function Dashboard() {
    const [current, setCurrent] = useState("dashboard");
    const [darkMode, setDarkMode] = useState(false);

    const pageComponent = {
        dashboard: <DashboardHome />,
        bookings: <Bookings />,
        services: <Services />,
        messages: <Messages />,
        reviews: <Reviews />,
        profile: <Profile />,
        settings: <UserSettings darkMode={darkMode} setDarkMode={setDarkMode} />,
        logout: (<div className="p-16 text-center text-xl">Logging out...</div>),
    }[current];

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen w-full flex`}>
            <Sidebar current={current} setCurrent={setCurrent} />
            <main className="flex-1 ml-20 md:ml-56 min-h-screen transition bg-inherit">
                <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className="pb-8">{pageComponent}</div>
            </main>
        </div>
    );
}

