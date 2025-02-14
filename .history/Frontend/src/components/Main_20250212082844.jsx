import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "../style.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Swiper Section */}
      <div className="w-72 mb-6">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {Array.from({ length: 9 }, (_, i) => (
            <SwiperSlide key={i}>Slide {i + 1}</SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Welcome to My Website
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Get started by signing up or logging in.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
