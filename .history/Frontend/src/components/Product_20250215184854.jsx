import { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    axios.get('http://localhost:5223/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group bg-[#EBE3D5] p-4 rounded-lg shadow-md text-center"
          >
            {/* Product Image */}
            <img
              src={product.imageURL || 'https://via.placeholder.com/200'}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            {/* Product Details */}
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-2 text-lg font-bold text-gray-800">Price: ${product.price}</p>
            {/* Action Buttons */}
            <div className=" flex justify-center space-x-4">
            <button
          className="bg-[#B0A695] px-6 py-2 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition"
         
        >
          Buy Now
        </button>
        <button
          className="bg-[#B0A695] px-6 py-2  text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition"
          
        >
          Add to cart
        </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
