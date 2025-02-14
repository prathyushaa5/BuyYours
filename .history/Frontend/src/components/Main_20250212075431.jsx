import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Website</h1>
      <p className="mb-4 text-gray-600">Get started by signing up or logging in.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
