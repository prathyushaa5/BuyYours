import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./Sidebar";
import DisplayProducts from "./DisplayProducts";

import AddProducts from "./AddProducts";


const AdminDashboard = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<h2 className="text-2xl">Welcome to Admin Dashboard</h2>} />
            <Route path="/display-products" element={<DisplayProducts />} />
           
            <Route path="/add-products" element={<AddProducts />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminDashboard;
