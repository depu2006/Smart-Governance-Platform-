package com.example.civicpulsebackend.citizen.controller;

import com.example.civicpulsebackend.citizen.entity.Grievance;
import com.example.civicpulsebackend.citizen.repository.GrievanceRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {

    private final GrievanceRepository repository;

    public GrievanceController(GrievanceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Grievance> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Grievance create(@RequestBody @NonNull Grievance entity) {
        return repository.save(entity);
    }
}
