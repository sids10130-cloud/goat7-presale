// GOAT7 — Production constants
const env = process.env;

export const TOKEN = {
  name: "GOAT7",
  ticker: "$GOAT7",
  tagline: "The King of Solana Meme Coins",
  network: "Solana",
  mintAddress: env.REACT_APP_MINT_ADDRESS,
  totalSupply: 10_000_000_000,
  totalSupplyDisplay: "10,000,000,000",
  totalSupplyShort: "10B",
};

export const PRESALE = {
  recipient: env.REACT_APP_PRESALE_RECIPIENT,
  rpcEndpoint: env.REACT_APP_SOLANA_RPC,
  walletConnectProjectId: env.REACT_APP_WC_PROJECT_ID || "",
  // Allocations (token amounts)
  presaleAllocation: 1_000_000_000,
  // Prices in SOL
  salePrice: 0.0000001,
  launchPrice: 0.00000012,
  tokensPerSol: 10_000_000, // 1 / salePrice
  // Caps in SOL
  minBuy: 0.05,
  maxBuy: 5,
  softCap: 20,
  hardCap: 100,
  // Schedule
  startISO: "2026-06-12T00:00:00Z",
  endISO: "2026-07-20T23:59:59Z",
  startDisplay: "12 June 2026",
  endDisplay: "20 July 2026",
};

export const SOCIALS = {
  telegram: "https://t.me/GOAT7Official",
  twitter: "https://x.com/GOAT7official",
  website: "https://goat7.xyz",
};

export const NAV_LINKS = [
  { label: "Presale", href: "#presale" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

// Tokenomics — exact token amounts as specified
export const TOKENOMICS = [
  { label: "Liquidity", amount: 3_000_000_000, percent: 30, color: "green", note: "DEX listing liquidity pool" },
  { label: "Marketing", amount: 1_500_000_000, percent: 15, color: "gold", note: "Influencer & growth campaigns" },
  { label: "Presale", amount: 1_000_000_000, percent: 10, color: "gold", note: "Public presale allocation" },
  { label: "Community Rewards", amount: 1_000_000_000, percent: 10, color: "green", note: "Airdrops & engagement" },
  { label: "Team", amount: 500_000_000, percent: 5, color: "green", note: "Locked vesting schedule" },
];

export const ROADMAP = [
  {
    phase: "Phase 01",
    title: "Presale",
    items: [
      "Public presale opens 12 June 2026",
      "Hard cap 100 SOL",
      "Multi-wallet support",
      "Real-time on-chain tracker",
    ],
    status: "live",
  },
  {
    phase: "Phase 02",
    title: "Community Growth",
    items: [
      "10,000+ holders milestone",
      "Influencer partnerships",
      "Meme contests & raids",
      "Trending on socials",
    ],
    status: "next",
  },
  {
    phase: "Phase 03",
    title: "Raydium DEX Launch",
    items: [
      "Raydium liquidity seeded (30% supply)",
      "Trading goes live",
      "Token distribution to presale buyers",
      "DexScreener listing",
    ],
    status: "soon",
  },
  {
    phase: "Phase 04",
    title: "Expansion",
    items: [
      "CoinGecko & CoinMarketCap listings",
      "Tier-1 CEX outreach",
      "Marketing & partnerships",
      "Community-driven roadmap v2",
    ],
    status: "future",
  },
];

export const FAQS = [
  {
    q: "What is GOAT7?",
    a: "GOAT7 is an original community-driven meme token on the Solana blockchain. It is a culture coin built by the community, for the community. GOAT7 is not affiliated with any celebrity, athlete, sports organization, or third-party brand.",
  },
  {
    q: "When is the presale?",
    a: "The public presale runs from 12 June 2026 to 20 July 2026. Sale price is 0.0000001 SOL per GOAT7. Min buy 0.05 SOL, max buy 5 SOL per wallet. Hard cap 100 SOL.",
  },
  {
    q: "How do I participate?",
    a: "Connect any supported wallet (Phantom, Solflare, Backpack, Trust Wallet, Coinbase Wallet, or WalletConnect), enter the amount of SOL you want to contribute, and confirm the transaction. Tokens will be airdropped to your wallet after the presale concludes and DEX trading goes live.",
  },
  {
    q: "What wallets are supported?",
    a: "Phantom, Solflare, Backpack, Trust Wallet, Coinbase Wallet and WalletConnect (mobile wallets). Choose your wallet from the Connect modal.",
  },
  {
    q: "Is the contract verified and safe?",
    a: "Yes. Mint authority, freeze authority and update authority have all been revoked at deployment. The supply is permanently fixed at 10,000,000,000 GOAT7. You can verify the token on Solscan using the mint address.",
  },
  {
    q: "What is the total supply?",
    a: "10,000,000,000 GOAT7 — permanently fixed. No new tokens can ever be minted.",
  },
  {
    q: "Are there taxes or fees?",
    a: "Zero buy tax. Zero sell tax. Only standard Solana network fees (roughly $0.0005 per transaction).",
  },
  {
    q: "Is this affiliated with any athlete, celebrity, or brand?",
    a: "No. GOAT7 is a 100% original community meme token. It is not affiliated with, endorsed by, or associated with any celebrity, athlete, sports league, organization, or third-party brand.",
  },
];

// Production security pillars (per spec)
export const SECURITY_PILLARS = [
  {
    title: "Mint Authority Revoked",
    body: "The token's mint authority has been permanently revoked. No new GOAT7 can ever be created.",
    status: "done",
  },
  {
    title: "Freeze Authority Revoked",
    body: "Freeze authority is revoked. Your tokens can never be frozen by anyone.",
    status: "done",
  },
  {
    title: "Update Authority Revoked",
    body: "Token metadata is immutable. The contract cannot be altered or upgraded.",
    status: "done",
  },
  {
    title: "Community Driven",
    body: "GOAT7 is built and grown entirely by its community of holders.",
    status: "done",
  },
  {
    title: "Fair Distribution",
    body: "Transparent token allocation with public presale and on-chain verification.",
    status: "done",
  },
  {
    title: "Solana Network",
    body: "Built on Solana — fast, low-cost, energy-efficient and battle-tested at scale.",
    status: "done",
  },
];
