import React, { useState } from 'react';
import { BarChartComponent } from '../components/ChartComponents.jsx';

export const GrievanceAnalyticsView = ({ data, onShowToast, onOpenModal }) => {
  const [filterStatus, setFilterStatus] = useState('ALL');

  if (!data) return <div className="loading-state">Loading Grievance Analytics...</div>;

  const handleEscalate = (trackingNumber, ward) => {
    if (onShowToast) {
      onShowToast(`🚨 Complaint #${trackingNumber} escalated to ${ward} Superintending Officer!`, 'warning');
    }
  };

  const handleReassign = (trackingNumber) => {
    if (onShowToast) {
      onShowToast(`🔄 Complaint #${trackingNumber} reassigned to Priority Field Team`, 'success');
    }
  };

  return (
    <div className="grievance-analytics-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Grievance Analytics & Complaint Resolution</h3>
        <button 
          className="btn-primary" 
          onClick={() => onOpenModal('grievance')}
          style={{ backgroundColor: '#0284c7' }}
        >
          + File New Grievance
        </button>
      </div>

      {/* Interactive Status Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['ALL', 'RESOLVED', 'PENDING', 'OVERDUE'].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              if (onShowToast) onShowToast(`Filtered grievances by: ${status}`, 'info');
            }}
            style={{
              background: filterStatus === status ? '#0284c7' : '#0f172a',
              color: filterStatus === status ? '#ffffff' : '#94a3b8',
              border: '1px solid #334155',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Grievances</div>
          <div className="kpi-value">{data.totalGrievances ? data.totalGrievances.toLocaleString() : 0}</div>
          <div className="kpi-subtitle">Filed to Date</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Resolved Grievances</div>
          <div className="kpi-value">{data.resolvedGrievances ? data.resolvedGrievances.toLocaleString() : 0}</div>
          <div className="kpi-trend positive">Resolution Rate: {Math.round((data.resolvedGrievances / (data.totalGrievances || 1)) * 100)}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending / In Progress</div>
          <div className="kpi-value">{data.pendingGrievances}</div>
          <div className="kpi-subtitle">Active Workload</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Escalated / Overdue</div>
          <div className="kpi-value">{data.escalatedGrievances}</div>
          <div className="kpi-trend negative">Overdue SLA</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <BarChartComponent data={data.grievancesByCategory} title="Grievances by Category" />

        <div className="data-table-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ color: '#ef4444', margin: 0 }}>⚠️ Identified Overdue Complaints</h4>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SLA Enforcement Active</span>
          </div>

          {data.overdueComplaints && data.overdueComplaints.length > 0 ? (
            <div className="activity-list">
              {data.overdueComplaints.map((c, idx) => (
                <div key={idx} className="activity-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span className="status-pill overdue">{c.overdueDays} Days Overdue</span>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>{c.ward}</span>
                  </div>
                  <div className="act-details">
                    <div className="act-desc">{c.title} (#{c.trackingNumber})</div>
                    <div className="act-meta">{c.department} • Assigned to SLA Response Team</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '4px' }}>
                    <button 
                      style={{ flex: 1, backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      onClick={() => handleEscalate(c.trackingNumber, c.ward)}
                    >
                      ⚡ Escalate SLA
                    </button>
                    <button 
                      style={{ flex: 1, backgroundColor: '#0284c7', color: '#ffffff', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      onClick={() => handleReassign(c.trackingNumber)}
                    >
                      🔄 Reassign Officer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No overdue complaints matching current filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};
