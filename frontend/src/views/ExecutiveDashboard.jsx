import React from 'react';
import { KpiCard } from '../components/KpiCard.jsx';
import { LineChartComponent } from '../components/ChartComponents.jsx';

export const ExecutiveDashboardView = ({
  data,
  onNavigateTab,
  onExportReport,
  onShowToast,
  onOpenModal,
}) => {
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
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#ffffff' }}>Executive Dashboard & Governance Overview</h2>
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

      {/* Analytics Dashboard - Governance KPIs Box (Exact match to Reference Image) */}
      <div className="governance-kpi-box">
        <h3>Analytics Dashboard - Governance KPIs</h3>
        <ul className="kpi-bullet-list">
          <li><strong>Services:</strong> {data.servicesSummary || "24.7K requests | 94% resolved | Avg 2.4 days"}</li>
          <li><strong>Grievances:</strong> {data.grievancesSummary || "12.4K filed | 94% resolved | MTTR 47 hrs"}</li>
          <li><strong>Revenue:</strong> {data.revenueSummary || "$12.4M | Property Tax 67% | Licenses 23%"}</li>
          <li><strong>Budget:</strong> {data.budgetSummary || "$47M allocated | 41M utilized | 87%"}</li>
          <li><strong>Departments:</strong> {data.departmentsSummary || "Water 94% | Health 91% | Education 89%"}</li>
          <li><strong>Citizen SAT:</strong> {data.citizenSatSummary || "4.7/5 | Complaints ↓ 23% | Services ↑ 47%"}</li>
        </ul>
        <div className="kpi-action-bar">
          <span>Actions:</span>
          <button className="action-tag" onClick={onExportReport}>[Export Report]</button>
          <button className="action-tag" onClick={() => onNavigateTab('reports')}>[Drill Down]</button>
          <button className="action-tag" onClick={handleShare}>[Share]</button>
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
                  onClick={() => onShowToast(`Inspecting log #${act.id}: ${act.description}`, 'info')}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
