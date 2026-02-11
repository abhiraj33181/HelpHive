import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const params = new URLSearchParams({
      q: searchTerm,
      location,
    });

    navigate(`/search?${params.toString()}`);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Google Maps Reverse Geocoding
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
        );

        const data = await res.json();
        const address = data.results?.[0]?.formatted_address;

        setLocation(address || "Current Location");
        setLoading(false);
      },
      () => {
        alert("Location access denied");
        setLoading(false);
      }
    );
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <form
        onSubmit={handleSearch}
        className="max-w-3xl mx-auto bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-3 shadow-sm"
      >
        {/* Location */}
        <div className="flex gap-2 md:w-1/3">
          <input
            type="text"
            value={location}
            readOnly
            placeholder="Location"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={detectLocation}
            className="px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {loading ? "..." : "📍"}
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services or helpers"
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchBox;
