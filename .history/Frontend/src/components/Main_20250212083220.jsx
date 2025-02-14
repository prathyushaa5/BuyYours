import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "../style.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left: Swiper Section */}
      <div className="w-[400px] h-[500px] mr-12">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      </div>

      {/* Right: Welcome Text & Buttons */}
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
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
