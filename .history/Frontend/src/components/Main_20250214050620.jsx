import image1 from "../assets/cards/hanger.jpeg";
import image2 from "../assets/cards/pink.jpeg";
import image3 from "../assets/cards/sale.jpeg";
import image4 from "../assets/cards/shoes.jpeg";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import img1 from "../assets/carasoule/img1.jpg";
import img2 from "../assets/carasoule/img2.jpg";
import img3 from "../assets/carasoule/img3.jpg";
import img4 from "../assets/carasoule/img4.jpg";

export default function MainPage() {
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F3EEEA] min-h-screen text-[#776B5D]">
      {/* Navbar */}
      <nav className="bg-[#EBE3D5] py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-4xl font-extrabold text-[#776B5D] tracking-wide">BuyYours</h1>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 bg-[#EBE3D5] text-[#776B5D]">
        <h2 className="text-6xl font-extrabold mb-6">New Arrivals</h2>
        <button
          className="bg-[#B0A695] px-8 py-3 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition"
          onClick={() => navigate("/signup")}
        >
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {[image1, image2, image3, image4].map((image, index) => (
          <div
            key={index}
            className="bg-white p-6 text-center rounded-lg shadow-lg h-80 transition-transform transform hover:scale-105"
          >
            <img src={image} alt={`Category ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Subscribe Section */}
      <section className="bg-[#EBE3D5] text-center py-12 text-[#776B5D]">
        <h3 className="text-4xl font-extrabold mb-4">Subscribe</h3>
        <p className="mb-4 text-lg">Be the first to know about new collections.</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B0A695] outline-none"
          />
          <button className="ml-4 bg-[#B0A695] px-6 py-3 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:bg-[#776B5D] transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Carousel */}
      <section className="p-8">
        <h3 className="text-4xl font-bold text-center mb-6">Discover Our Collection</h3>
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <div className="relative w-full h-64">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Carousel Slide"
                className="absolute w-full h-full object-cover"
                initial={{ x: direction * 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 100, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="p-8">
        <h3 className="text-4xl font-bold text-center mb-8">What Our Customers Say</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Emily R.", text: "Amazing quality and fast delivery!" },
            { name: "James K.", text: "Beautiful designs. Will buy again!" },
            { name: "Sophia L.", text: "A wonderful shopping experience!" },
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md w-80 text-center hover:shadow-xl transition-shadow"
            >
              <p className="italic text-gray-700">{review.text}</p>
              <p className="font-semibold mt-3">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#EBE3D5] text-center py-6 text-[#776B5D] font-bold text-lg">
        Shop with us - We ❤️ You!
      </footer>
    </div>
  );
}
