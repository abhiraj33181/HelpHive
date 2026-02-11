import { Search, MapPin, Crosshair } from "lucide-react";
import React, { useState } from "react";

const cities = ["Gaya", "Patna", "New Delhi", "Hyderabad", "Bangalore"];

const SearchBox = () => {
  const [location, setLocation] = useState("Gaya");
  const [loadingLoc, setLoadingLoc] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported in this browser");
      return;
    }

    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        // For now just set a placeholder city; normally call a reverse‑geocoding API here.
        setLocation("Gaya");
        setLoadingLoc(false);
      },
      () => {
        alert("Unable to fetch your location");
        setLoadingLoc(false);
      }
    );
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm max-w-2xl mx-auto">
      {/* Location select with fetch option */}
      <div className="relative flex items-center">
        <MapPin className="h-4 w-4 text-slate-400 mr-1" />

        <select
          className="bg-transparent text-sm text-slate-900 focus:outline-none cursor-pointer px-1 border-r border-slate-100 pr-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleDetectLocation}
          className="flex items-center gap-1 pl-2 pr-3 py-1 text-[11px] text-slate-500 hover:text-slate-800"
        >
          <Crosshair className="h-3.5 w-3.5" />
          {loadingLoc ? "Locating..." : "Use my location"}
        </button>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search service or helpers..."
        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none px-1"
      />

      {/* Search button */}
      <button
        type="submit"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-600 text-white hover:bg-slate-700 transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBox;
