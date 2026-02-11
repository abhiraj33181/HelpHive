import { useEffect, useState } from "react";
import { getNearbyPropertiesAPI } from "../services/propertyService";
import { Search, SlidersHorizontal } from "lucide-react";

export default function NearbyProperties() {
  const [properties, setProperties] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");
  const [furnishingFilter, setFurnishingFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await getNearbyPropertiesAPI(latitude, longitude);
      setProperties(res.data.properties);
      setFiltered(res.data.properties);
    });
  }, []);

  // Core filter logic
  const applyFilters = () => {
    let data = [...properties];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter((p) => {
        const title = p.title || "";
        const street = p.address?.street || "";
        const city = p.address?.city || "";
        const type = p.propertyType || "";
        return (
          title.toLowerCase().includes(term) ||
          street.toLowerCase().includes(term) ||
          city.toLowerCase().includes(term) ||
          type.toLowerCase().includes(term)
        );
      });
    }

    // BHK
    if (bhkFilter) {
      data = data.filter((p) => String(p.bhk) === bhkFilter);
    }

    // Furnishing
    if (furnishingFilter) {
      data = data.filter(
        (p) => p.furnishing && p.furnishing.toLowerCase() === furnishingFilter
      );
    }

    // Property type
    if (typeFilter) {
      data = data.filter(
        (p) => p.propertyType && p.propertyType.toLowerCase() === typeFilter
      );
    }

    // Max rent
    if (maxRent) {
      const max = Number(maxRent);
      if (!Number.isNaN(max)) {
        data = data.filter((p) => Number(p.rent) <= max);
      }
    }

    // Sort
    if (sortBy === "RentLowHigh") {
      data.sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "RentHighLow") {
      data.sort((a, b) => b.rent - a.rent);
    }

    setFiltered(data);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, bhkFilter, furnishingFilter, typeFilter, sortBy, maxRent, properties]);

  return (
    <div className="mx-4 sm:mx-[10%] py-16 min-h-screen mt-5 ">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Nearby Properties
        </h2>
        <span className="text-sm text-slate-500">
          {filtered.length} results
        </span>
      </div>

      {/* FILTER BAR */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-3 md:p-4">
          {/* Search */}
          <div className="flex-1 min-w-[220px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, area or city"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-9 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition"
              />
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-200 md:block" />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm py-2 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Sort by</option>
              <option value="RentLowHigh">Rent: Low to High</option>
              <option value="RentHighLow">Rent: High to Low</option>
            </select>
          </div>

          {/* Pills / dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* BHK */}
            <select
              value={bhkFilter}
              onChange={(e) => setBhkFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>

            {/* Furnishing */}
            <select
              value={furnishingFilter}
              onChange={(e) => setFurnishingFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Furnishing</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi-furnished">Semi-furnished</option>
              <option value="fully-furnished">Fully-furnished</option>
            </select>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Property type</option>
              <option value="apartment">Apartment</option>
              <option value="independent house">Independent House</option>
              <option value="pg">PG / Co-living</option>
            </select>

            {/* Max rent */}
            <input
              type="number"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              placeholder="Max rent"
              className="w-28 text-xs py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col md:flex-row gap-4"
          >
            {/* IMAGE */}
            <div className="w-full md:w-44 h-40 rounded-xl overflow-hidden bg-slate-100">
              <img
                src={
                  p.image ||
                  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
                }
                alt={p.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                  {p.title}
                </h3>

                <p className="mt-2 text-emerald-600 text-lg font-semibold">
                  ₹{Number(p.rent).toLocaleString("en-IN")} / month
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {p.address?.street}
                  {p.address?.city ? `, ${p.address.city}` : ""}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {p.bhk && (
                    <span className="bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-700">
                      {p.bhk} BHK
                    </span>
                  )}
                  {p.furnishing && (
                    <span className="bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-700">
                      {p.furnishing}
                    </span>
                  )}
                  {p.propertyType && (
                    <span className="bg-slate-100 px-3 py-1 rounded-full font-medium text-slate-700">
                      {p.propertyType}
                    </span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="bg-emerald-600 text-white flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-emerald-700 transition">
                  Contact Owner
                </button>
                <button className="border border-slate-300 text-slate-700 flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium hover:bg-slate-50 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-10">
            No properties match your filters. Try changing the search or filters.
          </div>
        )}
      </div>
    </div>
  );
}
