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
      <nav className="bg-pink-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">The StyleStop</h1>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-12 bg-violet-400">
        <h2 className="text-5xl font-extrabold text-white mb-4">New Arrivals</h2>
        <button className="bg-yellow-500 px-6 py-2 text-white font-bold rounded-lg hover:bg-yellow-600" onClick={()=>navigate("/login")}>Shop Now</button>
      </section>

      {/* Categories (Replaced with Images) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {[image1, image2, image3, image4].map((image, index) => (
          <div key={index} className="bg-white p-6 text-center rounded-lg shadow-md h-80">
            <img src={image} alt={`Category ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {/* Subscribe Section */}
      <section className="bg-violet-400 text-center py-12">
        <h3 className="text-3xl font-extrabold text-white mb-4">Subscribe</h3>
        <p className="text-white">Be the first to know about new collections.</p>
        <input type="email" placeholder="Enter your email" className="mt-4 px-4 py-2 rounded-lg border border-gray-300" />
        <button className="ml-2 bg-yellow-500 px-4 py-2 text-white font-bold rounded-lg hover:bg-yellow-600">Subscribe</button>
      </section>

      {/* Products */}
      <section className="p-6">
        <h3 className="text-3xl font-bold text-center mb-6">New In</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Vase", "Teacup", "Overalls", "Artwork"].map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>
              <p className="font-bold">{product}</p>
              <p className="text-gray-500">$29.00 AUD</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-300 text-center py-6 text-white font-bold">
        Shop with us - We ❤️ You!
      </footer>
    </div>
  );
}
