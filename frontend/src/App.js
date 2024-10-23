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
import PrivateAdminRoute from "./PrivateAdminRoute"; 
import AdminPanel from "./AdminPanel";
import Shoes from "./routes/NavbarPages.js/Shoes";
import Collections from "./routes/NavbarPages.js/Collections";
import Clothes from "./routes/NavbarPages.js/Clothes";
import Accessories from "./routes/NavbarPages.js/Accessories";
import Electronics from "./routes/NavbarPages.js/Electronics";
import Profile from "./routes/Pages/Profile";
import { ToastContainer } from "react-toastify";
import ProfileLayout from "./components/ProfileLayouts";
import Selling from "./routes/Pages/Selling";
import Buying from "./routes/Pages/Buying";
import Favourite from "./routes/Pages/Favourite";
import "react-toastify/dist/ReactToastify.css";
import About from "./routes/Pages/About";
import Help from "./routes/Pages/Help";
import ProductDetail from "./components/ProductDetail";
// import BuyNow from "./routes/Pages/BuyNow";
import BidNow from "./routes/Pages/BidNow";
import Shipping from "./routes/Pages/Shipping";

function App() {
  return (
    <div className="w-screen h-screen font-poppins overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
      <ToastContainer />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sneakers" element={<Shoes />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/apparels" element={<Clothes />} />
            <Route path="/collectibles" element={<Collections />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/profilelayouts" element={<ProfileLayout />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
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
            {/* <Route
              path="/buy/:productId"
              element={
                <PrivateRoute>
                  <BuyNow />
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/bid/:productId"
              element={
                <PrivateRoute>
                  <BidNow />
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
