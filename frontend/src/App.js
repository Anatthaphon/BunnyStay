import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import RoomList from "./components/RoomList";
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
        <Link to="/rooms">Rooms</Link>
      </nav>
    </header>
  );
}

function Home({ selectedRoom }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/rooms");
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>BunnyStay</h1>
          <p>Prime location creates an unforgettable experience</p>
          <p>พักผ่อนอย่างมีสไตล์ในที่พักสุดเอ็กซ์คลูซีฟ</p>
          {selectedRoom && (
            <p className="selected-room">
              🏨 คุณเลือก: {selectedRoom.name} ({selectedRoom.price})
            </p>
          )}
        </div>
      </section>

      <section className="booking-form">
        <input type="date" placeholder="Check-in" />
        <input type="date" placeholder="Check-out" />
        <select>
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
        </select>
        <button className="book-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </section>
    </div>
  );
}

export default App;
