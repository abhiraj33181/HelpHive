import Property from "../models/propertyModel.js";


export const addProperty = async (req, res) => {
    try {
        const {
            title,
            propertyType,
            rent,
            deposit,
            furnishing,
            bedroom,
            bathroom,
            size,
            images,
            description,
            address,
            lat,
            lng
        } = req.body;

        if (!title || !propertyType || !rent || !lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Title, property type, rent, lat & lng are required"
            });
        }

        const property = await Property.create({
            owner: req.provider._id,
            title,
            propertyType,
            rent,
            deposit,
            furnishing,
            bedroom,
            bathroom,
            size,
            description,
            images,
            address,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
        });

        return res.status(201).json({
            success: true,
            message: "Property added successfully",
            property,
        });

    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export const updateProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const updateData = req.body;

        if (updateData.lat && updateData.lng) {
            updateData.location = {
                type: "Point",
                coordinates: [updateData.lng, updateData.lat],
            };
            delete updateData.lat;
            delete updateData.lng;
        }

        const updated = await Property.findOneAndUpdate(
            { _id: propertyId, owner: req.provider._id },
            { $set: updateData },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.json({
            success: true,
            message: "Property updated successfully",
            property: updated,
        });

    } catch (error) {
        console.error("Update Property Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.provider._id });
        res.json({ success: true, properties });
    } catch (error) {
        console.error("Get My Properties Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export const getNearbyProperties = async (req, res) => {
    try {
        const { lat, lng, radius = 5, propertyType } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ success: false, message: "lat and lng required" });
        }

        let filter = {};

        if (propertyType) {
            filter.propertyType = propertyType;
        }

        const properties = await Property.find({
            ...filter,
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius / 6378.1],
                },
            },
        });

        res.json({ success: true, properties });

    } catch (error) {
        console.error("Nearby Property Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
