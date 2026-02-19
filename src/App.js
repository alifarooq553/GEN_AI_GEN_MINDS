// App.js — Main app with page routing
import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import './App.css';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'analyze'

  return (
    <div className="app-root">
      <Header onLogoClick={() => setPage('landing')} />
      <div className="app-body">
        {page === 'landing' ? (
          <LandingPage onGetStarted={() => setPage('analyze')} />
        ) : (
          <AnalyzePage />
        )}
      </div>
    </div>
  );
}
