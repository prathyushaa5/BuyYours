import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "../style.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-pink-200 py-4 flex justify-between px-6 shadow-md">
        <h1 className="text-2xl font-bold text-pink-600">Creation Club</h1>
        <ul className="flex space-x-6">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">New In</li>
          <li className="cursor-pointer">Shop</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center justify-center py-12 px-8 space-x-12">
        {/* Swiper */}
        <div className="w-[350px] h-[450px]">
          <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
            <SwiperSlide><img src="https://via.placeholder.com/350x450" alt="Slide 1" className="w-full h-full object-cover rounded-lg" /></SwiperSlide>
            <SwiperSlide><img src="https://via.placeholder.com/350x450" alt="Slide 2" className="w-full h-full object-cover rounded-lg" /></SwiperSlide>
            <SwiperSlide><img src="https://via.placeholder.com/350x450" alt="Slide 3" className="w-full h-full object-cover rounded-lg" /></SwiperSlide>
          </Swiper>
        </div>

        {/* Login/Signup Box */}
        <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Login or Sign Up to explore our store</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 mb-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-6 my-12">
        <div className="bg-yellow-400 p-8 rounded-lg text-white text-center text-xl font-bold">NEW</div>
        <div className="bg-red-400 p-8 rounded-lg text-white text-center text-xl font-bold">BEST SELLERS</div>
        <div className="bg-teal-400 p-8 rounded-lg text-white text-center text-xl font-bold">SALE</div>
        <div className="bg-pink-400 p-8 rounded-lg text-white text-center text-xl font-bold">LOVED</div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-teal-200 w-full py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Subscribe</h2>
        <p className="mt-2">Be the first to know about new collections and exclusive offers.</p>
        <input type="email" placeholder="Enter your email" className="mt-4 p-3 w-1/2 rounded-lg text-gray-800" />
        <button className="ml-4 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Subscribe</button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-pink-300 py-6 text-center text-white mt-12">
        <h2 className="text-2xl font-bold">Shop With Us</h2>
        <p className="text-sm">We ❤️ You!</p>
      </footer>
    </div>
  );
}
