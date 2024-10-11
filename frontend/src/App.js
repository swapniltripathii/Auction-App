import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./output.css"; // Make sure Tailwind is imported here
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Sell from "../src/routes/Pages/Sell";
import { AuthProvider } from "./contexts/authContext/authcontext";
import HomeLoggedIn from "./routes/HomeLoggedIn";

function App() {
  return (
    <div className="w-screen h-screen font-poppins overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<HomeLoggedIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
