import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import Product from "./components/Product";
import CategoryPage from "./components/CategoryPage";
import Carts from "./components/Carts";
import SingleProduct from "./components/SingleProduct";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddProducts from "./components/Admin/AddProducts";
import DisplayProducts from "./components/Admin/DisplayProducts";
export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  return (
    <Router>
      {token && <Navbar />} {/* Show Navbar only if logged in */}
      <Routes>
        {/* Show Main page first */}
        <Route path="/" element={<Main />} />

        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

        {/* Home Page (Protected) */}
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/categories" element={token ? <Categories /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/products" element={token ? <Product /> : <Navigate to="/login" />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/carts" element={token ? <Carts /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<SingleProduct />} />


        {/*Admin Setup*/}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="display-products" element={<DisplayProducts />} />
        <Route path="add-products" element={<AddProducts />} />
      </Routes>
    </Router>
  );
}
