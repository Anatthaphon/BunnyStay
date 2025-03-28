import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // ตรวจสอบข้อมูลการเข้าสู่ระบบ
    if (username === "admin" && email === "admin@bunny.com") {
      setUser({ name: "Admin", email: "admin@bunny.com", isAdmin: true }); // สำหรับ Admin
      navigate("/bookings");
    } else if (username && email) {
      setUser({ name: username, email: email, isAdmin: false }); // สำหรับ User ทั่วไป
      navigate("/bookings");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
