import { useEffect, useState } from "react";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    categoryID: 0,
    price: 0,
    imageURL: "",
  });

  // Fetch products from API
  useEffect(() => {
    fetch("http://localhost:5223/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Delete product function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`http://localhost:5223/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open edit modal with product details
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData(product);
  };

  // Handle input change in form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update product function
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5223/api/products/${editingProduct}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setProducts(products.map((p) => (p.id === editingProduct ? formData : p)));
        setEditingProduct(null);
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="border p-2">
                  <img src={product.imageURL} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.stockQuantity}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Product Name"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Description"
            />
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Stock Quantity"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Price"
            />
            <input
              type="text"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              placeholder="Image URL"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayProducts;
