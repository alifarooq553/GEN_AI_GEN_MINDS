// UploadZone.jsx — Drag & drop file upload
import React, { useRef, useState, useCallback } from 'react';
import { formatBytes } from '../utils/parseFile';
import './UploadZone.css';

export default function UploadZone({ onFile, file, onRemove }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const validate = useCallback((f) => {
    if (!f) return 'No file selected.';
    if (f.size > 10 * 1024 * 1024) return 'File size must be under 10MB.';
    if (!f.name.match(/\.(csv|xlsx|xls|txt)$/i)) return 'Please upload a .csv, .xlsx, or .xls file.';
    return null;
  }, []);

  const handleFile = useCallback((f) => {
    const err = validate(f);
    if (err) { setError(err); return; }
    setError('');
    onFile(f);
  }, [validate, onFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  if (file) {
    return (
      <div className="file-card">
        <div className="file-icon">📄</div>
        <div className="file-info">
          <div className="file-name">{file.name}</div>
          <div className="file-meta">{formatBytes(file.size)}</div>
        </div>
        <button className="btn-remove" onClick={onRemove}>✕ Remove</button>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          onChange={(e) => handleFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <div className="upload-icon">📊</div>
        <h3>Drop your sales file here</h3>
        <p>Supports CSV, Excel (.xlsx / .xls) up to 10MB</p>
        <span className="upload-badge">CLICK TO BROWSE</span>
      </div>
      {error && <div className="upload-error">⚠️ {error}</div>}
    </div>
  );
}
