import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // เพิ่มการจัดการกับรหัสผ่าน
  const navigate = useNavigate();

  const handleLogin = () => {
    // ตรวจสอบข้อมูลการเข้าสู่ระบบ
    if (username === "admin" && password === "admin123") {
      setUser({ name: "Admin", email: "admin@example.com", isAdmin: true }); // สำหรับ Admin
      navigate("/bookings");
    } else if (username && email) {
      setUser({ name: username, email: email, isAdmin: false }); // สำหรับ User ทั่วไป
      navigate("/bookings");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div>
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
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
