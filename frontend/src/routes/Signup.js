import React, { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authcontext";

const Signup = () => {
  const { userLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSigningUp) return;

      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(formData.email, formData.password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    },
    [formData, isSigningUp]
  );

  const handleGoogleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSigningUp) return;

      setIsSigningUp(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    },
    [isSigningUp]
  );

  if (userLoggedIn) return <Navigate to="/home" replace={true} />;

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-800">
      <div className="pt-10 pb-10">
        <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between border-b border-gray-300">
            <Link
              to="/login"
              className="py-2 px-12 text-lg font-medium text-gray-600 border-b-2 border-transparent"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="py-2 px-12 text-lg font-medium text-black border-b-2 border-black"
            >
              Sign Up
            </Link>
          </div>
          {/* Signup Form */}
          <form className="space-y-3 text-left" onSubmit={handleSubmit}>
            <label htmlFor="signup" className="font-normal text-2xl">
              Sign up
            </label>
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="">
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                disabled={isSigningUp}
              >
                Sign Up
              </button>
            </div>
            <div className="relative flex items-center justify-center">
              <span className="absolute px-2 bg-white text-gray-500">OR</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isSigningUp}
              >
                <img
                  className="w-5 h-5 mr-2"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="Google"
                />
                Google
              </button>
            </div>
          </form>
          <div className="text-center text-sm">
            <span>Already have an account? </span>
            <div className="font-medium text-green-900 hover:text-gray-800">
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
