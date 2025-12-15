import { useEffect, useState } from "react";
import { getMyShopsAPI } from "../../services/shopService";
import { Link } from "react-router-dom";

export default function MyShop() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const res = await getMyShopsAPI();
                setShops(res.data.shops);
            } catch (error) {
                console.error("Error fetching shops:", error);
                alert("Unable to fetch shops.");
            } finally {
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    if (loading) return <p className="p-4">Loading shops...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Shops</h2>

            {shops.length === 0 && (
                <p className="text-gray-500">No shops added yet.</p>
            )}

            {shops.map((shop) => (
                <div key={shop._id} className="border p-3 mb-3 rounded">
                    <h3 className="font-semibold">{shop.shopName}</h3>  {/* FIXED */}
                    <p>{shop.category}</p>
                    <p>{shop.address.street}</p>

                    <Link
                        to={`/provider/dashboard/update-shop/${shop._id}`}
                        className="text-blue-600 underline"
                    >
                        Edit
                    </Link>
                </div>
            ))}
        </div>
    );
}
