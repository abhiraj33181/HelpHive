import { useEffect, useState } from "react";
import { updateShopAPI, getMyShopsAPI } from "../../services/shopService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Store,
  MapPin,
  ImagePlus,
  Loader2,
  Navigation
} from "lucide-react";

export default function UpdateShop() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (!form) return <p className="p-6">Loading...</p>;

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
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white border-2 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Store className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Update Shop
          </h1>
          <p className="text-gray-600 text-lg">
            Modify your shop details
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white border rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                placeholder="Shop Name"
                className="input"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="input"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="input"
              />
              <input
                name="openingHours"
                value={form.openingHours}
                onChange={handleChange}
                placeholder="Opening Hours"
                className="input"
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Description"
              className="input"
            />

            {/* ADDRESS */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="street"
                value={form.address.street}
                onChange={handleAddressChange}
                placeholder="Street"
                className="input"
              />
              <input
                name="city"
                value={form.address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="input"
              />
              <input
                name="state"
                value={form.address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="input"
              />
              <input
                name="pincode"
                value={form.address.pincode}
                onChange={handleAddressChange}
                placeholder="Pincode"
                className="input"
              />
            </div>

            {/* IMAGE */}
            <input
              value={form.images[0]}
              onChange={(e) => handleImageChange(e.target.value)}
              placeholder="Image URL"
              className="input"
            />

            {/* LOCATION */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={form.lat}
                onChange={(e) =>
                  setForm((p) => ({ ...p, lat: e.target.value }))
                }
                placeholder="Latitude"
                className="input"
              />
              <input
                value={form.lng}
                onChange={(e) =>
                  setForm((p) => ({ ...p, lng: e.target.value }))
                }
                placeholder="Longitude"
                className="input"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Updating...
                </>
              ) : (
                "Update Shop"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* SHARED INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            border-radius: 0.75rem;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
          }
        `}
      </style>
    </div>
  );
}
