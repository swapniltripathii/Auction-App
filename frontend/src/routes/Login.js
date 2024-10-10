import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authcontext";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to="/home" replace={true} />}
      <div className="flex w-full h-screen flex-col items-center justify-center bg-gray-800">
        {/* Main box */}
        <div className="pt-10 pb-10">
          <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-md mt-4">
            <div className="flex items-center justify-between border-b border-gray-300">
              <Link
                to="/login"
                className="py-2 px-12 text-lg font-medium text-black border-b-2 border-black"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="py-2 px-12 text-lg font-medium text-gray-600 border-b-2 border-transparent"
              >
                Sign Up
              </Link>
            </div>
            {/* Login Form */}
            <form className="space-y-3 text-left" onSubmit={onSubmit}>
              <div className="font-sans text-2xl">Log in</div>
              <div className="rounded-md shadow-sm">
                <div className="mb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-black focus:border-black"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-black hover:text-gray-800"
                    onClick={() => {
                      // Handle forgot password logic here
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  disabled={isSigningIn}
                >
                  Log In
                </button>
              </div>
              <div className="relative flex items-center justify-center">
                <span className="absolute px-2 bg-white text-gray-500">OR</span>
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onGoogleSignIn}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isSigningIn}
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
              <span>Need an account? </span>
              <div className="font-medium text-green-900 hover:text-gray-800">
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
