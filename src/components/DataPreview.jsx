// DataPreview.jsx — Table preview of uploaded CSV data
import React from 'react';
import './DataPreview.css';

export default function DataPreview({ headers, rows }) {
  if (!headers || !rows) return null;
  const preview = rows.slice(0, 8);

  return (
    <div className="data-preview">
      <div className="preview-header">
        <span className="preview-icon">📋</span>
        Data Preview —{' '}
        <span className="preview-highlight">
          showing {preview.length} of {rows.length} rows
        </span>{' '}
        · {headers.length} columns
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h || `Col ${i + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell || '—'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
