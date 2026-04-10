package com.healthcare.backend.repository;

import com.healthcare.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Change to Patient_Id and Doctor_Id
    List<Appointment> findByPatient_Id(Long patientId);
    List<Appointment> findByDoctor_Id(Long doctorId);
}