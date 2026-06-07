// GOAT7 site-wide constants
export const TOKEN = {
  name: "GOAT7",
  ticker: "$GOAT7",
  tagline: "The King of Solana Meme Coins",
  contractAddress: "TBA",
  network: "Solana",
  totalSupply: "10,000,000,000",
  totalSupplyShort: "10B",
};

export const SOCIALS = {
  telegramGroup: "https://t.me/CR7GOATarmy",
  telegramChannel: "https://t.me/CR7GOATAnnouncements",
  website: "https://cr7goat.xyz",
  buy: "https://cr7goat.xyz",
  twitter: "https://x.com/CR7GOATarmy",
  whitepaper: "#",
};

export const NAV_LINKS = [
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Security", href: "#security" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

export const TOKENOMICS = [
  { label: "Presale", value: 40, color: "gold", note: "Public presale allocation" },
  { label: "Liquidity", value: 25, color: "green", note: "Locked & burned LP" },
  { label: "Marketing", value: 15, color: "gold", note: "Influencers & campaigns" },
  { label: "Team (Locked)", value: 10, color: "green", note: "12-month linear vesting" },
  { label: "Community Rewards", value: 7, color: "gold", note: "Airdrops, raids, contests" },
  { label: "CEX Listings", value: 3, color: "green", note: "Tier-1 exchange reserves" },
];

export const ROADMAP = [
  {
    phase: "Phase 01",
    title: "Genesis & Presale",
    items: [
      "Smart contract deployment",
      "Public presale launch",
      "Whitepaper v1.0 release",
      "Community Telegram & X go live",
    ],
    status: "live",
  },
  {
    phase: "Phase 02",
    title: "DEX Launch",
    items: [
      "Raydium liquidity seeded",
      "LP tokens burned (verifiable on-chain)",
      "DexScreener trending",
      "First 10,000 holders",
    ],
    status: "next",
  },
  {
    phase: "Phase 03",
    title: "Tier-1 Listings",
    items: [
      "CoinGecko & CoinMarketCap listings",
      "First centralized exchange listing",
      "Trading competitions & buyback events",
      "Strategic partnerships",
    ],
    status: "soon",
  },
  {
    phase: "Phase 04",
    title: "Ecosystem",
    items: [
      "GOAT7 NFT collection",
      "Staking & rewards module",
      "Merch drop & community grants",
      "Cross-chain bridge to ETH/BSC",
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
    q: "How do I buy GOAT7?",
    a: "Join our presale via cr7goat.xyz by connecting your Phantom wallet. Once the public DEX launch is live, you'll be able to swap SOL for GOAT7 directly on Raydium or Jupiter using the official contract address.",
  },
  {
    q: "Is the liquidity locked?",
    a: "Yes. At DEX launch, 100% of the initial liquidity pool will be burned. The team wallet vests linearly over 12 months — all fully on-chain verifiable.",
  },
  {
    q: "What is the total supply?",
    a: "10,000,000,000 GOAT7 — fixed forever. No mint authority, no upgrade authority. The contract is renounced at deployment, making the supply immutable.",
  },
  {
    q: "Are there taxes or fees?",
    a: "Zero buy tax. Zero sell tax. Just standard Solana network fees (roughly $0.0005 per transaction). What you swap is exactly what you get.",
  },
  {
    q: "Is this affiliated with any athlete, celebrity, or brand?",
    a: "No. GOAT7 is a 100% original community meme token. It is not affiliated with, endorsed by, or associated with any celebrity, athlete, sports league, organization, or third-party brand. All references in the project are fan-driven cultural memes.",
  },
];

export const SECURITY_PILLARS = [
  {
    title: "LP Burned at Launch",
    body: "100% of initial liquidity is burned on day one. Burn transaction is publicly verifiable on Solscan.",
  },
  {
    title: "Mint Authority Revoked",
    body: "No new tokens can ever be minted. The supply is permanently fixed at 10B GOAT7.",
  },
  {
    title: "Contract Renounced",
    body: "Upgrade and freeze authorities are revoked. The contract is fully immutable and trustless.",
  },
  {
    title: "Community Governed",
    body: "Major project decisions are made transparently with community participation.",
  },
  {
    title: "Audited Codebase",
    body: "SPL token program is the standard, battle-tested Solana token contract used by 99% of legitimate projects.",
  },
  {
    title: "Doxxed Community",
    body: "Active, transparent community channels with real-time updates. No anonymous shadow team decisions.",
  },
];

export const COMMUNITY_CHANNELS = [
  {
    name: "Telegram Group",
    handle: "@CR7GOATarmy",
    description: "The main hangout — memes, alpha, and 24/7 herd chat.",
    href: "https://t.me/CR7GOATarmy",
    accent: "green",
  },
  {
    name: "Telegram Channel",
    handle: "@CR7GOATAnnouncements",
    description: "Official announcements only. No noise, just signal.",
    href: "https://t.me/CR7GOATAnnouncements",
    accent: "gold",
  },
  {
    name: "Official Website",
    handle: "cr7goat.xyz",
    description: "Presale dashboard, whitepaper, and live stats.",
    href: "https://cr7goat.xyz",
    accent: "green",
  },
];
