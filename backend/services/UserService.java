package com.tutorapp.service;

import com.tutorapp.model.User;
import com.tutorapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    // REGISTER
    public User register(User user) {
        return repo.save(user);
    }

    // LOGIN
    public User login(String email, String password) {
        Optional<User> user = repo.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        return null;
    }

    // GET ALL USERS
    public List<User> getAll() {
        return repo.findAll();
    }
}