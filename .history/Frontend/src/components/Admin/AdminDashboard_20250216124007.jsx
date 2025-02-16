import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    categoryID: 0,
    price: 0,
    imageURL: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5223/api/products", newProduct);
      alert("Product added successfully!");
      setNewProduct({ name: "", description: "", stockQuantity: 0, categoryID: 0, price: 0, imageURL: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <h3 className="text-xl font-bold mb-4">➕ Add New Product</h3>

        <label className="block font-semibold">Product Name:</label>
        <input type="text" name="name" placeholder="Enter product name" value={newProduct.name} onChange={handleInputChange} className="w-full p-2 border mb-3 rounded" />

        <label className="block font-semibold">Description:</label>
        <textarea name="description" placeholder="Enter product description" value={newProduct.description} onChange={handleInputChange} className="w-full p-2 border mb-3 rounded" />

        <label className="block font-semibold">Stock Quantity:</label>
        <input type="number" name="stockQuantity" placeholder="Enter stock quantity" value={newProduct.stockQuantity} onChange={handleInputChange} className="w-full p-2 border mb-3 rounded" />

        <label className="block font-semibold">Category ID:</label>
        <input type="number" name="categoryID" placeholder="Enter category ID" value={newProduct.categoryID} onChange={handleInputChange} className="w-full p-2 border mb-3 rounded" />

        <label className="block font-semibold">Price (in Rs):</label>
        <input type="number" name="price" placeholder="Enter product price" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 border mb-3 rounded" />

        <label className="block font-semibold">Image URL:</label>
        <input type="text" name="imageURL" placeholder="Enter product image URL" value={newProduct.imageURL} onChange={handleInputChange} className="w-full p-2 border mb-4 rounded" />

        <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Product</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
