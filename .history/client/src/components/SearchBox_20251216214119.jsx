import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const params = new URLSearchParams();
    if (selectedLocation) params.set("location", selectedLocation);
    params.set("q", searchTerm.trim());
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="py-14 px-4 bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="group relative flex flex-col md:flex-row gap-3 rounded-3xl bg-white p-3 shadow-lg shadow-sky-100 border border-sky-100"
        >
          {/* LOCATION */}
          <div className="relative md:w-1/3">
            <button
              type="button"
              onClick={() => setOpenLocation((o) => !o)}
              className="flex h-12 w-full items-center justify-between rounded-2xl border border-sky-100 bg-sky-50 px-4 text-sm text-sky-900 transition hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <span className="flex items-center gap-2 truncate">
                <svg className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="1.5" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                  <path strokeWidth="1.5" d="M19.5 10.5C19.5 16 12 21 12 21S4.5 16 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className={selectedLocation ? "text-sky-900" : "text-sky-400"}>
                  {selectedLocation || "Select location"}
                </span>
              </span>
              <span className={`text-sky-400 transition ${openLocation && "rotate-180"}`}>▾</span>
            </button>

            {openLocation && (
              <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-xl animate-in fade-in slide-in-from-top-2">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-3 text-xs font-semibold text-sky-600 hover:bg-sky-50"
                >
                  📍 Detect current location
                </button>

                <div className="px-4 py-2 text-[11px] font-bold tracking-wider text-sky-400">
                  TRENDING AREAS
                </div>

                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setOpenLocation(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-sky-900 hover:bg-sky-50"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SEARCH */}
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeWidth="1.5" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search helpers, services, shops..."
                className="h-12 w-full rounded-2xl border border-sky-100 bg-sky-50 pl-10 pr-4 text-sm text-sky-900 placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
            </div>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-sky-600 px-6 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              Search
            </button>
          </div>
        </form>

        {/* helper text */}
        <p className="mt-3 text-center text-xs text-sky-500">
          Find trusted local helpers near you — fast & reliable
        </p>
      </div>
    </section>
  );
};


export default SearchBox;
