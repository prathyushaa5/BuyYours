import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

export default function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <Router>
      <Routes>
        {/* Show Main page first */}
        <Route path="/" element={<Main />} />

        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup onLogin={setToken} />} />

        {/* Home Page (Protected) */}
        <Route path="/home" element={token ? <Home /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}
