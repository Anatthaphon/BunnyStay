import React, { useState, useEffect } from "react";
import "./BookingHistory.css";

function BookingHistory({ user }) {
  const [bookings, setBookings] = useState([]);
  const roomPrices = { "Deluxe Room": 5000, "Suite Room": 8000, "Presidential Suite": 15000 }; // ราคาห้องพัก

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

  const calculateTotalPrice = (checkIn, checkOut, guests, roomType) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const days = Math.max((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24), 1); // จำนวนวันที่พัก (ไม่น้อยกว่า 1)
    const pricePerNight = roomPrices[roomType] || 5000; // ใช้ราคาของห้อง ถ้าไม่มีให้ใช้ค่าเริ่มต้น
    return days * pricePerNight;
  };

  const handleEdit = (id, booking) => {
    if (!booking) {
      console.error("Booking not found");
      return;
    }

    const newCheckIn = prompt("Check-in Date (YYYY-MM-DD):", booking.checkIn);
    const newCheckOut = prompt("Check-out Date (YYYY-MM-DD):", booking.checkOut);
    const newGuests = parseInt(prompt("Number of Guests:", booking.guests), 10);
    const newRoomType = prompt("Room Type (Deluxe Room, Suite Room, Presidential Suite):", booking.roomType);

    if (newCheckIn && newCheckOut && newGuests && newRoomType) {
      const updatedTotalPrice = calculateTotalPrice(newCheckIn, newCheckOut, newGuests, newRoomType);

      const updatedBooking = {
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        guests: newGuests,
        roomType: newRoomType,
        totalPrice: updatedTotalPrice,
      };

      fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooking),
      })
        .then((res) => res.json())
        .then(() => {
          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, ...updatedBooking } : b))
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
                      <button onClick={() => handleEdit(booking._id, booking)}>Edit</button>
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
