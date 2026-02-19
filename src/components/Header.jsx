// Header.jsx — App header with live clock
import React, { useState, useEffect } from 'react';
import { startClock } from '../utils/clockUtils';
import './Header.css';

export default function Header({ onLogoClick }) {
  const [clockStr, setClockStr] = useState('');

  useEffect(() => {
    const stop = startClock(setClockStr);
    return stop; // cleanup on unmount
  }, []);

  return (
    <header className="header">
      <div className="header-left" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <div className="logo-dot" />
        <h1 className="logo-text">
          Sales<span>AI</span> Analyzer
        </h1>
      </div>
      <div className="header-right">
        <div className="clock-display">
          <span className="clock-icon">⏱</span>
          <span className="clock-time">{clockStr}</span>
        </div>
      </div>
    </header>
  );
}
