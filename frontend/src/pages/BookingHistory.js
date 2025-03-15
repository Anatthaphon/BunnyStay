import React, { useState, useEffect } from "react";
import "./BookingHistory.css";

function BookingHistory({ user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings") // เปลี่ยนเป็น API ของคุณ
      .then((res) => res.json())
      .then((data) => {
        if (user?.isAdmin) {
          setBookings(data); // Admin เห็นทุก Booking
        } else {
          setBookings(data.filter((booking) => booking.email === user?.email)); // User เห็นแค่ของตัวเอง
        }
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?")) {
      fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setBookings((prev) => prev.filter((b) => b._id !== id));
          } else {
            console.error("Failed to delete booking");
          }
        })
        .catch((error) => console.error("Error deleting:", error));
    }
  };

  const handleEdit = (id) => {
    const newDate = prompt("กรุณาใส่วันที่ใหม่ (YYYY-MM-DD):");
    if (newDate) {
      fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkIn: newDate }), // อัปเดตวันที่ Check-in
      })
        .then((res) => res.json())
        .then((updatedBooking) => {
          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, checkIn: newDate } : b))
          );
        })
        .catch((error) => console.error("Error updating:", error));
    }
  };

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
              <th>Actions</th>
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
                <td>
                  {(user?.isAdmin || booking.email === user?.email) && (
                    <>
                      <button onClick={() => handleEdit(booking._id)}>Edit</button>
                      <button onClick={() => handleDelete(booking._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;
