import { motion } from "framer-motion";
import { Copy, ArrowDown, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TOKEN } from "@/lib/goat-data";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN.contractAddress);
      setCopied(true);
      toast.success("Contract address copied", { description: TOKEN.contractAddress });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.15),_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-screen"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/33449890/pexels-photo-33449890.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5 mb-7">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#FFD700]">
              Live on Solana · Community Meme Coin
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-[14vw] sm:text-[10vw] lg:text-[9rem] leading-[0.85] tracking-[-0.04em]"
          >
            <span className="block">GOAT</span>
            <span className="goat-gradient-text">SEVEN.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg md:text-xl text-neutral-300 leading-relaxed"
          >
            The gold standard of the herd. <span className="text-white font-medium">$GOAT7</span> is an
            original, community-built Solana meme token — fair launch, locked liquidity, zero taxes,
            and a herd that runs together.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#tokenomics"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#FFD700] text-black font-bold text-sm hover:bg-[#FBE14D] transition-all shadow-[0_0_40px_-8px_rgba(255,215,0,0.7)]"
            >
              Enter the Herd
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#whitepaper"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-[#10B981] text-[#10B981] font-bold text-sm hover:bg-[#10B981]/10 transition-all"
            >
              Read Whitepaper
            </a>
          </motion.div>

          {/* CA box */}
          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-3 sm:pl-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl w-full sm:w-auto max-w-full"
            data-testid="contract-address-box"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                Contract Address (Solana)
              </span>
              <span className="font-mono text-base md:text-lg text-white mt-1" data-testid="contract-address-value">
                {TOKEN.contractAddress}
              </span>
            </div>
            <button
              onClick={handleCopy}
              data-testid="copy-ca-button"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-[#10B981] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34D399] transition-all whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-xs text-neutral-500 max-w-2xl leading-relaxed"
            data-testid="hero-disclaimer"
          >
            Not affiliated with any celebrity, athlete, sports organization, or third-party brand.
            GOAT7 is an original community meme token. Crypto is volatile — do your own research
            (DYOR). Nothing on this site is financial advice.
          </motion.p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
          data-testid="hero-stats"
        >
          {[
            { k: "Network", v: TOKEN.network },
            { k: "Total Supply", v: TOKEN.totalSupply },
            { k: "Buy / Sell Tax", v: "0% / 0%" },
            { k: "LP Status", v: "Burned" },
          ].map((s) => (
            <div key={s.k} className="bg-[#0a0a0a] p-5 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 font-bold">
                {s.k}
              </div>
              <div className="mt-2 font-display font-bold text-xl md:text-2xl text-white">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee disclaimer band */}
      <div className="mt-20 md:mt-28 border-y border-white/10 bg-[#0a0a0a] overflow-hidden">
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
                  ORIGINAL COMMUNITY TOKEN
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
