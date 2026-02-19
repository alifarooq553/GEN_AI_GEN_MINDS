// ConfigPanel.jsx — Industry, period, company name config
import React from 'react';
import './ConfigPanel.css';

export default function ConfigPanel({ config, onChange, onAnalyze, loading, disabled }) {
  return (
    <div className="config-panel">
      <div className="config-row">
        <div className="config-group">
          <label>COMPANY NAME (optional)</label>
          <input
            type="text"
            placeholder="e.g. Acme Corp"
            value={config.companyName}
            onChange={(e) => onChange({ ...config, companyName: e.target.value })}
          />
        </div>

        <div className="config-group">
          <label>INDUSTRY</label>
          <select
            value={config.industry}
            onChange={(e) => onChange({ ...config, industry: e.target.value })}
          >
            <option value="retail">Retail</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="food">Food & Beverage</option>
            <option value="tech">Technology / SaaS</option>
            <option value="mfg">Manufacturing</option>
          </select>
        </div>

        <div className="config-group">
          <label>DATA PERIOD</label>
          <select
            value={config.period}
            onChange={(e) => onChange({ ...config, period: e.target.value })}
          >
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_quarter">Last Quarter</option>
            <option value="last_year">Last Year</option>
          </select>
        </div>

        <div className="config-group btn-group">
          <label>&nbsp;</label>
          <button
            className="btn-analyze"
            onClick={onAnalyze}
            disabled={loading || disabled}
          >
            {loading ? 'Analyzing...' : 'Analyze Sales →'}
          </button>
        </div>
      </div>
    </div>
  );
}
