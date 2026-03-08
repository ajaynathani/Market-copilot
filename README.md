# ⚡ Market Copilot

AI-powered global market signals dashboard for Indian investors. Built with React + Vite, deployed as a PWA on Vercel.

---

## 🚀 Deploy to Vercel (5 minutes)

### Prerequisites
- [Node.js 18+](https://nodejs.org) installed
- [Git](https://git-scm.com) installed
- Free [Vercel account](https://vercel.com/signup)
- Free [GitHub account](https://github.com)

---

### Step 1 — Set up the project

```bash
# Install dependencies
npm install
```

### Step 2 — Test locally

```bash
npm run dev
```
Open http://localhost:5173 in your browser. You should see Market Copilot running!

### Step 3 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Market Copilot"
git branch -M main

# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/market-copilot.git
git push -u origin main
```

### Step 4 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your `market-copilot` GitHub repo
4. Vercel auto-detects Vite — just click **"Deploy"**
5. In ~60 seconds you'll get a live URL like `market-copilot.vercel.app` 🎉

### Step 5 — Auto-deploy on every change

Every time you `git push` to `main`, Vercel automatically redeploys. Zero config needed.

---

## 📱 Install as Mobile App (PWA)

### Android (Chrome)
1. Open your Vercel URL in Chrome
2. Tap the **"Add to Home Screen"** banner, or tap ⋮ → "Install app"
3. Market Copilot appears on your home screen like a native app!

### iPhone (Safari)
1. Open your Vercel URL in Safari
2. Tap the Share button (□↑)
3. Tap **"Add to Home Screen"**
4. Tap "Add" — done!

---

## ✨ Features

- 📊 **10 live market signals** — S&P 500, Nasdaq, Nikkei, Nifty 50, Brent Oil, Gold, VIX, India VIX, USD/INR, Dow Jones
- 🧠 **AI market briefing** — Claude generates a morning analysis every refresh
- ⚡ **Signal scoring engine** — Bull/Bear/Neutral with confidence %
- 🕐 **History log** — Every refresh is saved for pattern tracking
- 🔔 **Morning alert** — Banner activates 8–10 AM IST
- 📡 **Auto-refresh** — Every 5 minutes
- 📴 **Offline support** — Last data cached via service worker

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **vite-plugin-pwa** — service worker + manifest
- **Yahoo Finance** (via allorigins proxy) — free market data
- **Claude API** (claude-sonnet-4) — AI briefings
- **Vercel** — hosting + CDN

---

## ⚠️ Disclaimer

Not financial advice. For educational and informational use only.
Data sourced from Yahoo Finance — may be delayed 15–20 minutes.
