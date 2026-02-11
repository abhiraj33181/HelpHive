import { useEffect, useState } from "react";
import {
  getMyPropertiesAPI,
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
  Loader2
} from "lucide-react";
import { toast } from "react-toastify";

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
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      console.log(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete property");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-gray-500 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading properties...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              My Properties
            </h1>
            <p className="text-gray-600 text-lg">Manage your rental listings</p>
          </div>

          <Link
            to="/provider/dashboard/add-property"
            className="group flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Add New Property
          </Link>
        </div>

        {/* EMPTY STATE */}
        {properties.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Home className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4">No properties yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Start by adding your first rental property. It's quick and easy.
            </p>
            <Link
              to="/provider/dashboard/add-property"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              <Plus className="w-5 h-5" />
              List Your First Property
            </Link>
          </div>
        )}

        {/* PROPERTIES GRID */}
        {properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="group bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:border-gray-300"
              >
                {/* IMAGE */}
                <div className="relative mb-6">
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Home className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* TITLE & TYPE */}
                <div className="mb-4">
                  <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-800 transition-colors line-clamp-2 leading-tight">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full">
                      {property.propertyType}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-xs text-blue-700 rounded-full">
                      {property.furnishing}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="w-6 h-6 text-emerald-600" />
                    <span className="text-2xl font-light text-gray-900">
                      {property.rent.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Deposit: ₹{property.deposit.toLocaleString("em-IN")}
                  </p>
                </div>

                {/* SPECS */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-sm text-gray-600">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                    <BedDouble className="w-5 h-5 text-gray-500 mb-1" />
                    <span>{property.bedroom} BHK</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                    <Bath className="w-5 h-5 text-gray-500 mb-1" />
                    <span>{property.bathroom}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                    <span className="w-5 h-5 mb-1">ft²</span>
                    <span>{property.size || "-"}</span>
                  </div>
                </div>

                {/* LOCATION & STATUS */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{property.address?.city || "Location TBD"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      property.available
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      {property.available ? "Available" : "Occupied"}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    to={`/provider/dashboard/update-property/${property._id}`}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 hover:bg-blue-50 rounded-xl group/edit"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 font-medium transition-colors px-3 py-2 hover:bg-red-50 rounded-xl group/delete"
                  >
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
