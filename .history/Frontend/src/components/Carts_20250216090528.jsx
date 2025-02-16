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
    fetch(`http://localhost:5223/api/cart/${userId}`, {
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
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart ? (
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default Carts;
