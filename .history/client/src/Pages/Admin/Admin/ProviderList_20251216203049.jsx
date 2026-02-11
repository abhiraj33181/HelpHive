import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../../context/AdminContext'

function ProviderList() {
  const { providers, aToken, getAllProviders, changeAvailablity } =
    useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllProviders()
    }
  }, [aToken])

  return (
    <div className="m-4 sm:m-5 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
          All Providers
        </h1>
        <p className="hidden sm:block text-xs text-slate-500">
          Manage provider availability from a single view.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white/95 border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="min-w-full overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Provider
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Service
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-slate-600">
                      {item.service}
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
                        checked={item.available}
                        onChange={() => changeAvailablity(item._id)}
                      />
                      <span>{item.available ? 'Available' : 'Unavailable'}</span>
                    </label>
                  </td>
                </tr>
              ))}
              {providers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-6 text-center text-sm text-slate-500"
                  >
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3 mt-3">
        {providers.map((item, index) => (
          <div
            key={index}
            className="bg-white/95 border border-slate-100 rounded-2xl shadow-sm p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  {item.service}
                </p>
              </div>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
                checked={item.available}
                onChange={() => changeAvailablity(item._id)}
              />
              <span>{item.available ? 'Available' : 'Off'}</span>
            </label>
          </div>
        ))}
        {providers.length === 0 && (
          <p className="text-center text-sm text-slate-500 mt-4">
            No providers found.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProviderList
