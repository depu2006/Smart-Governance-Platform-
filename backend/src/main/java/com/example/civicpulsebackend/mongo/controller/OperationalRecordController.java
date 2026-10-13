package com.example.civicpulsebackend.mongo.controller;

import com.example.civicpulsebackend.mongo.service.OperationalRecordService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/operational-records")
public class OperationalRecordController {

    private final OperationalRecordService service;

    public OperationalRecordController(OperationalRecordService service) {
        this.service = service;
    }

    @GetMapping("/{recordType}")
    public List<Map<String, Object>> findAll(@PathVariable String recordType) {
        return service.findAll(recordType);
    }

    @PostMapping("/{recordType}")
    public Map<String, Object> create(@PathVariable String recordType, @RequestBody Map<String, Object> record) {
        Map<String, Object> fields = new LinkedHashMap<>(record);
        Object recordId = fields.remove("id");
        fields.remove("recordType");
        return service.save(recordType, recordId == null ? null : recordId.toString(), fields);
    }

    @PutMapping("/{recordType}/{recordId}")
    public Map<String, Object> update(
            @PathVariable String recordType,
            @PathVariable String recordId,
            @RequestBody Map<String, Object> record
    ) {
        Map<String, Object> fields = new LinkedHashMap<>(record);
        fields.remove("id");
        fields.remove("recordType");
        return service.save(recordType, recordId, fields);
    }
}