package com.example.civicpulsebackend.mongo.service;

import com.example.civicpulsebackend.mongo.entity.OperationalRecordDocument;
import com.example.civicpulsebackend.mongo.repository.OperationalRecordMongoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class OperationalRecordService {

    private static final Set<String> SUPPORTED_RECORD_TYPES = Set.of(
            "grievances",
            "service-applications",
            "budget-reallocations",
            "payments",
            "feedback"
    );

    private final OperationalRecordMongoRepository repository;

    public OperationalRecordService(OperationalRecordMongoRepository repository) {
        this.repository = repository;
    }

    public List<Map<String, Object>> findAll(String recordType) {
        validateRecordType(recordType);
        return repository.findAllByRecordTypeOrderByUpdatedAtDesc(recordType)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public Map<String, Object> save(String recordType, String recordId, Map<String, Object> fields) {
        validateRecordType(recordType);
        if (recordId == null || recordId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Record id is required");
        }

        Instant now = Instant.now();
        OperationalRecordDocument document = repository.findByRecordTypeAndRecordId(recordType, recordId)
                .orElseGet(() -> new OperationalRecordDocument(
                        recordType + ":" + recordId,
                        recordType,
                        recordId,
                        new LinkedHashMap<>(),
                        now,
                        now
                ));
        document.setFields(new LinkedHashMap<>(fields));
        document.setUpdatedAt(now);
        return toResponse(repository.save(document));
    }

    private void validateRecordType(String recordType) {
        if (!SUPPORTED_RECORD_TYPES.contains(recordType)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported operational record type");
        }
    }

    private Map<String, Object> toResponse(OperationalRecordDocument document) {
        Map<String, Object> response = new LinkedHashMap<>(document.getFields());
        response.put("id", document.getRecordId());
        response.put("recordType", document.getRecordType());
        response.put("_mongoCreatedAt", document.getCreatedAt());
        response.put("_mongoUpdatedAt", document.getUpdatedAt());
        return response;
    }
}