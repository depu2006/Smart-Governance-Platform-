import React from 'react';
import { BudgetProgressComponent } from '../components/ChartComponents.jsx';

export const BudgetUtilizationView = ({ data, onShowToast, onOpenModal }) => {
  if (!data) return <div className="loading-state">Loading Budget Utilization...</div>;

  return (
    <div className="budget-utilization-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Municipal Budget Utilization & Expenditure</h3>
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
          <div className="kpi-value">${(data.totalAllocated / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Fiscal Year Allocation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Total Expenditure</div>
          <div className="kpi-value">${(data.totalExpenditure / 1000000).toFixed(1)}M</div>
          <div className="kpi-trend positive">Utilization: {data.utilizationPercentage}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Remaining Treasury</div>
          <div className="kpi-value">${(data.remainingBudget / 1000000).toFixed(1)}M</div>
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
                <th>Allocated ($)</th>
                <th>Spent ($)</th>
                <th>Util %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentBudgets && data.departmentBudgets.map((b, idx) => (
                <tr key={idx}>
                  <td><strong>{b.department}</strong></td>
                  <td>${(b.allocated / 1000000).toFixed(1)}M</td>
                  <td>${(b.expenditure / 1000000).toFixed(1)}M</td>
                  <td>
                    <span className={`status-pill ${b.utilizationPct > 90 ? 'overdue' : 'good'}`}>
                      {b.utilizationPct}%
                    </span>
                  </td>
                  <td>
                    <button 
                      style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                      onClick={() => onShowToast(`Inspecting budget line items for ${b.department}`, 'info')}
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
    </div>
  );
};
