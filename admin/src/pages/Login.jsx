import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");

  // Backend connections
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success(data.message)
        } else {
          toast.error("Invalid email or password!");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", { email, password });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success(data.message)
        } else {
          toast.error("Invalid email or password!");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[100vh] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-5 items-start m-auto min-w-[340px] sm:min-w-[400px] p-8 border rounded-2xl bg-white text-gray-700 shadow-lg">
        <p className="text-2xl font-semibold text-center w-full">
          <span className="text-blue-600">{state}</span> Login
        </p>
        <div className="w-full">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            type="email"
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            type="password"
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Processing..." : "Login"}
        </button>
        <p className="text-sm text-center w-full">
          {state === "Admin" ? (
            <>
              Doctor Login? {" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login? {" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
