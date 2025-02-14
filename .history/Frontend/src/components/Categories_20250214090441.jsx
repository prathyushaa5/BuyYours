import { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../assets/categories/1.jpeg";
import img2 from "../assets/categories/2.jpeg";
import img3 from "../assets/categories/3.jpeg";
import img4 from "../assets/categories/4.jpeg";
import img5 from "../assets/categories/5.jpeg";
import img6 from "../assets/categories/6.jpeg";
import img7 from "../assets/categories/7.jpeg";
import img8 from "../assets/categories/8.jpeg";
import img9 from "../assets/categories/9.jpeg";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5223/api/products/api/controllers/categories"); // Update with your actual API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Category Images
  const categoryImages = {
    "Clothing": img1,
    "Footwear": img2,
    "Skincare": img3,
    "Makeup": img6,
    "Haircare": img5,
    "Jewelry": img7,
    "Accessories": img4,
    "Fragrances": img8,
    "Bag":img9
  };

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-[#776B5D] text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.CategoryID} 
            className="relative bg-[#EBE3D5] rounded-lg shadow-md overflow-hidden group"
          >
            {/* Image */}
            <img 
              src={categoryImages[category.CategoryName] || "https://via.placeholder.com/200"} 
              alt={category.CategoryName} 
              className="w-full h-60ss object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Effect: Show Name on Hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">{category.CategoryName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
