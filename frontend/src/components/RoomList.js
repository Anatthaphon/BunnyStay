import React, { useState, useEffect } from "react";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then((response) => {
      setRooms(response.data);
    });
  }, []);

  return (
    <div>
      <h2>🏨 เลือกห้องพักของคุณ</h2>
      {rooms.map((room) => (
        <div key={room._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>💰 ราคา: {room.price} บาท</p>
          <a href={`/book/${room._id}`}>จองห้องนี้</a>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
