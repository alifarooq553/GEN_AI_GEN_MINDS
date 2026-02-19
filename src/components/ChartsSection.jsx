// ChartsSection.jsx — Bar, Line, Pie charts from CSV data
import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';
import './ChartsSection.css';

const COLORS = ['#00e5a0', '#7b61ff', '#ffb347', '#ff4d6d', '#60a5fa', '#f472b6'];

function detectNumericCol(headers) {
  const keywords = ['revenue', 'sales', 'amount', 'total', 'price', 'value', 'profit', 'income', 'cost'];
  return headers.findIndex((h) =>
    keywords.some((k) => h.toLowerCase().includes(k))
  );
}

function detectLabelCol(headers) {
  const keywords = ['product', 'category', 'item', 'name', 'region', 'type', 'department'];
  return headers.findIndex((h) =>
    keywords.some((k) => h.toLowerCase().includes(k))
  );
}

function detectDateCol(headers) {
  const keywords = ['date', 'month', 'week', 'day', 'period', 'time', 'year'];
  return headers.findIndex((h) =>
    keywords.some((k) => h.toLowerCase().includes(k))
  );
}

export default function ChartsSection({ headers, rows }) {
  const { barData, lineData, pieData, hasCharts } = useMemo(() => {
    if (!headers || !rows || rows.length === 0) return { hasCharts: false };

    const numIdx = detectNumericCol(headers);
    const labelIdx = detectLabelCol(headers);
    const dateIdx = detectDateCol(headers);

    if (numIdx === -1) return { hasCharts: false };

    const parseNum = (v) => parseFloat(String(v).replace(/[^0-9.-]/g, '')) || 0;

    // Bar chart — top 8 label groups by sum
    let barData = null;
    if (labelIdx !== -1 && labelIdx !== numIdx) {
      const grouped = {};
      rows.forEach((row) => {
        const key = row[labelIdx] || 'Unknown';
        grouped[key] = (grouped[key] || 0) + parseNum(row[numIdx]);
      });
      barData = Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value]) => ({ name: name.slice(0, 14), value: Math.round(value) }));
    }

    // Line chart — by date/period
    let lineData = null;
    if (dateIdx !== -1 && dateIdx !== numIdx) {
      const grouped = {};
      rows.forEach((row) => {
        const key = row[dateIdx] || 'Unknown';
        grouped[key] = (grouped[key] || 0) + parseNum(row[numIdx]);
      });
      lineData = Object.entries(grouped)
        .slice(0, 20)
        .map(([date, value]) => ({ date: date.slice(0, 10), value: Math.round(value) }));
    }

    // Pie chart — top 6 label groups
    let pieData = null;
    if (barData) {
      pieData = barData.slice(0, 6).map((d) => ({ name: d.name, value: d.value }));
    }

    return {
      barData,
      lineData,
      pieData,
      hasCharts: !!(barData || lineData),
    };
  }, [headers, rows]);

  if (!hasCharts) return null;

  const valLabel = headers[detectNumericCol(headers)] || 'Value';

  const tooltipStyle = {
    backgroundColor: '#1a1a26',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    color: '#f0f0f8',
    fontSize: '12px',
  };

  return (
    <div className="charts-section">
      <h3 className="charts-title">📊 Visual Analytics</h3>
      <div className="charts-grid">
        {barData && (
          <div className="chart-card">
            <div className="chart-label">Top Performers — {valLabel}</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#7070a0', fontSize: 10 }}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: '#7070a0', fontSize: 10 }} width={50} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#00e5a0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {lineData && (
          <div className="chart-card">
            <div className="chart-label">Sales Trend Over Time</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#7070a0', fontSize: 9 }}
                  angle={-30}
                  textAnchor="end"
                  interval={Math.floor(lineData.length / 5)}
                />
                <YAxis tick={{ fill: '#7070a0', fontSize: 10 }} width={50} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#7b61ff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {pieData && (
          <div className="chart-card">
            <div className="chart-label">Revenue Distribution</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span style={{ color: '#c0c0d8', fontSize: 11 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
