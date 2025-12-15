import { useState } from "react";
import { addShopAPI } from "../../services/shopService";
import { MapPin, Store, Phone, Clock, ImagePlus } from "lucide-react";

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
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
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

    try {
      await addShopAPI(payload);
      alert("Shop added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add shop");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-6"
      >
        {/* HEADER */}
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Store /> Add New Shop
        </h2>

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            placeholder="Shop Name *"
            required
            className="input"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Grocery, Hardware)"
            required
            className="input"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input"
          />

          <input
            name="openingHours"
            value={form.openingHours}
            onChange={handleChange}
            placeholder="Opening Hours (9 AM - 9 PM)"
            className="input"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description about your shop"
          rows={3}
          className="input"
        />

        {/* ADDRESS */}
        <div>
          <h3 className="font-medium mb-2">Address</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="street"
              value={form.address.street}
              onChange={handleAddressChange}
              placeholder="Street / Area"
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
        </div>

        {/* IMAGES */}
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <ImagePlus size={18} /> Shop Images (URLs)
          </h3>

          <input
            value={form.images[0]}
            onChange={(e) => handleImageChange(0, e.target.value)}
            placeholder="Image URL"
            className="input"
          />
        </div>

        {/* LOCATION */}
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <MapPin size={18} /> Location
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={form.lat}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
              placeholder="Latitude"
              className="input"
            />
            <input
              value={form.lng}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
              placeholder="Longitude"
              className="input"
            />
          </div>

          <button
            type="button"
            onClick={detectLocation}
            disabled={loadingLocation}
            className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <MapPin size={14} />
            {loadingLocation ? "Detecting location..." : "Auto-detect location"}
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Add Shop
        </button>
      </form>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            padding: 0.6rem 0.75rem;
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
