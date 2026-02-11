import { useEffect, useState } from "react";
import {
  getMyPropertiesAPI,
  deletePropertyAPI,
} from "../../../services/propertyService";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Home,
  IndianRupee,
  MapPin,
  BedDouble,
  Bath,
} from "lucide-react";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getMyPropertiesAPI();
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await deletePropertyAPI(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete property");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading properties...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Properties
        </h2>

        <Link
          to="/provider/dashboard/add-property"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      {/* EMPTY STATE */}
      {properties.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No properties added yet.
        </div>
      )}

      {/* PROPERTY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* IMAGE */}
            {p.images?.[0] ? (
              <img
                src={p.images[0]}
                alt={p.title}
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="h-44 flex items-center justify-center bg-gray-100">
                <Home className="text-gray-400" size={40} />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {p.title}
              </h3>

              <p className="text-sm text-blue-600">
                {p.propertyType} • {p.furnishing}
              </p>

              <p className="flex items-center gap-1 text-gray-700 text-sm">
                <IndianRupee size={14} />
                {p.rent.toLocaleString("en-IN")} / month
              </p>

              <p className="text-xs text-gray-500">
                Deposit: ₹{p.deposit.toLocaleString("en-IN")}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <BedDouble size={14} /> {p.bedroom}
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={14} /> {p.bathroom}
                </span>
                {p.size > 0 && <span>{p.size} sq.ft</span>}
              </div>

              <p className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <MapPin size={12} />
                {p.address?.city || "Location not added"}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                  p.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {p.available ? "Available" : "Not Available"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between border-t p-3">
              <Link
                to={`/provider/dashboard/update-property/${p._id}`}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <Pencil size={15} />
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
