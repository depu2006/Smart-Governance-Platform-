package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = {"com.example.demo", "com.example.civicpulsebackend"})
@EntityScan(basePackages = "com.example.civicpulsebackend")
@EnableJpaRepositories(basePackages = {
    "com.example.civicpulsebackend.certificate.repository",
    "com.example.civicpulsebackend.citizen.repository",
    "com.example.civicpulsebackend.welfare.repository"
})
@EnableMongoRepositories(basePackages = "com.example.civicpulsebackend.mongo.repository")
public class CivicpulseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CivicpulseBackendApplication.class, args);
	}

}
