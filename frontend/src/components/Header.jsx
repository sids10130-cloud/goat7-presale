import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Wallet } from "lucide-react";
import { toast } from "sonner";
import { NAV_LINKS, SOCIALS } from "@/lib/goat-data";
import { usePhantom } from "@/hooks/usePhantom";

const truncate = (s) => (s ? `${s.slice(0, 4)}…${s.slice(-4)}` : "");

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { publicKey, balance, connecting, connect, disconnect, isPhantomInstalled } = usePhantom();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConnect = async () => {
    if (publicKey) {
      await disconnect();
      toast("Wallet disconnected");
      return;
    }
    const pk = await connect();
    if (pk) {
      toast.success("Wallet connected", { description: truncate(pk) });
    } else if (!isPhantomInstalled) {
      toast.error("Phantom not detected", { description: "Install Phantom to continue" });
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-2xl bg-[#050505]/70 border-b border-white/10"
          : "bg-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group" data-testid="logo-link">
          <div className="relative w-9 h-9 hex-clip bg-gradient-to-br from-[#FFD700] to-[#10B981] flex items-center justify-center">
            <span className="font-display font-black text-black text-sm">G7</span>
          </div>
          <span className="font-display font-black text-lg tracking-tight">GOAT<span className="text-[#FFD700]">7</span></span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-neutral-400 hover:text-[#FFD700] transition-colors uppercase tracking-[0.18em] font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={SOCIALS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            data-testid="header-x-link"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-white/10 hover:border-[#FFD700]/60 hover:text-[#FFD700] text-neutral-300 transition-all"
          >
            <XIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIALS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            data-testid="header-telegram-link"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-white/10 hover:border-[#10B981]/60 hover:text-[#10B981] text-neutral-300 transition-all"
          >
            <Send className="w-4 h-4" />
          </a>

          {/* Phantom connect */}
          <button
            onClick={handleConnect}
            disabled={connecting}
            data-testid="phantom-connect-button"
            className="group relative inline-flex items-center gap-2 px-3.5 md:px-5 h-10 rounded-full bg-[#FFD700] text-black font-bold text-sm hover:bg-[#FBE14D] transition-all shadow-[0_0_25px_-8px_rgba(255,215,0,0.8)] disabled:opacity-60"
          >
            <Wallet className="w-4 h-4" />
            {publicKey ? (
              <span className="flex items-center gap-2" data-testid="wallet-info">
                <span className="font-mono text-xs">{truncate(publicKey)}</span>
                <span className="hidden md:inline text-xs px-2 py-0.5 rounded-full bg-black/20" data-testid="wallet-balance">
                  {balance === null ? "…" : `${balance.toFixed(3)} SOL`}
                </span>
              </span>
            ) : (
              <span>{connecting ? "Connecting…" : "Connect Wallet"}</span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/10"
            aria-label="Menu"
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#050505]/95 backdrop-blur-2xl"
            data-testid="mobile-nav"
          >
            <nav className="px-5 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm uppercase tracking-[0.18em] text-neutral-300 hover:text-[#FFD700]"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#FFD700]"><XIcon className="w-4 h-4" /></a>
                <a href={SOCIALS.telegram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#10B981]"><Send className="w-4 h-4" /></a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
