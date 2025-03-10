import React, { useEffect, useState } from "react";
import "./BookingHistory.css";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  // ฟังก์ชันดึงข้อมูลการจองจาก API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Guests</th>
              <th>Room Type</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customerName}</td>
                <td>{booking.email}</td>
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
                <td>{booking.guests}</td>
                <td>{booking.roomType}</td>
                <td>{booking.totalPrice} THB</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;
