import { FaTachometerAlt, FaBox, FaEdit, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard= () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaTachometerAlt />
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaBox />
          <Link to="/admin/products">Display Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaEdit />
          <Link to="/admin/update">Update Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaPlus />
          <Link to="/admin/add">Add Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded mt-10">
          <FaSignOutAlt />
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
