import React from 'react';
import { BudgetProgressComponent } from '../components/ChartComponents.jsx';

export const BudgetUtilizationView = ({ data }) => {
  if (!data) return <div className="loading-state">Loading Budget Utilization...</div>;

  return (
    <div className="budget-utilization-view">
      <h3>Budget Allocation & Expenditure Tracking</h3>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Allocated Budget</div>
          <div className="kpi-value">${(data.totalAllocated / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Municipal FY 2024</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Total Expenditure</div>
          <div className="kpi-value">${(data.totalExpenditure / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Spent to Date</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Remaining Budget</div>
          <div className="kpi-value">${(data.remainingBudget / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Available Funds</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Utilization Rate</div>
          <div className="kpi-value">{data.utilizationPercentage}%</div>
          <div className={`kpi-trend ${data.utilizationPercentage > 90 ? 'negative' : 'positive'}`}>
            Target: 85% - 95%
          </div>
        </div>
      </div>

      <BudgetProgressComponent budgets={data.departmentBudgets} />

      <div className="data-table-card">
        <h4>Department Budget Breakdown Table</h4>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Allocated ($)</th>
              <th>Expenditure ($)</th>
              <th>Remaining ($)</th>
              <th>Utilization (%)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.departmentBudgets && data.departmentBudgets.map((dept, idx) => (
              <tr key={idx}>
                <td><strong>{dept.department}</strong></td>
                <td>${dept.allocated.toLocaleString()}</td>
                <td>${dept.expenditure.toLocaleString()}</td>
                <td>${dept.remaining.toLocaleString()}</td>
                <td>{dept.utilizationPct}%</td>
                <td>
                  {dept.isOverBudget ? (
                    <span className="status-pill overdue">Exceeded Budget</span>
                  ) : (
                    <span className="status-pill good">Within Budget</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
