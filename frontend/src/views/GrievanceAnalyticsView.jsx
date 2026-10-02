import React from 'react';
import { BarChartComponent } from '../components/ChartComponents.jsx';

export const GrievanceAnalyticsView = ({ data }) => {
  if (!data) return <div className="loading-state">Loading Grievance Analytics...</div>;

  return (
    <div className="grievance-analytics-view">
      <h3>Grievance Analytics & Complaint Resolution</h3>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Grievances</div>
          <div className="kpi-value">{data.totalGrievances ? data.totalGrievances.toLocaleString() : 0}</div>
          <div className="kpi-subtitle">Filed to Date</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Resolved Grievances</div>
          <div className="kpi-value">{data.resolvedGrievances ? data.resolvedGrievances.toLocaleString() : 0}</div>
          <div className="kpi-trend positive">Resolution Rate: {Math.round((data.resolvedGrievances / (data.totalGrievances || 1)) * 100)}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending / In Progress</div>
          <div className="kpi-value">{data.pendingGrievances}</div>
          <div className="kpi-subtitle">Active Workload</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Escalated / Overdue</div>
          <div className="kpi-value">{data.escalatedGrievances}</div>
          <div className="kpi-trend negative">Overdue SLA</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <BarChartComponent data={data.grievancesByCategory} title="Grievances by Category" />

        <div className="data-table-card">
          <h4 style={{ color: '#ef4444' }}>⚠️ Identified Overdue Complaints</h4>
          {data.overdueComplaints && data.overdueComplaints.length > 0 ? (
            <div className="activity-list">
              {data.overdueComplaints.map((c, idx) => (
                <div key={idx} className="activity-item">
                  <span className="status-pill overdue">{c.overdueDays} Days Overdue</span>
                  <div className="act-details">
                    <div className="act-desc">{c.title} (#{c.trackingNumber})</div>
                    <div className="act-meta">{c.department} • {c.ward}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No overdue complaints matching current filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};
