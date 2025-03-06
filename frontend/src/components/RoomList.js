import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoomList.css"; // ใช้ไฟล์ CSS เพื่อให้ BG เหมือนหน้า Home

const rooms = [
  { id: 1, name: "Deluxe Room", price: "2,500 THB/night" },
  { id: 2, name: "Superior Room", price: "3,200 THB/night" },
  { id: 3, name: "Suite Room", price: "5,000 THB/night" },
];

function RoomList({ setSelectedRoom }) {
  const navigate = useNavigate();

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    navigate("/"); // กลับไปที่หน้า Home
  };

  return (
    <div className="room-list">
      <h2>Select Your Room</h2>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.name}</h3>
            <p>{room.price}</p>
            <button className="book-btn" onClick={() => handleSelectRoom(room)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
