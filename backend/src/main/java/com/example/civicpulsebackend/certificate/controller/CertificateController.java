package com.example.civicpulsebackend.certificate.controller;

import com.example.civicpulsebackend.certificate.entity.Certificate;
import com.example.civicpulsebackend.certificate.repository.CertificateRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateRepository repository;

    public CertificateController(CertificateRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Certificate> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Certificate create(@RequestBody @NonNull Certificate entity) {
        return repository.save(entity);
    }
}
