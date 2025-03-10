import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RoomList from "./components/RoomList";
import Contact from "./pages/Contact"; // นำเข้าหน้า Contact
import BookingHistory from "./pages/BookingHistory";
import "./App.css"; // นำเข้าไฟล์ CSS

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home selectedRoom={selectedRoom} />} />
          <Route path="/rooms" element={<RoomList setSelectedRoom={setSelectedRoom} />} />
          <Route path="/contact" element={<Contact />} /> {/* เพิ่มหน้า Contact */}
          <Route path="/bookings" element={<BookingHistory />} /> {/* เพิ่มเส้นทางใหม่ */}
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="logo">BunnyStay</h1>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms & Suites</Link>
        <Link to="/contact">Booking</Link>
        <Link to="/bookings">Booking History</Link> {/* ลิงก์ไปยัง Booking History */}
      </nav>
    </header>
  );
}

function Home({ selectedRoom }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BunnyStay</h1>
          <p>Prime location create an unforgettable experience</p>
          {selectedRoom && (
            <p className="selected-room">
              🏨 You selected: {selectedRoom.name} ({selectedRoom.price})
            </p>
          )}
          <Link to="/contact" className="book-btn">Booking Now</Link>
        </div>
      </section>
    </div>
  );
}

export default App;
