import { useEffect, useState } from "react";
import {
  getMyPropertiesAPI,
  updatePropertyAPI,
} from "../../../services/propertyService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Loader2,
} from "lucide-react";

export default function UpdateProperty() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FETCH PROPERTY
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getMyPropertiesAPI();
        const property = res.data.properties.find(
          (p) => p._id === propertyId
        );

        if (!property) {
          alert("Property not found");
          return;
        }

        setForm({
          title: property.title || "",
          propertyType: property.propertyType || "",
          rent: property.rent || "",
          deposit: property.deposit || "",
          furnishing: property.furnishing || "Unfurnished",
          bedroom: property.bedroom || 1,
          bathroom: property.bathroom || 1,
          size: property.size || "",
          description: property.description || "",
          images: property.images?.length ? [property.images[0]] : [""],
          address: {
            street: property.address?.street || "",
            city: property.address?.city || "",
            state: property.address?.state || "",
            pincode: property.address?.pincode || "",
          },
          lat: property.location?.coordinates?.[1]?.toString() || "",
          lng: property.location?.coordinates?.[0]?.toString() || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load property");
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!form) return <p className="p-6">Loading...</p>;

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      address: { ...p.address, [name]: value },
    }));
  };

  const handleImageChange = (value) => {
    setForm((p) => ({ ...p, images: [value] }));
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
      lat: latNum,
      lng: lngNum,
    };

    setIsSubmitting(true);
    try {
      await updatePropertyAPI(propertyId, payload);
      alert("Property updated successfully");
      navigate("/provider/dashboard/my-properties");
    } catch (err) {
      console.error(err);
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
          <div className="w-16 h-16 bg-white border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Home className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Update Property
          </h1>
          <p className="text-gray-600 text-lg">
            Edit your property details
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
              placeholder="Property Title"
              className="input"
            />

            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="input"
            >
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
                placeholder="Monthly Rent"
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
                "Update Property"
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
