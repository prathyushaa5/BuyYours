import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryByPage = () => {
  const { name } = useParams(); // Get category name from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5223/api/products/categoryByName/${name}`
        );
        setProducts(response.data);
        console.log(response.data)
      } catch (err) {
        setError("No products found for this category.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [name]);

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-[#776B5D] text-center mb-6">
        {name} Products
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.productID}`} key={product.productID}>
              <div className="bg-[#EBE3D5] p-4 rounded-lg shadow-md text-center cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                  src={product.ImageURL || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <p className="text-lg font-semibold text-[#776B5D]">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryByPage;
