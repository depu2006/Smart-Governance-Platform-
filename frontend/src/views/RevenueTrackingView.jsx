import React, { useState } from 'react';

const formatRupees = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(amount || 0);

export const RevenueTrackingView = ({ data, onShowToast, onOpenModal }) => {
  const [auditedSource, setAuditedSource] = useState(null);

  if (!data) return <div className="loading-state">Loading Revenue Tracking...</div>;

  const sourceCollectionRate = auditedSource?.target
    ? (auditedSource.amount / auditedSource.target) * 100
    : 0;
  const sourceTargetMet = sourceCollectionRate >= 100;

  const exportWardLedger = (wardRecord) => {
    const averagePerReceipt = wardRecord.totalCount
      ? Math.round(wardRecord.amount / wardRecord.totalCount)
      : 0;
    const csvRows = [
      ['Ward', 'Transactions', 'Total Collected (INR)', 'Average Collection per Receipt (INR)'],
      [wardRecord.ward, wardRecord.totalCount, wardRecord.amount, averagePerReceipt],
    ];
    const csvContent = csvRows
      .map((csvRow) => csvRow.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const downloadUrl = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = `${wardRecord.ward.replace(/\s+/g, '_')}_revenue_ledger.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);
    onShowToast?.(`Receipt ledger downloaded for ${wardRecord.ward}.`, 'success');
  };

  return (
    <div className="revenue-tracking-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.4rem' }}>Revenue Tracking & Collection Analysis</h3>
        <button 
          className="btn-primary" 
          onClick={() => onOpenModal('payment')}
          style={{ backgroundColor: '#0284c7' }}
        >
          + Record Tax / License Payment
        </button>
      </div>

      <div className="top-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">Total Revenue Collected</div>
          <div className="kpi-value">{formatRupees(data.totalRevenueCollected)}</div>
          <div className="kpi-subtitle">Collected YTD</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Annual Revenue Target</div>
          <div className="kpi-value">{formatRupees(data.totalRevenueTarget)}</div>
          <div className="kpi-subtitle">Target FY 2024</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Target Collection Rate</div>
          <div className="kpi-value">{data.collectionPercentage}%</div>
          <div className="kpi-trend positive">Achieved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending Payments</div>
          <div className="kpi-value">{formatRupees(data.pendingPayments)}</div>
          <div className="kpi-trend warning">Outstanding Dues</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="data-table-card">
          <h4>Revenue Breakdown by Source</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Collected (INR)</th>
                <th>Target (INR)</th>
                <th>Share (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.revenueBySource && data.revenueBySource.map((src, idx) => (
                <tr key={idx}>
                  <td><strong>{src.source}</strong></td>
                  <td>{formatRupees(src.amount)}</td>
                  <td>{formatRupees(src.target)}</td>
                  <td><span className="status-pill good">{src.percentageShare}%</span></td>
                  <td>
                    <button 
                      className="revenue-source-audit"
                      onClick={() => setAuditedSource(src)}
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-table-card">
          <h4>Revenue Collection by Ward</h4>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Ward</th>
                <th>Transactions</th>
                <th>Total Collected (INR)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.revenueByWard && data.revenueByWard.map((w, idx) => (
                <tr key={idx}>
                  <td><strong>{w.ward}</strong></td>
                  <td>{w.totalCount} Receipts</td>
                  <td>{formatRupees(w.amount)}</td>
                  <td>
                    <button
                      className="revenue-ledger-button"
                      onClick={() => exportWardLedger(w)}
                    >
                      Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {auditedSource && (
        <div className="modal-overlay" onClick={() => setAuditedSource(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3>Revenue Audit: {auditedSource.source}</h3>
              <button className="modal-close-btn" onClick={() => setAuditedSource(null)}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Audit compares collected revenue with the annual target for this source.
              </p>
              <table className="analytics-table">
                <tbody>
                  <tr><th>Collected</th><td>{formatRupees(auditedSource.amount)}</td></tr>
                  <tr><th>Annual Target</th><td>{formatRupees(auditedSource.target)}</td></tr>
                  <tr><th>Remaining to Target</th><td>{formatRupees(Math.max(0, auditedSource.target - auditedSource.amount))}</td></tr>
                  <tr><th>Collection Rate</th><td>{sourceCollectionRate.toFixed(1)}%</td></tr>
                  <tr><th>Revenue Share</th><td>{auditedSource.percentageShare}%</td></tr>
                  <tr>
                    <th>Audit Result</th>
                    <td><span className={`status-pill ${sourceTargetMet ? 'good' : 'pending'}`}>{sourceTargetMet ? 'TARGET MET' : 'TARGET NOT MET'}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-primary" onClick={() => setAuditedSource(null)}>Close Audit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
