import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const userId = localStorage.getItem("userId"); // Replace with dynamic user authentication

  useEffect(() => {
    axios
      .get(`http://localhost:5223/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5223/api/carts/add', {
        userId,
        productId: product.productID, // Ensure correct key name (check API)
        quantity,
      });
      alert(`Added ${quantity} item(s) to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3EEEA] p-6">
      <div className="max-w-3xl bg-[#EBE3D5] p-6 rounded-lg shadow-md text-center">
        <img
          src={product.imageURL || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-80 object-cover rounded-md"
        />
        <h2 className="mt-4 text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-red-800">Rs {product.price}</p>

        {/* Quantity Selector */}
        <div className="mt-4 flex justify-center items-center space-x-4">
          <label className="text-lg font-semibold">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="p-2 border border-gray-400 rounded-md bg-white"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-red-900 px-6 py-2 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition">
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-900 px-6 py-2 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
