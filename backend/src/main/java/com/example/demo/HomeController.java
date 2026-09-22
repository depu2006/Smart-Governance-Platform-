package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
            "application", "CivicPulse Nexus API",
            "status", "running",
            "endpoints", Map.of(
                "citizens", "/api/citizens",
                "grievances", "/api/grievances",
                "departments", "/api/departments",
                "certificates", "/api/certificates",
                "applications", "/api/applications",
                "permits", "/api/permits",
                "welfares", "/api/welfares",
                "budgets", "/api/budgets",
                "assets", "/api/assets",
                "workflows", "/api/workflows"
            )
        );
    }
}
