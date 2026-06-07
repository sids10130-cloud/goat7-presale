import { motion } from "framer-motion";
import { TOKENOMICS, TOKEN } from "@/lib/goat-data";

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
              Fair Launch.<br />
              <span className="goat-gradient-text">Locked Forever.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-base md:text-lg leading-relaxed">
            A clean, transparent distribution. Liquidity is burned at launch and the
            team allocation vests linearly over 12 months.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* Big card - total supply */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#FFD700]/15 via-[#0a0a0a] to-[#10B981]/10 p-7 md:p-9 overflow-hidden group hover:border-[#FFD700]/40 transition-colors"
            data-testid="tokenomics-supply-card"
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                 style={{
                   backgroundImage: "url('https://images.pexels.com/photos/12197169/pexels-photo-12197169.jpeg')",
                   backgroundSize: "cover",
                   backgroundBlendMode: "overlay",
                   mixBlendMode: "overlay",
                 }} />
            <div className="relative flex flex-col h-full justify-between min-h-[280px]">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
                Total Supply
              </span>
              <div>
                <div className="font-display font-black text-4xl md:text-5xl lg:text-[3.5rem] leading-[0.95] tracking-tighter break-words">
                  {TOKEN.totalSupply}
                </div>
                <div className="mt-3 text-neutral-300 text-sm md:text-base max-w-xs">
                  Fixed. Mint authority revoked. Contract renounced at deploy.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Allocation cards */}
          {TOKENOMICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              className="md:col-span-2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 hover:-translate-y-1 hover:border-white/30 transition-all duration-300 group"
              data-testid={`tokenomics-card-${idx}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-neutral-400">
                  {item.label}
                </span>
                <span
                  className={`font-display font-black text-3xl md:text-4xl ${
                    item.color === "gold" ? "text-[#FFD700]" : "text-[#10B981]"
                  }`}
                >
                  {item.value}%
                </span>
              </div>
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value * 2.5}%` }}
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
    </section>
  );
}
