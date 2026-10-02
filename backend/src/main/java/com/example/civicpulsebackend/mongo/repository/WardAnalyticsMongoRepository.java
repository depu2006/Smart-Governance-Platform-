package com.example.civicpulsebackend.mongo.repository;

import com.example.civicpulsebackend.mongo.entity.WardAnalyticsDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface WardAnalyticsMongoRepository extends MongoRepository<WardAnalyticsDocument, String> {
    Optional<WardAnalyticsDocument> findByWardNameAndDepartmentAndDateRange(String wardName, String department, String dateRange);
    List<WardAnalyticsDocument> findByWardName(String wardName);
}
