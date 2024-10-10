import React from "react";
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <div className="flex space-x-4">
      <Link to="/login">
        <button className="px-3 py-1 bg-white text-black border border-black hover:bg-black hover:text-white font-medium rounded-3xl">
          Log In
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-3 py-1 bg-white text-black border border-black hover:bg-black hover:text-white font-medium rounded-3xl">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default Button;
