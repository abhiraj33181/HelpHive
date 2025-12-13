import Shop from "../models/shopModel.js";


export const addShop = async (req, res) => {
    try {
        const { shopName, category, phone, address, description, lat, lng, openingHours } = req.body;

        if (!shopName || !category || !lat || !lng) {
            return res.status(400).json({ success: false, message: "Shop name, category, lat & lng are required" });
        }

        const shop = await Shop.create({
            owner: req.provider._id,
            shopName,
            category,
            phone,
            description,
            address,
            openingHours,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
        });

        return res.status(201).json({
            success: true,
            message: "Shop added successfully",
            shop,
        });
    } catch (error) {
        console.error("Shop Add Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const updateShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const updateData = req.body;

        if (updateData.lat && updateData.lng) {
            updateData.location = {
                type: "Point",
                coordinates: [updateData.lng, updateData.lat],
            };
            delete updateData.lat;
            delete updateData.lng;
        }

        const updated = await Shop.findOneAndUpdate(
            { _id: shopId, owner: req.provider._id },
            { $set: updateData },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Shop not found" });
        }

        res.json({ success: true, message: "Shop updated successfully", shop: updated });
    } catch (error) {
        console.error("Shop Update Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getMyShops = async (req, res) => {
    try {
        const shops = await Shop.find({ owner: req.provider._id });
        res.json({ success: true, shops });
    } catch (error) {
        console.error("Get My Shops Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getNearbyShops = async (req, res) => {
    try {
        const { lat, lng, radius = 5, category } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ success: false, message: "lat and lng required" });
        }

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const shops = await Shop.find({
            ...filter,
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius / 6378.1],
                },
            },
        });

        res.json({ success: true, shops });
    } catch (error) {
        console.error("Nearby Shops Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
