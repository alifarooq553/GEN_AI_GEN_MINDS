// parseFile.js — CSV and Excel parsing using PapaParse + SheetJS
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Parses a File object (CSV or Excel) and returns { headers, rows }
 */
export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv' || ext === 'txt') {
      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (results) => {
          if (!results.data || results.data.length < 2) {
            reject(new Error('CSV file appears to be empty or invalid.'));
            return;
          }
          const headers = results.data[0].map((h) => String(h).trim());
          const rows = results.data.slice(1).map((row) =>
            row.map((cell) => String(cell).trim())
          );
          resolve({ headers, rows });
        },
        error: (err) => reject(new Error('CSV parse error: ' + err.message)),
      });
    } else if (['xlsx', 'xls'].includes(ext)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
          if (!data || data.length < 2) {
            reject(new Error('Excel file appears to be empty.'));
            return;
          }
          const headers = data[0].map((h) => String(h).trim());
          const rows = data.slice(1).map((row) =>
            row.map((cell) => String(cell).trim())
          );
          resolve({ headers, rows });
        } catch (err) {
          reject(new Error('Excel parse error: ' + err.message));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file type. Please upload CSV or Excel.'));
    }
  });
}

/**
 * Converts parsed data back to CSV string (for sending to AI)
 */
export function toCsvString(headers, rows, maxRows = 100) {
  const limited = rows.slice(0, maxRows);
  return [headers.join(','), ...limited.map((r) => r.join(','))].join('\n');
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
