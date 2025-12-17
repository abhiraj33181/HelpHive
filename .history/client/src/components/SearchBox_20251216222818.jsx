import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm max-w-2xl w-xl mx-auto">
      <select
        className="bg-transparent text-sm text-slate-900 focus:outline-none cursor-pointer px-2 border-r border-sky-100 pr-4"
        defaultValue="Gaya"
      >
        <option value="Gaya">Gaya</option>
        <option value="Patna">Patna</option>
        <option value="New Delhi">New Delhi</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <input
        type="text"
        placeholder="Search service or helpers..."
        className="flex-1 bg-transparent text-md text-sky-900 placeholder:text-slate-300 focus:outline-none px-1"
      />

      <button
        type="submit"
        className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-600 text-white hover:bg-sky-700 transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBox;
