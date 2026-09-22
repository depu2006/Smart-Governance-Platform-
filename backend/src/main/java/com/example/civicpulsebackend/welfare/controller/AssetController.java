package com.example.civicpulsebackend.welfare.controller;

import com.example.civicpulsebackend.welfare.entity.Asset;
import com.example.civicpulsebackend.welfare.repository.AssetRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetRepository repository;

    public AssetController(AssetRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Asset> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Asset create(@RequestBody @NonNull Asset entity) {
        return repository.save(entity);
    }
}
