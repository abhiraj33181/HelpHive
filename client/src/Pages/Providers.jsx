import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Added useParams if you use route params for category
import { AppContext } from '../context/AppContext';
import { 
    Search, Filter, MapPin, Star, X, 
    ChevronDown, SlidersHorizontal, ArrowRight 
} from 'lucide-react';

const Providers = () => {
    const navigate = useNavigate();
    const { providers } = useContext(AppContext);
    
    // UI States
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [filterProv, setFilterProv] = useState([]);

    // Filter Logic States
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [availability, setAvailability] = useState("");
    const [sortPrice, setSortPrice] = useState("");
    const [rating, setRating] = useState("");

    const categories = [
        "Electrician", "Home Tutor", "Plumber", 
        "Tailor", "Painter", "Carpenter", "Beautician", "Cleaner", "Mechanic"
    ];

    // Apply Filters
    const applyFilter = () => {
        let data = [...providers];

        // 1. Search (Name or Service)
        if (search.trim()) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(p => 
                (p.name?.toLowerCase() || "").includes(lowerSearch) || 
                (p.service?.toLowerCase() || "").includes(lowerSearch)
            );
        }

        // 2. Category
        if (selectedCategory) {
            data = data.filter(p => p.service === selectedCategory);
        }

        // 3. Availability
        if (availability === "available") data = data.filter(p => p.available);
        if (availability === "not_available") data = data.filter(p => !p.available);

        // 4. Rating
        if (rating) {
            data = data.filter(p => (p.rating || 0) >= Number(rating));
        }

        // 5. Sort Price
        if (sortPrice === "low_high") data.sort((a, b) => (a.price || 0) - (b.price || 0));
        if (sortPrice === "high_low") data.sort((a, b) => (b.price || 0) - (a.price || 0));

        setFilterProv(data);
    };

    useEffect(() => {
        applyFilter();
    }, [providers, selectedCategory, availability, sortPrice, rating, search]);

    // Reset all filters
    const resetFilters = () => {
        setSearch("");
        setSelectedCategory("");
        setAvailability("");
        setRating("");
        setSortPrice("");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Find Professionals</h1>
                        <p className="text-slate-500 mt-1">Discover trusted local helpers for your needs</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search service (e.g. Plumber)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button 
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="md:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-xl font-medium text-slate-700 shadow-sm active:bg-slate-50"
                    >
                        <SlidersHorizontal className="w-5 h-5" /> Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* --- SIDEBAR FILTERS (Desktop) --- */}
                    <aside className={`lg:w-72 w-full flex-shrink-0 space-y-8 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </h3>
                                <button onClick={resetFilters} className="text-xs font-medium text-blue-600 hover:underline">
                                    Reset All
                                </button>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-3 mb-6">
                                <label className="text-sm font-semibold text-slate-700">Category</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === "" ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                                            {selectedCategory === "" && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <input type="radio" name="category" className="hidden" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} />
                                        <span className={`text-sm ${selectedCategory === "" ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>All Categories</span>
                                    </label>
                                    
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400 bg-white'}`}>
                                                {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input type="radio" name="category" className="hidden" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} />
                                            <span className={`text-sm ${selectedCategory === cat ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-slate-100 my-4"></div>

                            {/* Availability */}
                            <div className="space-y-3 mb-6">
                                <label className="text-sm font-semibold text-slate-700">Availability</label>
                                <select 
                                    value={availability} 
                                    onChange={(e) => setAvailability(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500"
                                >
                                    <option value="">Any Status</option>
                                    <option value="available">Available Now</option>
                                    <option value="not_available">Busy / Offline</option>
                                </select>
                            </div>

                             {/* Rating */}
                             <div className="space-y-3 mb-6">
                                <label className="text-sm font-semibold text-slate-700">Min Rating</label>
                                <div className="flex gap-2">
                                    {[4, 3, 2].map((r) => (
                                        <button 
                                            key={r}
                                            onClick={() => setRating(rating === r ? "" : r)}
                                            className={`flex-1 py-2 text-sm border rounded-lg flex items-center justify-center gap-1 transition-all ${rating === r ? 'bg-amber-50 border-amber-500 text-amber-700 font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {r}+ <Star className="w-3 h-3 fill-current" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- PROVIDER GRID --- */}
                    <main className="flex-1 w-full">
                        
                        {/* Results Count & Sort */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-slate-500 text-sm">
                                Showing <span className="font-semibold text-slate-900">{filterProv.length}</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                                <select 
                                    value={sortPrice} 
                                    onChange={(e) => setSortPrice(e.target.value)}
                                    className="text-sm bg-transparent font-medium text-slate-700 outline-none cursor-pointer border-none focus:ring-0 p-0"
                                >
                                    <option value="">Relevance</option>
                                    <option value="low_high">Price: Low to High</option>
                                    <option value="high_low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {filterProv.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProv.map((provider) => (
                                    <div 
                                        key={provider._id}
                                        onClick={() => { navigate(`/appointment/${provider._id}`); window.scrollTo(0,0); }}
                                        className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col"
                                    >
                                        {/* Image Header */}
                                        <div className="relative h-48 overflow-hidden bg-slate-100">
                                            <img 
                                                src={provider.image} 
                                                alt={provider.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm border border-white/10 ${provider.available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                                                    {provider.available ? 'Available' : 'Busy'}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 text-blue-600 shadow-sm backdrop-blur-sm uppercase tracking-wide">
                                                    {provider.service}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{provider.name}</h3>
                                                <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-600">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-xs font-bold">{provider.rating || "4.8"}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate">{provider.address?.city || "Local Provider"}</span>
                                            </div>
                                            
                                            {/* Footer Price & Action */}
                                            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-medium">Starting from</span>
                                                    <span className="text-slate-900 font-bold">₹{provider.price || "500"}</span>
                                                </div>
                                                <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // --- EMPTY STATE ---
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">No providers found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto mb-6">
                                    We couldn't find any providers matching your current filters. Try adjusting your search or categories.
                                </p>
                                <button 
                                    onClick={resetFilters}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Providers;