import React, { useState } from 'react';

export const CitizenSatisfactionView = ({ data, onShowToast, onOpenModal }) => {
  const [ratingFilter, setRatingFilter] = useState('ALL');

  if (!data) return <div className="loading-state">Loading Citizen Satisfaction...</div>;

  return (
    <div className="citizen-satisfaction-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Citizen Satisfaction & Public Feedback Analytics</h3>
        <button 
          className="btn-primary" 
          onClick={() => onOpenModal('feedback')}
          style={{ backgroundColor: '#0284c7' }}
        >
          + Submit Citizen Feedback
        </button>
      </div>

      {/* Rating Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['ALL', '5 Stars', '4 Stars', '3 Stars & Below'].map((star) => (
          <button
            key={star}
            onClick={() => {
              setRatingFilter(star);
              if (onShowToast) onShowToast(`Filtered citizen feedback by: ${star}`, 'info');
            }}
            style={{
              background: ratingFilter === star ? '#0284c7' : '#0f172a',
              color: ratingFilter === star ? '#ffffff' : '#94a3b8',
              border: '1px solid #334155',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {star}
          </button>
        ))}
      </div>

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentRatings && data.departmentRatings.map((dept, idx) => (
                <tr key={idx}>
                  <td><strong>{dept.department}</strong></td>
                  <td>⭐ {dept.rating} / 5.0</td>
                  <td>{dept.feedbackCount} Feedbacks</td>
                  <td>
                    <button 
                      style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                      onClick={() => onShowToast(`Inspecting feedback breakdown for ${dept.department}`, 'info')}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-table-card">
          <h4>Recent Citizen Feedback Summaries</h4>
          <div className="activity-list">
            {data.feedbackSummaries && data.feedbackSummaries.map((fb, idx) => (
              <div key={idx} className="activity-item" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                <button 
                  style={{ background: 'transparent', border: '1px solid #334155', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                  onClick={() => onShowToast(`✓ Acknowledged feedback from ${fb.citizenName}`, 'success')}
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
