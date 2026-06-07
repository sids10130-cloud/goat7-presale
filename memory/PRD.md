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
