import React, { useState } from 'react';
import { KpiCard } from '../components/KpiCard.jsx';
import { LineChartComponent } from '../components/ChartComponents.jsx';

export const ExecutiveDashboardView = ({
  data,
  onNavigateTab,
  onExportReport,
  onShowToast,
  onOpenModal,
}) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  if (!data) return <div className="loading-state">Loading Executive Dashboard...</div>;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    if (onShowToast) {
      onShowToast('✓ Live Dashboard Share Link copied to clipboard!', 'success');
    } else {
      alert('Live Dashboard Share Link copied to clipboard!');
    }
  };

  return (
    <div className="executive-dashboard-view">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--ink)' }}>Executive Dashboard & Governance Overview</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-primary" 
            onClick={() => onOpenModal('grievance')}
            style={{ backgroundColor: '#0284c7', fontSize: '0.82rem', padding: '8px 14px' }}
          >
            + File Grievance
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onOpenModal('service')}
            style={{ backgroundColor: '#0d9488', fontSize: '0.82rem', padding: '8px 14px' }}
          >
            + Apply for Service
          </button>
        </div>
      </div>

      {/* Top 3 KPI Cards matching Reference Image */}
      <div className="top-kpi-grid">
        <KpiCard
          title="Citizen Satisfaction"
          value={data.citizenSatisfactionRating || "4.7/5"}
          subtitle="Rating — Click to View Feedback"
          onClick={() => onNavigateTab('citizens')}
        />
        <KpiCard
          title="Service SLA"
          value={data.serviceSlaPercentage || "94%"}
          subtitle="Met — Click to View Services"
          onClick={() => onNavigateTab('services')}
        />
        <KpiCard
          title="Revenue"
          value={data.totalRevenueCollected || "$12.4M"}
          subtitle="Collected — Click to View Budget"
          onClick={() => onNavigateTab('budget')}
        />
      </div>

      {/* Analytics Dashboard - Governance KPIs */}
      <div className="governance-kpi-box">
        <h3>Analytics Dashboard - Governance KPIs</h3>
        <div className="governance-kpi-grid">
          <div className="governance-kpi-item"><strong>Services</strong><span>{data.servicesSummary || '24.7K requests | 94% resolved | Avg 2.4 days'}</span></div>
          <div className="governance-kpi-item"><strong>Grievances</strong><span>{data.grievancesSummary || '12.4K filed | 94% resolved | MTTR 47 hrs'}</span></div>
          <div className="governance-kpi-item"><strong>Revenue</strong><span>{data.revenueSummary || '₹12.4M | Property Tax 67% | Licenses 23%'}</span></div>
          <div className="governance-kpi-item"><strong>Budget</strong><span>{data.budgetSummary || '₹47.0M allocated | ₹41.0M utilized | 87%'}</span></div>
          <div className="governance-kpi-item"><strong>Departments</strong><span>{data.departmentsSummary || 'Water 94% | Health 91% | Education 89%'}</span></div>
          <div className="governance-kpi-item"><strong>Citizen SAT</strong><span>{data.citizenSatSummary || '4.7/5 | Complaints ↓ 23% | Services ↑ 47%'}</span></div>
        </div>
        <div className="kpi-action-bar">
          <span className="kpi-action-label">Actions</span>
          <div className="kpi-action-buttons">
            <button className="action-tag" onClick={onExportReport}>Export Report</button>
            <button className="action-tag" onClick={() => onNavigateTab('reports')}>Drill Down</button>
            <button className="action-tag" onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>

      {/* Secondary Dashboard Grid: Trends & Activities */}
      <div className="dashboard-grid-2">
        <LineChartComponent
          key={JSON.stringify(data.monthlyTrends?.map(t => t.requests))}
          data={data.monthlyTrends}
          title="Monthly Service Requests & Resolution Trends"
        />

        <div className="chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ margin: 0 }}>Recent System Activities</h4>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', cursor: 'pointer' }} onClick={() => onShowToast('Activity feed refreshed!', 'info')}>🔄 Refresh</span>
          </div>
          <div className="activity-list">
            {data.recentActivities && data.recentActivities.map((act, idx) => (
              <div key={idx} className="activity-item" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div className="act-badge">{act.type}</div>
                  <div className="act-details">
                    <div className="act-desc">{act.description}</div>
                    <div className="act-meta">{act.department} • {act.timestamp}</div>
                  </div>
                </div>
                <button 
                  style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                  onClick={() => setSelectedActivity(act)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedActivity && (
        <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3>{selectedActivity.type} Activity Details</h3>
              <button className="modal-close-btn" onClick={() => setSelectedActivity(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <div><strong>Activity ID:</strong> {selectedActivity.id || 'Activity record'}</div>
                <div><strong>Event:</strong> {selectedActivity.description}</div>
                <div><strong>Department:</strong> {selectedActivity.department || 'Not specified'}</div>
                <div><strong>Recorded:</strong> {selectedActivity.timestamp || 'Recently'}</div>
                <div><strong>Status:</strong> {selectedActivity.status || 'Recorded'}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedActivity(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const targetTab = selectedActivity.type === 'Grievance'
                    ? 'grievances'
                    : selectedActivity.type === 'Application'
                      ? 'services'
                      : selectedActivity.type === 'Revenue'
                        ? 'budget'
                        : 'reports';
                  setSelectedActivity(null);
                  onNavigateTab(targetTab);
                }}
              >
                Open Related Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
