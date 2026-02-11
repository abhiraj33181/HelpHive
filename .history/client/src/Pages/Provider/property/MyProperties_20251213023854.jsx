import { useEffect, useState } from "react";
import { getMyPropertiesAPI } from "../../../services/propertyService";
import { Link } from "react-router-dom";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMyPropertiesAPI();
        setProperties(res.data.properties);
      } catch (err) {
        console.error(err);
        alert("Failed to load properties");
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Properties</h2>

      {properties.length === 0 && <p>No properties added yet.</p>}

      {properties.map((p) => (
        <div key={p._id} className="border p-3 rounded mb-3">
          <h3 className="font-bold">{p.title}</h3>
          <p>Type: {p.propertyType}</p>
          <p>Rent: ₹{p.rent}</p>

          <Link to={`/provider/dashboard/update-property/${p._id}`} className="text-blue-600 underline">
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}
