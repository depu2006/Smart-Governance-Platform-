package com.example.civicpulsebackend.welfare.controller;

import com.example.civicpulsebackend.welfare.entity.Workflow;
import com.example.civicpulsebackend.welfare.repository.WorkflowRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflows")
public class WorkflowController {

    private final WorkflowRepository repository;

    public WorkflowController(WorkflowRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Workflow> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Workflow create(@RequestBody @NonNull Workflow entity) {
        return repository.save(entity);
    }
}
