import { useEffect, useState } from "react";

const Carts = () => {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState({}); // Store product details
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    // Fetch the cart from backend
    fetch(`http://localhost:5223/api/carts/${userId}`)
      .then((res) => res.json())
      .then(async (data) => {
        setCart(data);

        // Fetch product details for items with null product data
        const productRequests = data.cartItems
          .filter((item) => item.product === null)
          .map((item) =>
            fetch(`http://localhost:5223/api/products/${item.productID}`)
              .then((res) => res.json())
              .then((productData) => ({ productID: item.productID, product: productData }))
          );

        // Store fetched products
        const fetchedProducts = await Promise.all(productRequests);
        const productMap = fetchedProducts.reduce((acc, item) => {
          acc[item.productID] = item.product;
          return acc;
        }, {});

        setProducts(productMap);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  // Calculate total price
  const getTotalPrice = () => {
    return cart?.cartItems?.reduce(
      (total, item) => total + item.priceAtAddition * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-center text-[#776B5D] mb-6">Your Cart</h2>

      {cart?.cartItems?.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-[#EBE3D5] p-6 rounded-lg shadow-md">
          {cart.cartItems.map((item) => {
            const product = item.product || products[item.productID] || {}; // Get product details
            return (
              <div key={item.cartItemID} className="flex items-center justify-between border-b pb-4 mb-4">
                <img
                  src={product.imageURL || "https://via.placeholder.com/100"}
                  alt={product.name || "Product"}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="text-left flex-1 ml-4">
                  <h3 className="text-xl font-semibold">{product.name || "Unknown Product"}</h3>
                  <p className="text-gray-600">
                    Rs {item.priceAtAddition} x {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-bold text-red-800">
                  Rs {item.priceAtAddition * item.quantity}
                </p>
              </div>
            );
          })}

          {/* Total Price Section */}
          <div className="text-right text-xl font-bold mt-6">
            Total: <span className="text-red-800">Rs {getTotalPrice()}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Carts;
