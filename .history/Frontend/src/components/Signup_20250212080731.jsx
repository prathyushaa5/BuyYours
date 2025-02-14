import  { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
            email
          });
          
      console.log(response)

      setSuccess("Account created successfully. Please log in.");
      setPassword("");
      setName("");
      setEmail("");
      navigate("/home")
      setError("");
    } catch (err) {
      setError(err);
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button onClick={()=>navigate("/login") }className="text-blue-500 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
Signup.propTypes = {
  onShowLogin: PropTypes.func.isRequired,
};

export default Signup;
