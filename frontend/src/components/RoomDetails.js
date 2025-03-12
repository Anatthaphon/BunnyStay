import React from "react";
import { useLocation } from "react-router-dom";
import "./RoomDetails.css"; // Import the CSS file

function RoomDetails() {
  const location = useLocation();
  const { room } = location.state;

  return (
    <div className="room-details">
      <h2>{room.name}</h2>
      <img src={room.photo} alt={room.name} className="room-photo" />
      <p>Price: {room.price}</p>
      <p>{room.description}</p>
      {/* Add more room details here */}
      <img src="/images/hotel-photo.jpg" alt="Hotel" className="hotel-photo" /> {/* Add this line */}
    </div>
  );
}

export default RoomDetails;