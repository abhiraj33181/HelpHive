import { useContext, useEffect, useState } from "react";
import { getProviderReviewsAPI } from "../services/reviewService";
import { AppContext } from "../context/AppContext";

export default function ProviderReviews({ providerId }) {

    const { getProviderReviews } = useContext(AppContext)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await getProviderReviews(providerId);
            setReviews(res);
        };
        load();
    }, [providerId]);

    return (
        <div>
            <h3 className="font-bold text-lg mb-2">Reviews</h3>
            {reviews.map(r => (
                <div key={r._id} className="border p-3 mb-2 rounded">
                    <div className="font-semibold">{r.rating} ★</div>
                    <p>{r.message}</p>
                </div>
            ))}
        </div>
    );
}
