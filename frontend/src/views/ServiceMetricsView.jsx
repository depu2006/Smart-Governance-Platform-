import React, { useState } from 'react';
import { BarChartComponent, LineChartComponent } from '../components/ChartComponents.jsx';

export const ServiceMetricsView = ({ data, applications = [], onUpdateApplication, onShowToast, onOpenModal, onOpenActionModal }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeStatus, setActiveStatus] = useState('ALL');

  if (!data) return <div className="loading-state">Loading Service Metrics...</div>;

  const visibleRecords = applications.filter((record) => {
    const matchesCategory = activeCategory === 'ALL' || record.department === activeCategory || record.type.includes(activeCategory);
    const matchesStatus = activeStatus === 'ALL' || record.status === activeStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="service-metrics-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.4rem' }}>Municipal Service Metrics & Delivery Performance</h3>
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
        {['ALL', 'Water Supply', 'Road Maintenance', 'Sanitation & Waste', 'Health & Education'].map((cat) => (
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <label htmlFor="service-status-filter" style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600 }}>Status</label>
        <select
          id="service-status-filter"
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
          style={{ background: 'var(--panel-bg)', color: 'var(--ink)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '7px 10px' }}
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="APPROVED">Approved</option>
          <option value="OVERDUE">Overdue</option>
        </select>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
          {applications.filter((application) => application.status === 'PENDING').length} pending · {applications.filter((application) => application.status === 'IN_PROGRESS').length} in progress · {applications.filter((application) => application.status === 'APPROVED').length} approved · {applications.filter((application) => application.status === 'OVERDUE').length} overdue
        </span>
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

      <div className="data-table-card" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h4 style={{ margin: 0, color: 'var(--ink)' }}>📋 Municipal Service Registry</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{visibleRecords.length} active records</span>
        </div>

        <table className="analytics-table">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Applicant</th>
              <th>Service Type</th>
              <th>Ward</th>
              <th>Filed</th>
              <th>Work Progress</th>
              <th>Status</th>
              <th>Update Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => (
              <tr key={record.id}>
                <td><strong style={{ color: '#38bdf8' }}>#{record.id}</strong></td>
                <td>{record.applicant}</td>
                <td>{record.type}</td>
                <td>{record.ward}</td>
                <td>{record.date}</td>
                <td style={{ minWidth: '150px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '0.75rem', marginBottom: '5px' }}>
                    <span>{record.workflowStage}</span><strong>{record.progress}%</strong>
                  </div>
                  <progress value={record.progress} max="100" aria-label={`${record.progress}% complete`} style={{ width: '100%', height: '8px', accentColor: record.status === 'OVERDUE' ? '#dc2626' : '#0d9488' }} />
                </td>
                <td>
                  <span className={`status-pill ${record.status === 'APPROVED' ? 'good' : record.status === 'OVERDUE' ? 'overdue' : record.status === 'IN_PROGRESS' ? 'in-progress' : 'pending'}`}>
                    {record.status.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <select
                    aria-label={`Update status for ${record.id}`}
                    value={record.status}
                    onChange={(e) => onUpdateApplication?.(record, e.target.value)}
                    style={{ background: 'var(--panel-bg)', color: 'var(--ink)', border: '1px solid var(--border-color)', borderRadius: '5px', padding: '6px' }}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="APPROVED">Approved</option>
                    <option value="OVERDUE">Overdue</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => onOpenActionModal?.(record, 'view')}
                      style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => onOpenActionModal?.(record, 'approve')}
                      style={{ background: 'rgba(45, 212, 191, 0.15)', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      ✓ Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-grid-2">
        <LineChartComponent data={data.monthlyTrends} title="Monthly Request & Resolution Trends" />
        <BarChartComponent data={data.serviceWisePerformance} title="Service Volume by Category" />
      </div>
    </div>
  );
};
