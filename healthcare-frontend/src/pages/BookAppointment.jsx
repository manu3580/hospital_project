import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookAppointment } from "../services/api"; // 1. ADD THIS IMPORT

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate(); // 2. UNCOMMENT THIS
  const [form, setForm] = useState({
    date: "",
    time: "",
  });

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stored = localStorage.getItem("user");
    const currentUser = stored ? JSON.parse(stored) : null;

    // DEBUG: See if the ID is actually there before sending
    console.log("Current User from Storage:", currentUser);

    if (!currentUser || !currentUser.id) {
      alert("Session expired or user ID missing. Please log in again.");
      navigate("/");
      return;
    }

    const appointmentData = {
      appointmentTime: `${form.date}T${form.time}:00`, 
      status: "PENDING",
      doctorId: parseInt(id),
      patientId: currentUser.id // Uses the ID from your Java Map
    };

    try {
      await bookAppointment(appointmentData); 
      alert("Booking Successful!");
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Error: Check if Backend is running.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        <input
          type="date"
          required
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          required
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;