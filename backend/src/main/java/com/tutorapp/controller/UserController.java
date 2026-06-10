package com.tutorapp.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/test")
    public String test() {
        return "API TutorApp fonctionne 🚀";
    }
}