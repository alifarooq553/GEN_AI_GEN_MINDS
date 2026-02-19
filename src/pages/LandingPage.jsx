// LandingPage.jsx
import React from 'react';
import './LandingPage.css';

const FEATURES = [
  { icon: '📊', title: 'Smart Data Parsing', desc: 'Upload CSV or Excel files up to 10MB. We handle messy formats automatically.' },
  { icon: '🤖', title: 'AI-Powered Analysis', desc: 'Claude AI reads your data and extracts patterns, trends, and opportunities.' },
  { icon: '🎯', title: 'Actionable Recommendations', desc: 'Get 5 specific, data-backed actions to increase revenue and profit immediately.' },
  { icon: '📈', title: 'Visual Charts', desc: 'See your data as bar charts, line graphs, and pie charts for quick understanding.' },
  { icon: '⚠️', title: 'Risk Detection', desc: 'Spot revenue risks and declining trends before they become serious problems.' },
  { icon: '📄', title: 'PDF Export', desc: 'Download a professional report to share with your team or investors.' },
];

const STEPS = [
  { num: '01', title: 'Upload Your Data', desc: 'Drag & drop your CSV or Excel sales file. Any format works — weekly, monthly, or yearly data.' },
  { num: '02', title: 'AI Analyzes It', desc: 'Our Claude AI reads every row, identifies patterns, and extracts key business insights in seconds.' },
  { num: '03', title: 'Get Your Action Plan', desc: 'Receive clear recommendations, risk alerts, and quick wins to boost your sales immediately.' },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">✦ AI-Powered Business Intelligence</div>
        <h1 className="hero-title">
          Turn your sales data into<br />
          <em>profit-boosting intelligence</em>
        </h1>
        <p className="hero-sub">
          Upload your CSV or Excel file — our AI analyzes every row, finds hidden
          opportunities, and gives you a clear roadmap to increase revenue. No data
          science skills needed.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onGetStarted}>
            Analyze My Sales Data →
          </button>
          <span className="hero-note">Free to use · No signup required · Results in 10 seconds</span>
        </div>

        <div className="hero-preview">
          <div className="preview-bar">
            <span className="bar-dot red" /><span className="bar-dot yellow" /><span className="bar-dot green" />
            <span className="bar-title">SalesAI — Analysis Dashboard</span>
          </div>
          <div className="preview-metrics">
            {[
              { label: 'Total Revenue', value: '$2.4M', color: 'green' },
              { label: 'Top Product', value: 'Pro Plan', color: 'purple' },
              { label: 'Growth Opportunity', value: '+34%', color: 'orange' },
              { label: 'Risk Alert', value: 'Q4 Drop', color: 'red' },
            ].map((m, i) => (
              <div key={i} className={`preview-metric ${m.color}`}>
                <div className="pm-label">{m.label}</div>
                <div className="pm-value">{m.value}</div>
              </div>
            ))}
          </div>
          <div className="preview-reco">
            <div className="reco-title">🎯 Top Recommendation</div>
            <div className="reco-text">01 — Increase marketing spend on Pro Plan by 20% — projected +$180K annual revenue based on current conversion rates.</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-title">Three steps to smarter sales decisions</h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="section-label">FEATURES</div>
        <h2 className="section-title">Everything you need to understand your sales</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to grow your business?</h2>
        <p>Upload your sales file and get AI insights in under 30 seconds.</p>
        <button className="btn-primary large" onClick={onGetStarted}>
          Start Free Analysis →
        </button>
      </section>

      <footer className="footer">
        <span>Built with Claude AI · SalesAI Analyzer © 2025</span>
      </footer>
    </div>
  );
}
