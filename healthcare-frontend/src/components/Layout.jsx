import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      <Navbar /><main>
        <Outlet />
      </main>
      
    </div>
  );
}

export default Layout;