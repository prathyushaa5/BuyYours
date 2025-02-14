import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {token ? (
        <h1 className="text-center text-3xl mt-10">Welcome! 🎉</h1>
      ) : showSignup ? (
        <Signup onSignupSuccess={() => setShowSignup(false)} />
      ) : (
        <Login onLogin={(token) => setToken(token)} onShowSignup={() => setShowSignup(true)} />
      )}
    </div>
  );
}
