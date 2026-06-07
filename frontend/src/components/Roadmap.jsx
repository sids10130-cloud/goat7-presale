import { motion } from "framer-motion";
import { Check, Flag, Rocket, Zap, Star } from "lucide-react";
import { ROADMAP } from "@/lib/goat-data";

const ICONS = [Flag, Rocket, Zap, Star];
const STATUS_LABEL = {
  live: "Now Live",
  next: "In Progress",
  soon: "Coming Soon",
  future: "On the Horizon",
};

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      data-testid="roadmap-section"
      className="relative py-24 md:py-36 px-5 md:px-8 bg-[#070707] border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#10B981]">
            03 · Roadmap
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em]">
            The path of <span className="goat-gradient-text">the herd.</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-base md:text-lg leading-relaxed">
            Four phases. One direction — up. Every milestone is community-driven, transparent, and on-chain verifiable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROADMAP.map((phase, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const isLive = phase.status === "live";
            const isNext = phase.status === "next";
            const accent = isLive
              ? "text-[#FFD700] border-[#FFD700]/60"
              : isNext
              ? "text-[#10B981] border-[#10B981]/50"
              : "text-neutral-400 border-white/10";

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative rounded-2xl border bg-[#0a0a0a] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  isLive ? "border-[#FFD700]/30 goat-glow-gold" : "border-white/10 hover:border-white/30"
                }`}
                data-testid={`roadmap-card-${idx}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center ${accent}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border ${accent}`}
                  >
                    {STATUS_LABEL[phase.status]}
                  </span>
                </div>

                <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-500">
                  {phase.phase}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mt-1.5 tracking-tight">
                  {phase.title}
                </h3>

                <ul className="mt-6 space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isLive ? "text-[#FFD700]" : isNext ? "text-[#10B981]" : "text-neutral-600"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
