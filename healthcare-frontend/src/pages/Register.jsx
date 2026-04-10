import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Registration Successful! Please Login.");
      navigate("/"); // Redirect to Login
    } catch (error) {
      alert("Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Create Account</h2>
        
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <select 
          className="w-full mb-6 p-3 border rounded-lg"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="PATIENT">I am a Patient</option>
          <option value="DOCTOR">I am a Doctor</option>
        </select>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;