// GOAT7 site-wide constants
export const TOKEN = {
  name: "GOAT7",
  ticker: "$GOAT7",
  tagline: "The Gold Standard of the Herd.",
  contractAddress: "TBA",
  network: "Solana",
  totalSupply: "777,000,000",
};

export const SOCIALS = {
  telegram: "https://t.me/goat7",
  twitter: "https://x.com/goat7",
  whitepaper: "/goat7-whitepaper.pdf",
};

export const NAV_LINKS = [
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "FAQ", href: "#faq" },
];

export const TOKENOMICS = [
  { label: "Liquidity Pool", value: 40, color: "gold", note: "Locked & burned LP" },
  { label: "Community Rewards", value: 30, color: "green", note: "Airdrops, raids, contests" },
  { label: "Marketing", value: 15, color: "gold", note: "CEX listings & partnerships" },
  { label: "Team (Locked)", value: 10, color: "green", note: "12-month linear vesting" },
  { label: "Treasury", value: 5, color: "gold", note: "Ecosystem grants" },
];

export const ROADMAP = [
  {
    phase: "Phase 01",
    title: "Genesis Launch",
    items: ["Smart contract deployment", "Raydium LP seeded", "LP burned", "Community Telegram & X live"],
    status: "live",
  },
  {
    phase: "Phase 02",
    title: "Herd Expansion",
    items: ["10,000+ holders", "Influencer partnerships", "Meme contests", "Trending on DexScreener"],
    status: "next",
  },
  {
    phase: "Phase 03",
    title: "Tier-1 Listings",
    items: ["CoinGecko & CMC listings", "First CEX listing", "Trading competitions", "Burn events"],
    status: "soon",
  },
  {
    phase: "Phase 04",
    title: "Ecosystem",
    items: ["GOAT7 NFT collection", "Staking module", "Merch drop", "Cross-chain bridge"],
    status: "future",
  },
];

export const FAQS = [
  {
    q: "What is GOAT7?",
    a: "GOAT7 is an original community meme token on Solana. It is a culture coin built by the community, for the community. GOAT7 is not affiliated with any celebrity, athlete, sports organization, or third-party brand.",
  },
  {
    q: "How do I buy GOAT7?",
    a: "Once the contract address is live, you can swap SOL for GOAT7 on Raydium or Jupiter. Connect your Phantom wallet, paste the official contract address, set slippage to 2-5%, and confirm the transaction.",
  },
  {
    q: "Is the liquidity locked?",
    a: "Yes. At launch, 100% of the initial liquidity pool is burned. The team wallet vests linearly over 12 months and is fully on-chain verifiable.",
  },
  {
    q: "What is the total supply?",
    a: "777,000,000 $GOAT7 — fixed forever. No mint authority, no upgrade authority. The contract is renounced at deployment.",
  },
  {
    q: "Are there taxes or fees?",
    a: "Zero buy tax. Zero sell tax. Just standard Solana network fees (~$0.0005 per transaction). What you swap is what you get.",
  },
  {
    q: "Is this affiliated with any athlete or brand?",
    a: "No. GOAT7 is a 100% original community meme token. It is not affiliated with, endorsed by, or associated with any celebrity, athlete, sports league, organization, or third-party brand.",
  },
];
