package com.healthcare.backend.controller;

import com.healthcare.backend.entity.Appointment;
import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.AppointmentRepository;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository; // Added to fetch User objects

    @PostMapping
public Appointment createAppointment(@RequestBody Map<String, Object> payload) {
    Appointment appointment = new Appointment();
    
    // 1. Get the IDs from the JSON payload
    // Use Number to handle potential Integer/Long type differences from JSON
    Long pId = Long.valueOf(payload.get("patientId").toString());
    Long dId = Long.valueOf(payload.get("doctorId").toString());

    // 2. Fetch the actual User objects from the database
    // This links the appointment to the real users in MySQL
    User patient = userRepository.findById(pId)
            .orElseThrow(() -> new RuntimeException("Patient not found with id: " + pId));
    User doctor = userRepository.findById(dId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + dId));

    // 3. Attach the objects to the appointment
    appointment.setPatient(patient);
    appointment.setDoctor(doctor);
    
    // 4. Set Time and Status
    String timeStr = payload.get("appointmentTime").toString();
    appointment.setAppointmentTime(java.time.LocalDateTime.parse(timeStr));
    appointment.setStatus(payload.getOrDefault("status", "PENDING").toString());

    // 5. Save (This will now fill the patient_id and doctor_id columns!)
    return appointmentRepository.save(appointment);
}

   @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        // Match the name you just put in the Repository
        return appointmentRepository.findByDoctor_Id(doctorId); 
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable Long patientId) {
        // Match the name you just put in the Repository
        return appointmentRepository.findByPatient_Id(patientId);
    }
}