import React from 'react';

export const LineChartComponent = ({ data, title }) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => Math.max(d.requests || 0, d.resolved || 0))) * 1.15 || 100;
  const width = 600;
  const height = 220;
  const padding = 35;

  const pointsRequests = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.requests / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const pointsResolved = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.resolved / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="chart-card">
      {title && <h4>{title}</h4>}
      <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart">
        {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = height - padding - ratio * (height - 2 * padding);
          return (
            <line key={idx} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#cbd5e1" strokeDasharray="4" />
          );
        })}

        <polyline fill="none" stroke="#00796b" strokeWidth="3" points={pointsRequests} />
        <polyline fill="none" stroke="#0284c7" strokeWidth="3" points={pointsResolved} />

        {data.map((d, i) => {
          const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
          const yReq = height - padding - (d.requests / maxVal) * (height - 2 * padding);
          const yRes = height - padding - (d.resolved / maxVal) * (height - 2 * padding);
          return (
            <g key={i}>
              <circle cx={x} cy={yReq} r="4" fill="#00796b" />
              <circle cx={x} cy={yRes} r="4" fill="#0284c7" />
              <text x={x} y={height - 10} textAnchor="middle" fill="#64748b" fontSize="11">{d.month}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.85rem' }}>
        <span style={{ color: '#00796b', fontWeight: 600 }}>● Total Requests</span>
        <span style={{ color: '#0284c7', fontWeight: 600 }}>● Resolved Requests</span>
      </div>
    </div>
  );
};

export const BarChartComponent = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data.map(d => d.count || 0)) * 1.15 || 10;

  return (
    <div className="chart-card">
      {title && <h4>{title}</h4>}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '180px', paddingTop: '20px' }}>
        {data.map((item, idx) => {
          const heightPct = Math.min(100, Math.max(10, (item.count / maxVal) * 100));
          return (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{item.count}</div>
              <div style={{ flex: 1, width: '100%', backgroundColor: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'flex-end' }}>
                <div style={{ width: '100%', height: `${heightPct}%`, backgroundColor: '#0d9488', borderRadius: '4px', transition: 'height 0.3s' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', textAlign: 'center', wordBreak: 'break-word' }}>{item.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BudgetProgressComponent = ({ budgets }) => {
  if (!budgets) return null;

  return (
    <div className="chart-card">
      <h4>Department Budget Expenditure</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {budgets.map((b, idx) => {
          const isOver = b.isOverBudget || b.expenditure > b.allocated;
          const pct = Math.min(100, (b.expenditure / (b.allocated || 1)) * 100);
          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600 }}>{b.department}</span>
                <span>
                  ${(b.expenditure / 1000000).toFixed(1)}M / ${(b.allocated / 1000000).toFixed(1)}M ({b.utilizationPct}%)
                  {isOver && <span className="status-pill overdue" style={{ marginLeft: '8px' }}>OVER BUDGET</span>}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar-fill ${isOver ? 'exceeded' : ''}`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
