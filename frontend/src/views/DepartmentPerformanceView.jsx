import React from 'react';

export const DepartmentPerformanceView = ({ data }) => {
  if (!data) return <div className="loading-state">Loading Department Performance...</div>;

  return (
    <div className="department-performance-view">
      <h3>Department Performance & Workload Benchmarking</h3>

      <div className="data-table-card">
        <h4>Departmental KPI Benchmarking Matrix</h4>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Requests</th>
              <th>Resolved Requests</th>
              <th>Pending Workload</th>
              <th>Resolution Rate</th>
              <th>Avg Processing Time</th>
              <th>SLA Compliance</th>
              <th>Satisfaction Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.departments && data.departments.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.department}</strong></td>
                <td>{item.totalRequests.toLocaleString()}</td>
                <td>{item.resolvedRequests.toLocaleString()}</td>
                <td><span className="status-pill pending">{item.pendingWorkload} pending</span></td>
                <td><span className="status-pill resolved">{item.resolutionRate}%</span></td>
                <td>{item.avgProcessingDays} Days</td>
                <td><span className="status-pill good">{item.slaCompliancePct}% Met</span></td>
                <td>⭐ {item.satisfactionRating}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-grid-2">
        <div className="chart-card">
          <h4>Resolution Rate Comparison by Department</h4>
          <div className="activity-list">
            {data.departments && data.departments.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                  <span>{item.department}</span>
                  <span>{item.resolutionRate}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${item.resolutionRate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h4>SLA Compliance Comparison</h4>
          <div className="activity-list">
            {data.departments && data.departments.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                  <span>{item.department}</span>
                  <span>{item.slaCompliancePct}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${item.slaCompliancePct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
