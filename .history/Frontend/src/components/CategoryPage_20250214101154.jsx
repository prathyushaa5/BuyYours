import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoryPage = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5223/api/products/categoryByName/${name}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchCategoryItems();
  }, [name]);

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-[#776B5D] text-center mb-6">{name} Items</h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.ProductID} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img src={item.ImageURL || "https://via.placeholder.com/200"} alt={item.ProductName} className="w-full h-40 object-cover rounded-md mb-3" />
              <p className="text-lg font-semibold">{item.ProductName}</p>
              <p className="text-gray-600">${item.Price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No items found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
