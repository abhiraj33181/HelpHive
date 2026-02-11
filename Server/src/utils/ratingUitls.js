import Review from "../models/reviewModel.js";
import Provider from "../models/providerModel.js";

export async function recalcProviderRating(providerId) {
    const agg = await Review.aggregate([
        { $match: { providerId } },
        { $group: { _id: "$providerId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    const data = agg[0];

    const update = {
        averageRating: data ? parseFloat(data.avgRating.toFixed(2)) : 0,
        ratingsCount: data ? data.count : 0
    };

    await Provider.findByIdAndUpdate(providerId, update);
}
