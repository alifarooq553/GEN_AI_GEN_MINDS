// FullAnalysis.jsx — Renders all AI text sections
import React from 'react';
import './FullAnalysis.css';

const SECTION_CONFIG = [
  { key: 'EXECUTIVE SUMMARY', icon: '📋', color: 'blue' },
  { key: 'KEY FINDINGS', icon: '🔍', color: 'purple' },
  { key: 'RISK FACTORS', icon: '⚠️', color: 'red' },
  { key: 'QUICK WINS', icon: '⚡', color: 'green' },
];

function Section({ icon, title, content, color }) {
  if (!content) return null;

  // Render bullet points
  const lines = content.split('\n').filter((l) => l.trim());
  const hasBullets = lines.some((l) => l.trim().startsWith('-'));

  return (
    <div className={`analysis-section ${color}`}>
      <div className="section-head">
        <span className="section-icon">{icon}</span>
        <span className="section-title">{title}</span>
      </div>
      <div className="section-body">
        {hasBullets ? (
          <ul className="bullet-list">
            {lines
              .filter((l) => l.trim().startsWith('-'))
              .map((l, i) => (
                <li key={i}>{l.replace(/^-\s*/, '').trim()}</li>
              ))}
          </ul>
        ) : (
          <p className="section-text">{content}</p>
        )}
      </div>
    </div>
  );
}

export default function FullAnalysis({ sections }) {
  if (!sections) return null;

  return (
    <div className="full-analysis">
      <div className="analysis-grid">
        {SECTION_CONFIG.map((cfg) => (
          <Section
            key={cfg.key}
            icon={cfg.icon}
            title={cfg.key}
            content={sections[cfg.key]}
            color={cfg.color}
          />
        ))}
      </div>
    </div>
  );
}
