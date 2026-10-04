import React, { useState } from 'react';
import { BarChartComponent } from '../components/ChartComponents.jsx';

export const GrievanceAnalyticsView = ({
  data,
  complaintsList = [],
  onShowToast,
  onOpenModal,
  onOpenActionModal,
}) => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  if (!data) return <div className="loading-state">Loading Grievance Analytics...</div>;

  const filteredComplaints = complaintsList.filter((c) => {
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'RESOLVED' && c.status === 'RESOLVED') ||
      (filterStatus === 'PENDING' && (c.status === 'PENDING_REVIEW' || c.status === 'IN_PROGRESS')) ||
      (filterStatus === 'OVERDUE' && c.status === 'OVERDUE');

    const matchesSearch =
      c.citizenName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ward?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="grievance-analytics-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.4rem' }}>
            Milestone 1 — Citizen Management & Complaint Resolution
          </h3>
          <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '0.88rem' }}>
            Tracking <strong>2.4M Citizens</strong> • <strong>{complaintsList.length} Active Complaints</strong> in Registry
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => onOpenModal('grievance')}
          style={{ backgroundColor: '#0284c7' }}
        >
          + File New Citizen Grievance
        </button>
      </div>

      {/* Top KPI Cards with Live Complainers Count */}
      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Citizens Registered</div>
          <div className="kpi-value">2,418,920</div>
          <div className="kpi-subtitle">Verified Aadhaar / Identity</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Active Complainers</div>
          <div className="kpi-value">12,480</div>
          <div className="kpi-trend positive">94% Satisfied</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Grievances in Registry</div>
          <div className="kpi-value">{complaintsList.length}</div>
          <div className="kpi-subtitle">{complaintsList.filter(c => c.status === 'RESOLVED').length} Resolved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Overdue / SLA Alerts</div>
          <div className="kpi-value">{complaintsList.filter(c => c.status === 'OVERDUE').length}</div>
          <div className="kpi-trend negative">MTTR 47 hrs</div>
        </div>
      </div>

      {/* Filter Bar & Live Search Input */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'PENDING', 'RESOLVED', 'OVERDUE'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                if (onShowToast) onShowToast(`Filtered complaints by: ${status}`, 'info');
              }}
              style={{
                background: filterStatus === status ? 'var(--button-dark)' : 'var(--card-bg)',
                color: filterStatus === status ? 'var(--button-text)' : 'var(--muted)',
                border: '1px solid var(--border-color)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {status} ({status === 'ALL' ? complaintsList.length : complaintsList.filter(c => status === 'RESOLVED' ? c.status === 'RESOLVED' : status === 'OVERDUE' ? c.status === 'OVERDUE' : c.status !== 'RESOLVED' && c.status !== 'OVERDUE').length})
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="🔎 Filter by Citizen Name, ID or Ward..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            color: 'var(--ink)',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            width: '280px',
            outline: 'none',
          }}
        />
      </div>

      {/* Comprehensive Citizen Complaints Registry Table */}
      <div className="data-table-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h4 style={{ margin: 0, color: 'var(--ink)' }}>
            📋 Live Citizen Grievance Registry ({filteredComplaints.length} Records)
          </h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-teal)', fontWeight: '600' }}>
            ⚡ Real-time Keycloak RBAC Audit Active
          </span>
        </div>

        <table className="analytics-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Citizen Name</th>
              <th>Category</th>
              <th>Ward</th>
              <th>Filed</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Management Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c.id}>
                <td><strong style={{ color: '#38bdf8' }}>#{c.id}</strong></td>
                <td><strong>{c.citizenName}</strong></td>
                <td>{c.category}</td>
                <td>{c.ward}</td>
                <td><span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{c.timestamp}</span></td>
                <td>
                  <span className={`status-pill ${c.status === 'RESOLVED' ? 'good' : c.status === 'OVERDUE' ? 'overdue' : 'good'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                    <button
                      className="grievance-row-action action-view"
                      title="View Details"
                      onClick={() => onOpenActionModal(c, 'view')}
                    >
                      👁️ View
                    </button>
                    <button
                      className="grievance-row-action action-approve"
                      title="Approve / Sanction"
                      onClick={() => onOpenActionModal(c, 'approve')}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="grievance-row-action action-escalate"
                      title="Escalate SLA"
                      onClick={() => onOpenActionModal(c, 'escalate')}
                    >
                      ⚡ Escalate
                    </button>
                    <button
                      className="grievance-row-action action-reassign"
                      title="Reassign Officer"
                      onClick={() => onOpenActionModal(c, 'reassign')}
                    >
                      👤 Reassign
                    </button>
                    <button
                      className="grievance-row-action action-audit"
                      title="Audit Log"
                      onClick={() => onOpenActionModal(c, 'audit')}
                    >
                      📜 Audit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-grid-2">
        <BarChartComponent data={data.grievancesByCategory} title="Grievance Distribution by Department Category" />

        <div className="data-table-card">
          <h4 style={{ color: '#f87171', margin: '0 0 12px 0' }}>🚨 High Priority SLA Escalation Queue</h4>
          <div className="activity-list">
            {complaintsList.filter(c => c.status === 'OVERDUE' || c.status === 'IN_PROGRESS').slice(0, 3).map((c) => (
              <div key={c.id} className="activity-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <strong>#{c.id} — {c.citizenName}</strong>
                  <span className="status-pill overdue">{c.ward}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{c.category} • Assigned to {c.assignedOfficer}</div>
                <div style={{ display: 'flex', gap: '6px', width: '100%', marginTop: '4px' }}>
                  <button
                    onClick={() => onOpenActionModal(c, 'escalate')}
                    style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    ⚡ Escalate SLA
                  </button>
                  <button
                    onClick={() => onOpenActionModal(c, 'reassign')}
                    style={{ flex: 1, background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--ink)', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    👤 Reassign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
