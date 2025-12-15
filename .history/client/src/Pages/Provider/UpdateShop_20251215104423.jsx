import { useEffect, useState } from "react";
import { updateShopAPI, getMyShopsAPI } from "../../services/shopService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Store,
  MapPin,
  ImagePlus,
  Loader2,
  Navigation,
  Phone,
  Clock
} from "lucide-react";

export default function UpdateShop() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // FETCH SHOP
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getMyShopsAPI();
        const shop = res.data.shops.find((s) => s._id === shopId);

        if (!shop) {
          alert("Shop not found");
          return;
        }

        setForm({
          shopName: shop.shopName || "",
          category: shop.category || "",
          phone: shop.phone || "",
          description: shop.description || "",
          openingHours: shop.openingHours || "",
          images: shop.images?.length ? [shop.images[0]] : [""],
          address: {
            street: shop.address?.street || "",
            city: shop.address?.city || "",
            state: shop.address?.state || "",
            pincode: shop.address?.pincode || "",
          },
          lat: shop.location?.coordinates?.[1]?.toString() || "",
          lng: shop.location?.coordinates?.[0]?.toString() || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load shop");
      }
    };

    fetchShop();
  }, [shopId]);

  if (!form) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex items-center gap-3 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading shop...</span>
      </div>
    </div>
  );

  // HANDLERS
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

  const handleImageChange = (value) => {
    setForm((prev) => ({ ...prev, images: [value] }));
  };

  // FETCH LOCATION BUTTON LOGIC
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
      (err) => {
        alert("Location access denied");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.shopName.trim() || !form.category.trim()) {
      alert("Shop name and category are required");
      return;
    }

    const latNum = Number(form.lat);
    const lngNum = Number(form.lng);

    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      alert("Valid latitude and longitude required");
      return;
    }

    const payload = {
      shopName: form.shopName.trim(),
      category: form.category.trim(),
      phone: form.phone,
      description: form.description,
      openingHours: form.openingHours,
      images: form.images.filter(Boolean),
      address: form.address,
      lat: latNum,
      lng: lngNum,
    };

    setIsSubmitting(true);
    try {
      await updateShopAPI(shopId, payload);
      alert("Shop updated successfully");
      navigate("/provider/dashboard/my-shops");
    } catch (error) {
      console.error(error);
      alert("Update failed");
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
          <h1 className="text-4xl font-light text-gray-900 mb-2">Update Shop</h1>
          <p className="text-gray-600 text-lg">Edit your shop details</p>
        </div>

        {/* FORM */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SHOP INFO */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Store className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Shop Details</h3>
              </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Hours
                  </label>
                  <input
                    name="openingHours"
                    value={form.openingHours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical"
              />
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
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* LOCATION */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Navigation className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Location Coordinates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  value={form.lat}
                  onChange={(e) => setForm((p) => ({ ...p, lat: e.target.value }))}
                  placeholder="Latitude"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <input
                  value={form.lng}
                  onChange={(e) => setForm((p) => ({ ...p, lng: e.target.value }))}
                  placeholder="Longitude"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={loadingLocation || isSubmitting}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loadingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    Fetch Current Location
                  </>
                )}
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-2xl font-medium hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Shop"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/provider/dashboard/my-shops")}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
