package com.example.civicpulsebackend.mongo.service;

import com.example.civicpulsebackend.mongo.entity.WardAnalyticsDocument;
import com.example.civicpulsebackend.mongo.repository.WardAnalyticsMongoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MongoAnalyticsService {

    @Autowired(required = false)
    private WardAnalyticsMongoRepository mongoRepository;

    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    public boolean isMongoConnected() {
        if (mongoTemplate == null) return false;
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Map<String, Object> getMongoStatus() {
        Map<String, Object> status = new HashMap<>();
        boolean connected = isMongoConnected();
        status.put("connected", connected);
        status.put("databaseType", connected ? "MongoDB Atlas" : "In-Memory Ward Store (MongoDB Atlas Ready)");
        if (connected && mongoRepository != null) {
            status.put("totalWardRecords", mongoRepository.count());
            status.put("databaseName", mongoTemplate.getDb().getName());
        } else {
            status.put("totalWardRecords", 5);
        }
        return status;
    }

    @PostConstruct
    public void seedInitialWardDataIfConnected() {
        if (!isMongoConnected() || mongoRepository == null) return;
        try {
            if (mongoRepository.count() == 0) {
                System.out.println(">>> Seeding Ward Analytics documents into MongoDB Atlas collection 'ward_analytics'...");
                
                String[] wards = {"Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"};
                double[] revenues = {4.8, 3.6, 2.2, 1.1, 0.7};
                int[] requests = {7800, 5600, 4900, 3800, 2600};
                int[] slas = {94, 97, 88, 92, 89};
                double[] ratings = {4.6, 4.9, 4.2, 4.5, 4.3};

                for (int i = 0; i < wards.length; i++) {
                    WardAnalyticsDocument doc = WardAnalyticsDocument.builder()
                            .wardName(wards[i])
                            .department("ALL")
                            .dateRange("ALL")
                            .totalRequests(requests[i])
                            .resolvedRequests((int) (requests[i] * 0.94))
                            .pendingRequests(requests[i] - (int) (requests[i] * 0.94))
                            .slaCompliancePercentage(slas[i])
                            .citizenSatisfactionRating(ratings[i])
                            .totalRevenueCollected(revenues[i] * 1000000)
                            .totalAllocatedBudget(14.2 * 1000000)
                            .totalBudgetUtilized(12.5 * 1000000)
                            .budgetUtilizationPercentage(88)
                            .servicesSummary(wards[i] + ": " + (requests[i] / 1000.0) + "K requests | " + slas[i] + "% resolved")
                            .grievancesSummary(wards[i] + ": " + (requests[i] * 0.45 / 1000.0) + "K filed | " + slas[i] + "% resolved")
                            .revenueSummary(wards[i] + ": $" + revenues[i] + "M collected")
                            .budgetSummary("$14.2M allocated | $12.5M utilized | 88%")
                            .lastUpdated(new Date())
                            .build();

                    mongoRepository.save(doc);
                }
                System.out.println(">>> Successfully seeded 5 Ward Analytics documents in MongoDB Atlas!");
            }
        } catch (Exception e) {
            System.err.println("Notice: MongoDB Atlas seeding: " + e.getMessage());
        }
    }
}
