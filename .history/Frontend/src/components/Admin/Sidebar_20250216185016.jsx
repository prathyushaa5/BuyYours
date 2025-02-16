import { NavLink } from "react-router-dom";
import { FaBoxes, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaBoxes />
          <NavLink to="display-products" className="text-white">Display Products</NavLink>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaEdit />
          <NavLink to="update-products" className="text-white">Update Products</NavLink>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaPlus />
          <NavLink to="add-products" className="text-white">Add Products</NavLink>
        </li>
        <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <FaTrash />
          <NavLink to="remove-products" className="text-white">Remove Products</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
