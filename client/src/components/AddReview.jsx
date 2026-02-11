import { useContext, useState } from "react";
import { addReviewAPI } from "../services/reviewService";
import { AppContext } from "../context/AppContext";

export default function AddReview({ appointment }) {
    const {addReview} = useContext(AppContext)
  if (!appointment.isCompleted) return null;

  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="p-3 border">
      <h3 className="font-bold">Add Review</h3>
      <select value={rating} onChange={e=>setRating(e.target.value)} className="border p-1 w-full my-2">
        {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
      </select>
      <textarea value={msg} onChange={e=>setMsg(e.target.value)} className="border p-1 w-full" placeholder="Write review..." />
      <button onClick={() => addReview(appointment, rating, title, msg)} className="bg-blue-500 text-white px-4 py-1 mt-2 rounded">Submit</button>
    </div>
  );
}
