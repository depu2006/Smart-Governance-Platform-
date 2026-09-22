package com.example.civicpulsebackend.certificate.controller;

import com.example.civicpulsebackend.certificate.entity.Permit;
import com.example.civicpulsebackend.certificate.repository.PermitRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permits")
public class PermitController {

    private final PermitRepository repository;

    public PermitController(PermitRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Permit> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Permit create(@RequestBody @NonNull Permit entity) {
        return repository.save(entity);
    }
}
