import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login"; // นำเข้าไฟล์ Login สำหรับเข้าสู่ระบบ
import RoomList from "./components/RoomList"; // นำเข้าหน้ารายการห้องพัก
import Contact from "./pages/Contact"; // นำเข้าหน้าติดต่อ/จองห้องพัก
import BookingHistory from "./pages/BookingHistory"; // นำเข้าประวัติการจองห้องพัก
import RoomDetails from "./components/RoomDetails"; // นำเข้าหน้ารายละเอียดห้องพัก
import "./App.css"; // นำเข้าไฟล์ CSS สำหรับตกแต่งเว็บ

function App() {
  // สร้าง state เก็บห้องที่ถูกเลือก
  const [selectedRoom, setSelectedRoom] = useState(null);

  // สร้าง state เก็บข้อมูลผู้ใช้ (เช่น บัญชีที่ล็อกอิน)
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Header /> {/* แสดง Header */}
        <Routes>
          {/* เส้นทางหน้าหลัก */}
          <Route path="/" element={<Home selectedRoom={selectedRoom} />} />

          {/* เส้นทางไปหน้ารายการห้องพัก และส่งฟังก์ชัน setSelectedRoom ไปด้วย */}
          <Route path="/rooms" element={<RoomList setSelectedRoom={setSelectedRoom} />} />

          {/* เส้นทางไปหน้าติดต่อ (ใช้เป็นหน้าจองห้องพัก) */}
          <Route path="/contact" element={<Contact />} />

          {/* เส้นทางไปหน้าประวัติการจอง ถ้ายังไม่ล็อกอินให้ไปหน้า Login */}
          <Route
            path="/bookings"
            element={user ? <BookingHistory user={user} /> : <Login setUser={setUser} />}
          />

          {/* เส้นทางไปหน้าเข้าสู่ระบบ โดยส่งฟังก์ชัน setUser เพื่ออัปเดตข้อมูลผู้ใช้ */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* เส้นทางไปหน้ารายละเอียดห้องพัก */}
          <Route path="/room-details" element={<RoomDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

// ฟังก์ชัน Header แสดงแถบเมนูด้านบน
function Header() {
  return (
    <header className="header">
      <h1 className="logo">BunnyStay</h1> {/* แสดงโลโก้หรือชื่อเว็บ */}
      <nav className="navbar">
        {/* ลิงก์ไปยังแต่ละหน้า */}
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms & Suites</Link>
        <Link to="/contact">Booking</Link>
        <Link to="/bookings">Booking History</Link>
      </nav>
    </header>
  );
}

// ฟังก์ชัน Home เป็นหน้าแรกของเว็บ
function Home({ selectedRoom }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BunnyStay</h1>
          <p>Prime location creates an unforgettable experience</p>

         
          

          {/* ปุ่มลิงก์ไปหน้าจองห้องพัก */}
          <Link to="/contact" className="book-btn">Booking Now</Link>
        </div>
      </section>
    </div>
  );
}

export default App;
