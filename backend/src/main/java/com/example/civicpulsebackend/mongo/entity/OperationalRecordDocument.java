package com.example.civicpulsebackend.mongo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document(collection = "operational_records")
public class OperationalRecordDocument {

    @Id
    private String key;
    private String recordType;
    private String recordId;
    private Map<String, Object> fields;
    private Instant createdAt;
    private Instant updatedAt;

    public OperationalRecordDocument() {
    }

    public OperationalRecordDocument(String key, String recordType, String recordId, Map<String, Object> fields, Instant createdAt, Instant updatedAt) {
        this.key = key;
        this.recordType = recordType;
        this.recordId = recordId;
        this.fields = fields;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getRecordType() {
        return recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public Map<String, Object> getFields() {
        return fields;
    }

    public void setFields(Map<String, Object> fields) {
        this.fields = fields;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}