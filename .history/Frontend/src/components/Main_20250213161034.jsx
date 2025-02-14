import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "../style.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      {/* Left: Swiper Section */}
      <div className="w-[300px] h-[400px] mr-12"> {/* Increased card size */}
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://via.placeholder.com/300x400" alt="Slide 1" className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://via.placeholder.com/300x400" alt="Slide 2" className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://via.placeholder.com/300x400" alt="Slide 3" className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://via.placeholder.com/300x400" alt="Slide 4" className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://via.placeholder.com/300x400" alt="Slide 5" className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Right: Welcome Text & Buttons */}
      <div className="flex flex-col items-start ml-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to My Website
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Get started by signing up or logging in.
        </p>

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
    </div>
  );
}
