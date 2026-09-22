package com.example.civicpulsebackend.welfare.controller;

import com.example.civicpulsebackend.welfare.entity.Budget;
import com.example.civicpulsebackend.welfare.repository.BudgetRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetRepository repository;

    public BudgetController(BudgetRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Budget> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Budget create(@RequestBody @NonNull Budget entity) {
        return repository.save(entity);
    }
}
