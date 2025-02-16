
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 p-6 bg-gray-100">
      <Outlet /> {/* This will load the selected option content */}
    </div>
  </div>

  
  );
};

export default AdminDashboard;
