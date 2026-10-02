// Centralized Ward Data Store with distinct profiles for all municipal wards and departments
export const WARD_DATA_STORE = {
  'Ward 1': {
    name: 'Ward 1 (Central Commercial & Heritage District)',
    baseRequests: 7800,
    resolvedRequests: 7300,
    resolutionRate: 93.6,
    slaCompliance: 94,
    avgDays: 2.3,
    mttrHours: 42,
    satisfaction: 4.6,
    complaintTrend: '↓ 18%',
    serviceTrend: '↑ 38%',
    revenue: 4.8, // in Millions
    propertyTaxPct: 72,
    licensesPct: 22,
    budgetAllocated: 14.2,
    budgetUtilized: 12.5,
    budgetPct: 88,
    deptPerformance: 'Commercial 95% | Water 94% | Sanitation 92% | Roads 89%',
    monthlyTrends: [
      { month: 'Jan', requests: 580, resolved: 540, revenue: 380000, expenditure: 950000 },
      { month: 'Feb', requests: 690, resolved: 640, revenue: 420000, expenditure: 1020000 },
      { month: 'Mar', requests: 880, resolved: 830, revenue: 580000, expenditure: 1180000 },
      { month: 'Apr', requests: 720, resolved: 670, revenue: 410000, expenditure: 1050000 },
      { month: 'May', requests: 810, resolved: 760, revenue: 520000, expenditure: 1120000 },
      { month: 'Jun', requests: 950, resolved: 890, revenue: 640000, expenditure: 1250000 },
    ],
    serviceWise: [
      { category: 'Commercial Licenses', count: 3200, resolutionRate: 95 },
      { category: 'Property Tax', count: 2100, resolutionRate: 97 },
      { category: 'Water Supply', count: 1400, resolutionRate: 93 },
      { category: 'Road Maintenance', count: 1100, resolutionRate: 88 }
    ],
    grievances: [
      { category: 'Commercial Signage', count: 980, resolutionRate: 94 },
      { category: 'Traffic Congestion', count: 850, resolutionRate: 91 },
      { category: 'Night Waste Collection', count: 720, resolutionRate: 96 },
      { category: 'Pipeline Leakage', count: 350, resolutionRate: 92 }
    ],
    activities: [
      { id: 'ACT-W1-01', type: 'Revenue', description: '$42,000 Commercial Tax received from Central Market plaza', department: 'Finance & Tax', status: 'SUCCESS', timestamp: '8 mins ago' },
      { id: 'ACT-W1-02', type: 'Grievance', description: 'Heritage road pavers restored near Clock Tower', department: 'Public Works & Roads', status: 'RESOLVED', timestamp: '24 mins ago' },
      { id: 'ACT-W1-03', type: 'Application', description: 'Trade License approved for Hotel Royal Heritage', department: 'Commercial Licensing', status: 'APPROVED', timestamp: '1 hour ago' }
    ]
  },

  'Ward 2': {
    name: 'Ward 2 (North Tech Park & Eco-Residential Zone)',
    baseRequests: 5600,
    resolvedRequests: 5400,
    resolutionRate: 96.4,
    slaCompliance: 97,
    avgDays: 1.6,
    mttrHours: 28,
    satisfaction: 4.9,
    complaintTrend: '↓ 34%',
    serviceTrend: '↑ 58%',
    revenue: 3.6,
    propertyTaxPct: 65,
    licensesPct: 25,
    budgetAllocated: 10.5,
    budgetUtilized: 9.1,
    budgetPct: 87,
    deptPerformance: 'Water 98% | Health 96% | Sanitation 97% | Roads 93%',
    monthlyTrends: [
      { month: 'Jan', requests: 420, resolved: 410, revenue: 260000, expenditure: 680000 },
      { month: 'Feb', requests: 480, resolved: 470, revenue: 290000, expenditure: 720000 },
      { month: 'Mar', requests: 510, resolved: 495, revenue: 340000, expenditure: 780000 },
      { month: 'Apr', requests: 530, resolved: 520, revenue: 310000, expenditure: 750000 },
      { month: 'May', requests: 560, resolved: 545, revenue: 350000, expenditure: 810000 },
      { month: 'Jun', requests: 610, resolved: 595, revenue: 410000, expenditure: 860000 },
    ],
    serviceWise: [
      { category: 'Water Supply', count: 2400, resolutionRate: 98 },
      { category: 'Digital Certificates', count: 1600, resolutionRate: 99 },
      { category: 'Sanitation', count: 1100, resolutionRate: 97 },
      { category: 'Solar Streetlights', count: 500, resolutionRate: 95 }
    ],
    grievances: [
      { category: 'Streetlight Sensor', count: 320, resolutionRate: 98 },
      { category: 'Green Waste Pickup', count: 280, resolutionRate: 97 },
      { category: 'Smart Water Meter', count: 190, resolutionRate: 96 },
      { category: 'Noise at Night', count: 110, resolutionRate: 94 }
    ],
    activities: [
      { id: 'ACT-W2-01', type: 'Application', description: 'Fast-track digital Birth Certificate issued in 45 mins', department: 'Health & Education', status: 'APPROVED', timestamp: '5 mins ago' },
      { id: 'ACT-W2-02', type: 'Grievance', description: 'Smart solar streetlight sensor replaced in Eco Tech Corridor', department: 'Public Works & Roads', status: 'RESOLVED', timestamp: '18 mins ago' },
      { id: 'ACT-W2-03', type: 'Service', description: 'Automated 24/7 potable water telemetry alert cleared', department: 'Water Supply', status: 'SUCCESS', timestamp: '40 mins ago' }
    ]
  },

  'Ward 3': {
    name: 'Ward 3 (East Industrial Corridor & Freight Depot)',
    baseRequests: 4900,
    resolvedRequests: 4300,
    resolutionRate: 87.7,
    slaCompliance: 88,
    avgDays: 3.8,
    mttrHours: 64,
    satisfaction: 4.2,
    complaintTrend: '↓ 12%',
    serviceTrend: '↑ 29%',
    revenue: 2.2,
    propertyTaxPct: 58,
    licensesPct: 32,
    budgetAllocated: 8.8,
    budgetUtilized: 7.9,
    budgetPct: 90,
    deptPerformance: 'Sanitation 91% | Roads 86% | Water 89% | Pollution 84%',
    monthlyTrends: [
      { month: 'Jan', requests: 390, resolved: 340, revenue: 160000, expenditure: 590000 },
      { month: 'Feb', requests: 440, resolved: 385, revenue: 190000, expenditure: 640000 },
      { month: 'Mar', requests: 490, resolved: 420, revenue: 230000, expenditure: 710000 },
      { month: 'Apr', requests: 460, resolved: 400, revenue: 180000, expenditure: 680000 },
      { month: 'May', requests: 580, resolved: 490, revenue: 260000, expenditure: 820000 },
      { month: 'Jun', requests: 640, resolved: 550, revenue: 290000, expenditure: 890000 },
    ],
    serviceWise: [
      { category: 'Heavy Road Repair', count: 2100, resolutionRate: 86 },
      { category: 'Industrial Drainage', count: 1500, resolutionRate: 89 },
      { category: 'Hazardous Waste', count: 800, resolutionRate: 92 },
      { category: 'Factory Licensing', count: 500, resolutionRate: 85 }
    ],
    grievances: [
      { category: 'Potholes on Truck Route', count: 910, resolutionRate: 85 },
      { category: 'Chemical Drain Blockage', count: 680, resolutionRate: 88 },
      { category: 'High-Tension Transformer', count: 420, resolutionRate: 90 },
      { category: 'Industrial Dust Emission', count: 310, resolutionRate: 82 }
    ],
    activities: [
      { id: 'ACT-W3-01', type: 'Grievance', description: 'Freight bypass bitumen asphalt patching finished', department: 'Public Works & Roads', status: 'RESOLVED', timestamp: '12 mins ago' },
      { id: 'ACT-W3-02', type: 'Service', description: 'Stormwater culvert desilting completed before monsoon', department: 'Sanitation & Waste', status: 'SUCCESS', timestamp: '35 mins ago' },
      { id: 'ACT-W3-03', type: 'Application', description: 'Factory environmental safety clearance renewed', department: 'Commercial Licensing', status: 'APPROVED', timestamp: '2 hours ago' }
    ]
  },

  'Ward 4': {
    name: 'Ward 4 (South Green Valley & University Suburb)',
    baseRequests: 3800,
    resolvedRequests: 3500,
    resolutionRate: 92.1,
    slaCompliance: 92,
    avgDays: 2.5,
    mttrHours: 46,
    satisfaction: 4.5,
    complaintTrend: '↓ 22%',
    serviceTrend: '↑ 44%',
    revenue: 1.1,
    propertyTaxPct: 62,
    licensesPct: 20,
    budgetAllocated: 7.5,
    budgetUtilized: 6.2,
    budgetPct: 83,
    deptPerformance: 'Education 96% | Water 92% | Sanitation 93% | Roads 89%',
    monthlyTrends: [
      { month: 'Jan', requests: 280, resolved: 260, revenue: 80000, expenditure: 460000 },
      { month: 'Feb', requests: 310, resolved: 285, revenue: 95000, expenditure: 490000 },
      { month: 'Mar', requests: 360, resolved: 330, revenue: 120000, expenditure: 540000 },
      { month: 'Apr', requests: 340, resolved: 310, revenue: 90000, expenditure: 510000 },
      { month: 'May', requests: 420, resolved: 380, revenue: 130000, expenditure: 590000 },
      { month: 'Jun', requests: 460, resolved: 425, revenue: 150000, expenditure: 640000 },
    ],
    serviceWise: [
      { category: 'Water Pipeline Expansion', count: 1800, resolutionRate: 92 },
      { category: 'Campus Sanitation', count: 1100, resolutionRate: 95 },
      { category: 'Pedestrian Pathways', count: 600, resolutionRate: 90 },
      { category: 'Youth Welfare', count: 300, resolutionRate: 96 }
    ],
    grievances: [
      { category: 'Campus Bus Stop Shelter', count: 420, resolutionRate: 93 },
      { category: 'Street Dogs Vaccination', count: 380, resolutionRate: 91 },
      { category: 'Low Water Pressure', count: 310, resolutionRate: 90 },
      { category: 'Fallen Tree Branch', count: 190, resolutionRate: 98 }
    ],
    activities: [
      { id: 'ACT-W4-01', type: 'Service', description: 'Suburban water feeder pipeline joined to South reservoir', department: 'Water Supply', status: 'SUCCESS', timestamp: '15 mins ago' },
      { id: 'ACT-W4-02', type: 'Grievance', description: 'University avenue solar LED lighting pole connected', department: 'Public Works & Roads', status: 'RESOLVED', timestamp: '45 mins ago' },
      { id: 'ACT-W4-03', type: 'Revenue', description: '$18,500 University campus property assessment logged', department: 'Finance & Tax', status: 'SUCCESS', timestamp: '3 hours ago' }
    ]
  },

  'Ward 5': {
    name: 'Ward 5 (West Growth Corridor & Peri-Urban Expansion)',
    baseRequests: 2600,
    resolvedRequests: 2300,
    resolutionRate: 88.5,
    slaCompliance: 89,
    avgDays: 3.2,
    mttrHours: 54,
    satisfaction: 4.3,
    complaintTrend: '↓ 20%',
    serviceTrend: '↑ 62%',
    revenue: 0.7,
    propertyTaxPct: 54,
    licensesPct: 24,
    budgetAllocated: 6.0,
    budgetUtilized: 5.3,
    budgetPct: 88,
    deptPerformance: 'Roads 88% | Water 89% | Sanitation 90% | Electricity 87%',
    monthlyTrends: [
      { month: 'Jan', requests: 180, resolved: 160, revenue: 50000, expenditure: 390000 },
      { month: 'Feb', requests: 210, resolved: 185, revenue: 65000, expenditure: 420000 },
      { month: 'Mar', requests: 260, resolved: 230, revenue: 85000, expenditure: 480000 },
      { month: 'Apr', requests: 240, resolved: 210, revenue: 60000, expenditure: 450000 },
      { month: 'May', requests: 310, resolved: 270, revenue: 95000, expenditure: 540000 },
      { month: 'Jun', requests: 350, resolved: 310, revenue: 110000, expenditure: 590000 },
    ],
    serviceWise: [
      { category: 'New Road Paving', count: 1200, resolutionRate: 88 },
      { category: 'Water Tanker Logistics', count: 800, resolutionRate: 91 },
      { category: 'Rural Waste Hub', count: 400, resolutionRate: 89 },
      { category: 'Agricultural Permit', count: 200, resolutionRate: 94 }
    ],
    grievances: [
      { category: 'Unpaved Mud Track', count: 480, resolutionRate: 86 },
      { category: 'Water Delivery Delay', count: 360, resolutionRate: 89 },
      { category: 'Transformer Low Voltage', count: 240, resolutionRate: 87 },
      { category: 'Stray Cattle Hazard', count: 140, resolutionRate: 92 }
    ],
    activities: [
      { id: 'ACT-W5-01', type: 'Service', description: 'West corridor gravel leveling and drainage laying initiated', department: 'Public Works & Roads', status: 'RESOLVED', timestamp: '14 mins ago' },
      { id: 'ACT-W5-02', type: 'Grievance', description: 'Rural drinking water tanker route optimized with GPS', department: 'Water Supply', status: 'SUCCESS', timestamp: '1 hour ago' },
      { id: 'ACT-W5-03', type: 'Application', description: 'New residential construction permit sanctioned', department: 'Commercial Licensing', status: 'APPROVED', timestamp: '2 hours ago' }
    ]
  }
};

// Department multipliers when a single department is selected
export const DEPT_PROFILES = {
  'Water Supply': {
    name: 'Water Supply & Sewerage',
    reqShare: 0.34,
    sla: 95,
    resRate: 94.2,
    avgDays: 2.1,
    rating: 4.8,
    revShare: 0.15,
    budgetAllocated: 12.0,
    budgetUtilized: 10.8,
    summary: 'Water Supply: 8.4K requests | 94% resolved | Avg 2.1 days',
    complaintTrend: '↓ 26%',
    serviceTrend: '↑ 49%'
  },
  'Public Works': {
    name: 'Public Works & Roads',
    reqShare: 0.25,
    sla: 89,
    resRate: 91.0,
    avgDays: 3.2,
    rating: 4.2,
    revShare: 0.28,
    budgetAllocated: 18.0,
    budgetUtilized: 16.2,
    summary: 'Public Works: 6.2K requests | 91% resolved | Avg 3.2 days',
    complaintTrend: '↓ 15%',
    serviceTrend: '↑ 38%'
  },
  'Sanitation': {
    name: 'Sanitation & Waste Management',
    reqShare: 0.24,
    sla: 97,
    resRate: 96.0,
    avgDays: 1.2,
    rating: 4.6,
    revShare: 0.08,
    budgetAllocated: 10.0,
    budgetUtilized: 9.5,
    summary: 'Sanitation: 5.8K requests | 96% resolved | Avg 1.2 days',
    complaintTrend: '↓ 31%',
    serviceTrend: '↑ 52%'
  },
  'Health': {
    name: 'Health & Public Education',
    reqShare: 0.17,
    sla: 91,
    resRate: 89.0,
    avgDays: 2.5,
    rating: 4.7,
    revShare: 0.05,
    budgetAllocated: 7.0,
    budgetUtilized: 4.5,
    summary: 'Health: 4.3K requests | 89% resolved | Avg 2.5 days',
    complaintTrend: '↓ 21%',
    serviceTrend: '↑ 43%'
  },
  'Commercial': {
    name: 'Commercial Licensing & Permits',
    reqShare: 0.12,
    sla: 93,
    resRate: 92.5,
    avgDays: 2.0,
    rating: 4.5,
    revShare: 0.23,
    budgetAllocated: 4.5,
    budgetUtilized: 3.8,
    summary: 'Commercial: 2.9K requests | 93% resolved | Avg 2.0 days',
    complaintTrend: '↓ 19%',
    serviceTrend: '↑ 39%'
  },
  'Finance': {
    name: 'Finance & Revenue Collection',
    reqShare: 0.14,
    sla: 96,
    resRate: 95.0,
    avgDays: 1.5,
    rating: 4.8,
    revShare: 0.67,
    budgetAllocated: 5.0,
    budgetUtilized: 4.2,
    summary: 'Finance & Tax: 3.4K receipts | 95% resolved | Avg 1.5 days',
    complaintTrend: '↓ 28%',
    serviceTrend: '↑ 55%'
  }
};

// Date range factor calculation
function getDateRangeFactor(dateRange) {
  if (dateRange === 'LAST_30') return 0.22;
  if (dateRange === 'LAST_90') return 0.52;
  if (dateRange === 'THIS_YEAR') return 0.94;
  return 1.0; // ALL
}

// Master calculation function providing dynamic data for ANY combination of Ward, Department, and DateRange
export function getFilteredGovernanceData(filters) {
  const { dateRange = 'ALL', department = 'ALL', ward = 'ALL' } = filters || {};
  const dateFactor = getDateRangeFactor(dateRange);

  // If a specific ward is selected
  if (ward !== 'ALL' && WARD_DATA_STORE[ward]) {
    const w = WARD_DATA_STORE[ward];
    const deptFilter = department !== 'ALL' ? DEPT_PROFILES[department] : null;

    const reqMultiplier = deptFilter ? deptFilter.reqShare : 1.0;
    const requests = Math.round(w.baseRequests * reqMultiplier * dateFactor);
    const resolved = Math.round(w.resolvedRequests * reqMultiplier * dateFactor);
    const resolutionRate = deptFilter ? deptFilter.resRate : w.resolutionRate;
    const slaCompliance = deptFilter ? deptFilter.sla : w.slaCompliance;
    const avgDays = deptFilter ? deptFilter.avgDays : w.avgDays;
    const satisfaction = deptFilter ? deptFilter.rating : w.satisfaction;
    const revenue = (w.revenue * (deptFilter ? deptFilter.revShare * 2.5 : 1.0) * dateFactor).toFixed(1);
    const budgetAllocated = (w.budgetAllocated * (deptFilter ? deptFilter.reqShare * 1.5 : 1.0) * dateFactor).toFixed(1);
    const budgetUtilized = (w.budgetUtilized * (deptFilter ? deptFilter.reqShare * 1.5 : 1.0) * dateFactor).toFixed(1);
    const budgetPct = Math.round((budgetUtilized / Math.max(0.1, budgetAllocated)) * 100);

    // Dynamic Monthly Trends with unique Ward curve
    const monthlyTrends = w.monthlyTrends.map(t => ({
      month: t.month,
      requests: Math.round(t.requests * reqMultiplier * (dateRange === 'LAST_30' ? 0.35 : 1.0)),
      resolved: Math.round(t.resolved * reqMultiplier * (dateRange === 'LAST_30' ? 0.35 : 1.0)),
      revenue: Math.round(t.revenue * (deptFilter ? deptFilter.revShare * 2.5 : 1.0)),
      expenditure: Math.round(t.expenditure * (deptFilter ? deptFilter.reqShare * 1.5 : 1.0))
    }));

    // Dynamic Department breakdown for this ward
    const departmentSummaries = [
      { department: 'Water Supply', totalRequests: Math.round(w.baseRequests * 0.34 * dateFactor), resolvedRequests: Math.round(w.resolvedRequests * 0.34 * dateFactor), resolutionRate: 94.5, avgProcessingDays: 2.1, slaCompliancePct: 95.0, satisfactionRating: 4.8 },
      { department: 'Public Works & Roads', totalRequests: Math.round(w.baseRequests * 0.25 * dateFactor), resolvedRequests: Math.round(w.resolvedRequests * 0.25 * dateFactor), resolutionRate: 91.0, avgProcessingDays: 3.2, slaCompliancePct: 89.0, satisfactionRating: 4.2 },
      { department: 'Sanitation & Waste', totalRequests: Math.round(w.baseRequests * 0.24 * dateFactor), resolvedRequests: Math.round(w.resolvedRequests * 0.24 * dateFactor), resolutionRate: 96.0, avgProcessingDays: 1.2, slaCompliancePct: 97.0, satisfactionRating: 4.6 },
      { department: 'Health & Education', totalRequests: Math.round(w.baseRequests * 0.17 * dateFactor), resolvedRequests: Math.round(w.resolvedRequests * 0.17 * dateFactor), resolutionRate: 89.0, avgProcessingDays: 2.5, slaCompliancePct: 91.0, satisfactionRating: 4.7 }
    ];

    const grievancesCount = Math.round((requests * 0.5) * (w.mttrHours / 45));

    return {
      citizenSatisfactionRating: `${satisfaction}/5`,
      serviceSlaPercentage: `${slaCompliance}%`,
      totalRevenueCollected: `$${revenue}M`,
      totalAllocatedBudget: `$${budgetAllocated}M`,
      totalBudgetUtilized: `$${budgetUtilized}M`,
      budgetUtilizationPercentage: `${budgetPct}%`,
      servicesSummary: `${ward}${deptFilter ? ` (${deptFilter.name})` : ''}: ${(requests/1000).toFixed(1)}K requests | ${slaCompliance}% resolved | Avg ${avgDays} days`,
      grievancesSummary: `${ward}: ${(grievancesCount/1000).toFixed(1)}K filed | ${resolutionRate}% resolved | MTTR ${w.mttrHours} hrs`,
      revenueSummary: `${ward}: $${revenue}M | Property Tax ${w.propertyTaxPct}% | Licenses ${w.licensesPct}%`,
      budgetSummary: `$${budgetAllocated}M allocated | $${budgetUtilized}M utilized | ${budgetPct}%`,
      departmentsSummary: w.deptPerformance,
      citizenSatSummary: `${satisfaction}/5 | Complaints ${w.complaintTrend} | Services ${w.serviceTrend}`,
      monthlyTrends,
      departmentSummaries,
      recentActivities: w.activities,
      serviceData: {
        totalRequests: requests,
        resolvedRequests: resolved,
        pendingRequests: Math.max(12, requests - resolved),
        inProgressRequests: Math.round((requests - resolved) * 0.5),
        avgResolutionDays: avgDays,
        slaCompliancePercentage: slaCompliance,
        serviceWisePerformance: w.serviceWise.map(s => ({
          ...s,
          count: Math.round(s.count * (deptFilter ? deptFilter.reqShare : 1.0) * dateFactor)
        })),
        monthlyTrends
      },
      grievanceData: {
        totalGrievances: grievancesCount,
        resolvedGrievances: Math.round(grievancesCount * (resolutionRate / 100)),
        pendingGrievances: Math.max(8, Math.round(grievancesCount * (1 - resolutionRate / 100))),
        rejectedGrievances: Math.round(grievancesCount * 0.02),
        escalatedGrievances: Math.round(grievancesCount * 0.015),
        overdueComplaintsCount: Math.round(grievancesCount * 0.008) || 3,
        avgResolutionTimeHours: w.mttrHours,
        grievancesByCategory: w.grievances.map(g => ({
          ...g,
          count: Math.round(g.count * dateFactor)
        })),
        overdueComplaints: [
          { id: `OV-${ward}-1`, trackingNumber: `GRV-2024-${ward.replace(' ', '')}-102`, title: `Overdue Complaint in ${ward}`, department: 'Public Works', ward, overdueDays: 4 },
          { id: `OV-${ward}-2`, trackingNumber: `GRV-2024-${ward.replace(' ', '')}-105`, title: `Urgent Infrastructure Fix in ${ward}`, department: 'Water Supply', ward, overdueDays: 3 }
        ]
      },
      revenueData: {
        totalRevenueCollected: Math.round(parseFloat(revenue) * 1000000),
        totalRevenueTarget: Math.round(parseFloat(revenue) * 1.2 * 1000000),
        pendingPayments: Math.round(parseFloat(revenue) * 0.2 * 1000000),
        collectionPercentage: 84,
        revenueBySource: [
          { source: 'Property Tax', amount: Math.round(parseFloat(revenue) * 0.65 * 1000000), target: Math.round(parseFloat(revenue) * 0.8 * 1000000), percentageShare: w.propertyTaxPct },
          { source: 'Trade Licenses', amount: Math.round(parseFloat(revenue) * 0.25 * 1000000), target: Math.round(parseFloat(revenue) * 0.3 * 1000000), percentageShare: w.licensesPct },
          { source: 'Utilities & Water', amount: Math.round(parseFloat(revenue) * 0.10 * 1000000), target: Math.round(parseFloat(revenue) * 0.12 * 1000000), percentageShare: 100 - w.propertyTaxPct - w.licensesPct }
        ],
        revenueByWard: [
          { ward, totalCount: requests, amount: Math.round(parseFloat(revenue) * 1000000) }
        ]
      },
      budgetData: {
        totalAllocated: Math.round(parseFloat(budgetAllocated) * 1000000),
        totalExpenditure: Math.round(parseFloat(budgetUtilized) * 1000000),
        remainingBudget: Math.round((parseFloat(budgetAllocated) - parseFloat(budgetUtilized)) * 1000000),
        utilizationPercentage: budgetPct,
        departmentBudgets: [
          { department: 'Public Works & Roads', allocated: Math.round(parseFloat(budgetAllocated) * 0.38 * 1000000), expenditure: Math.round(parseFloat(budgetUtilized) * 0.39 * 1000000), remaining: 250000, utilizationPct: 91, isOverBudget: false },
          { department: 'Water Supply', allocated: Math.round(parseFloat(budgetAllocated) * 0.28 * 1000000), expenditure: Math.round(parseFloat(budgetUtilized) * 0.28 * 1000000), remaining: 180000, utilizationPct: 89, isOverBudget: false },
          { department: 'Sanitation & Waste', allocated: Math.round(parseFloat(budgetAllocated) * 0.22 * 1000000), expenditure: Math.round(parseFloat(budgetUtilized) * 0.22 * 1000000), remaining: 120000, utilizationPct: 95, isOverBudget: false },
          { department: 'Health & Education', allocated: Math.round(parseFloat(budgetAllocated) * 0.12 * 1000000), expenditure: Math.round(parseFloat(budgetUtilized) * 0.11 * 1000000), remaining: 90000, utilizationPct: 78, isOverBudget: false }
        ]
      },
      deptData: {
        departments: departmentSummaries
      },
      satisfactionData: {
        overallRating: satisfaction,
        ratingLabel: satisfaction >= 4.7 ? 'Exceptional Citizen Trust' : 'Strong Civic Satisfaction',
        complaintsReductionPct: parseInt(w.complaintTrend.replace(/[^0-9]/g, '')) || 23,
        serviceUsageGrowthPct: parseInt(w.serviceTrend.replace(/[^0-9]/g, '')) || 47,
        departmentRatings: [
          { department: 'Water Supply', rating: deptFilter?.name === 'Water Supply & Sewerage' ? 4.8 : 4.7, feedbackCount: Math.round(requests * 0.3) },
          { department: 'Public Works & Roads', rating: 4.2, feedbackCount: Math.round(requests * 0.25) },
          { department: 'Sanitation & Waste', rating: 4.6, feedbackCount: Math.round(requests * 0.25) },
          { department: 'Health & Education', rating: 4.7, feedbackCount: Math.round(requests * 0.2) }
        ],
        feedbackSummaries: [
          { citizenName: `Citizen of ${ward}`, department: department !== 'ALL' ? department : 'Public Works', serviceType: 'Civic Service', rating: Math.round(satisfaction), sentiment: 'POSITIVE', comment: `Prompt resolution in ${ward}. The field staff addressed the issue within SLA.`, date: '2024-09-29' }
        ]
      }
    };
  }

  // If a specific Department is selected across all wards
  if (department !== 'ALL' && DEPT_PROFILES[department]) {
    const d = DEPT_PROFILES[department];
    const totalReq = Math.round(24700 * d.reqShare * dateFactor);
    const resolvedReq = Math.round(totalReq * (d.resRate / 100));
    const revenue = (12.4 * d.revShare * dateFactor).toFixed(1);
    const alloc = (d.budgetAllocated * dateFactor).toFixed(1);
    const util = (d.budgetUtilized * dateFactor).toFixed(1);
    const budgetPct = Math.round((d.budgetUtilized / d.budgetAllocated) * 100);

    const monthlyTrends = [
      { month: 'Jan', requests: Math.round(1850 * d.reqShare * dateFactor), resolved: Math.round(1720 * d.reqShare * dateFactor), revenue: Math.round(950000 * d.revShare), expenditure: Math.round(3200000 * d.reqShare) },
      { month: 'Feb', requests: Math.round(2100 * d.reqShare * dateFactor), resolved: Math.round(1980 * d.reqShare * dateFactor), revenue: Math.round(1100000 * d.revShare), expenditure: Math.round(3400000 * d.reqShare) },
      { month: 'Mar', requests: Math.round(2400 * d.reqShare * dateFactor), resolved: Math.round(2250 * d.reqShare * dateFactor), revenue: Math.round(1400000 * d.revShare), expenditure: Math.round(3800000 * d.reqShare) },
      { month: 'Apr', requests: Math.round(2200 * d.reqShare * dateFactor), resolved: Math.round(2080 * d.reqShare * dateFactor), revenue: Math.round(1050000 * d.revShare), expenditure: Math.round(3500000 * d.reqShare) },
      { month: 'May', requests: Math.round(2600 * d.reqShare * dateFactor), resolved: Math.round(2450 * d.reqShare * dateFactor), revenue: Math.round(1300000 * d.revShare), expenditure: Math.round(3900000 * d.reqShare) },
      { month: 'Jun', requests: Math.round(2850 * d.reqShare * dateFactor), resolved: Math.round(2680 * d.reqShare * dateFactor), revenue: Math.round(1600000 * d.revShare), expenditure: Math.round(4100000 * d.reqShare) },
    ];

    const departmentSummaries = [
      { department: d.name, totalRequests: totalReq, resolvedRequests: resolvedReq, resolutionRate: d.resRate, avgProcessingDays: d.avgDays, slaCompliancePct: d.sla, satisfactionRating: d.rating }
    ];

    return {
      citizenSatisfactionRating: `${d.rating}/5`,
      serviceSlaPercentage: `${d.sla}%`,
      totalRevenueCollected: `$${revenue}M`,
      totalAllocatedBudget: `$${alloc}M`,
      totalBudgetUtilized: `$${util}M`,
      budgetUtilizationPercentage: `${budgetPct}%`,
      servicesSummary: `${d.name}: ${(totalReq/1000).toFixed(1)}K requests | ${d.sla}% resolved | Avg ${d.avgDays} days`,
      grievancesSummary: `${d.name}: ${Math.round(totalReq * 0.45)} filed | ${d.resRate}% resolved | MTTR ${Math.round(d.avgDays * 16)} hrs`,
      revenueSummary: `${d.name}: $${revenue}M collected | ${d.revShare > 0.3 ? 'Primary Revenue Driver' : 'Operational Utility Fees'}`,
      budgetSummary: `$${alloc}M allocated | $${util}M utilized | ${budgetPct}%`,
      departmentsSummary: `${d.name} SLA: ${d.sla}% | Resolution: ${d.resRate}% | Rating: ${d.rating}/5`,
      citizenSatSummary: `${d.rating}/5 | Complaints ${d.complaintTrend} | Services ${d.serviceTrend}`,
      monthlyTrends,
      departmentSummaries,
      recentActivities: [
        { id: 'ACT-DEP-01', type: 'Department Action', description: `${d.name} service speed improved by 14% this month`, department: d.name, status: 'RESOLVED', timestamp: '10 mins ago' },
        { id: 'ACT-DEP-02', type: 'SLA Milestone', description: `99% of scheduled ${d.name} inspections completed within SLA`, department: d.name, status: 'APPROVED', timestamp: '35 mins ago' }
      ],
      serviceData: {
        totalRequests: totalReq,
        resolvedRequests: resolvedReq,
        pendingRequests: totalReq - resolvedReq,
        inProgressRequests: Math.round((totalReq - resolvedReq) * 0.6),
        avgResolutionDays: d.avgDays,
        slaCompliancePercentage: d.sla,
        serviceWisePerformance: [
          { category: `${d.name} - Tier 1`, count: Math.round(totalReq * 0.5), resolutionRate: d.resRate },
          { category: `${d.name} - Tier 2`, count: Math.round(totalReq * 0.35), resolutionRate: Math.max(80, d.resRate - 3) },
          { category: `${d.name} - Priority`, count: Math.round(totalReq * 0.15), resolutionRate: 98 }
        ],
        monthlyTrends
      },
      grievanceData: {
        totalGrievances: Math.round(totalReq * 0.45),
        resolvedGrievances: Math.round(totalReq * 0.45 * (d.resRate / 100)),
        pendingGrievances: Math.round(totalReq * 0.45 * (1 - d.resRate / 100)),
        rejectedGrievances: 15,
        escalatedGrievances: 8,
        overdueComplaintsCount: 4,
        avgResolutionTimeHours: Math.round(d.avgDays * 16),
        grievancesByCategory: [
          { category: `${d.name} Direct Reports`, count: Math.round(totalReq * 0.3), resolutionRate: d.resRate },
          { category: `${d.name} Escalations`, count: Math.round(totalReq * 0.15), resolutionRate: 90 }
        ],
        overdueComplaints: [
          { id: 'OV-D1', trackingNumber: `GRV-2024-${department}-01`, title: `Overdue SLA Task for ${d.name}`, department: d.name, ward: 'Ward 1', overdueDays: 3 }
        ]
      },
      revenueData: {
        totalRevenueCollected: Math.round(parseFloat(revenue) * 1000000),
        totalRevenueTarget: Math.round(parseFloat(revenue) * 1.15 * 1000000),
        pendingPayments: Math.round(parseFloat(revenue) * 0.15 * 1000000),
        collectionPercentage: 87,
        revenueBySource: [
          { source: `${d.name} Fees`, amount: Math.round(parseFloat(revenue) * 1000000), target: Math.round(parseFloat(revenue) * 1.15 * 1000000), percentageShare: 100 }
        ],
        revenueByWard: [
          { ward: 'Ward 1', totalCount: Math.round(totalReq * 0.35), amount: Math.round(parseFloat(revenue) * 0.35 * 1000000) },
          { ward: 'Ward 2', totalCount: Math.round(totalReq * 0.28), amount: Math.round(parseFloat(revenue) * 0.28 * 1000000) },
          { ward: 'Ward 3', totalCount: Math.round(totalReq * 0.20), amount: Math.round(parseFloat(revenue) * 0.20 * 1000000) },
          { ward: 'Ward 4', totalCount: Math.round(totalReq * 0.17), amount: Math.round(parseFloat(revenue) * 0.17 * 1000000) }
        ]
      },
      budgetData: {
        totalAllocated: Math.round(parseFloat(alloc) * 1000000),
        totalExpenditure: Math.round(parseFloat(util) * 1000000),
        remainingBudget: Math.round((parseFloat(alloc) - parseFloat(util)) * 1000000),
        utilizationPercentage: budgetPct,
        departmentBudgets: [
          { department: d.name, allocated: Math.round(parseFloat(alloc) * 1000000), expenditure: Math.round(parseFloat(util) * 1000000), remaining: Math.round((parseFloat(alloc) - parseFloat(util)) * 1000000), utilizationPct: budgetPct, isOverBudget: false }
        ]
      },
      deptData: {
        departments: departmentSummaries
      },
      satisfactionData: {
        overallRating: d.rating,
        ratingLabel: `${d.name} Civic Approval Rating`,
        complaintsReductionPct: parseInt(d.complaintTrend.replace(/[^0-9]/g, '')) || 20,
        serviceUsageGrowthPct: parseInt(d.serviceTrend.replace(/[^0-9]/g, '')) || 45,
        departmentRatings: [
          { department: d.name, rating: d.rating, feedbackCount: Math.round(totalReq * 0.4) }
        ],
        feedbackSummaries: [
          { citizenName: 'Municipal Citizen', department: d.name, serviceType: `${d.name} Request`, rating: Math.round(d.rating), sentiment: 'POSITIVE', comment: `Very pleased with the speed of service delivery in ${d.name}.`, date: '2024-09-30' }
        ]
      }
    };
  }

  // DEFAULT: All Wards and All Departments (with DateRange scaling)
  const reqTotal = Math.round(24700 * dateFactor);
  const resTotal = Math.round(23218 * dateFactor);
  const revTotal = (12.4 * dateFactor).toFixed(1);
  const allocTotal = (47.0 * dateFactor).toFixed(1);
  const utilTotal = (41.0 * dateFactor).toFixed(1);

  const monthlyTrends = [
    { month: 'Jan', requests: Math.round(1850 * dateFactor), resolved: Math.round(1720 * dateFactor), revenue: Math.round(950000 * dateFactor), expenditure: Math.round(3200000 * dateFactor) },
    { month: 'Feb', requests: Math.round(2100 * dateFactor), resolved: Math.round(1980 * dateFactor), revenue: Math.round(1100000 * dateFactor), expenditure: Math.round(3400000 * dateFactor) },
    { month: 'Mar', requests: Math.round(2400 * dateFactor), resolved: Math.round(2250 * dateFactor), revenue: Math.round(1400000 * dateFactor), expenditure: Math.round(3800000 * dateFactor) },
    { month: 'Apr', requests: Math.round(2200 * dateFactor), resolved: Math.round(2080 * dateFactor), revenue: Math.round(1050000 * dateFactor), expenditure: Math.round(3500000 * dateFactor) },
    { month: 'May', requests: Math.round(2600 * dateFactor), resolved: Math.round(2450 * dateFactor), revenue: Math.round(1300000 * dateFactor), expenditure: Math.round(3900000 * dateFactor) },
    { month: 'Jun', requests: Math.round(2850 * dateFactor), resolved: Math.round(2680 * dateFactor), revenue: Math.round(1600000 * dateFactor), expenditure: Math.round(4100000 * dateFactor) },
  ];

  const departmentSummaries = [
    { department: 'Water Supply', totalRequests: Math.round(8450 * dateFactor), resolvedRequests: Math.round(7943 * dateFactor), pendingWorkload: 507, resolutionRate: 94.0, avgProcessingDays: 2.1, slaCompliancePct: 95.0, satisfactionRating: 4.8 },
    { department: 'Public Works & Roads', totalRequests: Math.round(6200 * dateFactor), resolvedRequests: Math.round(5642 * dateFactor), pendingWorkload: 558, resolutionRate: 91.0, avgProcessingDays: 3.2, slaCompliancePct: 89.0, satisfactionRating: 4.2 },
    { department: 'Sanitation & Waste', totalRequests: Math.round(5800 * dateFactor), resolvedRequests: Math.round(5568 * dateFactor), pendingWorkload: 232, resolutionRate: 96.0, avgProcessingDays: 1.2, slaCompliancePct: 97.0, satisfactionRating: 4.6 },
    { department: 'Health & Education', totalRequests: Math.round(4250 * dateFactor), resolvedRequests: Math.round(3782 * dateFactor), pendingWorkload: 468, resolutionRate: 89.0, avgProcessingDays: 2.5, slaCompliancePct: 91.0, satisfactionRating: 4.7 }
  ];

  return {
    citizenSatisfactionRating: '4.7/5',
    serviceSlaPercentage: '94%',
    totalRevenueCollected: `$${revTotal}M`,
    totalAllocatedBudget: `$${allocTotal}M`,
    totalBudgetUtilized: `$${utilTotal}M`,
    budgetUtilizationPercentage: '87%',
    servicesSummary: `${(reqTotal/1000).toFixed(1)}K requests | 94% resolved | Avg 2.4 days`,
    grievancesSummary: `${(12400 * dateFactor / 1000).toFixed(1)}K filed | 94% resolved | MTTR 47 hrs`,
    revenueSummary: `$${revTotal}M | Property Tax 67% | Licenses 23%`,
    budgetSummary: `$${allocTotal}M allocated | $${utilTotal}M utilized | 87%`,
    departmentsSummary: 'Water 94% | Health 91% | Education 89%',
    citizenSatSummary: '4.7/5 | Complaints ↓ 23% | Services ↑ 47%',
    monthlyTrends,
    departmentSummaries,
    recentActivities: [
      { id: 'GRV-848', type: 'Grievance', description: 'Street Light Fault resolved in Ward 2', department: 'Public Works', status: 'RESOLVED', timestamp: '10 mins ago' },
      { id: 'APP-1247', type: 'Application', description: 'Birth Certificate approved for Priya Sharma', department: 'Health', status: 'APPROVED', timestamp: '25 mins ago' },
      { id: 'REV-104', type: 'Revenue', description: '$15,000 Property Tax collected in Ward 1', department: 'Finance', status: 'SUCCESS', timestamp: '1 hour ago' },
      { id: 'GRV-850', type: 'Grievance', description: 'Pothole repair escalated in Ward 4', department: 'Public Works', status: 'ESCALATED', timestamp: '2 hours ago' }
    ],
    serviceData: {
      totalRequests: reqTotal,
      resolvedRequests: resTotal,
      pendingRequests: 982,
      inProgressRequests: 500,
      avgResolutionDays: 2.4,
      slaCompliancePercentage: 94,
      serviceWisePerformance: [
        { category: 'Water Supply', count: Math.round(8450 * dateFactor), resolutionRate: 94 },
        { category: 'Road Repair', count: Math.round(6200 * dateFactor), resolutionRate: 91 },
        { category: 'Sanitation', count: Math.round(5800 * dateFactor), resolutionRate: 96 },
        { category: 'Health Services', count: Math.round(4250 * dateFactor), resolutionRate: 89 }
      ],
      monthlyTrends
    },
    grievanceData: {
      totalGrievances: Math.round(12400 * dateFactor),
      resolvedGrievances: Math.round(11656 * dateFactor),
      pendingGrievances: 544,
      rejectedGrievances: 120,
      escalatedGrievances: 80,
      overdueComplaintsCount: 12,
      avgResolutionTimeHours: 47,
      grievancesByCategory: [
        { category: 'Street Lights', count: Math.round(4200 * dateFactor), resolutionRate: 95 },
        { category: 'Potholes', count: Math.round(3800 * dateFactor), resolutionRate: 92 },
        { category: 'Garbage Collection', count: Math.round(2900 * dateFactor), resolutionRate: 97 },
        { category: 'Water Contamination', count: Math.round(1500 * dateFactor), resolutionRate: 90 }
      ],
      overdueComplaints: [
        { id: '1', trackingNumber: 'GRV-2024-840', title: 'Drainage Blockage in Market Area', department: 'Sanitation', ward: 'Ward 1', overdueDays: 5 },
        { id: '2', trackingNumber: 'GRV-2024-845', title: 'Transformer Noise & Low Voltage', department: 'Electricity', ward: 'Ward 3', overdueDays: 3 }
      ]
    },
    revenueData: {
      totalRevenueCollected: Math.round(parseFloat(revTotal) * 1000000),
      totalRevenueTarget: 15000000,
      pendingPayments: 2600000,
      collectionPercentage: 83,
      revenueBySource: [
        { source: 'Property Tax', amount: Math.round(8308000 * dateFactor), target: 10000000, percentageShare: 67 },
        { source: 'Trade Licenses', amount: Math.round(2852000 * dateFactor), target: 3500000, percentageShare: 23 },
        { source: 'Water Bills & Utilities', amount: Math.round(1240000 * dateFactor), target: 1500000, percentageShare: 10 }
      ],
      revenueByWard: [
        { ward: 'Ward 1', totalCount: 3400, amount: 4800000 },
        { ward: 'Ward 2', totalCount: 2800, amount: 3600000 },
        { ward: 'Ward 3', totalCount: 2200, amount: 2200000 },
        { ward: 'Ward 4', totalCount: 1600, amount: 1100000 },
        { ward: 'Ward 5', totalCount: 1200, amount: 700000 }
      ]
    },
    budgetData: {
      totalAllocated: Math.round(parseFloat(allocTotal) * 1000000),
      totalExpenditure: Math.round(parseFloat(utilTotal) * 1000000),
      remainingBudget: Math.round((parseFloat(allocTotal) - parseFloat(utilTotal)) * 1000000),
      utilizationPercentage: 87,
      departmentBudgets: [
        { department: 'Public Works & Roads', allocated: 18000000, expenditure: 16200000, remaining: 1800000, utilizationPct: 90, isOverBudget: false },
        { department: 'Water Supply', allocated: 12000000, expenditure: 10800000, remaining: 1200000, utilizationPct: 90, isOverBudget: false },
        { department: 'Sanitation & Waste Management', allocated: 10000000, expenditure: 9500000, remaining: 500000, utilizationPct: 95, isOverBudget: false },
        { department: 'Health & Education', allocated: 7000000, expenditure: 4500000, remaining: 2500000, utilizationPct: 64, isOverBudget: false }
      ]
    },
    deptData: {
      departments: departmentSummaries
    },
    satisfactionData: {
      overallRating: 4.7,
      ratingLabel: 'Excellent Public Satisfaction',
      complaintsReductionPct: 23,
      serviceUsageGrowthPct: 47,
      departmentRatings: [
        { department: 'Water Supply', rating: 4.8, feedbackCount: 1200 },
        { department: 'Health & Education', rating: 4.7, feedbackCount: 850 },
        { department: 'Sanitation & Waste', rating: 4.6, feedbackCount: 940 },
        { department: 'Public Works & Roads', rating: 4.2, feedbackCount: 1100 }
      ],
      feedbackSummaries: [
        { citizenName: 'Ramesh Kumar', department: 'Water Supply', serviceType: 'New Connection', rating: 5, sentiment: 'POSITIVE', comment: 'Water pipeline connection completed in 24 hours. Great service!', date: '2024-09-28' },
        { citizenName: 'Priya Sharma', department: 'Health', serviceType: 'Birth Certificate', rating: 5, sentiment: 'POSITIVE', comment: 'Online birth certificate issued smoothly within SLA timeframe.', date: '2024-09-27' },
        { citizenName: 'Sunil Verma', department: 'Public Works', serviceType: 'Road Pothole', rating: 4, sentiment: 'POSITIVE', comment: 'Pothole filled quickly after reporting on portal.', date: '2024-09-26' }
      ]
    }
  };
}
