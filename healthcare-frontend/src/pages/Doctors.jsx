import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  
  // Get user role from storage to decide what to show
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchDoctors()
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-5 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <img
  src="https://www.w3schools.com/howto/img_avatar.png" 
  alt="doctor"
  className="mx-auto mb-3 rounded-full w-24 h-24 object-cover"
/>
              <h2 className="text-lg font-semibold text-center">{doc.name}</h2>
              <p className="text-gray-500 text-center">
                {doc.specialization || "General Physician"} 
              </p>

              {/* Conditional Rendering: Only patients see the booking button */}
              {userRole === "PATIENT" ? (
                <button
                  onClick={() => navigate(`/book/${doc.id}`)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Appointment
                </button>
              ) : (
                <p className="mt-4 text-xs text-center text-gray-400">
                  Login as Patient to book
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">Loading doctors...</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;