import { useEffect, useState } from "react";
import { fetchPatientAppointments, fetchDoctorAppointments } from "../services/api";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (currentUser && currentUser.id) {
      const fetchPromise = role === "DOCTOR" 
        ? fetchDoctorAppointments(currentUser.id) 
        : fetchPatientAppointments(currentUser.id);

      fetchPromise
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Error:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [role, storedUser]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your schedule...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium uppercase">
          {role} View
        </span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Date & Time</th>
              <th className="p-4 font-semibold text-gray-600">
                {/* ALTERATION: Dynamic Header Name */}
                {role === "DOCTOR" ? "Patient Name" : "Doctor Name"}
              </th>
              <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                  <td className="p-4 text-gray-700 font-medium">
                    {app.appointmentTime ? app.appointmentTime.replace("T", " ") : "N/A"}
                  </td>
                  
                  {/* ALTERATION: Logic to show Patient info to Doctor and vice versa */}
                  <td className="p-4 text-gray-700">
                    {role === "DOCTOR" 
                      ? (app.patient?.userName || app.patient?.name || `Patient ID: ${app.patient?.id}`)
                      : (app.doctor?.userName || app.doctor?.name || `Dr. ID: ${app.doctor?.id}`)
                    }
                  </td>

                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-12 text-center text-gray-400">
                  <p className="text-lg">No appointments found.</p>
                  <p className="text-sm">New bookings will appear here.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;