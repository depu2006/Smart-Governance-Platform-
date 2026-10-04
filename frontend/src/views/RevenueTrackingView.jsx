import React from 'react';

export const RevenueTrackingView = ({ data, onShowToast, onOpenModal }) => {
  if (!data) return <div className="loading-state">Loading Revenue Tracking...</div>;

  return (
    <div className="revenue-tracking-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Revenue Tracking & Collection Analysis</h3>
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
          <div className="kpi-value">${(data.totalRevenueCollected / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Collected YTD</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Annual Revenue Target</div>
          <div className="kpi-value">${(data.totalRevenueTarget / 1000000).toFixed(1)}M</div>
          <div className="kpi-subtitle">Target FY 2024</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Target Collection Rate</div>
          <div className="kpi-value">{data.collectionPercentage}%</div>
          <div className="kpi-trend positive">Achieved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Pending Payments</div>
          <div className="kpi-value">${(data.pendingPayments / 1000000).toFixed(1)}M</div>
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
                <th>Collected ($)</th>
                <th>Target ($)</th>
                <th>Share (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.revenueBySource && data.revenueBySource.map((src, idx) => (
                <tr key={idx}>
                  <td><strong>{src.source}</strong></td>
                  <td>${src.amount.toLocaleString()}</td>
                  <td>${src.target.toLocaleString()}</td>
                  <td><span className="status-pill good">{src.percentageShare}%</span></td>
                  <td>
                    <button 
                      style={{ background: 'transparent', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                      onClick={() => onShowToast(`Inspecting tax audit trail for ${src.source}`, 'info')}
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
                <th>Total Collected ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.revenueByWard && data.revenueByWard.map((w, idx) => (
                <tr key={idx}>
                  <td><strong>{w.ward}</strong></td>
                  <td>{w.totalCount} Receipts</td>
                  <td>${w.amount.toLocaleString()}</td>
                  <td>
                    <button 
                      style={{ background: 'transparent', border: '1px solid #334155', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                      onClick={() => onShowToast(`✓ Receipt ledger exported for ${w.ward}`, 'success')}
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
    </div>
  );
};
