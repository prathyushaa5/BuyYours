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
    <div className="p-6 bg-[#F3EEEA] shadow-lg rounded-lg w-1/2 mx-auto border border-[#EBE3D5]">
      <h2 className="text-2xl font-bold mb-4 text-[#776B5D] text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        <textarea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={product.stockQuantity} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        <input type="number" name="categoryID" placeholder="Category ID" value={product.categoryID} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        <input type="text" name="imageURL" placeholder="Image URL" value={product.imageURL} onChange={handleChange} className="w-full p-2 border border-[#776B5D] rounded bg-[#EBE3D5]" required />
        
        <button type="submit" className="w-full bg-[#776B5D] text-white p-2 rounded hover:bg-[#5e5446]">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
