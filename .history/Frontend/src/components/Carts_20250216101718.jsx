import { useEffect, useState } from "react";

const Carts = () => {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found!");
      return;
    }

    // Fetch the cart from backend
    fetch(`http://localhost:5223/api/carts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCart(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  // Calculate total price
  const getTotalPrice = () => {
    return cart?.cartItems?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-[#F3EEEA] p-6">
      <h2 className="text-3xl font-bold text-center text-[#776B5D] mb-6">Your Cart</h2>

      {cart?.cartItems?.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-[#EBE3D5] p-6 rounded-lg shadow-md">
          {cart.cartItems.map((item) => (
            <div key={item.product.productID} className="flex items-center justify-between border-b pb-4 mb-4">
              
              <div className="text-left flex-1 ml-4">
                <h3 className="text-xl font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Rs {item.product.price} x {item.quantity}</p>
              </div>
              <p className="text-lg font-bold text-red-800">Rs {item.product.price * item.quantity}</p>
            </div>
          ))}

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
