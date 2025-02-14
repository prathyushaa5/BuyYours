import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold">
          ShopEasy
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-gray-300">Categories</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-gray-300">Your Orders</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-300">Your Cart</Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
