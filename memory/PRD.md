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

---

## Iteration 2 — Premium Redesign (Dec 2025)

**Brief**: Redesign as a premium Solana meme coin site with black background + gold/neon-green accents. Add mascot, new headline, treasury wallet, security & community sections, real social links.

### What changed
- Hero — Two-column layout: bold "GOAT7 / The King of / Solana Memes." headline + animated mascot orb (with rotating dashed rings, floating chips: 10B Supply, 0% Tax, LP Burned). Three CTAs: Connect Wallet (Phantom), Buy GOAT7 (→ cr7goat.xyz), Join Telegram. Added Treasury Wallet box (with copy) below CA box.
- Tokenomics — New 6-card allocation grid + big "10B" supply card with gradient text.
- Roadmap copy updated (Genesis & Presale → DEX Launch → Tier-1 Listings → Ecosystem).
- **NEW Security section** (`/components/Security.jsx`) — 6 pillar cards (LP Burned, Mint Revoked, Contract Renounced, Multi-Sig Treasury, Audited Codebase, Doxxed Community) + audit CTA strip with Solscan / Solana Explorer links.
- **NEW Community section** (`/components/Community.jsx`) — 3 channel cards (Telegram Group @CR7GOATarmy, Telegram Channel @CR7GOATAnnouncements, Website cr7goat.xyz) + big "community is the alpha" CTA banner.
- FAQ — 7 items now (added Treasury wallet question).
- Header — Added Buy GOAT7 button; nav switched lg→xl breakpoint to fit 6 links.
- Footer — Replaced placeholder URLs with real socials; added Telegram channel & website icons; Treasury Solscan deep link.

### Real socials wired in
- Telegram Group: https://t.me/CR7GOATarmy
- Telegram Channel: https://t.me/CR7GOATAnnouncements
- Website: https://cr7goat.xyz
- X: placeholder (https://x.com/CR7GOATarmy — confirm with user)

### Constants
- Treasury wallet: GqQCMmPf1sKRWaix85B79DNpgHGc8SrMNGec44q8mwg5
- Total supply: 10,000,000,000 GOAT7
- Tokenomics: Presale 40 / Liquidity 25 / Marketing 15 / Team 10 / Community 7 / CEX 3

### Testing
- testing_agent_v3 iteration_2: 100% pass on 15 acceptance criteria (desktop 1920x1080 + mobile 390x844).

---

## Iteration 3 — Targeted Refinements (Dec 2025)

### Changes
- Removed Treasury Wallet box from hero + all references to "Treasury Wallet" / "Multi-Sig Treasury" / "Treasury Allocation" sitewide (goat-data.js TOKEN, FAQS, SECURITY_PILLARS, ROADMAP; Whitepaper.jsx highlight body; Footer.jsx Resources list)
- New premium mascot: generated 3D crypto goat (black fur, golden curled horns, glowing green eyes, gold crown with emerald inlays) via Gemini Nano Banana 3.1 → saved at `/app/frontend/public/mascot-goat.png` (712KB). Hero `<img>` now points to `/mascot-goat.png`.
- Hero main CTA renamed: "Connect Wallet" → "Buy GOAT7" (links to SOCIALS.buy). Removed the duplicate green Buy button and Join Telegram button.
- Added 3 social icons below main CTA: Telegram, X, Discord (all `href="#"`, inline SVG for X & Discord, Lucide `Send` for Telegram).
- Whitepaper download → `SOCIALS.whitepaper = "#"` → triggers "coming soon" toast.
- Security pillar 4: "Multi-Sig Treasury" replaced with "Community Governed" / "Major project decisions are made transparently with community participation."
- Roadmap Phase 01 bullet: "Treasury wallet & multi-sig setup" → "Smart contract deployment".
- usePhantom hook still exists for the Header Connect Wallet (header CTA preserved per spec); removed import from Hero.

### Tooling
- Added `/app/scripts/gen_mascot.py` — one-shot Nano Banana image generation script (uses EMERGENT_LLM_KEY)
- Added `EMERGENT_LLM_KEY=sk-emergent-1D669B7754f56D06e4` to `/app/backend/.env`

### Testing
- testing_agent_v3 iteration_3: 11/12 passed → 1 missed (Roadmap bullet) fixed → all green now.

---

## Iteration 4 — Final Production Cutover (Dec 2025)

### Real production data wired
- **Mint address**: `2JXLbne5axZvw4DHZGbkMmXTiJKg7SbAxrCYLFLYCTpM` (Solana mainnet)
- **Presale recipient**: `J7DAPZyGwnbStmk6YUYHx9V7MjGgiaWhSFgVJ1g7q3x5`
- **Socials**: Telegram `https://t.me/GOAT7Official`, X `https://x.com/GOAT7official`, Website `https://goat7.xyz`
- **Authorities**: Mint / Freeze / Update — all displayed as REVOKED ✓ (no "Will be revoked")

### New real Solana integration
- `@solana/wallet-adapter-react` + react-ui + wallets (Phantom, Solflare, Trust, Coinbase)
- Wallet-adapter modal opens from header & presale Connect buttons
- Buy flow uses `SystemProgram.transfer` to send real SOL on mainnet
- Polyfills added via craco (buffer/crypto/stream/process/etc.)
- RPC switched to `https://solana-rpc.publicnode.com` (CORS-friendly free public RPC) — mainnet-beta blocks browsers

### Real-time on-chain stats hook (`usePresaleStats.js`)
- Total Raised: `getBalance(recipient)` / LAMPORTS_PER_SOL
- Tokens Sold: `raised * 10,000,000` (sale price 0.0000001)
- Participants: unique source addresses in `getSignaturesForAddress` + `getParsedTransactions` batched
- Remaining: `presaleAllocation - tokensSold`
- Progress: `(raised / hardCap) * 100`
- 30s polling, graceful degradation on RPC rate limits

### New Presale section
- Live status pill (Starts soon / Live now / Ended)
- Countdown to start (12 Jun 2026) or end (20 Jul 2026)
- Live stats grid + gradient progress bar
- Buy form: SOL input (min 0.05 / max 5), preset chips, "you receive" calculator
- Wallet-adapter integration for connect + tx signing
- Recipient wallet linked to Solscan

### Tokenomics (5 cards, exact token amounts)
- Liquidity 30% / 3B
- Marketing 15% / 1.5B
- Presale 10% / 1B
- Community Rewards 10% / 1B
- Team 5% / 500M

### Security pillars (6, all "Confirmed")
- Mint Authority Revoked / Freeze Authority Revoked / Update Authority Revoked
- Community Driven / Fair Distribution / Solana Network

### Removed
- Whitepaper section, usePhantom hook, all Treasury references, "LP Burned", "Contract Renounced"
- Emergent badge HTML
- PostHog telemetry script
- All `#` placeholder links

### Added
- `/public/favicon.png` + `/public/og-image.png` (premium goat mascot)
- Full OG + Twitter Card meta tags pointing to goat7.xyz

### Files (new / overwritten)
- NEW: `src/contexts/WalletProvider.jsx`, `src/hooks/usePresaleStats.js`, `src/components/Presale.jsx`
- DELETED: `src/hooks/usePhantom.js`, `src/components/Whitepaper.jsx`
- OVERWRITTEN: Hero, Header, Tokenomics, Security, Community, Footer, FAQ, App.js, lib/goat-data.js, public/index.html, craco.config.js

### Testing
- testing_agent_v3 iteration_4: **17/17 (100%)** acceptance criteria pass on desktop 1920x1080 + mobile 390x844.

### Open backlog
- WalletConnect adapter — needs `REACT_APP_WC_PROJECT_ID` from user. Currently the build excludes WalletConnect because the WC adapter caused webpack errors without a real project ID. To re-enable: provide a WC v2 Project ID from cloud.reown.com, re-add `WalletConnectWalletAdapter` import & list entry.
- Backpack adapter — Backpack uses the Solana Wallet Standard and is auto-detected when the user has the extension installed (so it WILL appear in the modal if installed), but is not in the static fallback list since the dedicated BackpackWalletAdapter was deprecated.
