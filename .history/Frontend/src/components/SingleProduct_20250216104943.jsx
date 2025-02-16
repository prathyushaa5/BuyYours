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
      .catch((error) => console.error('Error fetching prod  uct:', error));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || product.stockQuantity === 0) {
      alert("This product is out of stock!");
      return;
    }

    try {
      await axios.post('http://localhost:5223/api/carts/add', {
        userId:userId,
        productId: product.productID, 
        quantity:3,
      });
      alert(`Added ${quantity} item(s) to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const increaseQuantity = () => {
    if (quantity >= product.stockQuantity) {
     return ;
    } else {
      setQuantity((prev) => prev + 1);
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

        {/* Quantity Selector with + and - Buttons */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            disabled={product.stockQuantity === 0}
            className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
          >
            −
          </button>
          <span className="text-xl font-bold">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition"
          >
            +
          </button>
        </div>
        
       

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            disabled={product.stockQuantity === 0}
            className="bg-red-900 px-6 py-2 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition disabled:opacity-50"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="bg-blue-900 px-6 py-2 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#776B5D] transition disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
