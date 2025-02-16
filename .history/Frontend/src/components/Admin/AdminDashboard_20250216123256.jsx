import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    imageURL: "",
  });

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5223/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle input changes for new product
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5223/api/products", newProduct);
      alert("Product added successfully!");
      setNewProduct({ name: "", price: "", stockQuantity: "", imageURL: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5223/api/products/${productId}`);
        alert("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-4">Add New Product</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={newProduct.stockQuantity}
          onChange={handleInputChange}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={newProduct.imageURL}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4 rounded"
        />
        <button
          onClick={handleAddProduct}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Product List</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li
                  key={product.productID}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-gray-600">Rs {product.price}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.productID)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
