import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoomList.css"; // ใช้ไฟล์ CSS เพื่อให้ BG เหมือนหน้า Home

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    price: "5,000 THB/night",
    photo: "/images/deluxeroom.jpg", // Ensure this path is correct
    description: "A luxurious room with all the amenities you need for a comfortable stay.",
  },
  {
    id: 2,
    name: "Suite Room",
    price: "8,000 THB/night",
    photo: "/images/suite-room.jpg", // Update this path as needed
    description: "A spacious suite with a separate living area and stunning views.",
  },
  {
    id: 3,
    name: "Presidential Suite",
    price: "15,000 THB/night",
    photo: "/images/presidential-suite.jpg", // Update this path as needed
    description: "The ultimate in luxury, with a private balcony and personalized service.",
  },
];

function RoomList({ setSelectedRoom }) {
  const navigate = useNavigate();

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    navigate("/room-details", { state: { room } }); // Navigate to RoomDetails page with room details
  };

  return (
    <div className="room-list">
      <h2>Select Your Room</h2>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <img src={room.photo} alt={room.name} className="room-photo" /> {/* แสดงรูปห้อง */}
            <p>{room.price}</p>
            <button className="book-btn" onClick={() => handleSelectRoom(room)}>
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
