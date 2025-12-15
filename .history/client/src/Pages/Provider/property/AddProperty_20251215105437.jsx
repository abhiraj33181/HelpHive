import { useState } from "react";
import { addPropertyAPI } from "../../../services/propertyService";
import {
  Home,
  MapPin,
  Loader2,
  Navigation,
  ImagePlus,
} from "lucide-react";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    propertyType: "",
    rent: "",
    deposit: "",
    furnishing: "Unfurnished",
    bedroom: 1,
    bathroom: 1,
    size: "",
    description: "",
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

  // BASIC CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // ADDRESS CHANGE
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      address: { ...p.address, [name]: value },
    }));
  };

  // IMAGE
  const handleImageChange = (value) => {
    setForm((p) => ({ ...p, images: [value] }));
  };

  // LOCATION
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((p) => ({
          ...p,
          lat: pos.coords.latitude.toString(),
          lng: pos.coords.longitude.toString(),
        }));
        setLoadingLocation(false);
      },
      () => {
        alert("Allow location permission");
        setLoadingLocation(false);
      }
    );
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.propertyType || !form.rent) {
      alert("Title, property type and rent are required");
      return;
    }

    const latNum = Number(form.lat);
    const lngNum = Number(form.lng);

    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
      alert("Valid latitude & longitude required");
      return;
    }

    const payload = {
      title: form.title.trim(),
      propertyType: form.propertyType,
      rent: Number(form.rent),
      deposit: Number(form.deposit) || 0,
      furnishing: form.furnishing,
      bedroom: Number(form.bedroom),
      bathroom: Number(form.bathroom),
      size: Number(form.size) || 0,
      description: form.description,
      images: form.images.filter(Boolean),
      address: form.address,
      location: {
        type: "Point",
        coordinates: [lngNum, latNum],
      },
    };

    setIsSubmitting(true);
    try {
      await addPropertyAPI(payload);
      alert("Property added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Home className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Add Property
          </h1>
          <p className="text-gray-600 text-lg">
            List your rental property
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white border rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC */}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Property Title *"
              className="input"
            />

            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Property Type *</option>
              <option>Apartment</option>
              <option>Flat</option>
              <option>Room</option>
              <option>House</option>
              <option>PG</option>
            </select>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="rent"
                value={form.rent}
                onChange={handleChange}
                placeholder="Monthly Rent *"
                className="input"
              />
              <input
                name="deposit"
                value={form.deposit}
                onChange={handleChange}
                placeholder="Deposit"
                className="input"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <select
                name="furnishing"
                value={form.furnishing}
                onChange={handleChange}
                className="input"
              >
                <option>Unfurnished</option>
                <option>Semi-Furnished</option>
                <option>Furnished</option>
              </select>

              <input
                name="bedroom"
                value={form.bedroom}
                onChange={handleChange}
                placeholder="Bedrooms"
                className="input"
              />

              <input
                name="bathroom"
                value={form.bathroom}
                onChange={handleChange}
                placeholder="Bathrooms"
                className="input"
              />
            </div>

            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Size (sq.ft)"
              className="input"
            />

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

            <button
              type="button"
              onClick={detectLocation}
              disabled={loadingLocation}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              {loadingLocation ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              Use my location
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Creating...
                </>
              ) : (
                "Add Property"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* INPUT STYLE */}
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
