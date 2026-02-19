// AnalyzePage.jsx — Main analysis page
import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import DataPreview from '../components/DataPreview';
import ConfigPanel from '../components/ConfigPanel';
import LoadingState from '../components/LoadingState';
import MetricCards from '../components/MetricCards';
import Recommendations from '../components/Recommendations';
import FullAnalysis from '../components/FullAnalysis';
import ChartsSection from '../components/ChartsSection';
import { parseFile, toCsvString } from '../utils/parseFile';
import { analyzeSalesData } from '../utils/claudeAPI';
import { downloadReportAsPDF } from '../utils/pdfGenerator';
import './AnalyzePage.css';

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [parseError, setParseError] = useState('');
  const [config, setConfig] = useState({ companyName: '', industry: 'retail', period: 'last_year' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleFile = async (f) => {
    setFile(f);
    setResults(null);
    setApiError('');
    setParseError('');
    try {
      const parsed = await parseFile(f);
      setCsvData(parsed);
    } catch (err) {
      setParseError(err.message);
      setCsvData(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setCsvData(null);
    setResults(null);
    setParseError('');
    setApiError('');
  };

  const handleAnalyze = async () => {
    if (!csvData) return;
    setLoading(true);
    setResults(null);
    setApiError('');

    try {
      const csvSample = toCsvString(csvData.headers, csvData.rows, 100);
      const result = await analyzeSalesData({
        csvSample,
        totalRows: csvData.rows.length,
        headers: csvData.headers,
        industry: config.industry,
        period: config.period,
        companyName: config.companyName,
      });
      setResults({ ...result, timestamp: new Date(), fileName: file.name });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!results) return;
    downloadReportAsPDF({
      stats: results.stats,
      sections: results.sections,
      recos: results.recos,
      companyName: config.companyName,
      fileName: results.fileName,
      timestamp: results.timestamp.toLocaleString('en-IN'),
    });
  };

  return (
    <div className="analyze-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Sales Analysis</h2>
          <p className="page-sub">Upload your sales file and get AI-powered insights in seconds</p>
        </div>
      </div>

      {/* Upload */}
      <UploadZone file={file} onFile={handleFile} onRemove={handleRemove} />

      {parseError && (
        <div className="error-banner">⚠️ {parseError}</div>
      )}

      {/* Data Preview */}
      {csvData && (
        <DataPreview headers={csvData.headers} rows={csvData.rows} />
      )}

      {/* Config */}
      {csvData && !results && (
        <ConfigPanel
          config={config}
          onChange={setConfig}
          onAnalyze={handleAnalyze}
          loading={loading}
          disabled={!csvData}
        />
      )}

      {/* Loading */}
      {loading && <LoadingState totalRows={csvData?.rows?.length || 0} />}

      {/* API Error */}
      {apiError && (
        <div className="error-banner" style={{ marginTop: 16 }}>
          ⚠️ {apiError}
          {apiError.includes('API key') && (
            <div className="error-hint">
              Open <code>.env</code> and set <code>REACT_APP_ANTHROPIC_API_KEY=your_key</code>,
              then restart the dev server.
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="results-section">
          <div className="results-header">
            <div>
              <h2 className="results-title">📈 Analysis Report</h2>
              <p className="results-meta">
                {config.companyName && <><strong>{config.companyName}</strong> · </>}
                {results.fileName} · Generated {results.timestamp.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="results-actions">
              <button className="btn-pdf" onClick={handleDownloadPDF}>
                ⬇ Download PDF
              </button>
              <button className="btn-new" onClick={handleRemove}>
                ↺ New Analysis
              </button>
            </div>
          </div>

          <MetricCards stats={results.stats} totalRows={csvData?.rows?.length} />
          <Recommendations recos={results.recos} />
          <ChartsSection headers={csvData?.headers} rows={csvData?.rows} />
          <FullAnalysis sections={results.sections} />
        </div>
      )}
    </div>
  );
}
