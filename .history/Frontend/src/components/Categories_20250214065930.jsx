import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5223/api/categories"); // Update with your actual API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Predefined category images
  const categoryImages = {
    "Fashion": "https://via.placeholder.com/200?text=Fashion",
    "Beauty": "https://via.placeholder.com/200?text=Beauty",
    "Shoes": "https://via.placeholder.com/200?text=Shoes",
    "Skincare": "https://via.placeholder.com/200?text=Skincare",
    "Accessories": "https://via.placeholder.com/200?text=Accessories",
    "Bags": "https://via.placeholder.com/200?text=Bags",
  };

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-[#776B5D] text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-[#EBE3D5] p-4 rounded-lg shadow-md text-center text-[#776B5D] font-semibold">
            <img 
              src={categoryImages[category.CategoryName] || "https://via.placeholder.com/200"} 
              alt={category.CategoryName} 
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="text-lg">{category.CategoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
