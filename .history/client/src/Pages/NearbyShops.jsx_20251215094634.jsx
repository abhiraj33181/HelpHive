import { useContext, useEffect, useState } from "react";
import { getNearbyShopsAPI } from "../services/shopService";
import {
  BadgeCheck,
  Facebook,
  MapPin,
  MessagesSquare,
  Phone,
  Search,
  Shield,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import { ProviderContext } from "../context/ProviderContext";

export default function NearbyShops() {
  const {pToken} = useContext(ProviderContext)
  const [shops, setShops] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filter States
  const [sortBy, setSortBy] = useState("");
  const [topRated, setTopRated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [trust, setTrust] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("");

  // Search state (NEW)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await getNearbyShopsAPI(latitude, longitude);
      setShops(res.data.shops);
      setFiltered(res.data.shops);
    });
  }, []);

  // Core Filter Logic (UNCHANGED, only extended with search at the end)
  const applyFilters = () => {
    let data = [...shops];

    // Sort By
    if (sortBy === "Distance") {
      data.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "Rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Popularity") {
      data.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
    }

    // Top Rated
    if (topRated) {
      data = data.filter((s) => s.rating >= 4.5);
    }

    // Verified
    if (verified) {
      data = data.filter((s) => s.isVerified === true);
    }

    // Trust Score
    if (trust) {
      data = data.filter((s) => s.trustScore >= 4);
    }

    // Rating dropdown
    if (ratingFilter === "4") {
      data = data.filter((s) => s.rating >= 4);
    } else if (ratingFilter === "3") {
      data = data.filter((s) => s.rating >= 3);
    }

    // Search filter (ADDED)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter((s) => {
        const name = s.shopName || "";
        const city = s.address?.city || "";
        const category = s.category || "";
        return (
          name.toLowerCase().includes(term) ||
          city.toLowerCase().includes(term) ||
          category.toLowerCase().includes(term)
        );
      });
    }

    setFiltered(data);
  };

  // Run filter when any state changes
  useEffect(() => {
    applyFilters();
  }, [sortBy, topRated, verified, trust, ratingFilter, searchTerm]);

  return (
    <div className="mx-4 sm:mx-[10%] py-16 min-h-screen mt-5 ">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-2xl text-slate-900">
          Nearby Shops in your area
        </h1>
        <div>
          <button className='bg-[#2540C8] text-white hover:bg-[#0d249b] cursor-pointer flex items-center justify-center gap-2 py-2 px-4 rounded-xl outline-0'><Plus className='w-5 h-5' />List Shop</button>
          <span className="text-sm text-slate-500">
          {filtered.length} results
        </span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-3 md:p-4">
          {/* Search input */}
          <div className="flex-1 min-w-[220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by shop, category or city"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-9 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition"
              />
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-200 md:block" />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm py-2 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Sort by</option>
              <option>Distance</option>
              <option>Rating</option>
              <option>Popularity</option>
            </select>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Top Rated */}
            <button
              onClick={() => setTopRated(!topRated)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                topRated
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Star
                className="h-3.5 w-3.5"
                fill={topRated ? "white" : "currentColor"}
              />
              Top Rated
            </button>

            {/* Verified */}
            <button
              onClick={() => setVerified(!verified)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                verified
                  ? "border-sky-500 bg-sky-500 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BadgeCheck
                className="h-3.5 w-3.5"
                color={verified ? "white" : "#0284c7"}
              />
              HH Verified
            </button>

            {/* Trust */}
            <button
              onClick={() => setTrust(!trust)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                trust
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Shield
                className="h-3.5 w-3.5"
                color={trust ? "white" : "#16a34a"}
              />
              HH Trust
            </button>

            {/* Rating Dropdown */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Ratings</option>
              <option value="4">4★ & above</option>
              <option value="3">3★ & above</option>
            </select>
          </div>
        </div>
      </div>

      {/* SHOPS LIST */}
      <div className="space-y-5">
        {filtered.map((shop) => (
          <div
            key={shop._id}
            className="border border-slate-200 rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col md:flex-row gap-4"
          >
            {/* IMAGE */}
            <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden bg-slate-100">
              <img
                src="https://content.jdmagicbox.com/v2/comp/gaya/v7/9999px631.x631.240222125850.f5v7/catalogue/sk-engineering-workshop-alipur-gaya-fabrication-engineers-q7qs8xr81z-250.jpg?w=640&q=75"
                className="h-full w-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                  {shop.shopName}
                </h3>

                <div className="flex flex-wrap gap-3 items-center mt-2">
                  <span className="bg-emerald-600 text-white flex gap-1 items-center px-3 h-8 text-sm font-medium rounded-full">
                    {shop.rating || 4.5}
                    <Star className="h-4" fill="white" />
                  </span>

                  <span className="text-gray-600 text-sm">
                    {shop.ratingCount || 4} ratings
                  </span>

                  <span className="bg-amber-50 text-amber-700 text-xs font-semibold flex gap-1 items-center px-2 h-7 rounded-full border border-amber-100">
                    <Search className="h-3.5 w-3.5" /> Top Search
                  </span>
                </div>

                <p className="flex items-center gap-1 mt-2 text-gray-700 text-sm">
                  <MapPin className="h-4 text-red-500" />
                  {shop.address?.city || "Gaya, Bihar"}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-700">
                    {shop.category}
                  </span>

                  <span className="bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-700">
                    {shop.distance} km away
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="bg-emerald-600 text-white flex gap-2 items-center py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-emerald-700 transition">
                  <Phone className="h-4" /> Show Number
                </button>

                <button className="flex gap-2 items-center py-2 px-4 rounded-full text-sm font-medium border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition">
                  <Facebook className="h-4" /> WhatsApp
                </button>

                <button className="bg-sky-600 text-white flex gap-2 items-center py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-sky-700 transition">
                  <MessagesSquare className="h-4" /> Get Best Price
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-10">
            No shops match your filters. Try clearing some filters or changing the search text.
          </div>
        )}
      </div>
    </div>
  );
}
