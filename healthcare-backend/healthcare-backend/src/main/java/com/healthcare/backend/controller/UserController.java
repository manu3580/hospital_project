package com.healthcare.backend.controller;

import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // Create a response map to match your React res.data.token/role
            Map<String, Object> response = new HashMap<>();
            response.put("token", "mock-jwt-token-" + user.getId()); // Placeholder token
            response.put("role", user.getRole());
            response.put("id", user.getId());
            response.put("userName", user.getName());
            
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
