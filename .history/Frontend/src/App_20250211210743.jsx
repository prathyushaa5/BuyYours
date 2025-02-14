import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <div>
      {token ? (
        <h1 className="text-2xl text-center mt-10">Welcome! You are logged in.</h1>
      ) : isLogin ? (
        <Login onLogin={handleLogin} onShowSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onShowLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}
