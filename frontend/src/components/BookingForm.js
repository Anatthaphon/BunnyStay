import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { room: roomId, ...formData };
    const response = await axios.post("http://localhost:5000/book", bookingData);
    alert(response.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📅 จองห้องพัก</h2>
      <label>ชื่อผู้จอง:</label>
      <input type="text" name="name" onChange={handleChange} required />

      <label>วันที่เช็คอิน:</label>
      <input type="date" name="checkInDate" onChange={handleChange} required />

      <label>วันที่เช็คเอาท์:</label>
      <input type="date" name="checkOutDate" onChange={handleChange} required />

      <button type="submit">✅ ยืนยันการจอง</button>
    </form>
  );
};

export default BookingForm;
