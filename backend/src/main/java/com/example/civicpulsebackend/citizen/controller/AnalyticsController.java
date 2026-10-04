package com.example.civicpulsebackend.citizen.controller;

import com.example.civicpulsebackend.mongo.service.MongoAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired(required = false)
    private MongoAnalyticsService mongoAnalyticsService;

    @GetMapping("/mongodb-status")
    public Map<String, Object> getMongoDbStatus() {
        if (mongoAnalyticsService != null) {
            return mongoAnalyticsService.getMongoStatus();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("connected", false);
        map.put("databaseType", "In-Memory / H2 (MongoDB Atlas Ready)");
        map.put("message", "Set spring.data.mongodb.uri in application.yml or set MONGODB_URI environment variable to connect to MongoDB Atlas.");
        return map;
    }

    @GetMapping("/executive")
    public Map<String, Object> getExecutiveAnalytics(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        return buildExecutiveResponse(department, ward, dateRange);
    }

    @GetMapping("/services")
    public Map<String, Object> getServiceMetrics(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double factor = getWardFactor(ward) * getDeptFactor(department) * getDateFactor(dateRange);
        int total = (int) Math.round(24700 * factor);
        int resolved = (int) Math.round(total * 0.94);

        Map<String, Object> data = new HashMap<>();
        data.put("totalRequests", total);
        data.put("resolvedRequests", resolved);
        data.put("pendingRequests", total - resolved);
        data.put("inProgressRequests", (int) Math.round((total - resolved) * 0.6));
        data.put("avgResolutionDays", getAvgDays(ward, department));
        data.put("slaCompliancePercentage", getSla(ward, department));

        List<Map<String, Object>> catCounts = Arrays.asList(
            createCategoryCount("Water Supply", (int) Math.round(total * 0.35), 95),
            createCategoryCount("Road Maintenance", (int) Math.round(total * 0.25), 89),
            createCategoryCount("Sanitation & Waste", (int) Math.round(total * 0.24), 97),
            createCategoryCount("Health Services", (int) Math.round(total * 0.16), 91)
        );
        data.put("serviceWisePerformance", catCounts);
        data.put("monthlyTrends", generateMonthlyTrends(ward, department, dateRange));

        return data;
    }

    @GetMapping("/grievances")
    public Map<String, Object> getGrievanceAnalytics(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double factor = getWardFactor(ward) * getDeptFactor(department) * getDateFactor(dateRange);
        int total = (int) Math.round(12400 * factor);
        int resolved = (int) Math.round(total * 0.94);

        Map<String, Object> data = new HashMap<>();
        data.put("totalGrievances", total);
        data.put("resolvedGrievances", resolved);
        data.put("pendingGrievances", total - resolved);
        data.put("rejectedGrievances", (int) Math.round(total * 0.015));
        data.put("escalatedGrievances", (int) Math.round(total * 0.01));
        data.put("overdueComplaintsCount", Math.max(2, (int) Math.round(total * 0.005)));
        data.put("avgResolutionTimeHours", getMttr(ward, department));

        List<Map<String, Object>> catCounts = Arrays.asList(
            createCategoryCount("Street Lights", (int) Math.round(total * 0.35), 96),
            createCategoryCount("Potholes & Pavement", (int) Math.round(total * 0.30), 91),
            createCategoryCount("Garbage Collection", (int) Math.round(total * 0.22), 97),
            createCategoryCount("Water Contamination", (int) Math.round(total * 0.13), 93)
        );
        data.put("grievancesByCategory", catCounts);

        List<Map<String, Object>> overdueList = Arrays.asList(
            createOverdue("1", "GRV-2024-840", "Drainage Blockage in Market Area", "Sanitation", !"ALL".equalsIgnoreCase(ward) ? ward : "Ward 1", 5),
            createOverdue("2", "GRV-2024-845", "Transformer Noise & Low Voltage", "Electricity", !"ALL".equalsIgnoreCase(ward) ? ward : "Ward 3", 3)
        );
        data.put("overdueComplaints", overdueList);

        return data;
    }

    @GetMapping("/revenue")
    public Map<String, Object> getRevenueTracking(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double factor = getWardFactor(ward) * getDeptFactor(department) * getDateFactor(dateRange);
        long total = Math.round(12400000 * factor);

        Map<String, Object> data = new HashMap<>();
        data.put("totalRevenueCollected", total);
        data.put("totalRevenueTarget", (long) (total * 1.2));
        data.put("pendingPayments", (long) (total * 0.18));
        data.put("collectionPercentage", 85);

        List<Map<String, Object>> sources = Arrays.asList(
            createRevenueSource("Property Tax", total * 0.67, total * 0.8, 67),
            createRevenueSource("Trade Licenses", total * 0.23, total * 0.3, 23),
            createRevenueSource("Water Bills & Utilities", total * 0.10, total * 0.15, 10)
        );
        data.put("revenueBySource", sources);

        List<Map<String, Object>> wardMetrics = Arrays.asList(
            createWardMetric("Ward 1", 3400, 4800000 * factor),
            createWardMetric("Ward 2", 2800, 3600000 * factor),
            createWardMetric("Ward 3", 2200, 2200000 * factor),
            createWardMetric("Ward 4", 1600, 1100000 * factor),
            createWardMetric("Ward 5", 1200, 700000 * factor)
        );
        data.put("revenueByWard", wardMetrics);

        return data;
    }

    @GetMapping("/budget")
    public Map<String, Object> getBudgetUtilization(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double factor = getWardFactor(ward) * getDeptFactor(department) * getDateFactor(dateRange);
        long alloc = Math.round(47000000 * factor);
        long exp = Math.round(41000000 * factor);

        Map<String, Object> data = new HashMap<>();
        data.put("totalAllocated", alloc);
        data.put("totalExpenditure", exp);
        data.put("remainingBudget", alloc - exp);
        data.put("utilizationPercentage", 87);

        List<Map<String, Object>> deptBudgets = Arrays.asList(
            createDeptBudget("Public Works & Roads", alloc * 0.38, exp * 0.39, 1800000, 90, false),
            createDeptBudget("Water Supply", alloc * 0.28, exp * 0.28, 1200000, 89, false),
            createDeptBudget("Sanitation & Waste Management", alloc * 0.22, exp * 0.22, 500000, 95, false),
            createDeptBudget("Health & Education", alloc * 0.12, exp * 0.11, 2500000, 78, false)
        );
        data.put("departmentBudgets", deptBudgets);
        data.put("overBudgetDepartments", Collections.emptyList());

        return data;
    }

    @GetMapping("/department-performance")
    public Map<String, Object> getDepartmentPerformance(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double factor = getWardFactor(ward) * getDateFactor(dateRange);
        Map<String, Object> data = new HashMap<>();
        List<Map<String, Object>> depts = Arrays.asList(
            createDept("Water Supply", (int) Math.round(8450 * factor), (int) Math.round(7943 * factor), 507, 94.5, 2.1, 95.0, 4.8),
            createDept("Public Works & Roads", (int) Math.round(6200 * factor), (int) Math.round(5642 * factor), 558, 91.0, 3.2, 89.0, 4.2),
            createDept("Sanitation & Waste", (int) Math.round(5800 * factor), (int) Math.round(5568 * factor), 232, 96.0, 1.2, 97.0, 4.6),
            createDept("Health & Education", (int) Math.round(4250 * factor), (int) Math.round(3782 * factor), 468, 89.0, 2.5, 91.0, 4.7)
        );
        data.put("departments", depts);

        return data;
    }

    @GetMapping("/citizen-satisfaction")
    public Map<String, Object> getCitizenSatisfaction(
            @RequestParam(defaultValue = "ALL") String department,
            @RequestParam(defaultValue = "ALL") String ward,
            @RequestParam(defaultValue = "ALL") String dateRange) {
        
        double rating = getSatisfaction(ward, department);
        Map<String, Object> data = new HashMap<>();
        data.put("overallRating", rating);
        data.put("ratingLabel", rating >= 4.7 ? "Exceptional Citizen Trust" : "Strong Civic Satisfaction");
        data.put("complaintsReductionPct", 23);
        data.put("serviceUsageGrowthPct", 47);

        List<Map<String, Object>> deptRatings = Arrays.asList(
            createDeptRating("Water Supply", 4.8, 1200),
            createDeptRating("Health & Education", 4.7, 850),
            createDeptRating("Sanitation & Waste", 4.6, 940),
            createDeptRating("Public Works & Roads", 4.2, 1100)
        );
        data.put("departmentRatings", deptRatings);

        List<Map<String, Object>> feedbacks = Arrays.asList(
            createFeedback("Ramesh Kumar", !"ALL".equalsIgnoreCase(department) ? department : "Water Supply", "New Connection", 5, "POSITIVE", "Water pipeline connection completed in 24 hours. Great service!", "2024-09-28"),
            createFeedback("Priya Sharma", !"ALL".equalsIgnoreCase(department) ? department : "Health", "Birth Certificate", 5, "POSITIVE", "Online birth certificate issued smoothly within SLA timeframe.", "2024-09-27"),
            createFeedback("Sunil Verma", !"ALL".equalsIgnoreCase(department) ? department : "Public Works", "Road Pothole", 4, "POSITIVE", "Pothole filled quickly after reporting on portal.", "2024-09-26")
        );
        data.put("feedbackSummaries", feedbacks);

        return data;
    }

    private Map<String, Object> buildExecutiveResponse(String dept, String ward, String dateRange) {
        Map<String, Object> data = new HashMap<>();
        double factor = getWardFactor(ward) * getDeptFactor(dept) * getDateFactor(dateRange);

        if (!"ALL".equalsIgnoreCase(ward)) {
            // Ward specific distinct values
            double sat = getSatisfaction(ward, dept);
            int sla = getSla(ward, dept);
            double rev = getWardRevenue(ward) * getDateFactor(dateRange);
            double alloc = getWardAlloc(ward) * getDateFactor(dateRange);
            double util = alloc * 0.88;
            int totalReq = (int) Math.round(24700 * getWardFactor(ward) * getDateFactor(dateRange));

            data.put("citizenSatisfactionRating", String.format(Locale.US, "%.1f/5", sat));
            data.put("serviceSlaPercentage", sla + "%");
            data.put("totalRevenueCollected", String.format(Locale.US, "₹%.1fM", rev));
            data.put("totalAllocatedBudget", String.format(Locale.US, "₹%.1fM", alloc));
            data.put("totalBudgetUtilized", String.format(Locale.US, "₹%.1fM", util));
            data.put("budgetUtilizationPercentage", "88%");
            data.put("servicesSummary", ward + ": " + String.format(Locale.US, "%.1fK requests | %d%% resolved | Avg %.1f days", totalReq / 1000.0, sla, getAvgDays(ward, dept)));
            data.put("grievancesSummary", ward + ": " + String.format(Locale.US, "%.1fK filed | %d%% resolved | MTTR %d hrs", (totalReq * 0.45) / 1000.0, sla, getMttr(ward, dept)));
            data.put("revenueSummary", ward + ": " + String.format(Locale.US, "₹%.1fM | Property Tax 68%% | Licenses 22%%", rev));
            data.put("budgetSummary", String.format(Locale.US, "₹%.1fM allocated | ₹%.1fM utilized | 88%%", alloc, util));
            data.put("departmentsSummary", ward + " Water: 95% | Sanitation: 96% | Roads: 89%");
            data.put("citizenSatSummary", String.format(Locale.US, "%.1f/5 | Complaints ↓ 22%% | Services ↑ 45%%", sat));
        } else if (!"ALL".equalsIgnoreCase(dept)) {
            // Department specific distinct values
            double sat = getDeptRatingVal(dept);
            int sla = getDeptSlaVal(dept);
            double rev = (12.4 * getDeptRevShare(dept) * getDateFactor(dateRange));
            double alloc = 18.0 * getDeptFactor(dept) * getDateFactor(dateRange);
            double util = alloc * 0.90;
            int totalReq = (int) Math.round(24700 * getDeptFactor(dept) * getDateFactor(dateRange));

            data.put("citizenSatisfactionRating", String.format(Locale.US, "%.1f/5", sat));
            data.put("serviceSlaPercentage", sla + "%");
            data.put("totalRevenueCollected", String.format(Locale.US, "₹%.1fM", rev));
            data.put("totalAllocatedBudget", String.format(Locale.US, "₹%.1fM", alloc));
            data.put("totalBudgetUtilized", String.format(Locale.US, "₹%.1fM", util));
            data.put("budgetUtilizationPercentage", "90%");
            data.put("servicesSummary", dept + ": " + String.format(Locale.US, "%.1fK requests | %d%% resolved | Avg %.1f days", totalReq / 1000.0, sla, getAvgDays(ward, dept)));
            data.put("grievancesSummary", dept + ": " + String.format(Locale.US, "%d filed | %d%% resolved | MTTR %d hrs", (int) Math.round(totalReq * 0.45), sla, getMttr(ward, dept)));
            data.put("revenueSummary", dept + ": " + String.format(Locale.US, "₹%.1fM collected | Operational Revenue", rev));
            data.put("budgetSummary", String.format(Locale.US, "₹%.1fM allocated | ₹%.1fM utilized | 90%%", alloc, util));
            data.put("departmentsSummary", dept + " SLA: " + sla + "% | Satisfaction: " + sat + "/5");
            data.put("citizenSatSummary", String.format(Locale.US, "%.1f/5 | Complaints ↓ 25%% | Services ↑ 50%%", sat));
        } else {
            // City-wide consolidated
            double rev = 12.4 * getDateFactor(dateRange);
            double alloc = 47.0 * getDateFactor(dateRange);
            double util = 41.0 * getDateFactor(dateRange);
            int totalReq = (int) Math.round(24700 * getDateFactor(dateRange));

            data.put("citizenSatisfactionRating", "4.7/5");
            data.put("serviceSlaPercentage", "94%");
            data.put("totalRevenueCollected", String.format(Locale.US, "₹%.1fM", rev));
            data.put("totalAllocatedBudget", String.format(Locale.US, "₹%.1fM", alloc));
            data.put("totalBudgetUtilized", String.format(Locale.US, "₹%.1fM", util));
            data.put("budgetUtilizationPercentage", "87%");
            data.put("servicesSummary", String.format(Locale.US, "%.1fK requests | 94%% resolved | Avg 2.4 days", totalReq / 1000.0));
            data.put("grievancesSummary", String.format(Locale.US, "%.1fK filed | 94%% resolved | MTTR 47 hrs", (12400 * getDateFactor(dateRange)) / 1000.0));
            data.put("revenueSummary", String.format(Locale.US, "₹%.1fM | Property Tax 67%% | Licenses 23%%", rev));
            data.put("budgetSummary", String.format(Locale.US, "₹%.1fM allocated | ₹%.1fM utilized | 87%%", alloc, util));
            data.put("departmentsSummary", "Water 94% | Health 91% | Education 89%");
            data.put("citizenSatSummary", "4.7/5 | Complaints ↓ 23% | Services ↑ 47%");
        }

        data.put("monthlyTrends", generateMonthlyTrends(ward, dept, dateRange));

        List<Map<String, Object>> depts = Arrays.asList(
            createDept("Water Supply", (int) Math.round(8450 * factor), (int) Math.round(7943 * factor), 507, 94.5, 2.1, 95.0, 4.8),
            createDept("Public Works & Roads", (int) Math.round(6200 * factor), (int) Math.round(5642 * factor), 558, 91.0, 3.2, 89.0, 4.2),
            createDept("Sanitation & Waste", (int) Math.round(5800 * factor), (int) Math.round(5568 * factor), 232, 96.0, 1.2, 97.0, 4.6),
            createDept("Health & Education", (int) Math.round(4250 * factor), (int) Math.round(3782 * factor), 468, 89.0, 2.5, 91.0, 4.7)
        );
        data.put("departmentSummaries", depts);

        List<Map<String, Object>> activities = Arrays.asList(
            createActivity("ACT-01", "Grievance", !"ALL".equalsIgnoreCase(ward) ? "Street light fixed on main boulevard in " + ward : "Street Light Fault resolved in Ward 2", "Public Works", "RESOLVED", "10 mins ago"),
            createActivity("ACT-02", "Application", !"ALL".equalsIgnoreCase(ward) ? "Water meter inspection approved in " + ward : "Birth Certificate approved for Priya Sharma", "Health", "APPROVED", "25 mins ago"),
            createActivity("ACT-03", "Revenue", !"ALL".equalsIgnoreCase(ward) ? "₹24,500 Tax payment received in " + ward : "₹15,000 Property Tax collected in Ward 1", "Finance", "SUCCESS", "1 hour ago")
        );
        data.put("recentActivities", activities);

        return data;
    }

    private List<Map<String, Object>> generateMonthlyTrends(String ward, String dept, String dateRange) {
        double wFactor = getWardFactor(ward);
        double dFactor = getDeptFactor(dept);
        double dtFactor = getDateFactor(dateRange);

        // Different curve patterns based on ward selection
        int wNum = 0;
        if (ward.contains("1")) wNum = 1;
        else if (ward.contains("2")) wNum = 2;
        else if (ward.contains("3")) wNum = 3;
        else if (ward.contains("4")) wNum = 4;
        else if (ward.contains("5")) wNum = 5;

        int[] baseReq = switch (wNum) {
            case 1 -> new int[]{580, 690, 880, 720, 810, 950};
            case 2 -> new int[]{420, 480, 510, 530, 560, 610};
            case 3 -> new int[]{390, 440, 490, 460, 580, 640};
            case 4 -> new int[]{280, 310, 360, 340, 420, 460};
            case 5 -> new int[]{180, 210, 260, 240, 310, 350};
            default -> new int[]{1850, 2100, 2400, 2200, 2600, 2850};
        };

        int[] baseRes = switch (wNum) {
            case 1 -> new int[]{540, 640, 830, 670, 760, 890};
            case 2 -> new int[]{410, 470, 495, 520, 545, 595};
            case 3 -> new int[]{340, 385, 420, 400, 490, 550};
            case 4 -> new int[]{260, 285, 330, 310, 380, 425};
            case 5 -> new int[]{160, 185, 230, 210, 270, 310};
            default -> new int[]{1720, 1980, 2250, 2080, 2450, 2680};
        };

        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        List<Map<String, Object>> list = new ArrayList<>();
        for (int i = 0; i < months.length; i++) {
            int req = (int) Math.round(baseReq[i] * (wNum == 0 ? dFactor : 1.0) * (dateRange.equals("LAST_30") ? 0.35 : 1.0));
            int res = (int) Math.round(baseRes[i] * (wNum == 0 ? dFactor : 1.0) * (dateRange.equals("LAST_30") ? 0.35 : 1.0));
            list.add(createTrend(months[i], req, res, req * 450.0, res * 1200.0));
        }
        return list;
    }

    private double getWardFactor(String ward) {
        if ("ALL".equalsIgnoreCase(ward)) return 1.0;
        if (ward.contains("1")) return 0.31;
        if (ward.contains("2")) return 0.23;
        if (ward.contains("3")) return 0.20;
        if (ward.contains("4")) return 0.15;
        if (ward.contains("5")) return 0.11;
        return 1.0;
    }

    private double getDeptFactor(String dept) {
        if ("ALL".equalsIgnoreCase(dept)) return 1.0;
        if (dept.contains("Water")) return 0.34;
        if (dept.contains("Works") || dept.contains("Road")) return 0.25;
        if (dept.contains("Sanitation")) return 0.24;
        if (dept.contains("Health")) return 0.17;
        if (dept.contains("Commercial")) return 0.12;
        if (dept.contains("Finance")) return 0.14;
        return 1.0;
    }

    private double getDateFactor(String dt) {
        if ("LAST_30".equalsIgnoreCase(dt)) return 0.22;
        if ("LAST_90".equalsIgnoreCase(dt)) return 0.52;
        if ("THIS_YEAR".equalsIgnoreCase(dt)) return 0.94;
        return 1.0;
    }

    private double getSatisfaction(String ward, String dept) {
        if (ward.contains("2")) return 4.9;
        if (ward.contains("1")) return 4.6;
        if (ward.contains("4")) return 4.5;
        if (ward.contains("5")) return 4.3;
        if (ward.contains("3")) return 4.2;
        return getDeptRatingVal(dept);
    }

    private int getSla(String ward, String dept) {
        if (ward.contains("2")) return 97;
        if (ward.contains("1")) return 94;
        if (ward.contains("4")) return 92;
        if (ward.contains("5")) return 89;
        if (ward.contains("3")) return 88;
        return getDeptSlaVal(dept);
    }

    private double getAvgDays(String ward, String dept) {
        if (ward.contains("2")) return 1.6;
        if (ward.contains("1")) return 2.3;
        if (ward.contains("4")) return 2.5;
        if (ward.contains("5")) return 3.2;
        if (ward.contains("3")) return 3.8;
        return 2.4;
    }

    private int getMttr(String ward, String dept) {
        if (ward.contains("2")) return 28;
        if (ward.contains("1")) return 42;
        if (ward.contains("4")) return 46;
        if (ward.contains("5")) return 54;
        if (ward.contains("3")) return 64;
        return 47;
    }

    private double getWardRevenue(String ward) {
        if (ward.contains("1")) return 4.8;
        if (ward.contains("2")) return 3.6;
        if (ward.contains("3")) return 2.2;
        if (ward.contains("4")) return 1.1;
        if (ward.contains("5")) return 0.7;
        return 12.4;
    }

    private double getWardAlloc(String ward) {
        if (ward.contains("1")) return 14.2;
        if (ward.contains("2")) return 10.5;
        if (ward.contains("3")) return 8.8;
        if (ward.contains("4")) return 7.5;
        if (ward.contains("5")) return 6.0;
        return 47.0;
    }

    private double getDeptRatingVal(String dept) {
        if (dept.contains("Water")) return 4.8;
        if (dept.contains("Sanitation")) return 4.6;
        if (dept.contains("Works") || dept.contains("Road")) return 4.2;
        if (dept.contains("Health")) return 4.7;
        if (dept.contains("Commercial")) return 4.5;
        if (dept.contains("Finance")) return 4.8;
        return 4.7;
    }

    private int getDeptSlaVal(String dept) {
        if (dept.contains("Water")) return 95;
        if (dept.contains("Sanitation")) return 97;
        if (dept.contains("Works") || dept.contains("Road")) return 89;
        if (dept.contains("Health")) return 91;
        if (dept.contains("Commercial")) return 93;
        if (dept.contains("Finance")) return 96;
        return 94;
    }

    private double getDeptRevShare(String dept) {
        if (dept.contains("Finance")) return 0.67;
        if (dept.contains("Commercial")) return 0.23;
        if (dept.contains("Water")) return 0.15;
        if (dept.contains("Works")) return 0.28;
        if (dept.contains("Sanitation")) return 0.08;
        return 0.10;
    }

    private Map<String, Object> createTrend(String month, int req, int res, double rev, double exp) {
        Map<String, Object> map = new HashMap<>();
        map.put("month", month);
        map.put("requests", req);
        map.put("resolved", res);
        map.put("revenue", rev);
        map.put("expenditure", exp);
        return map;
    }

    private Map<String, Object> createDept(String dept, int req, int res, int pend, double rate, double avgDays, double sla, double sat) {
        Map<String, Object> map = new HashMap<>();
        map.put("department", dept);
        map.put("totalRequests", req);
        map.put("resolvedRequests", res);
        map.put("pendingWorkload", pend);
        map.put("resolutionRate", rate);
        map.put("avgProcessingDays", avgDays);
        map.put("slaCompliancePct", sla);
        map.put("satisfactionRating", sat);
        return map;
    }

    private Map<String, Object> createActivity(String id, String type, String desc, String dept, String status, String time) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("type", type);
        map.put("description", desc);
        map.put("department", dept);
        map.put("status", status);
        map.put("timestamp", time);
        return map;
    }

    private Map<String, Object> createCategoryCount(String cat, int count, int rate) {
        Map<String, Object> map = new HashMap<>();
        map.put("category", cat);
        map.put("count", count);
        map.put("resolutionRate", rate);
        return map;
    }

    private Map<String, Object> createOverdue(String id, String num, String title, String dept, String ward, int days) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("trackingNumber", num);
        map.put("title", title);
        map.put("department", dept);
        map.put("ward", ward);
        map.put("overdueDays", days);
        return map;
    }

    private Map<String, Object> createRevenueSource(String src, double amt, double tgt, double share) {
        Map<String, Object> map = new HashMap<>();
        map.put("source", src);
        map.put("amount", amt);
        map.put("target", tgt);
        map.put("percentageShare", share);
        return map;
    }

    private Map<String, Object> createWardMetric(String ward, int count, double amt) {
        Map<String, Object> map = new HashMap<>();
        map.put("ward", ward);
        map.put("totalCount", count);
        map.put("amount", amt);
        return map;
    }

    private Map<String, Object> createDeptBudget(String dept, double alloc, double exp, double rem, double pct, boolean over) {
        Map<String, Object> map = new HashMap<>();
        map.put("department", dept);
        map.put("allocated", alloc);
        map.put("expenditure", exp);
        map.put("remaining", rem);
        map.put("utilizationPct", pct);
        map.put("isOverBudget", over);
        return map;
    }

    private Map<String, Object> createDeptRating(String dept, double rating, int count) {
        Map<String, Object> map = new HashMap<>();
        map.put("department", dept);
        map.put("rating", rating);
        map.put("feedbackCount", count);
        return map;
    }

    private Map<String, Object> createFeedback(String name, String dept, String svc, int rating, String sent, String comment, String date) {
        Map<String, Object> map = new HashMap<>();
        map.put("citizenName", name);
        map.put("department", dept);
        map.put("serviceType", svc);
        map.put("rating", rating);
        map.put("sentiment", sent);
        map.put("comment", comment);
        map.put("date", date);
        return map;
    }
}
