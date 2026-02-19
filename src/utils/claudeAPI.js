// claudeAPI.js — Claude API integration for sales analysis

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

const INDUSTRY_MAP = {
  retail: 'Retail',
  ecommerce: 'E-Commerce',
  food: 'Food & Beverage',
  tech: 'Technology / SaaS',
  mfg: 'Manufacturing',
};

const PERIOD_MAP = {
  last_week: 'last week',
  last_month: 'last month',
  last_quarter: 'last quarter',
  last_year: 'last year',
};

export async function analyzeSalesData({ csvSample, totalRows, headers, industry, period, companyName }) {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_claude_api_key_here') {
    throw new Error('Please add your Claude API key to the .env file (REACT_APP_ANTHROPIC_API_KEY).');
  }

  const prompt = `You are an expert business analyst and sales strategist. ${
    companyName ? `Company: ${companyName}.` : ''
  } Industry: ${INDUSTRY_MAP[industry] || industry}. Data period: ${PERIOD_MAP[period] || period}.

Here is their sales data CSV sample (up to 100 rows):
\`\`\`
${csvSample}
\`\`\`

Total rows in full dataset: ${totalRows}
Columns: ${headers.join(', ')}

Please analyze this data thoroughly and provide a structured response in EXACTLY this format:

STATS_JSON:{"metric1_label":"Total Revenue","metric1_value":"$X,XXX","metric2_label":"Top Product","metric2_value":"Name","metric3_label":"Growth Opportunity","metric3_value":"X%","metric4_label":"Risk Alert","metric4_value":"Brief note"}

**EXECUTIVE SUMMARY**
Write 2-3 sentences summarizing overall business performance based on the data.

**KEY FINDINGS**
- Finding 1 with specific numbers from data
- Finding 2 with specific numbers from data
- Finding 3 with specific numbers from data
- Finding 4 with specific numbers from data

**TOP 5 RECOMMENDATIONS**
1. Specific action — explain expected revenue/profit impact
2. Specific action — explain expected revenue/profit impact
3. Specific action — explain expected revenue/profit impact
4. Specific action — explain expected revenue/profit impact
5. Specific action — explain expected revenue/profit impact

**RISK FACTORS**
- Risk 1: description and how to mitigate
- Risk 2: description and how to mitigate
- Risk 3: description and how to mitigate

**QUICK WINS**
- Action 1: Something to do THIS WEEK for immediate revenue boost
- Action 2: Something to do THIS WEEK for immediate revenue boost
- Action 3: Something to do THIS WEEK for immediate revenue boost

Be specific, data-driven, and practical. Use actual numbers from the data wherever possible.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-calls': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.map((b) => b.text || '').join('') || '';
  return parseAIResponse(text);
}

function parseAIResponse(text) {
  // Extract STATS_JSON
  let stats = null;
  const statsMatch = text.match(/STATS_JSON:(\{[^\n]+\})/);
  if (statsMatch) {
    try { stats = JSON.parse(statsMatch[1]); } catch {}
  }

  // Remove stats line from main text
  const cleanText = text.replace(/STATS_JSON:\{[^\n]+\}\n?/, '').trim();

  // Extract recommendations
  const recos = [];
  const recoMatch = cleanText.match(/\*\*TOP 5 RECOMMENDATIONS\*\*[\s\S]*?(?=\n\*\*[A-Z]|$)/i);
  if (recoMatch) {
    const lines = recoMatch[0].split('\n').filter((l) => l.match(/^\d+\./));
    lines.forEach((l) => recos.push(l.replace(/^\d+\.\s*\*?\*?/, '').replace(/\*\*/g, '').trim()));
  }

  // Extract sections
  const sections = {};
  const sectionNames = ['EXECUTIVE SUMMARY', 'KEY FINDINGS', 'RISK FACTORS', 'QUICK WINS'];
  sectionNames.forEach((name) => {
    const regex = new RegExp(`\\*\\*${name}\\*\\*([\\s\\S]*?)(?=\\n\\*\\*[A-Z]|$)`, 'i');
    const match = cleanText.match(regex);
    if (match) {
      sections[name] = match[1].trim();
    }
  });

  return { stats, recos, sections, rawText: cleanText };
}
