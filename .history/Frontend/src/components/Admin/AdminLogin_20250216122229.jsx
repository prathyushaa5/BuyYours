import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctSecretCode = "ADMIN123"; // Change this to your actual secret code

  const handleLogin = () => {
    if (secretCode === correctSecretCode) {
      navigate("/admin-dashboard"); // Redirects to AdminDashboardPage
    } else {
      setError("Invalid Secret Code. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="password"
          placeholder="Enter Secret Code"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
