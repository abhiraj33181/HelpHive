import { useEffect, useState } from "react";
import { updateShopAPI, getMyShopsAPI } from "../../services/shopService";
import { useParams } from "react-router-dom";

export default function UpdateShop() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getMyShopsAPI();
        const found = res.data.shops.find((s) => s._id === shopId);
        setShop(found);
      } catch (err) {
        console.error(err);
        alert("Failed to load shop.");
      }
    };
    fetchShop();
  }, [shopId]);

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateShopAPI(shopId, shop);
      alert("Shop updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  if (!shop) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Shop</h2>

      <input
        name="shopName"
        value={shop.shopName}
        onChange={handleChange}
        placeholder="Shop Name"
        className="border p-2 w-full mb-3"
      />

      <input
        name="category"
        value={shop.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full mb-3"
      />

      <input
        name="address"
        value={shop.address}
        onChange={handleChange}
        placeholder="Address"
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
