import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaShoppingCart, FaUsers, FaBoxOpen } from "react-icons/fa";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 7000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 8000 },
];

const userGrowth = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 450 },
  { month: "Apr", users: 700 },
  { month: "May", users: 850 },
  { month: "Jun", users: 1000 },
];

const AdminHome = () => {
  return (
    <div className="p-6 bg-[#F3EEEA] min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#776B5D] mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#EBE3D5] p-5 rounded-lg shadow-md flex items-center space-x-4">
          <FaShoppingCart className="text-3xl text-[#776B5D]" />
          <div>
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-lg font-bold">$25,000</p>
          </div>
        </div>

        <div className="bg-[#EBE3D5] p-5 rounded-lg shadow-md flex items-center space-x-4">
          <FaUsers className="text-3xl text-[#776B5D]" />
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-lg font-bold">1,250</p>
          </div>
        </div>

        <div className="bg-[#EBE3D5] p-5 rounded-lg shadow-md flex items-center space-x-4">
          <FaBoxOpen className="text-3xl text-[#776B5D]" />
          <div>
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-lg font-bold">320</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-[#EBE3D5] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#776B5D] mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#776B5D" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="bg-[#EBE3D5] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#776B5D] mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#776B5D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
