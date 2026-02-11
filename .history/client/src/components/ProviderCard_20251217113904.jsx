import { useNavigate } from "react-router-dom";
import "./provider.css"; // your CSS file

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <div
      className="provider-card"
      onClick={() => navigate(`/appointment/${provider._id}`)}
    >
      <h2>{provider.name}</h2>

      <p>
        <strong>Service:</strong>{" "}
        {provider.service.replace("_", " ")}
      </p>

      <p>
        <strong>Location:</strong> {provider.location}
      </p>

      <p className="rating-section">
        <span className="stars">
          {"★".repeat(Math.round(provider.rating))}
          {"☆".repeat(5 - Math.round(provider.rating))}
        </span>
        {provider.rating}/5
      </p>

      <p>
        <strong>Visit Fee:</strong> ₹ {provider.fee}
      </p>

      <p>
        <strong>Contact:</strong> {provider.contact}
      </p>

      <button
        className="view-profile-btn"
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          navigate(`/provider/${provider._id}`);
        }}
      >
        View Profile
      </button>
    </div>
  );
};

export default ProviderCard;
