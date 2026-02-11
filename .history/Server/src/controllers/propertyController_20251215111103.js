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
            location
        } = req.body;

        if (
            !title ||
            !propertyType ||
            !rent ||
            !location ||
            !location.coordinates ||
            location.coordinates.length !== 2
        ) {
            return res.status(400).json({
                success: false,
                message: "Title, property type, rent, lat & lng are required"
            });
        }

        const [lng, lat] = location.coordinates;

        const property = await Property.create({
            owner: req.provider._id,
            title,
            propertyType,
            rent: Number(rent),
            deposit: Number(deposit) || 0,
            furnishing,
            bedroom: Number(bedroom) || 1,
            bathroom: Number(bathroom) || 1,
            size: Number(size) || 0,
            description,
            images,
            address,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
        });

        res.status(201).json({
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

        const latNum = Number(lat);
        const lngNum = Number(lng);

        if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
            return res.status(400).json({
                success: false,
                message: "Valid lat and lng required"
            });
        }

        let filter = {};
        if (propertyType) filter.propertyType = propertyType;

        const properties = await Property.find({
            ...filter,
            location: {
                $geoWithin: {
                    $centerSphere: [[lngNum, latNum], radius / 6378.1],
                },
            },
        });

        res.json({ success: true, properties });

    } catch (error) {
        console.error("Nearby Property Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

