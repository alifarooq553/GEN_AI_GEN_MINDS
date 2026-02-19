// MetricCards.jsx — 4 KPI metric cards
import React from 'react';
import './MetricCards.css';

const COLORS = ['green', 'purple', 'orange', 'red'];

export default function MetricCards({ stats, totalRows }) {
  if (!stats) return null;

  const metrics = [1, 2, 3, 4]
    .map((n) => ({
      label: stats[`metric${n}_label`],
      value: stats[`metric${n}_value`],
    }))
    .filter((m) => m.label && m.value);

  return (
    <div className="metrics-grid">
      {metrics.map((m, i) => (
        <div key={i} className={`metric-card ${COLORS[i]}`}>
          <div className="metric-label">{m.label}</div>
          <div className="metric-value">{m.value}</div>
          <div className="metric-sub">Based on {totalRows} records</div>
        </div>
      ))}
    </div>
  );
}
