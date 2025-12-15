import { useEffect, useState } from "react";
import { getMyShopsAPI } from "../../services/shopService";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, MapPin, Phone } from "lucide-react";

export default function MyShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await getMyShopsAPI();
      setShops(res.data.shops);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="animate-pulse space-y-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl mx-auto"></div>
          <p className="text-sm text-slate-500 text-center">Loading your shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
              My Shops
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your business listings</p>
          </div>

          <Link
            to="/provider/dashboard/add-shop"
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Add New Shop
          </Link>
        </div>

        {/* EMPTY STATE */}
        {shops.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <MapPin className="w-12 h-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-light text-slate-800 mb-2">No shops yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Get started by adding your first shop listing. It's quick and easy.
            </p>
            <Link
              to="/provider/dashboard/add-shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              Create Your First Shop
            </Link>
          </div>
        )}

        {/* SHOPS GRID */}
        {shops.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="group bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-slate-200 overflow-hidden"
              >
                {/* SHOP IMAGE */}
                {shop.images?.[0] ? (
                  <div className="relative overflow-hidden rounded-2xl mb-6 h-48">
                    <img
                      src={shop.images[0]}
                      alt={shop.shopName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-6 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-slate-400" />
                  </div>
                )}

                {/* SHOP NAME & CATEGORY */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-light text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                    {shop.shopName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
                      <span className="text-xs font-medium text-indigo-700">{shop.category}</span>
                    </div>
                  </div>
                </div>

                {/* LOCATION INFO */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />
                    <span className="line-clamp-2">{shop.address?.street || "Address not available"}</span>
                  </div>
                  {shop.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 pt-2 border-t border-slate-100">
                      <Phone className="w-4 h-4 flex-shrink-0 text-indigo-500" />
                      <span>{shop.phone}</span>
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Link
                    to={`/provider/dashboard/update-shop/${shop._id}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 text-sm font-medium transition-colors hover:bg-indigo-50 px-3 py-2 rounded-xl group/edit"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                  <button className="flex items-center gap-2 text-slate-600 hover:text-red-500 text-sm font-medium transition-colors hover:bg-red-50 px-3 py-2 rounded-xl group/delete">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
