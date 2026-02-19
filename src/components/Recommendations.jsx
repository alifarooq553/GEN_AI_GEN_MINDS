// Recommendations.jsx — Numbered recommendation cards
import React from 'react';
import './Recommendations.css';

export default function Recommendations({ recos }) {
  if (!recos || recos.length === 0) return null;

  return (
    <div className="recos-block">
      <h3 className="block-title">🎯 Top Recommendations to Increase Profit</h3>
      <div className="recos-list">
        {recos.map((r, i) => (
          <div key={i} className="reco-card">
            <div className="reco-num">0{i + 1}</div>
            <div className="reco-body">
              <div className="reco-text">{r}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
