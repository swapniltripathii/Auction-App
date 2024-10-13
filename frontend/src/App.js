import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./output.css"; // Tailwind import
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import HomeLoggedIn from "./routes/HomeLoggedIn";
import Home from "./routes/Home";
import Sell from "./routes/Pages/Sell";
import { AuthProvider } from "./contexts/authContext/authcontext";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import Shoes from "./routes/Shoes";
import Collections from "./routes/Collections";
import Clothes from "./routes/Clothes";
import Profile from "./routes/Profile";
import { ToastContainer, toast } from "react-toastify";
import ProfileLayout from "./components/ProfileLayouts";
import Selling from "./routes/Pages/Selling";
import Buying from "./routes/Pages/Buying";
import Favourite from "./routes/Pages/Favourite";

function App() {
  return (
    <div className="w-screen h-screen font-poppins overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
      {/* Wrap everything in the AuthProvider */}
      {/* <ToastContainer /> */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/apparels" element={<Clothes />} />
            <Route path="/collectibles" element={<Collections />} />
            <Route path="/profilelayouts" element={<ProfileLayout />} />
            {/* <Route path="/demo" element={<Buy/>} /> */}

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
                  <Favourite/>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
