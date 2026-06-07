# GOAT7 — Solana Meme Coin Landing Page

## Original Problem Statement
Build a Solana meme coin landing page for GOAT7. Original community meme token, NOT affiliated with any celebrity, athlete, sports organization, or third-party brand.
Features: Hero, Tokenomics, Roadmap, FAQ, Telegram + X links, Phantom wallet connect, Whitepaper section, Responsive mobile design, Gold & green premium theme.

## User Choices
- Phantom connect → show SOL balance
- Contract address → "TBA" with copy button
- Whitepaper → summary text + Download Whitepaper button
- No backend (pure static landing)
- Real social URLs to be provided by user later

## Architecture
- Pure static React (CRA + Craco) frontend at `/app/frontend`
- No backend used for this landing (FastAPI scaffold remains untouched)
- Tailwind + Shadcn UI components
- Framer Motion for entrance/scroll-reveal animations
- Phantom: direct `window.solana` provider + Solana mainnet JSON-RPC `getBalance` (no wallet-adapter dep)

## Tech Stack
- React 19, react-router-dom 7
- Tailwind 3, Shadcn UI (Accordion, Sonner toaster)
- Framer Motion 11
- Fonts: Unbounded (display), IBM Plex Sans (body), JetBrains Mono (mono)
- Theme: dark `#050505` base, gold `#FFD700`, emerald `#10B981`

## Files Implemented (Dec 2025)
- `src/App.js` — single Landing route, Toaster mounted
- `src/index.css` — global tokens, dark theme, marquee, grain, hex clip
- `src/lib/goat-data.js` — TOKEN, SOCIALS, NAV_LINKS, TOKENOMICS, ROADMAP, FAQS
- `src/hooks/usePhantom.js` — Phantom provider detection, eager connect, balance fetch
- `src/components/Header.jsx` — sticky glass header, nav, socials, Phantom connect, mobile drawer
- `src/components/Hero.jsx` — H1, CA copy box, stats grid, marquee, disclaimer
- `src/components/Tokenomics.jsx` — bento grid (Total Supply + 5 allocation cards)
- `src/components/Roadmap.jsx` — 4 phase cards with status badges
- `src/components/Whitepaper.jsx` — summary + highlights + Download button + PDF preview card
- `src/components/FAQ.jsx` — Shadcn Accordion with 6 FAQs
- `src/components/Footer.jsx` — brand, nav, resources, socials, full disclaimer
- `public/index.html` — Google Fonts (Unbounded/IBM Plex/JetBrains Mono), meta tags

## Personas
- Crypto-native degens / meme coin traders
- Solana ecosystem participants
- Community herd members joining via Telegram / X

## Status
- ✅ Landing page MVP complete and end-to-end tested (frontend testing agent, 100% pass)
- ✅ All required sections present, responsive on mobile
- ✅ Phantom integration: graceful fallback when extension not installed
- ✅ Disclaimer prominently shown in hero + footer (non-affiliation)
- ⚠️ Placeholder social URLs (https://t.me/goat7, https://x.com/goat7) — to be replaced by user
- ⚠️ Whitepaper PDF not yet hosted — Download button shows friendly toast "coming soon"
- ⚠️ Contract address = "TBA" (placeholder per user choice)

## Backlog (P1)
- Replace placeholder URLs with real Telegram + X handles
- Host real whitepaper PDF in `/public/goat7-whitepaper.pdf`
- Add live token data (price/holders/marketcap) once token launches — DexScreener embed or CoinGecko API
- "Buy on Raydium/Jupiter" deep-link button once CA is live

## Backlog (P2)
- Animated SOL balance ticker for connected wallet
- NFT preview section for Phase 4 roadmap
- Holder leaderboard
- Multi-language support (EN/CN/ES)
