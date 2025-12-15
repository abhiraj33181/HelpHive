import { useState } from "react";
import { addShopAPI } from "../../services/shopService";

export default function AddShop() {
  const [form, setForm] = useState({
    shopName: "",
    category: "",
    phone: "",
    address: "",
    description: "",
    lat: "",
    lng: ""
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  // Auto Detect Current Location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setForm((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude
        }));

        setLoadingLocation(false);
        alert("Location detected!");
      },
      (err) => {
        console.error(err);
        alert("Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addShopAPI(form);
      alert("Shop added successfully!");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Error adding shop.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Shop</h2>

      <input
        name="shopName"
        value={form.shopName}
        onChange={handleChange}
        placeholder="Shop Name"
        className="border p-2 w-full mb-3"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full mb-3"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border p-2 w-full mb-3"
      />

      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full mb-3"
      ></textarea>

      {/* Latitude + Longitude */}
      <div className="flex gap-3">
        <input
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="Latitude"
          className="border p-2 w-full mb-3"
        />

        <input
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="Longitude"
          className="border p-2 w-full mb-3"
        />
      </div>

      {/* Auto Detect Button */}
      <button
        type="button"
        onClick={detectLocation}
        disabled={loadingLocation}
        className="bg-green-600 text-white px-4 py-2 w-full rounded mb-3"
      >
        {loadingLocation ? "Detecting..." : "Auto Detect Location"}
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Add Shop
      </button>
    </form>
  );
}
