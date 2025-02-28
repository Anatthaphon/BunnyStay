import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // ถ้ามี token แสดงว่า login แล้ว
  }, []);

  return (
    <Router>
      <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
    </Router>
  );
};

export default App;
