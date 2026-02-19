// LoadingState.jsx — Animated step-by-step loading
import React, { useState, useEffect } from 'react';
import './LoadingState.css';

const STEPS = [
  'Parsing your sales data...',
  'Identifying revenue patterns...',
  'Detecting top & bottom performers...',
  'Calculating growth opportunities...',
  'Generating AI recommendations...',
];

export default function LoadingState({ totalRows }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-card">
      <div className="spinner" />
      <h3>AI is analyzing your data</h3>
      <p>Processing {totalRows} records with Claude AI...</p>
      <div className="loading-steps">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`loading-step ${i === stepIdx ? 'active' : i < stepIdx ? 'done' : ''}`}
          >
            <div className="step-dot" />
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
