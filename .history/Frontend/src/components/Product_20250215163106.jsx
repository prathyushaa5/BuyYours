import  { useState, useEffect } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    fetch('http://localhost:5223/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button className="buy-button">Buy</button>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Product;
