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
      setError("Invalid email or password.",err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3EEEA]">
      <div className="bg-[#EBE3D5] p-6 rounded-lg shadow-lg w-96 text-[#776B5D]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-[#776B5D]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-[#776B5D]"
            required
          />
          <button type="submit" className="w-full bg-[#B0A695] text-white py-2 rounded-md hover:bg-[#776B5D] transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-[#776B5D] hover:underline">
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
