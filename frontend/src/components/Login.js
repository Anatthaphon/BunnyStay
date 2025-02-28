import { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", res.data.token);
      onLogin(true);
    } catch (error) {
      alert("❌ Login ล้มเหลว! กรุณาลองใหม่");
    }
  };
  return (
    <div>
      <h2>🔒 Login เพื่อเข้าถึงเว็บ</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
