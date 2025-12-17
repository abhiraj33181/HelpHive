import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Providers = () => {
  const navigate = useNavigate()
  const { providers, searchQuery, setSearchQuuery } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProv, setFilterProv] = useState([])

  // FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("")
  const [availability, setAvailability] = useState("")
  const [sortPrice, setSortPrice] = useState("")
  const [rating, setRating] = useState("")
  const [search, setSearch] = useState("")

  const categories = [
    "Electrician",
    "Home Tutor",
    "Plumber",
    "Tailor",
    "Painter",
    "Carpenter",
    "Beautician"
  ]

  const applyFilter = () => {
    let data = [...providers]

    // SEARCH FILTER (name + service)
    if (search.trim() !== "") {
      data = data.filter(p => {
        const n = p.name ? p.name.toLowerCase() : ""
        const s = p.service ? p.service.toLowerCase() : ""
        return n.includes(search.toLowerCase()) || s.includes(search.toLowerCase())
      })
    }

    // CATEGORY FILTER
    if (selectedCategory) {
      data = data.filter(p => p.service === selectedCategory)
    }

    // AVAILABILITY FILTER
    if (availability === "available") {
      data = data.filter(p => p.available === true)
    }
    if (availability === "not_available") {
      data = data.filter(p => p.available === false)
    }

    // RATING FILTER
    if (rating) {
      const minRating = Number(rating)
      data = data.filter(p => p.rating >= minRating)
    }

    // PRICE SORT
    if (sortPrice === "low_high") {
      data.sort((a, b) => a.price - b.price)
    } else if (sortPrice === "high_low") {
      data.sort((a, b) => b.price - a.price)
    }

    setFilterProv(data)
  }

  useEffect(() => {
    applyFilter()
  }, [providers, selectedCategory, availability, sortPrice, rating, search])

  return (
    <div className="mx-4 sm:mx-[10%] py-16 min-h-screen mt-5 ">
      {/* TOP BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Service Providers
          </h1>
          <p className="text-sm text-slate-500">
            Browse and filter specialists around you.
          </p>
        </div>

        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-500">
            ⚙
          </span>
          <span>Filters</span>
        </button>
      </div>

      {/* SEARCH + QUICK FILTER STRIP */}
      <div className="mb-6 space-y-3">
        {/* SEARCH INPUT */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name or service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100"
          />
        </div>

        {/* CHIPS PREVIEW (category & availability) */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("")
              setAvailability("")
              setRating("")
              setSortPrice("")
            }}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 hover:bg-slate-50"
          >
            Clear all
          </button>

          {selectedCategory && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
              {selectedCategory}
            </span>
          )}

          {availability === "available" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available only
            </span>
          )}

          {availability === "not_available" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Not available
            </span>
          )}

          {rating && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              ⭐ {rating} & up
            </span>
          )}

          {sortPrice && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              💰 {sortPrice === "low_high" ? "Low to high" : "High to low"}
            </span>
          )}
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilter && (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* CATEGORY FILTER */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Category
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* AVAILABILITY FILTER */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Availability
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="not_available">Not available</option>
              </select>
            </div>

            {/* RATING FILTER */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Rating
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">All ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
              </select>
            </div>

            {/* PRICE SORTING */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Sort by price
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100"
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
              >
                <option value="">Default</option>
                <option value="low_high">Low to high</option>
                <option value="high_low">High to low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* PROVIDER CARDS */}
      <div className="w-full grid [grid-template-columns:var(--grid-cols-auto)] gap-4 gap-y-6">
        {filterProv.map((provider, index) => (
          <div
            onClick={() => navigate(`/appointment/${provider._id}`)}
            key={index}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
              <img
                src={provider.image}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={provider.name}
              />
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className={`h-2 w-2 rounded-full ${provider.available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className={provider.available ? 'text-emerald-600' : 'text-rose-600'}>
                  {provider.available ? 'Available' : 'Not available'}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900">
                {provider.name}
              </p>
              <p className="text-xs text-slate-500">
                {provider.service}
              </p>

              {provider.rating && (
                <p className="mt-1 text-xs font-medium text-amber-500">
                  ⭐ {provider.rating}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Providers
