import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stockQuantity: "", imageURL: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products on load
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

  // Handle input change
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle update input change
  const handleEditInputChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  // Add a new product
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

  // Enable edit mode
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Update a product
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:5223/api/products/${editingProduct.productID}`, editingProduct);
      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <h3 className="text-xl font-bold mb-4">Add New Product</h3>
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} className="w-full p-2 border mb-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 border mb-2 rounded" />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={newProduct.stockQuantity} onChange={handleInputChange} className="w-full p-2 border mb-2 rounded" />
        <input type="text" name="imageURL" placeholder="Image URL" value={newProduct.imageURL} onChange={handleInputChange} className="w-full p-2 border mb-4 rounded" />
        <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Product</button>
      </div>

      {/* Product List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Product List</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.productID} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-gray-600">Rs {product.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditProduct(product)} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">Edit</button>
                    <button onClick={() => handleDeleteProduct(product.productID)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Update Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>
            <input type="text" name="name" value={editingProduct.name} onChange={handleEditInputChange} className="w-full p-2 border mb-2 rounded" />
            <input type="number" name="price" value={editingProduct.price} onChange={handleEditInputChange} className="w-full p-2 border mb-2 rounded" />
            <input type="number" name="stockQuantity" value={editingProduct.stockQuantity} onChange={handleEditInputChange} className="w-full p-2 border mb-2 rounded" />
            <input type="text" name="imageURL" value={editingProduct.imageURL} onChange={handleEditInputChange} className="w-full p-2 border mb-4 rounded" />
            <div className="flex justify-between">
              <button onClick={handleUpdateProduct} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
              <button onClick={() => setEditingProduct(null)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
