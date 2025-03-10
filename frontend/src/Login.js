import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // ตรวจสอบชื่อผู้ใช้และรหัสผ่าน
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      navigate("/bookings"); // หากเป็น admin ให้ไปที่หน้า BookingHistory
    } else {
      setIsAdmin(false);
      navigate("/"); // ถ้าไม่ใช่ admin ให้ไปที่หน้า Home
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
