import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./components/Layout.jsx";
import Doctors from "./pages/Doctors.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="book/:id" element={<BookAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;