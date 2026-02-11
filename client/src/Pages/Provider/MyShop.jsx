import { useEffect, useState } from "react";
// Make sure to import deleteShopAPI if you have it created in your services
import { getMyShopsAPI, deleteShopAPI } from "../../services/shopService"; 
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, MapPin, Phone, Store, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function MyShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await getMyShopsAPI();
      if (res.data.success) {
        setShops(res.data.shops);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your shops");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      // Assuming you have a delete API endpoint
      const res = await deleteShopAPI(id); 
      
      if (res.data.success) {
        toast.success("Shop deleted successfully");
        // Optimistic update: remove from UI immediately
        setShops((prev) => prev.filter((shop) => shop._id !== id));
      } else {
        toast.error(res.data.message || "Could not delete shop");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting shop");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <ShopsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              My Shops
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Manage your business listings and service locations
            </p>
          </div>

          <Link
            to="/provider/dashboard/add-shop"
            className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 font-medium"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add New Shop
          </Link>
        </div>

        {/* EMPTY STATE */}
        {!loading && shops.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Store className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">No shops found</h3>
            <p className="text-slate-500 max-w-sm text-center mb-8">
              You haven't listed any businesses yet. Start by adding your first shop to reach customers.
            </p>
            <Link
              to="/provider/dashboard/add-shop"
              className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
            >
              Create Listing <Plus className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* SHOPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                {shop.images?.[0] ? (
                  <img
                    src={shop.images[0]}
                    alt={shop.shopName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <Store className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-xs font-medium">No Image</span>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-indigo-700 text-xs font-bold rounded-lg shadow-sm uppercase tracking-wide">
                    {shop.category || "General"}
                  </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {shop.shopName}
                </h3>
                
                <div className="space-y-3 mt-3 flex-1">
                  <div className="flex items-start gap-2.5 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                    <span className="line-clamp-2 text-xs sm:text-sm">
                      {shop.address?.street || "No address provided"}
                    </span>
                  </div>
                  
                  {shop.phone && (
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Phone className="w-4 h-4 flex-shrink-0 text-slate-400" />
                      <span className="text-xs sm:text-sm">{shop.phone}</span>
                    </div>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={`/provider/dashboard/update-shop/${shop._id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 text-sm font-medium transition-colors"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(shop._id)}
                    disabled={deletingId === shop._id}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-red-600 text-sm font-medium transition-colors disabled:opacity-70"
                  >
                    {deletingId === shop._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {deletingId === shop._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Component: Loading Skeleton
function ShopsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-40 bg-slate-200 rounded-xl animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 h-96">
              <div className="h-40 bg-slate-100 rounded-xl mb-4 animate-pulse" />
              <div className="h-6 w-3/4 bg-slate-100 rounded mb-3 animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-100 rounded mb-6 animate-pulse" />
              <div className="flex gap-3 mt-12">
                <div className="h-10 flex-1 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-10 flex-1 bg-slate-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}