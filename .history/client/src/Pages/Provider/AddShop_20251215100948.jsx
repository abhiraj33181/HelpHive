import { useState } from "react";
import { addShopAPI } from "../../services/shopService";
import {
  Store,
  MapPin,
  Phone,
  Clock,
  ImagePlus,
  Loader2,
  Navigation
} from "lucide-react";

export default function AddShop() {
  const [form, setForm] = useState({
    shopName: "",
    category: "",
    phone: "",
    description: "",
    openingHours: "",
    images: [""],
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    lat: "",
    lng: "",
  });

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // Handle image URL
  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm((prev) => ({ ...prev, images: updatedImages }));
  };

  // Auto-detect location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          lat: pos.coords.latitude.toString(),
          lng: pos.coords.longitude.toString(),
        }));
        setLoadingLocation(false);
      },
      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.lat || !form.lng) {
      alert("Please add shop location");
      return;
    }

    const payload = {
      shopName: form.shopName,
      category: form.category,
      phone: form.phone,
      description: form.description,
      openingHours: form.openingHours,
      images: form.images.filter(Boolean),
      address: form.address,
      location: {
        type: "Point",
        coordinates: [Number(form.lng), Number(form.lat)],
      },
    };

    setIsSubmitting(true);
    try {
      await addShopAPI(payload);
      alert("Shop added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add shop");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 flex gap-2 items-center">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Store className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-light bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent tracking-tight mb-3">
              Add New Shop
            </h1>
            <p className="text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
              Create your shop listing in minutes
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-100/50 rounded-3xl shadow-2xl p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC INFO */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Store className="w-4 h-4 text-indigo-500" />
                  Shop Details
                </label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <input
                      name="shopName"
                      value={form.shopName}
                      onChange={handleChange}
                      placeholder="Enter shop name"
                      required
                      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-lg placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Category (Grocery, Hardware, etc.)"
                      required
                      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-lg placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    name="openingHours"
                    value={form.openingHours}
                    onChange={handleChange}
                    placeholder="9:00 AM - 9:00 PM"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell us about your shop..."
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl resize-vertical placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="space-y-6">
              <label className="block text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                Address Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="street"
                  value={form.address.street}
                  onChange={handleAddressChange}
                  placeholder="Street / Area"
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <input
                  name="city"
                  value={form.address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <input
                  name="state"
                  value={form.address.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <input
                  name="pincode"
                  value={form.address.pincode}
                  onChange={handleAddressChange}
                  placeholder="Pincode (6 digits)"
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* IMAGES */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <ImagePlus className="w-5 h-5 text-indigo-500" />
                Shop Images
              </label>
              <input
                value={form.images[0]}
                onChange={(e) => handleImageChange(0, e.target.value)}
                placeholder="https://example.com/your-shop-image.jpg"
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
              />
              <p className="text-xs text-slate-500 mt-1">
                Add direct image URLs (JPG, PNG, WebP supported)
              </p>
            </div>

            {/* LOCATION */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-indigo-500" />
                Location Coordinates
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                    placeholder="Latitude (e.g. 28.6139)"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                    placeholder="Longitude (e.g. 77.2090)"
                    className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={loadingLocation || isSubmitting}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {loadingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
                {loadingLocation ? "Detecting Location..." : "Auto-detect My Location"}
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-6 px-8 rounded-3xl font-semibold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 transform focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding your shop...
                </span>
              ) : (
                "Create Shop Listing"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
