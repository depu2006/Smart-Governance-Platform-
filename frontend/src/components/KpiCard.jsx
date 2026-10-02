import React from 'react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'neutral',
  onClick,
}) => {
  return (
    <div
      className={`kpi-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
      {trend && (
        <div className={`kpi-trend ${trendType}`}>
          {trend}
        </div>
      )}
    </div>
  );
};
