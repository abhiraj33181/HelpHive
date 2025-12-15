import { useEffect, useState } from "react";
import { getMyShopsAPI, deleteShopAPI } from "../../services/shopService";
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this shop?")) return;
    try {
      await deleteShopAPI(id);
      setShops((prev) => prev.filter((shop) => shop._id !== id));
    } catch (error) {
      alert("Failed to delete shop");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading shops...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Shops</h2>

        <Link
          to="/provider/dashboard/add-shop"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New Listing
        </Link>
      </div>

      {/* EMPTY STATE */}
      {shops.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>No shops added yet.</p>
        </div>
      )}

      {/* SHOP LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* SHOP IMAGE */}
            {shop.images?.[0] && (
              <img
                src={shop.images[0]}
                alt={shop.shopName}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
            )}

            {/* SHOP INFO */}
            <h3 className="text-lg font-semibold text-gray-800">
              {shop.shopName}
            </h3>

            <p className="text-sm text-blue-600 mt-1">
              {shop.category}
            </p>

            <div className="text-sm text-gray-600 mt-3 space-y-1">
              <p className="flex items-center gap-1">
                <MapPin size={14} />
                {shop.address?.street || "Address not added"}
              </p>

              {shop.phone && (
                <p className="flex items-center gap-1">
                  <Phone size={14} />
                  {shop.phone}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between mt-5">
              <Link
                to={`/provider/dashboard/update-shop/${shop._id}`}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                onClick={() => handleDelete(shop._id)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
