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
    Navigation,
    ImagePlus,
    BedDouble,
    Bath,
    IndianRupee,
    Building2,
    Phone,
    X
} from "lucide-react";
import { toast } from "react-toastify";

export default function UpdateProperty() {
    const { propertyId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);

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
                    navigate("/provider/dashboard/my-properties");
                    return;
                }

                setForm({
                    title: property.title || "",
                    propertyType: property.propertyType || "",
                    rent: property.rent?.toString() || "",
                    deposit: property.deposit?.toString() || "",
                    furnishing: property.furnishing || "Unfurnished",
                    bedroom: property.bedroom || 1,
                    bathroom: property.bathroom || 1,
                    size: property.size?.toString() || "",
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
    }, [propertyId, navigate]);

    if (!form) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="flex items-center gap-3 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Loading property...</span>
                </div>
            </div>
        );
    }

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

    // LOCATION DETECTION
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
            lat: latNum,
            lng: lngNum,
        };

        setIsSubmitting(true);
        try {
            await updatePropertyAPI(propertyId, payload);
            toast.success("Property updated successfully");
            navigate("/provider/dashboard/my-property");
        } catch (err) {
            console.error(err);
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
                    <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <Home className="w-10 h-10 text-gray-700" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-3">
                        Update Property
                    </h1>
                    <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                        Modify your rental listing details
                    </p>
                </div>

                {/* FORM */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 lg:p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* PROPERTY INFO */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Building2 className="w-6 h-6 text-gray-500" />
                                <h3 className="text-xl font-medium text-gray-900">Property Details</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Property Title *
                                    </label>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" />
                                            Property Type *
                                        </label>
                                        <select
                                            name="propertyType"
                                            value={form.propertyType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                                        >
                                            <option value="">Select Property Type</option>
                                            <option>Apartment</option>
                                            <option>Flat</option>
                                            <option>Room</option>
                                            <option>House</option>
                                            <option>PG</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                            <IndianRupee className="w-4 h-4" />
                                            Furnishing
                                        </label>
                                        <select
                                            name="furnishing"
                                            value={form.furnishing}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                                        >
                                            <option>Unfurnished</option>
                                            <option>Semi-Furnished</option>
                                            <option>Furnished</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PRICING & SPECS */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <IndianRupee className="w-6 h-6 text-emerald-600" />
                                <h3 className="text-xl font-medium text-gray-900">Pricing & Specifications</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Monthly Rent *
                                    </label>
                                    <input
                                        name="rent"
                                        type="number"
                                        value={form.rent}
                                        onChange={handleChange}
                                        required
                                        placeholder="25000"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Deposit
                                    </label>
                                    <input
                                        name="deposit"
                                        type="number"
                                        value={form.deposit}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                                <div className="md:col-span-2 lg:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Size (sq.ft)
                                    </label>
                                    <input
                                        name="size"
                                        type="number"
                                        value={form.size}
                                        onChange={handleChange}
                                        placeholder="1200"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2 justify-center md:justify-start">
                                        <BedDouble className="w-4 h-4" />
                                        Bedrooms
                                    </label>
                                    <input
                                        name="bedroom"
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={form.bedroom}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg text-center placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2 justify-center md:justify-start">
                                        <Bath className="w-4 h-4" />
                                        Bathrooms
                                    </label>
                                    <input
                                        name="bathroom"
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={form.bathroom}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg text-center placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Update your property description..."
                                className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-vertical"
                            />
                        </div>

                        {/* ADDRESS */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin className="w-6 h-6 text-gray-500" />
                                <h3 className="text-xl font-medium text-gray-900">Address</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    name="street"
                                    value={form.address.street}
                                    onChange={handleAddressChange}
                                    placeholder="Street / Area"
                                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                />
                                <input
                                    name="city"
                                    value={form.address.city}
                                    onChange={handleAddressChange}
                                    placeholder="City"
                                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                />
                                <input
                                    name="state"
                                    value={form.address.state}
                                    onChange={handleAddressChange}
                                    placeholder="State"
                                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                />
                                <input
                                    name="pincode"
                                    value={form.address.pincode}
                                    onChange={handleAddressChange}
                                    placeholder="Pincode (6 digits)"
                                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                />
                            </div>
                        </div>

                        {/* IMAGE */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <ImagePlus className="w-6 h-6 text-gray-500" />
                                <label className="block text-sm font-semibold text-gray-700">
                                    Property Image URL
                                </label>
                            </div>
                            <input
                                value={form.images[0]}
                                onChange={(e) => handleImageChange(e.target.value)}
                                placeholder="https://example.com/property-image.jpg"
                                className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>

                        {/* LOCATION */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Navigation className="w-6 h-6 text-gray-500" />
                                <h3 className="text-xl font-medium text-gray-900">Location Coordinates</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        value={form.lat}
                                        onChange={(e) => setForm((p) => ({ ...p, lat: e.target.value }))}
                                        placeholder="28.6139"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        value={form.lng}
                                        onChange={(e) => setForm((p) => ({ ...p, lng: e.target.value }))}
                                        placeholder="77.2090"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={detectLocation}
                                disabled={loadingLocation || isSubmitting}
                                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-50 border-2 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 rounded-2xl font-medium transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingLocation ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Detecting Location...
                                    </>
                                ) : (
                                    <>
                                        <MapPin className="w-5 h-5" />
                                        Update with Current Location
                                    </>
                                )}
                            </button>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4 pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-gray-900 text-white py-5 px-8 rounded-3xl font-semibold text-lg hover:bg-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Updating Property...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/provider/dashboard/my-properties")}
                                className="flex-1 bg-gray-100 text-gray-700 py-5 px-8 rounded-3xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
