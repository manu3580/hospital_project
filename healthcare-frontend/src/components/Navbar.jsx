import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  
  // 1. Extract user data safely from localStorage
  const userRole = localStorage.getItem("userRole");
  const storedUser = localStorage.getItem("user");
  
  // Parse user object (handle potential null/undefined)
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.clear();
    // A quick alert for UX feedback
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      
      {/* BRANDING SECTION */}
      <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-indigo-600 transition-colors">
          <span className="text-xl">🏥</span>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-gray-800">
          Health<span className="text-blue-600">Care</span>
        </h1>
      </Link>

      {/* NAVIGATION & PROFILE SECTION */}
      <div className="flex items-center gap-8">
        
        {/* Main Links */}
        <div className="hidden md:flex items-center gap-6 pr-6 mr-2">
          <Link to="/doctors" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors">
            Find Doctors
          </Link>
          
          {userRole && (
            <Link to="/dashboard" className="text-gray-500 hover:text-blue-600 font-semibold text-sm transition-colors">
              My Appointments
            </Link>
          )}
        </div>

        {/* AUTHENTICATION LOGIC */}
        {!userRole ? (
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-bold px-4 py-2">
              Login
            </Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
            
            {/* USER PROFILE CARD */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-1 pr-4 rounded-full shadow-sm hover:shadow-md transition-shadow">
              {/* Avatar Circle using first letter of name */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {currentUser?.userName?.charAt(0).toUpperCase() || "U"}
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800 leading-none">
                  {currentUser?.userName || "User"}
                </span>
                <span className="text-[9px] uppercase font-black text-blue-500 tracking-wider mt-0.5">
                  {userRole}
                </span>
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 p-2 rounded-xl bg-gray-50 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
              title="Logout"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;