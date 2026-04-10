import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser({ email, password });
    console.log("Full Backend Response:", res.data); // DEBUG: Check if 'id' is here

    // Create the user object explicitly
    const userObject = {
      id: res.data.id,        // Ensure this matches your Java Map key
      role: res.data.role,
      token: res.data.token,
      userName: res.data.userName
    };

    localStorage.setItem("user", JSON.stringify(userObject)); 
    localStorage.setItem("userRole", res.data.role);
    localStorage.setItem("token", res.data.token);
    
    alert("Login Successful!");
    navigate("/doctors"); 
  } catch (error) {
    alert("Login Failed.");
    console.error(error);
  }
};

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back 👋</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;