import React, { useState } from 'react';
import { BudgetProgressComponent } from '../components/ChartComponents.jsx';

const formatRupees = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(amount || 0);

export const BudgetUtilizationView = ({ data, reallocations = [], onShowToast, onOpenModal }) => {
  const [auditedDepartment, setAuditedDepartment] = useState(null);

  if (!data) return <div className="loading-state">Loading Budget Utilization...</div>;

  const auditUtilization = auditedDepartment
    ? Number(auditedDepartment.utilizationPct ?? (auditedDepartment.allocated ? (auditedDepartment.expenditure / auditedDepartment.allocated) * 100 : 0))
    : 0;
  const auditOverBudget = auditedDepartment
    ? auditedDepartment.isOverBudget || auditedDepartment.expenditure > auditedDepartment.allocated
    : false;
  const auditStatus = auditOverBudget
    ? 'OVER BUDGET'
    : auditUtilization > 90
      ? 'HIGH UTILIZATION'
      : 'WITHIN ALLOCATION';

  return (
    <div className="budget-utilization-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.4rem' }}>Municipal Budget Utilization & Expenditure</h3>
        <button 
          className="btn-primary" 
          onClick={() => onOpenModal('budget')}
          style={{ backgroundColor: '#facc15', color: '#0f172a' }}
        >
          + Reallocate Department Budget
        </button>
      </div>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Allocated Budget</div>
          <div className="kpi-value">{formatRupees(data.totalAllocated)}</div>
          <div className="kpi-subtitle">Fiscal Year Allocation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Total Expenditure</div>
          <div className="kpi-value">{formatRupees(data.totalExpenditure)}</div>
          <div className="kpi-trend positive">Utilization: {data.utilizationPercentage}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Remaining Treasury</div>
          <div className="kpi-value">{formatRupees(data.remainingBudget)}</div>
          <div className="kpi-subtitle">Available Funds</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <BudgetProgressComponent budgets={data.departmentBudgets} />

        <div className="data-table-card">
          <h4>Department Expenditure Ledger</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Allocated (INR)</th>
                <th>Spent (INR)</th>
                <th>Util %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentBudgets && data.departmentBudgets.map((b, idx) => (
                <tr key={idx}>
                  <td><strong>{b.department}</strong></td>
                  <td>{formatRupees(b.allocated)}</td>
                  <td>{formatRupees(b.expenditure)}</td>
                  <td>
                    <span className={`status-pill ${b.utilizationPct > 90 ? 'overdue' : 'good'}`}>
                      {b.utilizationPct}%
                    </span>
                  </td>
                  <td>
                    <button 
                      className="budget-audit-button"
                      style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                      onClick={() => setAuditedDepartment(b)}
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="data-table-card" style={{ marginTop: '24px' }}>
        <h4>Department Budget Reallocations</h4>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Department</th>
              <th>Reallocated Amount (INR)</th>
              <th>Recorded At</th>
            </tr>
          </thead>
          <tbody>
            {reallocations.length > 0 ? reallocations.map((reallocation) => (
              <tr key={reallocation.id}>
                <td><strong>{reallocation.id}</strong></td>
                <td>{reallocation.department}</td>
                <td>{formatRupees(reallocation.amount)}</td>
                <td>{reallocation.createdAt}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>No reallocations recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {auditedDepartment && (
        <div className="modal-overlay" onClick={() => setAuditedDepartment(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3>Budget Audit: {auditedDepartment.department}</h3>
              <button className="modal-close-btn" onClick={() => setAuditedDepartment(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Audit compares recorded expenditure against this department's approved allocation.
              </p>
              <table className="analytics-table">
                <tbody>
                  <tr><th>Allocated</th><td>{formatRupees(auditedDepartment.allocated)}</td></tr>
                  <tr><th>Spent</th><td>{formatRupees(auditedDepartment.expenditure)}</td></tr>
                  <tr><th>Remaining</th><td>{formatRupees(auditedDepartment.allocated - auditedDepartment.expenditure)}</td></tr>
                  <tr><th>Utilization</th><td>{auditUtilization.toFixed(1)}%</td></tr>
                  <tr>
                    <th>Audit Result</th>
                    <td>
                      <span className={`status-pill ${auditOverBudget ? 'overdue' : auditUtilization > 90 ? 'pending' : 'good'}`}>
                        {auditStatus}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ margin: '12px 0 0', color: 'var(--muted)', fontSize: '0.84rem' }}>
                {auditOverBudget
                  ? 'Expenditure exceeds the approved allocation. Review this budget line.'
                  : auditUtilization > 90
                    ? 'Most of the allocation has been spent. Review remaining commitments.'
                    : 'Expenditure is within the approved allocation.'}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-primary" onClick={() => setAuditedDepartment(null)}>Close Audit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
