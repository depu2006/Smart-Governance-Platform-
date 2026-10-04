import React, { useEffect, useState } from 'react';

export const DepartmentPerformanceView = ({ data, onShowToast }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [auditReport, setAuditReport] = useState(null);
  const [managementPlans, setManagementPlans] = useState(() => {
    try {
      const savedPlans = window.localStorage.getItem('civicpulse-department-management-plans');
      if (savedPlans) {
        const parsedPlans = JSON.parse(savedPlans);
        if (parsedPlans && typeof parsedPlans === 'object' && !Array.isArray(parsedPlans)) return parsedPlans;
      }
    } catch {
      return {};
    }
    return {};
  });
  const [managementAction, setManagementAction] = useState('SLA Improvement Plan');
  const [managementNote, setManagementNote] = useState('');

  useEffect(() => {
    window.localStorage.setItem('civicpulse-department-management-plans', JSON.stringify(managementPlans));
  }, [managementPlans]);

  if (!data) return <div className="loading-state">Loading Department Performance...</div>;

  const handleAuditSla = () => {
    const departments = (data.departments || []).map((department) => ({
      ...department,
      compliant: Number(department.slaCompliancePct) >= 90,
    }));
    setAuditReport({ departments, generatedAt: new Date().toLocaleString() });
  };

  const openManagement = (department) => {
    setSelectedDepartment(department);
    setManagementAction(managementPlans[department.department]?.action || 'SLA Improvement Plan');
    setManagementNote(managementPlans[department.department]?.note || '');
  };

  const saveManagementPlan = (event) => {
    event.preventDefault();
    if (!selectedDepartment) return;
    setManagementPlans((previous) => ({
      ...previous,
      [selectedDepartment.department]: {
        action: managementAction,
        note: managementNote,
        updatedAt: new Date().toLocaleString(),
      },
    }));
    onShowToast?.(`${managementAction} recorded for ${selectedDepartment.department}.`, 'success');
    setSelectedDepartment(null);
  };

  return (
    <div className="department-performance-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.4rem' }}>Department Performance & SLA Compliance Matrix</h3>
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
                    onClick={() => openManagement(dept)}
                  >
                    Manage
                  </button>
                  {managementPlans[dept.department] && (
                    <div style={{ marginTop: '6px', fontSize: '0.68rem', color: '#2dd4bf' }}>
                      {managementPlans[dept.department].action}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDepartment && (
        <div className="modal-overlay" onClick={() => setSelectedDepartment(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Manage {selectedDepartment.department}</h3>
              <button className="modal-close-btn" onClick={() => setSelectedDepartment(null)}>×</button>
            </div>
            <form onSubmit={saveManagementPlan}>
              <div className="modal-body">
                <div style={{ color: 'var(--ink)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                  <div><strong>Total requests:</strong> {(selectedDepartment.totalRequests || 0).toLocaleString()}</div>
                  <div><strong>Pending workload:</strong> {(selectedDepartment.pendingWorkload || 0).toLocaleString()}</div>
                  <div><strong>Resolution rate:</strong> {selectedDepartment.resolutionRate}%</div>
                  <div><strong>SLA compliance:</strong> {selectedDepartment.slaCompliancePct}%</div>
                </div>
                <div className="modal-field">
                  <label htmlFor="department-management-action">Management action:</label>
                  <select
                    id="department-management-action"
                    value={managementAction}
                    onChange={(event) => setManagementAction(event.target.value)}
                  >
                    <option>SLA Improvement Plan</option>
                    <option>Resource Review</option>
                    <option>Enhanced Monitoring</option>
                    <option>Close Intervention</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label htmlFor="department-management-note">Notes:</label>
                  <textarea
                    id="department-management-note"
                    rows={3}
                    value={managementNote}
                    onChange={(event) => setManagementNote(event.target.value)}
                    placeholder="Add an action note for this department..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setSelectedDepartment(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Management Action</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {auditReport && (
        <div className="modal-overlay" onClick={() => setAuditReport(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '760px' }}>
            <div className="modal-header">
              <h3>Department SLA Audit Report</h3>
              <button className="modal-close-btn" onClick={() => setAuditReport(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Audit threshold: 90% SLA compliance. Generated {auditReport.generatedAt}.
              </p>
              <div className="data-table-card">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Current SLA</th>
                      <th>Audit Result</th>
                      <th>Finding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditReport.departments.map((department) => (
                      <tr key={department.department}>
                        <td>{department.department}</td>
                        <td>{department.slaCompliancePct}%</td>
                        <td><span className={`status-pill ${department.compliant ? 'good' : 'overdue'}`}>{department.compliant ? 'PASS' : 'REVIEW'}</span></td>
                        <td>{department.compliant ? 'Meets the 90% SLA threshold' : 'Below the 90% SLA threshold'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-primary" onClick={() => setAuditReport(null)}>Close Audit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
