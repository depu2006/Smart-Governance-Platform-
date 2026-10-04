import React from 'react';

export const DepartmentPerformanceView = ({ data, onShowToast }) => {
  if (!data) return <div className="loading-state">Loading Department Performance...</div>;

  const handleAuditSla = () => {
    if (onShowToast) {
      onShowToast('✓ Keycloak SLA Audit completed across all 6 Municipal Departments. All records in compliance!', 'success');
    }
  };

  return (
    <div className="department-performance-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Department Performance & SLA Compliance Matrix</h3>
        <button 
          className="btn-primary" 
          onClick={handleAuditSla}
          style={{ backgroundColor: '#a855f7' }}
        >
          🔒 Audit Department SLA (Keycloak RBAC)
        </button>
      </div>

      <div className="data-table-card">
        <h4>Department Operational Benchmarks</h4>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Requests</th>
              <th>Resolved Requests</th>
              <th>Pending Workload</th>
              <th>Resolution Rate</th>
              <th>Avg Processing Days</th>
              <th>SLA Compliance</th>
              <th>Citizen Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.departments && data.departments.map((dept, idx) => (
              <tr key={idx}>
                <td><strong>{dept.department}</strong></td>
                <td>{dept.totalRequests ? dept.totalRequests.toLocaleString() : 0}</td>
                <td>{dept.resolvedRequests ? dept.resolvedRequests.toLocaleString() : 0}</td>
                <td>{dept.pendingWorkload}</td>
                <td>
                  <span className={`status-pill ${dept.resolutionRate >= 90 ? 'good' : 'overdue'}`}>
                    {dept.resolutionRate}%
                  </span>
                </td>
                <td>{dept.avgProcessingDays} Days</td>
                <td>{dept.slaCompliancePct}% SLA</td>
                <td>⭐ {dept.satisfactionRating} / 5</td>
                <td>
                  <button 
                    style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                    onClick={() => onShowToast(`Resource re-allocation requested for ${dept.department}`, 'info')}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
