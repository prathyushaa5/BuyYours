import image1 from "../assets/cards/hanger.jpeg";
import image2 from "../assets/cards/pink.jpeg";
import image3 from "../assets/cards/sale.jpeg";
import image4 from "../assets/cards/shoes.jpeg";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-pink-400 to-violet-500 py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-4xl font-extrabold text-white tracking-wide">The StyleStop</h1>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 bg-violet-500 text-white ">
        <h2 className="text-6xl font-extrabold mb-6">New Arrivals</h2>
        <button 
          className="bg-yellow-500 px-8 py-3 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
          onClick={() => navigate("/signup")}
        >
          Shop Now
        </button>
      </section>

      {/* Categories (Replaced with Images) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {[image1, image2, image3, image4].map((image, index) => (
          <div key={index} className="bg-white p-6 text-center rounded-lg shadow-lg h-80 transition-transform transform hover:scale-105">
            <img src={image} alt={`Category ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Subscribe Section */}
      <section className="bg-violet-500 text-center py-12 text-white">
        <h3 className="text-4xl font-extrabold mb-4">Subscribe</h3>
        <p className="mb-4 text-lg">Be the first to know about new collections.</p>
        <div className="flex justify-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none" 
          />
          <button className="ml-4 bg-yellow-500 px-6 py-3 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-600">Subscribe</button>
        </div>
      </section>

      <section className="p-8">
  <h3 className="text-4xl font-bold text-center mb-8 text-primary">What Our Customers Say</h3>
  <div className="flex flex-wrap justify-center gap-6">
    {[
      { name: "Emily R.", text: "Amazing quality and fast delivery!" },
      { name: "James K.", text: "Beautiful designs. Will buy again!" },
      { name: "Sophia L.", text: "A wonderful shopping experience!" },
    ].map((review, index) => (
      <div key={index} className="bg-white p-5 rounded-lg shadow-md w-80 text-center hover:shadow-xl transition-shadow">
        <p className="italic text-gray-700">{review.text}</p>
        <p className="font-semibold mt-3">{review.name}</p>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-400 to-violet-500 text-center py-6 text-white font-bold text-lg">
        Shop with us - We ❤️ You!
      </footer>
    </div>
  );
}
