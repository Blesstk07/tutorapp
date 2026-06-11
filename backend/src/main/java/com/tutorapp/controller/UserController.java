package com.tutorapp.controller;

import com.tutorapp.model.User;
import com.tutorapp.model.LoginRequest;
import com.tutorapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    // Injection propre (RECOMMANDÉ)
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String test() {
        return "API TutorApp fonctionne 🚀";
    }

    @GetMapping("/ping")
    public String ping() {
        return "controller OK";
    }

    // GET ALL USERS
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // CREATE USER
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // LOGIN
   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    return userRepository.findByEmail(request.getEmail())
            .map(user -> {

                if (user.getMotDePasse().equals(request.getMotDePasse())) {
                    return ResponseEntity.ok(user);
                } else {
                    return ResponseEntity.status(401).body("Mot de passe incorrect");
                }

            })
            .orElse(ResponseEntity.status(404).body("Utilisateur introuvable"));
}
}