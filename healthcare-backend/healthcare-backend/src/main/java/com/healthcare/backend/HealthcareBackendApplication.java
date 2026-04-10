package com.healthcare.backend;

import com.healthcare.backend.entity.User;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HealthcareBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HealthcareBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByRole("DOCTOR").isEmpty()) {
                userRepository.save(new User(null, "Dr. Strange", "strange@magic.com", "pass123", "DOCTOR", "Neurosurgeon"));
                userRepository.save(new User(null, "Dr. House", "house@clinic.com", "pass123", "DOCTOR", "Diagnostician"));
                System.out.println("✅ Sample doctors inserted.");
            }
        };
    }
}