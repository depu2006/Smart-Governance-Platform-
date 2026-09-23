package com.example.civicpulsebackend.citizen.controller;

import com.example.civicpulsebackend.citizen.entity.Citizen;
import com.example.civicpulsebackend.citizen.repository.CitizenRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citizens")
public class CitizenController {

    private final CitizenRepository repository;

    public CitizenController(CitizenRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Citizen> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Citizen create(@RequestBody Citizen entity) {
        return repository.save(entity);
    }
}
