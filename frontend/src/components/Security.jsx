import { motion } from "framer-motion";
import { ShieldCheck, Lock, KeyRound, Users, Scale, Zap, Check } from "lucide-react";
import { SECURITY_PILLARS } from "@/lib/goat-data";

const ICONS = [Lock, KeyRound, ShieldCheck, Users, Scale, Zap];

export default function Security() {
  return (
    <section
      id="security"
      data-testid="security-section"
      className="relative py-24 md:py-36 px-5 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none">
        <div className="absolute right-[-10%] top-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_#10B981,_transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
        >
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#10B981]">
              04 · Security
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em] max-w-2xl">
              Verified <span className="goat-gradient-text">on-chain.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-base md:text-lg leading-relaxed">
            Every guarantee below is publicly verifiable on Solana mainnet — no marketing claims,
            only immutable on-chain state.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SECURITY_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const isGold = idx % 2 === 0;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="group relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 md:p-7 hover:-translate-y-1 hover:border-white/30 transition-all duration-300"
                data-testid={`security-pillar-${idx}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isGold
                        ? "bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700]"
                        : "bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[10px] uppercase tracking-[0.18em] font-bold text-[#10B981]"
                    data-testid={`security-status-${idx}`}
                  >
                    <Check className="w-3 h-3" />
                    Confirmed
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg md:text-xl">{pillar.title}</h3>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{pillar.body}</p>

                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${
                    isGold ? "bg-[#FFD700]" : "bg-[#10B981]"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
