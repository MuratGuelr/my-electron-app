import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You logged in Successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-900 h-svh">
      <form
        className="max-w-sm mx-auto bg-gray-800 p-5 justify-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded"
        onSubmit={handleSubmit}
      >
        <h3 className="text-white mb-3">Login</h3>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="border text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@downloadApps.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="border text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
