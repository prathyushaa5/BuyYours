import { useEffect, useState } from "react";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);

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
                    onClick={() => alert("Navigate to edit product")}
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
    </div>
  );
};

export default DisplayProducts;
