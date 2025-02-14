import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5223/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      onLogin(response.data.token);
      console.log("User logged in");
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-violet-500 text-white">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-violet-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-3 rounded-md shadow-lg font-bold transition-transform transform hover:scale-105 hover:bg-violet-600"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center">
          Don't have an account? {" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-violet-500 font-bold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
