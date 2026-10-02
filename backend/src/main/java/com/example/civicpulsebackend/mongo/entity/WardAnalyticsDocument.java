package com.example.civicpulsebackend.mongo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "ward_analytics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WardAnalyticsDocument {

    @Id
    private String id;

    private String wardName;
    private String department;
    private String dateRange;

    private int totalRequests;
    private int resolvedRequests;
    private int pendingRequests;
    private int inProgressRequests;
    private int slaCompliancePercentage;
    private double citizenSatisfactionRating;

    private double totalRevenueCollected;
    private double totalAllocatedBudget;
    private double totalBudgetUtilized;
    private int budgetUtilizationPercentage;

    private String servicesSummary;
    private String grievancesSummary;
    private String revenueSummary;
    private String budgetSummary;
    private String departmentsSummary;
    private String citizenSatSummary;

    private List<Map<String, Object>> monthlyTrends;
    private List<Map<String, Object>> departmentBreakdown;
    private List<Map<String, Object>> recentActivities;
    private List<Map<String, Object>> grievancesByCategory;
    private List<Map<String, Object>> overdueComplaints;

    private Date lastUpdated;
}
