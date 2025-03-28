import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("Deluxe Room");
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");

  const roomRates = {
    "Deluxe Room": 5000,
    "Suite Room": 8000,
    "Presidential Suite": 15000,
  };

  const calculatePrice = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); //(1000 * 60 * 60 * 24) = 86,400,000 มิลลิวินาที (เท่ากับ 1 วัน)

    if (nights <= 0) {
      alert("Check-out date must be after Check-in date.");
      return;
    }

    const price = nights * roomRates[roomType];
    setTotalPrice(price);
  };
// ฟังก์ชันส่งข้อมูลการจองไปยังเซิร์ฟเวอร์
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      customerName,
      email,
      checkIn,
      checkOut,
      guests,
      roomType,
      totalPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact & Booking</h1>
        <p>Reserve your luxury stay with us.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Our Address</h2>
          <p>BunnyStay Hotel, Chonburi</p>
          <p>199 หมู่ที่ 6 Amphoe Si Racha, Chang Wat Chon Buri 20230, Thailand</p>
          <h2>Phone</h2>
          <p>038 354 580</p>
          <h2>Email</h2>
          <p>prsrc@ku.th</p>
        </div>

        <div className="contact-form">
          <h2>Book a Room</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Check-in Date:</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />

            <label>Check-out Date:</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />

            <label>Guests:</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>

            <label>Room Type:</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="Deluxe Room">Deluxe Room - ฿5,000/night</option>
              <option value="Suite Room">Suite Room - ฿8,000/night</option>
              <option value="Presidential Suite">Presidential Suite - ฿15,000/night</option>
            </select>

            <button type="button" className="calculate-btn" onClick={calculatePrice}>
              Calculate Price
            </button>

            {totalPrice > 0 && (
              <div className="total-price">
                <h3>Total Price: ฿{totalPrice.toLocaleString()}</h3>
              </div>
            )}

            <button type="submit" className="send-btn">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

