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
    <section className="py-10 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-stretch gap-3 bg-white/70 border border-sky-100 rounded-2xl px-3 py-3 shadow-sm backdrop-blur"
        >
          {/* Location box */}
          <div className="relative md:w-1/3">
            <button
              type="button"
              onClick={() => setOpenLocation((o) => !o)}
              className="w-full h-11 rounded-xl border border-sky-100 bg-sky-50/60 px-3 flex items-center justify-between text-left text-xs md:text-sm text-sky-900 hover:border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <span className="flex items-center gap-2">
                <span className="text-sky-500">
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
                <span
                  className={
                    selectedLocation ? "text-sky-900" : "text-sky-400"
                  }
                >
                  {selectedLocation || "Select location"}
                </span>
              </span>
              <span className="text-sky-400 text-xs">▾</span>
            </button>

            {openLocation && (
              <div className="absolute mt-2 w-full bg-white shadow-lg rounded-xl z-20 max-h-64 overflow-y-auto border border-sky-100">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-sky-700 border-b border-sky-50 hover:bg-sky-50"
                  // onClick={handleDetectLocation}
                >
                  <span className="text-sky-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
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
                  Detect location
                </button>

                <div className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wide
