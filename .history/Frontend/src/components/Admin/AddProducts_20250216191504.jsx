import { useState } from "react";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stockQuantity: 0,
    categoryID: 0,
    price: 0,
    imageURL: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5223/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({ name: "", description: "", stockQuantity: 0, categoryID: 0, price: 0, imageURL: "" });
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md w-1/2 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={product.stockQuantity} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="categoryID" placeholder="Category ID" value={product.categoryID} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="imageURL" placeholder="Image URL" value={product.imageURL} onChange={handleChange} className="w-full p-2 border rounded" required />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
