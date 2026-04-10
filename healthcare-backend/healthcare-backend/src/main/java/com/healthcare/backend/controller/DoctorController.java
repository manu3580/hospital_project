package com.healthcare.backend.controller;

import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllDoctors() {
        // This returns all users where role is 'DOCTOR'
        return userRepository.findByRole("DOCTOR");
    }
}
