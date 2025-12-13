import { useState } from "react";

export default function LocationButton() {
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    });

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ latitude, longitude });
                console.log("Lat:", latitude, "Lng:", longitude);
            },
            (err) => {
                console.error(err);
                alert("Unable to fetch location. Allow permission.");
            }
        );
    };

    return (
        <div className="p-4">
            <button
                onClick={getLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Get Current Location
            </button>

            <div className="mt-3">
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
            </div>
        </div>
    );
}
