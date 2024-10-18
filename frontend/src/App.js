import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./output.css"; // Tailwind import
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import HomeLoggedIn from "./routes/HomeLoggedIn";
import Home from "./routes/Home";
import Sell from "./routes/Pages/Sell";
import { AuthProvider } from "./contexts/authContext/authcontext";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./PrivateAdminRoute"; // Your custom admin route
import AdminPanel from "./AdminPanel"; // Import AdminPanel component
import Shoes from "./routes/NavbarPages.js/Shoes";
import Collections from "./routes/NavbarPages.js/Collections";
import Clothes from "./routes/NavbarPages.js/Clothes";
import Accessories from "./routes/NavbarPages.js/Accessories";
import Electronics from "./routes/NavbarPages.js/Electronics";
import Profile from "./routes/Profile";
import { ToastContainer } from "react-toastify";
import ProfileLayout from "./components/ProfileLayouts";
import Selling from "./routes/Pages/Selling";
import Buying from "./routes/Pages/Buying";
import Favourite from "./routes/Pages/Favourite";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import About from "./routes/Pages/About";
import Help from "./routes/Pages/Help";
import ProductDetail from "./components/ProductDetail";
import Shipping from "./routes/Pages/Shipping";
// import Demo from "./routes/demo2";

function App() {
  return (
    <div className="w-screen h-screen font-poppins overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Wrap everything in the AuthProvider */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/apparels" element={<Clothes />} />
            <Route path="/collectibles" element={<Collections />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/profilelayouts" element={<ProfileLayout />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            {/* <Route path="/demo" element={<Demo />} /> */}
            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomeLoggedIn />
                </PrivateRoute>
              }
            />
            <Route
              path="/sell"
              element={
                <PrivateRoute>
                  <Sell />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/selling"
              element={
                <PrivateRoute>
                  <Selling />
                </PrivateRoute>
              }
            />
            <Route
              path="/buying"
              element={
                <PrivateRoute>
                  <Buying />
                </PrivateRoute>
              }
            />
            <Route
              path="/favourite"
              element={
                <PrivateRoute>
                  <Favourite />
                </PrivateRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <PrivateRoute>
                  <Shipping />
                </PrivateRoute>
              }
            />

            {/* Admin Route */}
            <Route element={<PrivateAdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
