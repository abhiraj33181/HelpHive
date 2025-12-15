import { useEffect, useState } from "react";
import { getMyPropertiesAPI, updatePropertyAPI } from "../../../services/propertyService";
import { useParams } from "react-router-dom";

export default function UpdateProperty() {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const res = await getMyPropertiesAPI();
            const found = res.data.properties.find((p) => p._id === propertyId);
            setProperty(found);
        };
        fetchProperty();
    }, [propertyId]);

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await updatePropertyAPI(propertyId, property);
            alert("Property updated!");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    if (!property) return <p>Loading...</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Update Property</h2>

            <input name="title" value={property.title} onChange={handleChange} className="border p-2 w-full mb-3" />
            <input name="propertyType" value={property.propertyType} onChange={handleChange} className="border p-2 w-full mb-3" />
            <input name="rent" value={property.rent} onChange={handleChange} className="border p-2 w-full mb-3" />

            <input name="address" value={property.address} onChange={handleChange} className="border p-2 w-full mb-3" />

            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
                Update
            </button>
        </div>
    );
}
