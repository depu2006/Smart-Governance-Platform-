import React, { useState } from 'react';
import { BarChartComponent, LineChartComponent } from '../components/ChartComponents.jsx';

export const ServiceMetricsView = ({ data, onShowToast, onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  if (!data) return <div className="loading-state">Loading Service Metrics...</div>;

  return (
    <div className="service-metrics-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Municipal Service Metrics & Delivery Performance</h3>
        <button 
          className="btn-primary" 
          onClick={() => onOpenModal('service')}
          style={{ backgroundColor: '#0d9488' }}
        >
          + Apply for New Service
        </button>
      </div>

      {/* Service Category Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['ALL', 'Water Supply', 'Road Maintenance', 'Sanitation', 'Health Services'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              if (onShowToast) onShowToast(`Filtered services by: ${cat}`, 'info');
            }}
            style={{
              background: activeCategory === cat ? '#0d9488' : '#0f172a',
              color: activeCategory === cat ? '#ffffff' : '#94a3b8',
              border: '1px solid #334155',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Requests</div>
          <div className="kpi-value">{data.totalRequests ? data.totalRequests.toLocaleString() : 0}</div>
          <div className="kpi-subtitle">All Categories</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Resolved Requests</div>
          <div className="kpi-value">{data.resolvedRequests ? data.resolvedRequests.toLocaleString() : 0}</div>
          <div className="kpi-trend positive">
            {Math.round((data.resolvedRequests / (data.totalRequests || 1)) * 100)}% Resolved
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending / In Progress</div>
          <div className="kpi-value">{(data.pendingRequests || 0) + (data.inProgressRequests || 0)}</div>
          <div className="kpi-subtitle">{data.inProgressRequests || 0} In-Progress</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">SLA Compliance</div>
          <div className="kpi-value">{data.slaCompliancePercentage}%</div>
          <div className="kpi-trend positive">Avg {data.avgResolutionDays} Days</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <LineChartComponent data={data.monthlyTrends} title="Monthly Request & Resolution Trends" />
        <BarChartComponent data={data.serviceWisePerformance} title="Service Volume by Category" />
      </div>
    </div>
  );
};
