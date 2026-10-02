import React from 'react';

export const CitizenSatisfactionView = ({ data }) => {
  if (!data) return <div className="loading-state">Loading Citizen Satisfaction...</div>;

  return (
    <div className="citizen-satisfaction-view">
      <h3>Citizen Satisfaction & Public Feedback Analytics</h3>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Overall Satisfaction</div>
          <div className="kpi-value">{data.overallRating} / 5.0</div>
          <div className="kpi-trend positive">⭐ {data.ratingLabel}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Complaints Reduction</div>
          <div className="kpi-value">↓ {data.complaintsReductionPct}%</div>
          <div className="kpi-subtitle">Compared to Previous Period</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Service Usage Growth</div>
          <div className="kpi-value">↑ {data.serviceUsageGrowthPct}%</div>
          <div className="kpi-subtitle">Portal Adoption</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="data-table-card">
          <h4>Department-wise Satisfaction Ratings</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Satisfaction Score</th>
                <th>Total Feedbacks</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentRatings && data.departmentRatings.map((dept, idx) => (
                <tr key={idx}>
                  <td><strong>{dept.department}</strong></td>
                  <td>⭐ {dept.rating} / 5.0</td>
                  <td>{dept.feedbackCount} Feedbacks</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-table-card">
          <h4>Recent Citizen Feedback Summaries</h4>
          <div className="activity-list">
            {data.feedbackSummaries && data.feedbackSummaries.map((fb, idx) => (
              <div key={idx} className="activity-item">
                <span className={`act-badge ${fb.sentiment === 'POSITIVE' ? 'good' : 'overdue'}`}>
                  {fb.sentiment}
                </span>
                <div className="act-details">
                  <div className="act-desc">"{fb.comment}"</div>
                  <div className="act-meta">
                    {fb.citizenName} • {fb.department} ({fb.serviceType}) • {fb.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
