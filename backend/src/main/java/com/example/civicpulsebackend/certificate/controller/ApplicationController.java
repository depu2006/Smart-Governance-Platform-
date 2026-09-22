package com.example.civicpulsebackend.certificate.controller;

import com.example.civicpulsebackend.certificate.entity.Application;
import com.example.civicpulsebackend.certificate.repository.ApplicationRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository repository;

    public ApplicationController(ApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Application> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Application create(@RequestBody @NonNull Application entity) {
        return repository.save(entity);
    }
}
