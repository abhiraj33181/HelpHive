const locations = [
  "Manpur, Gaya",
  "Chowk, Gaya",
  "Civil Lines, Gaya",
  "Gawalbigha, Gaya",
  "Sherghati, Gaya",
  "Durga Bari, Gaya",
  "Delha, Gaya",
  "AP Colony, Gaya",
];

const SearchBox = () => {
  // ...your existing state
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
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center">
        {/* heading here */}

        {/* Search + Location bar */}
        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col md:flex-row items-stretch gap-3 max-w-3xl mx-auto"
        >
          {/* Location box */}
          <div className="relative md:w-1/3">
            <button
              type="button"
              onClick={() => setOpenLocation((o) => !o)}
              className="w-full h-12 border border-gray-300 bg-white rounded-full px-4 flex items-center justify-between text-left text-sm"
            >
              <span className="flex items-center gap-2 text-gray-600">
                <span className="text-blue-500">
                  {/* location icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 11a3 3 0 100-6 3 3 0 000 6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 10.5C19.5 16 12 21 12 21S4.5 16 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>
                <span className={selectedLocation ? "text-gray-800" : "text-gray-400"}>
                  {selectedLocation || "Select Location"}
                </span>
              </span>
              <span className="text-gray-400">
                ▾
              </span>
            </button>

            {openLocation && (
              <div className="absolute mt-2 w-full bg-white shadow-xl rounded-xl z-20 max-h-72 overflow-y-auto text-left">
                <div className="px-4 py-3 border-b text-xs font-semibold text-blue-700 flex items-center gap-2">
                  <span className="text-blue-500">
                    {/* detect icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v3m0 3h.01M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
                      />
                    </svg>
                  </span>
                  Detect Location
                </div>
                <div className="px-4 pt-2 pb-1 text-[11px] font-semibold text-gray-400">
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
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search input */}
          <div className="flex-1 flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for helpers or services"
              className="flex-1 h-12 rounded-l-full border border-gray-300 border-r-0 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-r-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-sm font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {/* rest of your component... */}
      </div>
    </section>
  );
}

export default SearchBox;
