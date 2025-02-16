import { Link } from "react-router-dom";
import { FaBoxes, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaBoxes />
          <Link to="/display-products">Display Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaEdit />
          <Link to="/update-products">Update Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaPlus />
          <Link to="/add-products">Add Products</Link>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaTrash />
          <Link to="remove-products">Remove Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
