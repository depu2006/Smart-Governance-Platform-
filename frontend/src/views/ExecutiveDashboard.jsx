import React from 'react';
import { KpiCard } from '../components/KpiCard.jsx';
import { LineChartComponent } from '../components/ChartComponents.jsx';

export const ExecutiveDashboardView = ({
  data,
  onNavigateTab,
  onExportReport,
  filterBar,
}) => {
  if (!data) return <div className="loading-state">Loading Executive Dashboard...</div>;

  return (
    <div className="executive-dashboard-view">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Executive Dashboard & Governance Overview</h2>
      </div>

      {/* Top 3 KPI Cards matching Reference Image */}
      <div className="top-kpi-grid">
        <KpiCard
          title="Citizen Satisfaction"
          value={data.citizenSatisfactionRating || "4.7/5"}
          subtitle="Rating"
          onClick={() => onNavigateTab('citizens')}
        />
        <KpiCard
          title="Service SLA"
          value={data.serviceSlaPercentage || "94%"}
          subtitle="Met"
          onClick={() => onNavigateTab('services')}
        />
        <KpiCard
          title="Revenue"
          value={data.totalRevenueCollected || "$12.4M"}
          subtitle="Collected"
          onClick={() => onNavigateTab('budget')}
        />
      </div>

      {filterBar}

      {/* Analytics Dashboard - Governance KPIs Box (Exact match to Reference Image) */}
      <div className="governance-kpi-box">
        <h3>Analytics Dashboard - Governance KPIs</h3>
        <ul className="kpi-bullet-list">
          <li><strong>Services:</strong> {data.servicesSummary || "24.7K requests | 94% resolved | Avg 2.4 days"}</li>
          <li><strong>Grievances:</strong> {data.grievancesSummary || "12.4K filed | 94% resolved | MTTR 47 hrs"}</li>
          <li><strong>Revenue:</strong> {data.revenueSummary || "$12.4M | Property Tax 67% | Licenses 23%"}</li>
          <li><strong>Budget:</strong> {data.budgetSummary || "$47M allocated | 41M utilized | 87%"}</li>
          <li><strong>Departments:</strong> {data.departmentsSummary || "Water 94% | Health 91% | Education 89%"}</li>
          <li><strong>Citizen SAT:</strong> {data.citizenSatSummary || "4.7/5 | Complaints ↓ 23% | Services ↑ 47%"}</li>
        </ul>
        <div className="kpi-action-bar">
          <span>Action:</span>
          <button className="action-tag" onClick={onExportReport}>[Export Report]</button>
          <button className="action-tag" onClick={() => onNavigateTab('reports')}>[Drill Down]</button>
          <button className="action-tag" onClick={() => alert('Dashboard link copied to clipboard!')}>[Share]</button>
        </div>
      </div>

      {/* Secondary Dashboard Grid: Trends & Activities */}
      <div className="dashboard-grid-2">
        <LineChartComponent
          key={JSON.stringify(data.monthlyTrends?.map(t => t.requests))}
          data={data.monthlyTrends}
          title="Monthly Service Requests & Resolution Trends"
        />

        <div className="chart-card">
          <h4>Recent System Activities</h4>
          <div className="activity-list">
            {data.recentActivities && data.recentActivities.map((act, idx) => (
              <div key={idx} className="activity-item">
                <div className="act-badge">{act.type}</div>
                <div className="act-details">
                  <div className="act-desc">{act.description}</div>
                  <div className="act-meta">{act.department} • {act.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
