import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5223/api/auth/register", {
        username: name,
        passwordHash: password,
        email,
      });
      setSuccess("Account created successfully.");
      localStorage.setItem("token", response.data.token);
      
      setPassword("");
      setName("");
      setEmail("");
      navigate("/home");
      setError("");
    } catch (err) {
      setError("Signup failed. Please try again.",err);
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3EEEA]">
      <div className="bg-[#EBE3D5] p-6 rounded-lg shadow-lg w-96 text-[#776B5D]">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#B0A695] rounded-md bg-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#B0A695] rounded-md bg-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#B0A695] rounded-md bg-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#B0A695] text-white py-2 rounded-md hover:bg-[#776B5D] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => navigate("/login")}
            className="text-[#776B5D] font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
