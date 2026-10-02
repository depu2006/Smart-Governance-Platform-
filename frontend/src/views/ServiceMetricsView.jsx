import React from 'react';
import { BarChartComponent, LineChartComponent } from '../components/ChartComponents.jsx';

export const ServiceMetricsView = ({ data }) => {
  if (!data) return <div className="loading-state">Loading Service Metrics...</div>;

  return (
    <div className="service-metrics-view">
      <h3>Municipal Service Metrics & Delivery Performance</h3>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Requests</div>
          <div className="kpi-value">{data.totalRequests ? data.totalRequests.toLocaleString() : 0}</div>
          <div className="kpi-subtitle">All Categories</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Resolved Requests</div>
          <div className="kpi-value">{data.resolvedRequests ? data.resolvedRequests.toLocaleString() : 0}</div>
          <div className="kpi-trend positive">
            {Math.round((data.resolvedRequests / (data.totalRequests || 1)) * 100)}% Resolved
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending / In Progress</div>
          <div className="kpi-value">{(data.pendingRequests || 0) + (data.inProgressRequests || 0)}</div>
          <div className="kpi-subtitle">{data.inProgressRequests || 0} In-Progress</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">SLA Compliance</div>
          <div className="kpi-value">{data.slaCompliancePercentage}%</div>
          <div className="kpi-trend positive">Avg {data.avgResolutionDays} Days</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <LineChartComponent data={data.monthlyTrends} title="Monthly Request & Resolution Trends" />
        <BarChartComponent data={data.serviceWisePerformance} title="Service Volume by Category" />
      </div>
    </div>
  );
};
