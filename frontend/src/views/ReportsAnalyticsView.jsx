import React from 'react';

export const ReportsAnalyticsView = ({
  data,
  filters,
  onExportCsv,
  onExportPdf,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="reports-analytics-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3>Reports & Comprehensive Governance Analytics</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="export-btn csv" onClick={onExportCsv}>📄 Export CSV</button>
          <button className="export-btn pdf" onClick={onExportPdf}>🖨️ Print / Save PDF</button>
        </div>
      </div>

      <div className="report-preview-container">
        <div className="report-header">
          <div>
            <h2>CivicPulse Nexus — Executive Governance Report</h2>
            <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Municipal Performance & Financial Analytics Summary</p>
          </div>
          <div className="report-meta">
            <div><strong>Generated:</strong> {currentDate}</div>
            <div><strong>Scope:</strong> Department: {filters.department} | Ward: {filters.ward}</div>
            <div><strong>Period:</strong> {filters.dateRange}</div>
          </div>
        </div>

        <div className="report-section">
          <h3>1. Governance KPI Summary</h3>
          <div className="governance-kpi-box" style={{ margin: 0 }}>
            <ul className="kpi-bullet-list">
              <li><strong>Services:</strong> {data?.servicesSummary || "24.7K requests | 94% resolved | Avg 2.4 days"}</li>
              <li><strong>Grievances:</strong> {data?.grievancesSummary || "12.4K filed | 94% resolved | MTTR 47 hrs"}</li>
              <li><strong>Revenue:</strong> {data?.revenueSummary || "$12.4M | Property Tax 67% | Licenses 23%"}</li>
              <li><strong>Budget:</strong> {data?.budgetSummary || "$47M allocated | $41M utilized | 87%"}</li>
              <li><strong>Departments:</strong> {data?.departmentsSummary || "Water 94% | Health 91% | Education 89%"}</li>
              <li><strong>Citizen SAT:</strong> {data?.citizenSatSummary || "4.7/5 | Complaints ↓ 23% | Services ↑ 47%"}</li>
            </ul>
          </div>
        </div>

        <div className="report-section">
          <h3>2. Department Performance Benchmarks</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Total Requests</th>
                <th>Resolved</th>
                <th>Resolution Rate</th>
                <th>SLA Compliance</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {data?.departmentSummaries ? (
                data.departmentSummaries.map((dept, idx) => (
                  <tr key={idx}>
                    <td><strong>{dept.department}</strong></td>
                    <td>{dept.totalRequests.toLocaleString()}</td>
                    <td>{dept.resolvedRequests.toLocaleString()}</td>
                    <td>{dept.resolutionRate}%</td>
                    <td>{dept.slaCompliancePct}%</td>
                    <td>⭐ {dept.satisfactionRating} / 5</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6}>No data loaded</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h3>3. Report Authorization & Sign-off</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <div>
              <p style={{ fontWeight: 600 }}>Prepared By:</p>
              <p style={{ color: '#64748b' }}>Municipal Analytics System</p>
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Approved By:</p>
              <p style={{ color: '#64748b' }}>Chief Municipal Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
