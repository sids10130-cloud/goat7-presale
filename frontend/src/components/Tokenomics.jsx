import { motion } from "framer-motion";
import { TOKENOMICS, TOKEN } from "@/lib/goat-data";

const fmtTokens = (n) => {
  if (n >= 1_000_000_000) return `${n / 1_000_000_000}B`;
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  return n.toLocaleString();
};

export default function Tokenomics() {
  return (
    <section
      id="tokenomics"
      data-testid="tokenomics-section"
      className="relative py-24 md:py-36 px-5 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
              02 · Tokenomics
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em] max-w-2xl">
              Transparent.<br />
              <span className="goat-gradient-text">On-chain forever.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-base md:text-lg leading-relaxed">
            Total supply is permanently fixed at {TOKEN.totalSupplyDisplay} GOAT7. Mint, freeze
            and update authorities are revoked — supply can never change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#FFD700]/15 via-[#0a0a0a] to-[#10B981]/10 p-7 md:p-9 overflow-hidden group hover:border-[#FFD700]/40 transition-colors"
            data-testid="tokenomics-supply-card"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/12197169/pexels-photo-12197169.jpeg')",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
                mixBlendMode: "overlay",
              }}
            />
            <div className="relative flex flex-col h-full justify-between min-h-[280px] gap-8">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
                Total Supply
              </span>
              <div>
                <div className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter goat-gradient-text">
                  {TOKEN.totalSupplyShort}
                </div>
                <div className="mt-3 font-mono text-xs md:text-sm text-neutral-400 tracking-wider">
                  {TOKEN.totalSupplyDisplay} GOAT7
                </div>
                <div className="mt-5 text-neutral-300 text-sm md:text-base max-w-xs">
                  Fixed forever. Mint, freeze and update authorities all revoked at deployment.
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {TOKENOMICS.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 hover:-translate-y-1 hover:border-white/30 transition-all duration-300 group"
                data-testid={`tokenomics-card-${idx}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-neutral-400">
                    {item.label}
                  </span>
                  <span
                    className={`font-display font-black text-3xl md:text-4xl shrink-0 ${
                      item.color === "gold" ? "text-[#FFD700]" : "text-[#10B981]"
                    }`}
                  >
                    {item.percent}%
                  </span>
                </div>
                <div className="mt-2 font-mono text-sm text-white">
                  {fmtTokens(item.amount)}{" "}
                  <span className="text-neutral-500 text-xs">GOAT7</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent * 2.5}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`h-full rounded-full ${
                      item.color === "gold"
                        ? "bg-gradient-to-r from-[#FFD700] to-[#FBE14D]"
                        : "bg-gradient-to-r from-[#10B981] to-[#34D399]"
                    }`}
                  />
                </div>
                <p className="mt-4 text-sm text-neutral-500">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
