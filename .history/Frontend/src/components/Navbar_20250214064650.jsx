import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#776B5D] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold text-[#EBE3D5]">
          ShopEasy
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/products" className="hover:text-[#B0A695]">Products</Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-[#B0A695]">Categories</Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-[#B0A695]">Your Orders</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-[#B0A695]">Your Cart</Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-[#B0A695] text-[#776B5D] px-4 py-2 rounded-md hover:bg-[#EBE3D5] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
