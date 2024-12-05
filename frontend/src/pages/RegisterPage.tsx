import { useState } from "react";
import api from "../api/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      await api.post("register/", form);
      
      
      alert("Registered successfully!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert("Registration failed! " + err.response?.data.error);
      }else {
        console.log(err);
        
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
        <Link to="/login">
          <button className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
