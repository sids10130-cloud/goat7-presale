import { motion } from "framer-motion";
import { Send, Globe, ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/goat-data";

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CHANNELS = [
  {
    name: "Telegram",
    handle: "@GOAT7Official",
    description: "Official chat — alpha, memes and 24/7 community.",
    href: SOCIALS.telegram,
    icon: Send,
    accent: "green",
    testId: "community-card-telegram",
  },
  {
    name: "X (Twitter)",
    handle: "@GOAT7official",
    description: "Announcements, updates, and the loudest meme feed on Solana.",
    href: SOCIALS.twitter,
    icon: XIcon,
    accent: "gold",
    testId: "community-card-twitter",
  },
  {
    name: "Website",
    handle: "goat7.xyz",
    description: "Official website — presale dashboard and resources.",
    href: SOCIALS.website,
    icon: Globe,
    accent: "green",
    testId: "community-card-website",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      data-testid="community-section"
      className="relative py-24 md:py-36 px-5 md:px-8 bg-[#070707] border-y border-white/5 overflow-hidden"
    >
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
            Plug into the official channels below — meet the herd, get real-time updates, and
            never miss an announcement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHANNELS.map((c, idx) => {
            const Icon = c.icon;
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
                data-testid={c.testId}
              >
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
                    className={`w-5 h-5 text-neutral-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all ${
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
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{c.description}</p>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
                    accentGold ? "bg-[#FFD700]" : "bg-[#10B981]"
                  }`}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
