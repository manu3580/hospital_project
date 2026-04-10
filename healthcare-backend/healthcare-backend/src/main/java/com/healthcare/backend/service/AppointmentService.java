package com.healthcare.backend.service;

import com.healthcare.backend.entity.Appointment;
import com.healthcare.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

   // Inside AppointmentService.java around line 22
public List<Appointment> getAppointmentsByPatient(Long patientId) {
    // CHANGE THIS LINE:
    return appointmentRepo.findByPatient_Id(patientId); 
}

public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
    // AND CHANGE THIS ONE TOO:
    return appointmentRepo.findByDoctor_Id(doctorId);
}
}