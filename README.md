# SalesAI Analyzer 🚀

AI-Powered Sales Insights — upload your sales CSV/Excel and get instant recommendations to boost revenue.

---

## ⚡ Quick Start (VS Code / Localhost)

### Step 1 — Install dependencies
```bash
cd salesai-analyzer
npm install
```

### Step 2 — Add your Claude API key
Open the `.env` file and replace the placeholder:
```
REACT_APP_ANTHROPIC_API_KEY=your_actual_key_here
```
Get your key at: https://console.anthropic.com

### Step 3 — Start the dev server
```bash
npm start
```
Opens at: **http://localhost:3000**

---

## 📁 Project Structure

```
src/
  components/
    Header.jsx          ← Logo + live clock (updates every second)
    UploadZone.jsx      ← Drag & drop file upload
    DataPreview.jsx     ← Table preview of CSV data
    ConfigPanel.jsx     ← Industry / period / company name
    LoadingState.jsx    ← Animated step-by-step loading
    MetricCards.jsx     ← 4 KPI cards (revenue, top product, etc)
    Recommendations.jsx ← 5 numbered recommendation cards
    FullAnalysis.jsx    ← Executive summary, findings, risks, quick wins
    ChartsSection.jsx   ← Bar, Line, Pie charts from your data
  pages/
    LandingPage.jsx     ← Homepage with features + CTA
    AnalyzePage.jsx     ← Main upload + results page
  utils/
    clockUtils.js       ← Live clock using Date API + setInterval
    parseFile.js        ← CSV (PapaParse) + Excel (SheetJS) parsing
    claudeAPI.js        ← Claude AI API integration
    pdfGenerator.js     ← PDF report export (jsPDF)
```

---

## 🧪 Test CSV Format

Create a file called `test-sales.csv`:
```
Date,Product,Category,Units,Revenue,Cost,Region
2024-01-15,Pro Plan,SaaS,45,4500,900,North
2024-01-16,Basic Plan,SaaS,120,2400,480,South
2024-02-01,Enterprise,SaaS,8,8000,1600,North
2024-02-14,Pro Plan,SaaS,52,5200,1040,East
2024-03-01,Basic Plan,SaaS,98,1960,392,West
```

---

## 🔑 Features

| Feature | Status |
|---|---|
| CSV upload + drag & drop | ✅ |
| Excel (.xlsx, .xls) upload | ✅ |
| Live data preview table | ✅ |
| Real-time clock (Clock API) | ✅ |
| Claude AI analysis | ✅ |
| 4 KPI metric cards | ✅ |
| Top 5 recommendations | ✅ |
| Bar / Line / Pie charts | ✅ |
| Executive summary + findings | ✅ |
| Risk factors + quick wins | ✅ |
| PDF report download | ✅ |
| Mobile responsive | ✅ |
| Dark theme | ✅ |

---

## 💡 Notes

- The app calls the Claude API directly from the browser. For production, move the API call to a backend server to protect your API key.
- Charts auto-detect numeric and date columns from your CSV headers.
- Works best with 50–5000 rows of data.

---

Built with React + Claude AI (Anthropic) 🤖
