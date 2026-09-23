package com.example.civicpulsebackend.citizen.controller;

import com.example.civicpulsebackend.citizen.entity.Department;
import com.example.civicpulsebackend.citizen.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository repository;

    public DepartmentController(DepartmentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Department> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    @SuppressWarnings("null")
    public Department create(@RequestBody Department entity) {
        return repository.save(entity);
    }
}
