import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5223/api/products')
      .then((response) => {setProducts(response.data);console.log(response.data)})
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/product/${product.productID}`} key={product.productID}>
            <div className="relative group bg-[#EBE3D5] p-4 rounded-lg shadow-md text-center cursor-pointer transition-transform duration-300 hover:scale-105">
              <img
                src={product.imageURL || 'https://via.placeholder.com/200'}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg font-bold text-red-800">Rs {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
