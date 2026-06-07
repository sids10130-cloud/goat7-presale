import { motion } from "framer-motion";
import { Copy, Sparkles, Check, Wallet, ShoppingBag, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TOKEN, SOCIALS } from "@/lib/goat-data";
import { usePhantom } from "@/hooks/usePhantom";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const truncate = (s, head = 4, tail = 4) => (s ? `${s.slice(0, head)}…${s.slice(-tail)}` : "");

export default function Hero() {
  const [copiedCA, setCopiedCA] = useState(false);
  const [copiedTreasury, setCopiedTreasury] = useState(false);
  const { publicKey, balance, connecting, connect, isPhantomInstalled } = usePhantom();

  const handleCopy = async (value, setFlag) => {
    try {
      await navigator.clipboard.writeText(value);
      setFlag(true);
      toast.success("Copied to clipboard", { description: value });
      setTimeout(() => setFlag(false), 1800);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleConnect = async () => {
    const pk = await connect();
    if (pk) {
      toast.success("Wallet connected", { description: truncate(pk) });
    } else if (!isPhantomInstalled) {
      toast.error("Phantom not detected", {
        description: "Install Phantom to continue. Opening phantom.app…",
      });
    }
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.18),_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(16,185,129,0.14),_transparent_70%)]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(255,215,0,0.08),_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-8 order-2 lg:order-1"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#FFD700]">
                Live on Solana · Presale Open
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.95] tracking-[-0.04em]"
            >
              <span className="block lg:whitespace-nowrap">GOAT<span className="text-[#FFD700]">7</span></span>
              <span className="block lg:whitespace-nowrap mt-1 sm:mt-2 goat-gradient-text">The King of</span>
              <span className="block lg:whitespace-nowrap">Solana Memes.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed"
            >
              <span className="text-white font-semibold">$GOAT7</span> is a premium community-driven
              Solana meme coin built for the herd. Fair launch, locked liquidity, zero taxes,
              and a roadmap that runs to the top.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              data-testid="hero-cta-group"
            >
              <button
                onClick={handleConnect}
                disabled={connecting}
                data-testid="hero-connect-wallet-button"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#FFD700] text-black font-bold text-sm hover:bg-[#FBE14D] transition-all shadow-[0_0_40px_-8px_rgba(255,215,0,0.7)] disabled:opacity-60"
              >
                <Wallet className="w-4 h-4" />
                {publicKey ? (
                  <span className="font-mono text-xs">
                    {truncate(publicKey)} · {balance === null ? "…" : `${balance.toFixed(3)} SOL`}
                  </span>
                ) : (
                  <span>{connecting ? "Connecting…" : "Connect Wallet"}</span>
                )}
              </button>

              <a
                href={SOCIALS.buy}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-buy-button"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#10B981] text-black font-bold text-sm hover:bg-[#34D399] transition-all shadow-[0_0_40px_-8px_rgba(16,185,129,0.7)]"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy GOAT7
              </a>

              <a
                href={SOCIALS.telegramGroup}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-telegram-button"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border-2 border-[#FFD700]/60 text-[#FFD700] font-bold text-sm hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all"
              >
                <Send className="w-4 h-4" />
                Join Telegram
              </a>
            </motion.div>

            {/* CA + Treasury boxes */}
            <motion.div variants={fadeUp} className="mt-10 space-y-3" data-testid="hero-wallet-boxes">
              {/* Contract Address */}
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-3 sm:pl-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl"
                data-testid="contract-address-box"
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                    Contract Address (Solana)
                  </span>
                  <span
                    className="font-mono text-base md:text-lg text-white mt-1 truncate"
                    data-testid="contract-address-value"
                  >
                    {TOKEN.contractAddress}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(TOKEN.contractAddress, setCopiedCA)}
                  data-testid="copy-ca-button"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#FBE14D] transition-all whitespace-nowrap shrink-0"
                >
                  {copiedCA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCA ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Treasury Wallet */}
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-3 sm:pl-5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 backdrop-blur-xl"
                data-testid="treasury-wallet-box"
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#10B981] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" /> Treasury Wallet (Public)
                  </span>
                  <span
                    className="font-mono text-xs md:text-sm text-white mt-1 truncate"
                    data-testid="treasury-wallet-value"
                  >
                    {TOKEN.treasuryWallet}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(TOKEN.treasuryWallet, setCopiedTreasury)}
                  data-testid="copy-treasury-button"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-[#10B981] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34D399] transition-all whitespace-nowrap shrink-0"
                >
                  {copiedTreasury ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedTreasury ? "Copied" : "Copy"}
                </button>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[11px] sm:text-xs text-neutral-500 max-w-xl leading-relaxed"
              data-testid="hero-disclaimer"
            >
              Not affiliated with any celebrity, athlete, sports organization, or third-party brand.
              GOAT7 is an original community meme token. Crypto is volatile — do your own research
              (DYOR). Nothing on this site is financial advice.
            </motion.p>
          </motion.div>

          {/* RIGHT: Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4 order-1 lg:order-2 relative"
            data-testid="hero-mascot"
          >
            <div className="relative aspect-square w-full max-w-md md:max-w-lg mx-auto">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.35),_transparent_60%)] blur-2xl" />
              <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.3),_transparent_70%)] blur-xl" />

              {/* Hex frame */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dashed border-[#FFD700]/30"
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-[#10B981]/30"
              />

              {/* Mascot image — premium dark goat profile */}
              <div className="absolute inset-6 md:inset-10 rounded-full overflow-hidden border-2 border-[#FFD700]/40 goat-glow-gold">
                <img
                  src="https://images.pexels.com/photos/33449890/pexels-photo-33449890.jpeg"
                  alt="GOAT7 mascot"
                  loading="eager"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#10B981]/15 mix-blend-overlay" />
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -left-2 sm:top-4 sm:left-0 px-3 py-2 rounded-full bg-[#0a0a0a] border border-[#FFD700]/40 backdrop-blur-xl"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FFD700]">
                  ◆ 10B Supply
                </span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 right-0 px-3 py-2 rounded-full bg-[#0a0a0a] border border-[#10B981]/40 backdrop-blur-xl"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#10B981]">
                  ◆ LP Burned
                </span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-2 sm:right-0 px-3 py-2 rounded-full bg-[#0a0a0a] border border-white/15 backdrop-blur-xl"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">
                  0% TAX
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
          data-testid="hero-stats"
        >
          {[
            { k: "Network", v: TOKEN.network },
            { k: "Total Supply", v: TOKEN.totalSupplyShort + " GOAT7" },
            { k: "Buy / Sell Tax", v: "0% / 0%" },
            { k: "LP Status", v: "Burned" },
          ].map((s) => (
            <div key={s.k} className="bg-[#0a0a0a] p-4 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 font-bold">
                {s.k}
              </div>
              <div className="mt-2 font-display font-bold text-lg md:text-2xl text-white">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee band */}
      <div className="mt-16 md:mt-24 border-y border-white/10 bg-[#0a0a0a] overflow-hidden">
        <div className="flex goat-marquee py-4 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-5 shrink-0">
              {Array.from({ length: 6 }).map((__, j) => (
                <span
                  key={j}
                  className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-neutral-700 flex items-center gap-10"
                >
                  GOAT<span className="text-[#FFD700]">7</span>
                  <span className="text-[#10B981]">◆</span>
                  KING OF SOLANA MEMES
                  <span className="text-[#FFD700]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
