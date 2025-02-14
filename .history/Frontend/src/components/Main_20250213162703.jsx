import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fef6f7] min-h-screen text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-pink-500">creation club</h1>
        <nav className="space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Let's Shop New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-6">Shop the latest trends and bestsellers now.</p>
        <button className="px-6 py-3 bg-yellow-500 text-white text-lg font-bold rounded-lg hover:bg-yellow-600 transition">
          Shop Now
        </button>
      </section>

      {/* Category Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8">
        {['NEW', 'Best Sellers', 'Sale', 'The Ones We Love'].map((text, index) => (
          <div key={index} className="p-8 text-center bg-white shadow-md rounded-lg text-xl font-bold">
            {text}
          </div>
        ))}
      </section>

      {/* Subscribe Section */}
      <section className="bg-teal-200 text-center py-12 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe</h2>
        <p className="text-lg text-gray-700 mb-4">Be the first to know about new collections and exclusive offers.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 w-1/2 max-w-md border border-gray-300 rounded-lg"
        />
        <button className="ml-3 px-5 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
          Subscribe
        </button>
      </section>
    </div>
  );
}
