import { useState, useEffect } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    fetch('http://localhost:5223/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-[#EBE3D5] p-4 rounded-lg shadow-md text-center">
            <img
              src={product.imageurl || 'https://via.placeholder.com/200'}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">Price: ${product.price}</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300">
                Buy
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
