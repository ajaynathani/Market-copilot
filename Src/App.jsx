import { useState, useEffect, useCallback } from “react”;

// ── Styles ──────────────────────────────────────────────────────────────────
const STYLES = `
@import url(‘https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap’);

:root {
–bg: #080c14;
–surface: #0e1420;
–surface2: #151d2e;
–border: #1e2d45;
–accent: #00e5ff;
–accent2: #ff6b35;
–bull: #00e676;
–bear: #ff1744;
–neutral: #ffab00;
–text: #e8f0fe;
–muted: #5c7a99;
–font-head: ‘Syne’, sans-serif;
–font-mono: ‘Space Mono’, monospace;
}

- { box-sizing: border-box; margin: 0; padding: 0; }

body {
background: var(–bg);
color: var(–text);
font-family: var(–font-mono);
min-height: 100vh;
}

.app {
max-width: 1400px;
margin: 0 auto;
padding: 24px 20px;
}

/* ── Header ── */
.header {
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-bottom: 32px;
padding-bottom: 20px;
border-bottom: 1px solid var(–border);
}
.header-left h1 {
font-family: var(–font-head);
font-size: 2.2rem;
font-weight: 800;
letter-spacing: -1px;
background: linear-gradient(135deg, var(–accent), #7b68ee);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
.header-left p { color: var(–muted); font-size: 0.72rem; margin-top: 4px; }
.header-right { display: flex; align-items: center; gap: 12px; }
.last-updated { font-size: 0.68rem; color: var(–muted); }
.refresh-btn {
background: var(–surface2);
border: 1px solid var(–border);
color: var(–accent);
padding: 8px 16px;
border-radius: 6px;
cursor: pointer;
font-family: var(–font-mono);
font-size: 0.72rem;
transition: all 0.2s;
display: flex; align-items: center; gap: 6px;
}
.refresh-btn:hover { background: var(–accent); color: var(–bg); }
.refresh-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Bias Hero ── */
.bias-hero {
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 16px;
margin-bottom: 24px;
}
.bias-card {
background: var(–surface);
border: 1px solid var(–border);
border-radius: 12px;
padding: 24px;
position: relative;
overflow: hidden;
}
.bias-card::before {
content: ‘’;
position: absolute;
top: 0; left: 0; right: 0;
height: 3px;
}
.bias-card.bull::before { background: var(–bull); }
.bias-card.bear::before { background: var(–bear); }
.bias-card.neutral::before { background: var(–neutral); }

.bias-label { font-size: 0.65rem; color: var(–muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
.bias-value {
font-family: var(–font-head);
font-size: 2.4rem;
font-weight: 800;
line-height: 1;
}
.bull-text { color: var(–bull); }
.bear-text { color: var(–bear); }
.neutral-text { color: var(–neutral); }

.confidence-bar-wrap { margin-top: 12px; }
.confidence-bar-bg {
height: 6px;
background: var(–border);
border-radius: 3px;
overflow: hidden;
margin-top: 6px;
}
.confidence-bar-fill {
height: 100%;
border-radius: 3px;
transition: width 0.8s ease;
}
.bull .confidence-bar-fill { background: var(–bull); }
.bear .confidence-bar-fill { background: var(–bear); }
.neutral .confidence-bar-fill { background: var(–neutral); }

.score-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
.score-item { background: var(–surface2); border-radius: 6px; padding: 8px 10px; }
.score-item-label { font-size: 0.6rem; color: var(–muted); text-transform: uppercase; letter-spacing: 1px; }
.score-item-val { font-size: 1.1rem; font-weight: 700; margin-top: 2px; }

/* ── Section ── */
.section-title {
font-family: var(–font-head);
font-size: 0.75rem;
letter-spacing: 3px;
text-transform: uppercase;
color: var(–muted);
margin-bottom: 12px;
display: flex; align-items: center; gap: 8px;
}
.section-title::after {
content: ‘’;
flex: 1;
height: 1px;
background: var(–border);
}

/* ── Signal Table ── */
.signals-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
gap: 12px;
margin-bottom: 24px;
}
.signal-card {
background: var(–surface);
border: 1px solid var(–border);
border-radius: 10px;
padding: 16px;
transition: border-color 0.2s, transform 0.2s;
cursor: default;
}
.signal-card:hover { border-color: var(–accent); transform: translateY(-2px); }
.signal-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.signal-name { font-family: var(–font-head); font-size: 0.85rem; font-weight: 700; }
.signal-category { font-size: 0.6rem; color: var(–muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
.signal-badge {
font-size: 0.62rem;
font-weight: 700;
padding: 3px 8px;
border-radius: 4px;
text-transform: uppercase;
letter-spacing: 1px;
}
.badge-bull { background: rgba(0,230,118,0.15); color: var(–bull); border: 1px solid rgba(0,230,118,0.3); }
.badge-bear { background: rgba(255,23,68,0.15); color: var(–bear); border: 1px solid rgba(255,23,68,0.3); }
.badge-neutral { background: rgba(255,171,0,0.15); color: var(–neutral); border: 1px solid rgba(255,171,0,0.3); }
.signal-value { font-size: 1.4rem; font-weight: 700; margin-bottom: 4px; }
.signal-change { font-size: 0.72rem; }
.pos { color: var(–bull); }
.neg { color: var(–bear); }
.signal-bar-bg { height: 3px; background: var(–border); border-radius: 2px; margin-top: 10px; overflow: hidden; }
.signal-bar-fill { height: 100%; border-radius: 2px; }

/* ── AI Explanation ── */
.ai-panel {
background: var(–surface);
border: 1px solid var(–border);
border-radius: 12px;
padding: 24px;
margin-bottom: 24px;
position: relative;
overflow: hidden;
}
.ai-panel::before {
content: ‘’;
position: absolute;
top: 0; left: 0;
width: 100%; height: 100%;
background: radial-gradient(ellipse at top left, rgba(0,229,255,0.04) 0%, transparent 60%);
pointer-events: none;
}
.ai-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.ai-icon {
width: 32px; height: 32px;
background: linear-gradient(135deg, var(–accent), #7b68ee);
border-radius: 8px;
display: flex; align-items: center; justify-content: center;
font-size: 0.9rem;
}
.ai-title { font-family: var(–font-head); font-size: 1rem; font-weight: 700; }
.ai-subtitle { font-size: 0.65rem; color: var(–muted); }
.ai-text {
font-size: 0.82rem;
line-height: 1.8;
color: #b0c4de;
}
.ai-text p { margin-bottom: 10px; }
.ai-loading {
display: flex; align-items: center; gap: 8px;
color: var(–muted); font-size: 0.78rem;
}
.dots span {
display: inline-block;
width: 6px; height: 6px;
background: var(–accent);
border-radius: 50%;
margin: 0 2px;
animation: bounce 1.2s infinite;
}
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
0%,80%,100% { transform: scale(0.6); opacity: 0.4; }
40% { transform: scale(1); opacity: 1; }
}

/* ── Key Drivers ── */
.drivers-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 12px;
margin-bottom: 24px;
}
.driver-card {
background: var(–surface);
border: 1px solid var(–border);
border-radius: 10px;
padding: 16px;
display: flex; gap: 12px; align-items: flex-start;
}
.driver-icon {
width: 36px; height: 36px; flex-shrink: 0;
border-radius: 8px;
display: flex; align-items: center; justify-content: center;
font-size: 1.1rem;
}
.driver-icon.bull-bg { background: rgba(0,230,118,0.15); }
.driver-icon.bear-bg { background: rgba(255,23,68,0.15); }
.driver-icon.neutral-bg { background: rgba(255,171,0,0.15); }
.driver-text { font-size: 0.78rem; color: #b0c4de; line-height: 1.5; }
.driver-text strong { color: var(–text); display: block; margin-bottom: 2px; font-family: var(–font-head); }

/* ── History Log ── */
.history-table {
background: var(–surface);
border: 1px solid var(–border);
border-radius: 12px;
overflow: hidden;
margin-bottom: 24px;
}
.history-table table { width: 100%; border-collapse: collapse; }
.history-table th {
background: var(–surface2);
padding: 10px 16px;
text-align: left;
font-size: 0.65rem;
text-transform: uppercase;
letter-spacing: 2px;
color: var(–muted);
border-bottom: 1px solid var(–border);
}
.history-table td {
padding: 10px 16px;
font-size: 0.75rem;
border-bottom: 1px solid var(–border);
}
.history-table tr:last-child td { border-bottom: none; }
.history-table tr:hover td { background: var(–surface2); }

/* ── Alert Banner ── */
.alert-panel {
background: linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,104,238,0.08));
border: 1px solid rgba(0,229,255,0.25);
border-radius: 10px;
padding: 14px 20px;
margin-bottom: 24px;
display: flex; align-items: center; gap: 12px; justify-content: space-between;
}
.alert-text { font-size: 0.78rem; color: var(–text); }
.alert-text strong { color: var(–accent); }
.alert-time { font-size: 0.65rem; color: var(–muted); }

/* ── Tabs ── */
.tabs { display: flex; gap: 4px; margin-bottom: 20px; }
.tab {
padding: 8px 18px;
border-radius: 6px;
border: 1px solid transparent;
background: transparent;
color: var(–muted);
font-family: var(–font-mono);
font-size: 0.72rem;
cursor: pointer;
transition: all 0.2s;
text-transform: uppercase;
letter-spacing: 1px;
}
.tab.active {
background: var(–surface2);
border-color: var(–border);
color: var(–accent);
}
.tab:hover:not(.active) { color: var(–text); }

/* ── Footer ── */
.footer {
text-align: center;
padding: 20px 0 8px;
border-top: 1px solid var(–border);
font-size: 0.65rem;
color: var(–muted);
line-height: 1.8;
}

@media (max-width: 768px) {
.bias-hero { grid-template-columns: 1fr; }
.drivers-grid { grid-template-columns: 1fr; }
.header { flex-direction: column; align-items: flex-start; gap: 12px; }
.header-left h1 { font-size: 1.6rem; }
}
`;

// ── Market Data Fetcher ─────────────────────────────────────────────────────
// Uses Yahoo Finance via allorigins proxy (no API key needed)
async function fetchQuote(symbol) {
try {
const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`;
const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
const res = await fetch(proxy);
const outer = await res.json();
const data = JSON.parse(outer.contents);
const result = data.chart.result[0];
const closes = result.indicators.quote[0].close;
const prev = closes[closes.length - 2] ?? closes[0];
const curr = closes[closes.length - 1];
const change = curr - prev;
const changePct = (change / prev) * 100;
return { value: curr, change, changePct, ok: true };
} catch {
return { value: null, change: 0, changePct: 0, ok: false };
}
}

const MARKET_SYMBOLS = [
{ id: “sp500”,    symbol: “^GSPC”,  name: “S&P 500”,    category: “Global”,  emoji: “🇺🇸” },
{ id: “nasdaq”,   symbol: “^IXIC”,  name: “Nasdaq”,     category: “Global”,  emoji: “💻” },
{ id: “nikkei”,   symbol: “^N225”,  name: “Nikkei 225”, category: “Asia”,    emoji: “🇯🇵” },
{ id: “brent”,    symbol: “BZ=F”,   name: “Brent Oil”,  category: “Commodity”, emoji: “🛢️” },
{ id: “giftnifty”,symbol: “^NSEI”,  name: “Nifty 50”,   category: “India”,   emoji: “🇮🇳” },
{ id: “vix”,      symbol: “^VIX”,   name: “US VIX”,     category: “Risk”,    emoji: “⚡” },
{ id: “indiavix”, symbol: “^INDIAVIX”, name: “India VIX”, category: “India”, emoji: “📊” },
{ id: “usdinr”,   symbol: “USDINR=X”, name: “USD/INR”,  category: “Forex”,   emoji: “💱” },
{ id: “gold”,     symbol: “GC=F”,   name: “Gold”,       category: “Commodity”, emoji: “🥇” },
{ id: “dowjones”, symbol: “^DJI”,   name: “Dow Jones”,  category: “Global”,  emoji: “📈” },
];

function scoreSingle(id, changePct, value) {
// Returns { score: -1|0|1, label: “BULLISH”|“BEARISH”|“NEUTRAL” }
if (id === “vix” || id === “indiavix”) {
// High VIX = bearish, falling VIX = bullish
if (changePct > 3) return { score: -1, label: “BEARISH” };
if (changePct < -3) return { score: 1, label: “BULLISH” };
return { score: 0, label: “NEUTRAL” };
}
if (id === “usdinr”) {
// Rising USD/INR = bearish for Indian markets (FII outflow)
if (changePct > 0.3) return { score: -1, label: “BEARISH” };
if (changePct < -0.3) return { score: 1, label: “BULLISH” };
return { score: 0, label: “NEUTRAL” };
}
if (changePct > 0.5) return { score: 1, label: “BULLISH” };
if (changePct < -0.5) return { score: -1, label: “BEARISH” };
return { score: 0, label: “NEUTRAL” };
}

function computeBias(signals) {
const total = signals.reduce((s, x) => s + x.score, 0);
const bullCount = signals.filter(s => s.score === 1).length;
const bearCount = signals.filter(s => s.score === -1).length;
const n = signals.length;
const confidence = Math.round((Math.max(bullCount, bearCount) / n) * 100);
let bias = “NEUTRAL”, biasClass = “neutral”;
if (total > 1) { bias = “BULLISH”; biasClass = “bull”; }
else if (total < -1) { bias = “BEARISH”; biasClass = “bear”; }
return { bias, biasClass, confidence, total, bullCount, bearCount };
}

// ── AI Explanation ──────────────────────────────────────────────────────────
async function fetchAIExplanation(signals, bias, confidence) {
const summary = signals.map(s =>
`${s.name}: ${s.value ? s.value.toFixed(2) : "N/A"} (${s.changePct >= 0 ? "+" : ""}${s.changePct.toFixed(2)}%) → ${s.label}`
).join(”\n”);

const prompt = `You are Market Copilot, a sharp financial analyst AI for an Indian retail investor.
Today’s global market signals:
${summary}

Overall bias: ${bias} with ${confidence}% confidence.

Give a concise 3-paragraph market briefing (plain text, no markdown, no bullet points):

1. Overall tone and key drivers (2-3 sentences).
1. India-specific context — Nifty, VIX, USD/INR (2-3 sentences).
1. Actionable suggestion for the day — what to watch (2 sentences).
   Keep it direct, insightful, and under 150 words total.`;

const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method: “POST”,
headers: { “Content-Type”: “application/json” },
body: JSON.stringify({
model: “claude-sonnet-4-20250514”,
max_tokens: 1000,
messages: [{ role: “user”, content: prompt }]
})
});
const data = await res.json();
return data.content?.map(c => c.text || “”).join(””) || “Analysis unavailable.”;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function fmt(val, decimals = 2) {
if (val == null) return “—”;
if (val > 10000) return val.toLocaleString(“en-IN”, { maximumFractionDigits: 0 });
return val.toFixed(decimals);
}

function fmtTime(d) {
return d.toLocaleTimeString(“en-IN”, { hour: “2-digit”, minute: “2-digit”, hour12: true });
}

function fmtDate(d) {
return d.toLocaleDateString(“en-IN”, { day: “2-digit”, month: “short”, year: “numeric” });
}

const KEY_DRIVERS_MAP = {
BULLISH: [
{ icon: “🚀”, type: “bull”, title: “Risk-On Mode”, desc: “Global equities trending upward — institutional money flowing into growth assets.” },
{ icon: “🌏”, type: “bull”, title: “Asia Strength”, desc: “Asian indices showing resilience; positive carry-over expected for Indian markets.” },
{ icon: “💵”, type: “neutral”, title: “Currency Stability”, desc: “USD/INR relatively stable; limited FII outflow pressure on Nifty.” },
{ icon: “⚡”, type: “bull”, title: “Low Volatility”, desc: “VIX subdued — options premiums cheap, market expects calm trading session.” },
],
BEARISH: [
{ icon: “⚠️”, type: “bear”, title: “Risk-Off Pressure”, desc: “Global sell-off underway — investors rotating to safe havens like bonds & gold.” },
{ icon: “📉”, type: “bear”, title: “Weak Asia Signal”, desc: “Asian markets in red; gap-down open likely for Indian indices at open.” },
{ icon: “💸”, type: “bear”, title: “INR Weakness”, desc: “Dollar strengthening vs INR — FII outflows likely to weigh on Nifty Bank.” },
{ icon: “🔥”, type: “bear”, title: “Elevated VIX”, desc: “High volatility index signals fear — hedging activity surging, directional trades risky.” },
],
NEUTRAL: [
{ icon: “⚖️”, type: “neutral”, title: “Mixed Signals”, desc: “Bulls and bears evenly matched — markets await fresh catalyst or data trigger.” },
{ icon: “📊”, type: “neutral”, title: “Consolidation Zone”, desc: “Major indices hugging key levels — breakout or breakdown imminent.” },
{ icon: “🛢️”, type: “neutral”, title: “Commodity Watch”, desc: “Oil prices steady — neither inflationary nor deflationary pressure on the RBI.” },
{ icon: “🔍”, type: “neutral”, title: “Data Watch Mode”, desc: “Look for macro events, earnings, or RBI cues to set direction for the session.” },
],
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function MarketCopilot() {
const [signals, setSignals] = useState([]);
const [bias, setBias] = useState({ bias: “NEUTRAL”, biasClass: “neutral”, confidence: 0, total: 0, bullCount: 0, bearCount: 0 });
const [aiText, setAiText] = useState(””);
const [aiLoading, setAiLoading] = useState(false);
const [loading, setLoading] = useState(true);
const [lastUpdated, setLastUpdated] = useState(null);
const [history, setHistory] = useState([]);
const [tab, setTab] = useState(“dashboard”);
const [error, setError] = useState(””);

const refresh = useCallback(async () => {
setLoading(true);
setError(””);
try {
const results = await Promise.all(
MARKET_SYMBOLS.map(async (m) => {
const q = await fetchQuote(m.symbol);
const scored = scoreSingle(m.id, q.changePct, q.value);
return { …m, …q, …scored };
})
);
setSignals(results);
const b = computeBias(results);
setBias(b);
const now = new Date();
setLastUpdated(now);

```
  // Log to history
  setHistory(prev => [{
    date: fmtDate(now),
    time: fmtTime(now),
    bias: b.bias,
    confidence: b.confidence,
    bull: b.bullCount,
    bear: b.bearCount,
  }, ...prev.slice(0, 19)]);

  // Fetch AI
  setAiLoading(true);
  fetchAIExplanation(results, b.bias, b.confidence)
    .then(txt => setAiText(txt))
    .catch(() => setAiText("AI analysis temporarily unavailable. Please refresh."))
    .finally(() => setAiLoading(false));

} catch (e) {
  setError("Failed to fetch market data. Check your connection.");
} finally {
  setLoading(false);
}
```

}, []);

useEffect(() => {
refresh();
const id = setInterval(refresh, 5 * 60 * 1000); // auto-refresh every 5 min
return () => clearInterval(id);
}, [refresh]);

const drivers = KEY_DRIVERS_MAP[bias.bias] || KEY_DRIVERS_MAP.NEUTRAL;

// Morning alert check
const now = new Date();
const isMarketMorning = now.getHours() >= 8 && now.getHours() <= 10;

return (
<>
<style>{STYLES}</style>
<div className="app">

```
    {/* Header */}
    <div className="header">
      <div className="header-left">
        <h1>⚡ Market Copilot</h1>
        <p>GLOBAL SIGNALS · INDIA FOCUS · AI-POWERED · AUTO-REFRESH 5 MIN</p>
      </div>
      <div className="header-right">
        {lastUpdated && <span className="last-updated">Updated {fmtTime(lastUpdated)}</span>}
        <button className="refresh-btn" onClick={refresh} disabled={loading}>
          <span className={loading ? "spin" : ""}>↻</span>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
    </div>

    {/* Morning Alert */}
    {isMarketMorning && (
      <div className="alert-panel">
        <div>
          <div className="alert-text">🌅 <strong>Morning Briefing Active</strong> — Markets open in {10 - now.getHours()}h. Today's bias: <strong style={{ color: bias.biasClass === "bull" ? "var(--bull)" : bias.biasClass === "bear" ? "var(--bear)" : "var(--neutral)" }}>{bias.bias}</strong></div>
          <div className="alert-time">{fmtDate(now)} · Pre-market window 9:00–9:15 AM IST</div>
        </div>
        <span style={{ fontSize: "1.4rem" }}>🔔</span>
      </div>
    )}

    {error && (
      <div style={{ background: "rgba(255,23,68,0.1)", border: "1px solid rgba(255,23,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: "0.78rem", color: "var(--bear)" }}>
        ⚠️ {error}
      </div>
    )}

    {/* Tabs */}
    <div className="tabs">
      {["dashboard", "signals", "history"].map(t => (
        <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
          {t === "dashboard" ? "📊 Dashboard" : t === "signals" ? "📡 All Signals" : "🕐 History"}
        </button>
      ))}
    </div>

    {tab === "dashboard" && (
      <>
        {/* Bias Hero */}
        <div className="bias-hero">
          <div className={`bias-card ${bias.biasClass}`}>
            <div className="bias-label">Market Bias</div>
            <div className={`bias-value ${bias.biasClass}-text`}>{bias.bias}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 6 }}>
              {bias.bullCount} bull · {bias.bearCount} bear · {10 - bias.bullCount - bias.bearCount} neutral
            </div>
          </div>

          <div className={`bias-card ${bias.biasClass}`}>
            <div className="bias-label">Confidence Score</div>
            <div className={`bias-value ${bias.biasClass}-text`}>{bias.confidence}%</div>
            <div className="confidence-bar-wrap">
              <div style={{ fontSize: "0.65rem", color: "var(--muted)" }}>Signal agreement</div>
              <div className="confidence-bar-bg">
                <div className="confidence-bar-fill" style={{ width: `${bias.confidence}%` }} />
              </div>
            </div>
          </div>

          <div className={`bias-card ${bias.biasClass}`}>
            <div className="bias-label">Score Breakdown</div>
            <div className="score-grid">
              <div className="score-item">
                <div className="score-item-label">Bull signals</div>
                <div className="score-item-val bull-text">{bias.bullCount}</div>
              </div>
              <div className="score-item">
                <div className="score-item-label">Bear signals</div>
                <div className="score-item-val bear-text">{bias.bearCount}</div>
              </div>
              <div className="score-item">
                <div className="score-item-label">Net score</div>
                <div className={`score-item-val ${bias.total > 0 ? "bull" : bias.total < 0 ? "bear" : "neutral"}-text`}>{bias.total > 0 ? "+" : ""}{bias.total}</div>
              </div>
              <div className="score-item">
                <div className="score-item-label">Signals</div>
                <div className="score-item-val">{MARKET_SYMBOLS.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="section-title">🤖 AI Market Briefing</div>
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-icon">🧠</div>
            <div>
              <div className="ai-title">Copilot Analysis</div>
              <div className="ai-subtitle">Powered by Claude · Updated {lastUpdated ? fmtTime(lastUpdated) : "—"}</div>
            </div>
          </div>
          {aiLoading ? (
            <div className="ai-loading">
              <div className="dots"><span /><span /><span /></div>
              Generating market briefing...
            </div>
          ) : (
            <div className="ai-text">
              {aiText.split("\n\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>

        {/* Key Drivers */}
        <div className="section-title">🎯 Key Drivers</div>
        <div className="drivers-grid">
          {drivers.map((d, i) => (
            <div key={i} className="driver-card">
              <div className={`driver-icon ${d.type}-bg`}>{d.icon}</div>
              <div className="driver-text">
                <strong>{d.title}</strong>
                {d.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Top Signals Preview */}
        <div className="section-title">📡 Signal Snapshot</div>
        <div className="signals-grid">
          {signals.slice(0, 6).map(s => (
            <SignalCard key={s.id} s={s} />
          ))}
        </div>
      </>
    )}

    {tab === "signals" && (
      <>
        <div className="section-title">📡 All Market Signals</div>
        <div className="signals-grid">
          {signals.map(s => <SignalCard key={s.id} s={s} />)}
        </div>
      </>
    )}

    {tab === "history" && (
      <>
        <div className="section-title">🕐 Signal History Log</div>
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Bias</th>
                <th>Confidence</th>
                <th>Bull</th>
                <th>Bear</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>No history yet — refreshes will be logged here.</td></tr>
              ) : history.map((h, i) => (
                <tr key={i}>
                  <td>{h.date}</td>
                  <td style={{ color: "var(--muted)" }}>{h.time}</td>
                  <td>
                    <span className={`signal-badge badge-${h.bias === "BULLISH" ? "bull" : h.bias === "BEARISH" ? "bear" : "neutral"}`}>
                      {h.bias}
                    </span>
                  </td>
                  <td className={h.confidence >= 60 ? "bull-text" : h.confidence <= 40 ? "bear-text" : "neutral-text"}>{h.confidence}%</td>
                  <td className="bull-text">{h.bull}</td>
                  <td className="bear-text">{h.bear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}

    <div className="footer">
      Market Copilot · Data via Yahoo Finance · AI via Claude<br />
      Not financial advice · For educational and informational use only<br />
      Auto-refreshes every 5 minutes · {lastUpdated ? `Last: ${fmtDate(lastUpdated)} ${fmtTime(lastUpdated)}` : "Loading..."}
    </div>
  </div>
</>
```

);
}

function SignalCard({ s }) {
const badgeClass = s.label === “BULLISH” ? “badge-bull” : s.label === “BEARISH” ? “badge-bear” : “badge-neutral”;
const fillColor = s.label === “BULLISH” ? “var(–bull)” : s.label === “BEARISH” ? “var(–bear)” : “var(–neutral)”;
const pct = Math.min(Math.abs(s.changePct) * 10, 100);
return (
<div className="signal-card">
<div className="signal-top">
<div>
<div className="signal-name">{s.emoji} {s.name}</div>
<div className="signal-category">{s.category}</div>
</div>
<span className={`signal-badge ${badgeClass}`}>{s.label || “—”}</span>
</div>
<div className={`signal-value ${s.label === "BULLISH" ? "bull-text" : s.label === "BEARISH" ? "bear-text" : "neutral-text"}`}>
{fmt(s.value)}
</div>
<div className={`signal-change ${s.changePct >= 0 ? "pos" : "neg"}`}>
{s.changePct >= 0 ? “▲” : “▼”} {Math.abs(s.changePct).toFixed(2)}% ({s.change >= 0 ? “+” : “”}{fmt(s.change)})
</div>
<div className="signal-bar-bg">
<div className=“signal-bar-fill” style={{ width: `${pct}%`, background: fillColor }} />
</div>
</div>
);
}
