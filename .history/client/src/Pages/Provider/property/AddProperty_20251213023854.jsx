import { useState } from "react";
import { addPropertyAPI } from "../../../services/propertyService";

export default function AddProperty() {
    const [form, setForm] = useState({
        title: "",
        propertyType: "",
        rent: "",
        deposit: "",
        furnishing: "",
        bedroom: "",
        bathroom: "",
        size: "",
        description: "",
        address: "",
        images: [],
        lat: "",
        lng: ""
    });

    const [loadingLocation, setLoadingLocation] = useState(false);

    // Detect location
    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported!");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setForm((prev) => ({
                    ...prev,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }));
                setLoadingLocation(false);
            },
            (err) => {
                console.error(err);
                alert("Allow location permission.");
                setLoadingLocation(false);
            }
        );
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPropertyAPI(form);
            alert("Property added successfully!");
        } catch (err) {
            console.error(err);
            alert("Error adding property");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add Property</h2>

            <input name="title" onChange={handleChange} value={form.title} placeholder="Title" className="border p-2 w-full mb-3" />
            <input name="propertyType" onChange={handleChange} value={form.propertyType} placeholder="Property Type" className="border p-2 w-full mb-3" />
            <input name="rent" onChange={handleChange} value={form.rent} placeholder="Rent" className="border p-2 w-full mb-3" />
            <input name="deposit" onChange={handleChange} value={form.deposit} placeholder="Deposit" className="border p-2 w-full mb-3" />
            <input name="furnishing" onChange={handleChange} value={form.furnishing} placeholder="Furnishing" className="border p-2 w-full mb-3" />
            <input name="bedroom" onChange={handleChange} value={form.bedroom} placeholder="Bedrooms" className="border p-2 w-full mb-3" />
            <input name="bathroom" onChange={handleChange} value={form.bathroom} placeholder="Bathrooms" className="border p-2 w-full mb-3" />
            <input name="size" onChange={handleChange} value={form.size} placeholder="Size in sqft" className="border p-2 w-full mb-3" />

            <textarea name="description" onChange={handleChange} value={form.description} placeholder="Description" className="border p-2 w-full mb-3" />

            <input name="address" onChange={handleChange} value={form.address} placeholder="Address" className="border p-2 w-full mb-3" />

            {/* Lat & Lng */}
            <div className="flex gap-3">
                <input name="lat" onChange={handleChange} value={form.lat} placeholder="Latitude" className="border p-2 w-full mb-3" />
                <input name="lng" onChange={handleChange} value={form.lng} placeholder="Longitude" className="border p-2 w-full mb-3" />
            </div>

            <button
                type="button"
                disabled={loadingLocation}
                onClick={detectLocation}
                className="bg-green-600 text-white px-4 py-2 rounded w-full mb-3"
            >
                {loadingLocation ? "Detecting..." : "Auto Detect Location"}
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Add Property
            </button>
        </form>
    );
}
