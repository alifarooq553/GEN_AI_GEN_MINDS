// pdfGenerator.js — Export analysis report as PDF using jsPDF
import jsPDF from 'jspdf';

export function downloadReportAsPDF({ stats, sections, recos, companyName, fileName, timestamp }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 20;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };

  const checkSpace = (needed = 20) => {
    if (y + needed > 270) addPage();
  };

  // ── Header ──────────────────────────────────────────────
  doc.setFillColor(10, 10, 15);
  doc.rect(0, 0, pageW, 40, 'F');
  doc.setTextColor(0, 229, 160);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('SalesAI Analyzer', margin, 18);
  doc.setFontSize(9);
  doc.setTextColor(112, 112, 160);
  doc.text('AI-Powered Sales Insights Report', margin, 26);
  doc.text(`Generated: ${timestamp}`, margin, 33);
  if (companyName) {
    doc.setTextColor(240, 240, 248);
    doc.text(`Company: ${companyName}`, pageW - margin, 26, { align: 'right' });
  }
  doc.text(`Source: ${fileName}`, pageW - margin, 33, { align: 'right' });

  y = 50;

  // ── Key Metrics ──────────────────────────────────────────
  if (stats) {
    doc.setFillColor(18, 18, 26);
    doc.roundedRect(margin, y, contentW, 36, 3, 3, 'F');
    doc.setFontSize(8);
    doc.setTextColor(112, 112, 160);
    doc.text('KEY METRICS', margin + 5, y + 8);

    const metrics = [1, 2, 3, 4].map((n) => ({
      label: stats[`metric${n}_label`],
      value: stats[`metric${n}_value`],
    })).filter((m) => m.label);

    const colW = contentW / metrics.length;
    metrics.forEach((m, i) => {
      const x = margin + i * colW + 5;
      doc.setFontSize(7);
      doc.setTextColor(112, 112, 160);
      doc.text(m.label || '', x, y + 18);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 229, 160);
      doc.text(m.value || '', x, y + 29);
    });
    y += 46;
  }

  const writeSectionTitle = (title) => {
    checkSpace(16);
    doc.setFillColor(26, 26, 38);
    doc.rect(margin, y, contentW, 10, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 229, 160);
    doc.text(title, margin + 4, y + 7);
    y += 14;
  };

  const writeBody = (text, color = [200, 200, 220]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentW - 4);
    lines.forEach((line) => {
      checkSpace(6);
      doc.text(line, margin + 4, y);
      y += 5.5;
    });
    y += 3;
  };

  // ── Sections ─────────────────────────────────────────────
  if (sections['EXECUTIVE SUMMARY']) {
    writeSectionTitle('EXECUTIVE SUMMARY');
    writeBody(sections['EXECUTIVE SUMMARY']);
  }

  if (recos && recos.length > 0) {
    writeSectionTitle('TOP 5 RECOMMENDATIONS');
    recos.forEach((r, i) => {
      checkSpace(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(0, 229, 160);
      doc.text(`0${i + 1}`, margin + 4, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(200, 200, 220);
      const lines = doc.splitTextToSize(r, contentW - 14);
      lines.forEach((line, li) => {
        checkSpace(6);
        doc.text(line, margin + 12, y + (li === 0 ? 0 : li * 5.5));
      });
      y += lines.length * 5.5 + 3;
    });
    y += 4;
  }

  if (sections['KEY FINDINGS']) {
    writeSectionTitle('KEY FINDINGS');
    writeBody(sections['KEY FINDINGS']);
  }

  if (sections['RISK FACTORS']) {
    writeSectionTitle('RISK FACTORS');
    writeBody(sections['RISK FACTORS']);
  }

  if (sections['QUICK WINS']) {
    writeSectionTitle('QUICK WINS');
    writeBody(sections['QUICK WINS']);
  }

  // ── Footer ───────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(60, 60, 80);
    doc.text(
      `SalesAI Analyzer  ·  Page ${i} of ${pageCount}  ·  Confidential`,
      pageW / 2,
      290,
      { align: 'center' }
    );
  }

  doc.save(`SalesAI_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
