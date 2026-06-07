import { motion } from "framer-motion";
import { Download, FileText, ShieldCheck, Lock, Flame } from "lucide-react";
import { toast } from "sonner";
import { SOCIALS } from "@/lib/goat-data";

const HIGHLIGHTS = [
  { icon: Lock, title: "Liquidity Burned", body: "100% of initial LP burned at launch — verifiable on-chain." },
  { icon: ShieldCheck, title: "Mint Renounced", body: "No mint authority. No upgrade authority. Pure community ownership." },
  { icon: Flame, title: "Deflationary Events", body: "Quarterly buyback-and-burn from treasury allocation." },
];

export default function Whitepaper() {
  const handleDownload = (e) => {
    // Whitepaper PDF placeholder — if not yet hosted, surface a toast
    if (!SOCIALS.whitepaper || SOCIALS.whitepaper === "#" || SOCIALS.whitepaper.startsWith("/")) {
      // We still let the anchor work, but inform user it's a placeholder
      toast("Whitepaper draft", { description: "Final whitepaper PDF coming soon" });
    }
    // Don't preventDefault so anchor still navigates if path exists
  };

  return (
    <section
      id="whitepaper"
      data-testid="whitepaper-section"
      className="relative py-24 md:py-36 px-5 md:px-8 overflow-hidden"
    >
      {/* Decorative texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.06]"
           style={{
             backgroundImage: "url('https://images.pexels.com/photos/5200063/pexels-photo-5200063.jpeg')",
             backgroundSize: "cover",
             backgroundPosition: "center",
           }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#050505] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
              04 · Whitepaper
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em]">
              The complete <span className="goat-gradient-text">GOAT7 thesis.</span>
            </h2>
            <p className="mt-6 text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Our whitepaper covers everything you need to know about GOAT7 — the
              vision, tokenomics breakdown, distribution mechanics, governance model,
              security audits, and the long-term roadmap toward a self-sustaining
              community ecosystem on Solana.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4 hover:border-[#FFD700]/30 transition-colors"
                  data-testid={`whitepaper-highlight-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-5 h-5 text-[#10B981] mb-3" />
                  <div className="font-display font-bold text-sm">{title}</div>
                  <div className="text-xs text-neutral-400 mt-1 leading-relaxed">{body}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={SOCIALS.whitepaper}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
                data-testid="download-whitepaper-button"
                className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-[#FFD700] text-black font-bold text-sm hover:bg-[#FBE14D] transition-all shadow-[0_0_40px_-10px_rgba(255,215,0,0.7)]"
              >
                <Download className="w-4 h-4" />
                Download Whitepaper
              </a>
              <span className="text-xs text-neutral-500 font-mono">v1.0 · PDF · 2.4 MB</span>
            </div>
          </motion.div>

          {/* Right: PDF preview card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#10B981]/10 p-1 goat-glow-green">
              <div className="rounded-[22px] bg-[#070707] p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-base">GOAT7-Whitepaper</div>
                      <div className="text-xs text-neutral-500 font-mono">litepaper-v1.0.pdf</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#10B981] px-2.5 py-1 rounded-full border border-[#10B981]/40">
                    Final
                  </span>
                </div>

                <div className="mt-7 space-y-2.5">
                  {[
                    "01 — Abstract & Mission",
                    "02 — Tokenomics & Distribution",
                    "03 — Liquidity & Burn Mechanics",
                    "04 — Community Governance",
                    "05 — Security & Audits",
                    "06 — Roadmap & Vision",
                  ].map((line, i) => (
                    <div
                      key={line}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-sm text-neutral-300">{line}</span>
                      <span className="font-mono text-[10px] text-neutral-600">p.{(i + 1) * 3}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
