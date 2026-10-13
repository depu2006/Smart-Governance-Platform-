package com.example.civicpulsebackend.mongo.repository;

import com.example.civicpulsebackend.mongo.entity.OperationalRecordDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OperationalRecordMongoRepository extends MongoRepository<OperationalRecordDocument, String> {
    List<OperationalRecordDocument> findAllByRecordTypeOrderByUpdatedAtDesc(String recordType);

    Optional<OperationalRecordDocument> findByRecordTypeAndRecordId(String recordType, String recordId);
}