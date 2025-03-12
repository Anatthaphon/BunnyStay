import React, { useState, useEffect } from "react";
import "./BookingHistory.css";

function BookingHistory({ user }) {
  const [bookings, setBookings] = useState([]);

  // ฟังก์ชันดึงข้อมูลการจองจาก API
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []); // เรียกใช้งานเมื่อ component โหลดครั้งแรก

  // เพิ่มการตรวจสอบว่า user และ bookings ไม่เป็น null ก่อนการเข้าถึงข้อมูล
  if (!user) {
    return <div>Please log in to view your booking history.</div>;
  }

  // ฟังก์ชันสำหรับการแก้ไขข้อมูลการจอง
  const handleEdit = (bookingId) => {
    const updatedBooking = {
      customerName: user.username, 
      email: user.email,
      checkIn: "2025-01-01",
      checkOut: "2025-01-05",
      guests: 2,
      roomType: "Deluxe Room",
      totalPrice: 10000,
    };

    fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => response.json())
      .then(() => {
        fetchBookings();  // เรียกใช้งาน fetchBookings หลังจากแก้ไขข้อมูล
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
      });
  };

  // ฟังก์ชันสำหรับการลบข้อมูลการจอง
  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          fetchBookings();  // เรียกใช้งาน fetchBookings หลังจากลบข้อมูล
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
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
            {bookings
              .filter((booking) => booking.email === user.email) // แสดงข้อมูลเฉพาะของผู้ใช้
              .map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.customerName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.totalPrice} THB</td>
                  <td>
                    <button onClick={() => handleEdit(booking._id)}>Edit</button>
                    <button onClick={() => handleDelete(booking._id)}>Delete</button>
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
