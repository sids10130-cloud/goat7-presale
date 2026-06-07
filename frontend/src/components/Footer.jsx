import { Send, Globe, Megaphone } from "lucide-react";
import { SOCIALS, NAV_LINKS } from "@/lib/goat-data";

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative pt-20 pb-10 px-5 md:px-8 border-t border-white/10 bg-[#040404]"
    >
      <div className="goat-hr absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Big logo line */}
        <div className="font-display font-black text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.04em] text-white/[0.06] select-none -mb-2 md:-mb-4">
          GOAT<span className="text-[#FFD700]/20">7</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-white/10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 hex-clip bg-gradient-to-br from-[#FFD700] to-[#10B981] flex items-center justify-center">
                <span className="font-display font-black text-black text-sm">G7</span>
              </div>
              <span className="font-display font-black text-xl">GOAT<span className="text-[#FFD700]">7</span></span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              An original Solana community meme token. Not affiliated with any
              celebrity, athlete, sports organization, or third-party brand.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIALS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                data-testid="footer-x-link"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-[#FFD700]/60 hover:text-[#FFD700] text-neutral-300 transition-all"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIALS.telegramGroup}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Group"
                data-testid="footer-telegram-link"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-[#10B981]/60 hover:text-[#10B981] text-neutral-300 transition-all"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={SOCIALS.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Announcements Channel"
                data-testid="footer-telegram-channel-link"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-[#FFD700]/60 hover:text-[#FFD700] text-neutral-300 transition-all"
                title="Announcements channel"
              >
                <Megaphone className="w-4 h-4" />
              </a>
              <a
                href={SOCIALS.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official website"
                data-testid="footer-website-link"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 hover:text-white text-neutral-300 transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700] mb-5">
              Explore
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-neutral-300 hover:text-[#FFD700] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#10B981] mb-5">
              Resources
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={SOCIALS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 hover:text-[#10B981] transition-colors"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 hover:text-[#10B981] transition-colors"
                >
                  Announcements Channel
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com/solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 hover:text-[#10B981] transition-colors"
                >
                  DexScreener Chart
                </a>
              </li>
              <li>
                <a
                  href="https://phantom.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 hover:text-[#10B981] transition-colors"
                >
                  Get Phantom Wallet
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} GOAT7 — Community Meme Token. All rights reserved.
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-600 font-mono">
            Built by the herd · Powered by Solana
          </div>
        </div>

        <p className="mt-6 text-[11px] text-neutral-600 leading-relaxed max-w-3xl">
          <span className="text-neutral-500 font-semibold">Disclaimer:</span> $GOAT7 is a meme
          token with no intrinsic value or expectation of financial return. There is no formal
          team, roadmap, or guarantee. GOAT7 is an original community project and is not
          affiliated with, endorsed by, or associated with any celebrity, athlete, sports
          organization, league, or third-party brand. Cryptocurrency is highly volatile — only
          spend what you can afford to lose. Nothing on this site constitutes financial advice.
        </p>
      </div>
    </footer>
  );
}
