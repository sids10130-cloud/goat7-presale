import { motion } from "framer-motion";
import { Send, Globe, ArrowUpRight, Megaphone } from "lucide-react";
import { COMMUNITY_CHANNELS } from "@/lib/goat-data";

const ICONS = {
  "Telegram Group": Send,
  "Telegram Channel": Megaphone,
  "Official Website": Globe,
};

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Community() {
  return (
    <section
      id="community"
      data-testid="community-section"
      className="relative py-24 md:py-36 px-5 md:px-8 bg-[#070707] border-y border-white/5 overflow-hidden"
    >
      {/* Decorative gold orb */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.08),_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
            06 · Community
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em]">
            Join the <span className="goat-gradient-text">herd.</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-base md:text-lg leading-relaxed">
            GOAT7 is nothing without its community. Plug into the channels below — meet the
            herd, get real-time alpha, and never miss an announcement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMMUNITY_CHANNELS.map((c, idx) => {
            const Icon = ICONS[c.name] || Globe;
            const accentGold = c.accent === "gold";
            return (
              <motion.a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`group relative rounded-3xl border bg-[#0a0a0a] p-7 md:p-8 overflow-hidden hover:-translate-y-1 transition-all duration-300 ${
                  accentGold
                    ? "border-[#FFD700]/20 hover:border-[#FFD700]/60"
                    : "border-[#10B981]/20 hover:border-[#10B981]/60"
                }`}
                data-testid={`community-card-${idx}`}
              >
                {/* Top icon row */}
                <div className="flex items-center justify-between mb-10">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      accentGold
                        ? "bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700]"
                        : "bg-[#10B981]/10 border border-[#10B981]/40 text-[#10B981]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 text-neutral-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all ${
                      accentGold ? "group-hover:text-[#FFD700]" : "group-hover:text-[#10B981]"
                    }`}
                  />
                </div>

                <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-neutral-500">
                  {c.name}
                </div>
                <h3
                  className={`font-display font-black text-2xl md:text-3xl mt-1.5 tracking-tight ${
                    accentGold ? "text-[#FFD700]" : "text-[#10B981]"
                  }`}
                >
                  {c.handle}
                </h3>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {c.description}
                </p>

                {/* Bottom accent bar */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
                    accentGold ? "bg-[#FFD700]" : "bg-[#10B981]"
                  }`}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Big community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14 md:mt-20 relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#FFD700]/10 via-[#0a0a0a] to-[#10B981]/10 p-8 md:p-14 text-center overflow-hidden"
          data-testid="community-cta-banner"
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none"
               style={{
                 backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,215,0,0.15), transparent 50%), radial-gradient(circle at 70% 70%, rgba(16,185,129,0.15), transparent 50%)",
               }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-xl mb-6">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white">
                Community is the alpha
              </span>
            </div>
            <h3 className="font-display font-black text-3xl md:text-5xl tracking-[-0.03em] max-w-2xl mx-auto">
              Real holders. <span className="goat-gradient-text">Real momentum.</span>
            </h3>
            <p className="mt-5 text-neutral-300 text-base md:text-lg max-w-xl mx-auto">
              No bots, no paid pumpers — just a community of believers building GOAT7
              into the most iconic meme on Solana.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://t.me/CR7GOATarmy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#FFD700] text-black font-bold text-sm hover:bg-[#FBE14D] transition-all shadow-[0_0_40px_-8px_rgba(255,215,0,0.7)]"
                data-testid="community-cta-telegram"
              >
                <Send className="w-4 h-4" />
                Join the Herd on Telegram
              </a>
              <a
                href="https://x.com/CR7GOATarmy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border-2 border-white/20 text-white font-bold text-sm hover:border-white/50 transition-all"
                data-testid="community-cta-twitter"
              >
                <XIcon className="w-3.5 h-3.5" />
                Follow on X
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
