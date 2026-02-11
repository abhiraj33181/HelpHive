import { useState } from "react";
import { addShopAPI } from "../../services/shopService";
import {
  Store,
  MapPin,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm((prev) => ({ ...prev, images: updatedImages }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      alert("Please enter valid latitude and longitude");
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
        coordinates: [lng, lat],
      }
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
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Store className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">Add Shop</h1>
          <p className="text-gray-600 text-lg">Simple shop listing form</p>
        </div>

        {/* FORM */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SHOP INFO */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name *</label>
                  <input
                    name="shopName"
                    value={form.shopName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                  <input
                    name="openingHours"
                    value={form.openingHours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="street"
                  value={form.address.street}
                  onChange={handleAddressChange}
                  placeholder="Street/Area"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  name="city"
                  value={form.address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  name="state"
                  value={form.address.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  name="pincode"
                  value={form.address.pincode}
                  onChange={handleAddressChange}
                  placeholder="Pincode"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ImagePlus className="w-5 h-5 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
              </div>
              <input
                value={form.images[0]}
                onChange={(e) => handleImageChange(0, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* LOCATION */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Navigation className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  value={form.lat}
                  onChange={(e) => setForm({ ...form, lat: e.target.value })}
                  placeholder="Latitude"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  value={form.lng}
                  onChange={(e) => setForm({ ...form, lng: e.target.value })}
                  placeholder="Longitude"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={loadingLocation || isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loadingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
                {loadingLocation ? "Detecting..." : "Use my location"}
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-medium hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Shop"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
