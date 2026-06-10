import { useCallback, useEffect, useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { motion } from "framer-motion";
import {
  Wallet,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Clock,
  Users,
  Flame,
  Coins,
} from "lucide-react";
import { toast } from "sonner";

import { PRESALE, TOKEN } from "@/lib/goat-data";
import { usePresaleStats } from "@/hooks/usePresaleStats";

const fmtSol = (v, dp = 4) =>
  v === null || v === undefined ? "—" : Number(v).toLocaleString(undefined, { maximumFractionDigits: dp });

const fmtInt = (v) =>
  v === null || v === undefined ? "—" : Math.floor(Number(v)).toLocaleString();

const fmtTokens = (v) => {
  if (v === null || v === undefined) return "—";
  const n = Number(v);
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return fmtInt(n);
};

function useCountdown(targetISO) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = target - now;
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s, done: false };
}

function getPresalePhase() {
  const now = Date.now();
  const start = new Date(PRESALE.startISO).getTime();
  const end = new Date(PRESALE.endISO).getTime();
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "ended";
}

export default function Presale() {
  const stats = usePresaleStats();
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();

  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("0.5");
  const [phase, setPhase] = useState(() => getPresalePhase());
  useEffect(() => {
    const id = setInterval(() => setPhase(getPresalePhase()), 1000);
    return () => clearInterval(id);
  }, []);
  const upcoming = phase === "upcoming";
  const live = phase === "live";
  const ended = phase === "ended";

  const countdown = useCountdown(upcoming ? PRESALE.startISO : PRESALE.endISO);

  const amountNum = Number(amount);
  const valid =
    !Number.isNaN(amountNum) && amountNum >= PRESALE.minBuy && amountNum <= PRESALE.maxBuy;
  const tokensYouGet = !Number.isNaN(amountNum) ? amountNum * PRESALE.tokensPerSol : 0;

  const openWalletModal = useCallback(() => {
    setWalletModalVisible(true);
  }, [setWalletModalVisible]);

  const handleBuy = useCallback(async () => {
    if (!connected || !publicKey) {
      openWalletModal();
      return;
    }
    if (!live) {
      toast.error(upcoming ? "Presale starts on 12 June 2026" : "Presale has ended");
      return;
    }
    if (!valid) {
      toast.error(`Amount must be between ${PRESALE.minBuy} and ${PRESALE.maxBuy} SOL`);
      return;
    }

    let recipientPubkey;
    try {
      recipientPubkey = new PublicKey(PRESALE.recipient);
    } catch {
      toast.error("Invalid recipient configuration");
      return;
    }

    try {
      setSubmitting(true);
      const lamports = Math.floor(amountNum * LAMPORTS_PER_SOL);
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      const signature = await sendTransaction(tx, connection);
      toast.loading("Confirming transaction…", { id: signature });

      const latest = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          signature,
          blockhash: latest.blockhash,
          lastValidBlockHeight: latest.lastValidBlockHeight,
        },
        "confirmed"
      );

      toast.success(`Purchased ${fmtTokens(tokensYouGet)} GOAT7`, {
        id: signature,
        description: `Tx: ${signature.slice(0, 8)}…${signature.slice(-8)}`,
        action: {
          label: "View",
          onClick: () => window.open(`https://solscan.io/tx/${signature}`, "_blank"),
        },
      });

      // Refetch stats so the UI updates with the new contribution
      stats.refetch();
    } catch (err) {
      const msg = err?.message || "Transaction failed";
      if (msg.includes("User rejected")) {
        toast.error("Transaction cancelled");
      } else {
        toast.error("Buy failed", { description: msg.slice(0, 140) });
      }
    } finally {
      setSubmitting(false);
    }
  }, [
    connected,
    publicKey,
    live,
    upcoming,
    valid,
    amountNum,
    connection,
    sendTransaction,
    openWalletModal,
    tokensYouGet,
    stats,
  ]);

  return (
    <section
      id="presale"
      data-testid="presale-section"
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
    >
      {/* Background flare */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,215,0,0.08),_transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700]">
            01 · Presale
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em]">
            Join the <span className="goat-gradient-text">GOAT7 presale.</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-base md:text-lg leading-relaxed">
            Get GOAT7 at the lowest sale price — directly on-chain, with no middlemen and zero
            taxes. Live stats below are pulled in real time from the Solana mainnet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* LEFT — Stats + progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8"
            data-testid="presale-stats-card"
          >
            {/* Status pill */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#050505]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    live ? "bg-[#10B981] animate-pulse" : upcoming ? "bg-[#FFD700]" : "bg-neutral-500"
                  }`}
                />
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold">
                  {live ? "Live now" : upcoming ? "Starts soon" : "Ended"}
                </span>
              </div>

              <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 font-mono">
                {PRESALE.startDisplay} — {PRESALE.endDisplay}
              </div>
            </div>

            {/* Countdown */}
            {!ended && (
              <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3" data-testid="presale-countdown">
                {[
                  { v: countdown.d, l: "Days" },
                  { v: countdown.h, l: "Hours" },
                  { v: countdown.m, l: "Min" },
                  { v: countdown.s, l: "Sec" },
                ].map((u) => (
                  <div
                    key={u.l}
                    className="rounded-xl border border-white/10 bg-[#050505] p-3 sm:p-4 text-center"
                  >
                    <div className="font-display font-black text-2xl sm:text-3xl text-white tabular-nums">
                      {String(u.v).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1 font-bold">
                      {u.l}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Progress bar */}
            <div className="mt-7" data-testid="presale-progress">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-neutral-500">
                    Total Raised
                  </div>
                  <div className="font-display font-black text-3xl md:text-4xl mt-1">
                    <span className="goat-gradient-text">
                      {fmtSol(stats.raisedSol, 3)}
                    </span>{" "}
                    <span className="text-white text-2xl md:text-3xl">SOL</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-neutral-500">
                    Hard Cap
                  </div>
                  <div className="font-mono text-lg text-white mt-1">
                    {PRESALE.hardCap} SOL
                  </div>
                </div>
              </div>

              <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progressPct ?? 0}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFD700] via-[#FBE14D] to-[#10B981]"
                  data-testid="presale-progress-bar"
                />
              </div>

              <div className="mt-2 flex justify-between text-[11px] font-mono text-neutral-500">
                <span>Soft cap {PRESALE.softCap} SOL</span>
                <span>{stats.progressPct === null ? "—" : `${stats.progressPct.toFixed(2)}%`} of hard cap</span>
              </div>
            </div>

            {/* Live stats grid */}
            <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="presale-live-stats">
              <Stat
                icon={Coins}
                label="Tokens Sold"
                value={fmtTokens(stats.tokensSold)}
                testId="stat-tokens-sold"
                accent="gold"
              />
              <Stat
                icon={Flame}
                label="Remaining"
                value={fmtTokens(stats.remaining)}
                testId="stat-remaining"
                accent="green"
              />
              <Stat
                icon={Users}
                label="Participants"
                value={fmtInt(stats.participants)}
                testId="stat-participants"
                accent="gold"
              />
              <Stat
                icon={Clock}
                label="Sale Price"
                value={`${PRESALE.salePrice} SOL`}
                testId="stat-price"
                accent="green"
              />
            </div>

            <div className="mt-4 text-[10px] uppercase tracking-[0.18em] text-neutral-600 font-mono">
              Live · refreshes every 30s · {stats.updatedAt ? new Date(stats.updatedAt).toLocaleTimeString() : "loading…"}
            </div>
          </motion.div>

          {/* RIGHT — Buy form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl border border-[#FFD700]/20 bg-gradient-to-br from-[#FFD700]/8 via-[#0a0a0a] to-[#10B981]/8 p-6 md:p-8 goat-glow-gold"
            data-testid="presale-buy-card"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-2xl md:text-3xl">Buy {TOKEN.ticker}</h3>
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#FFD700]">
                Live on-chain
              </span>
            </div>

            <div className="mt-6">
              <label
                htmlFor="presale-amount"
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-400"
              >
                Amount in SOL
              </label>
              <div className="mt-2 relative">
                <input
                  id="presale-amount"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min={PRESALE.minBuy}
                  max={PRESALE.maxBuy}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.5"
                  data-testid="presale-amount-input"
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 font-display font-bold text-3xl text-white outline-none focus:border-[#FFD700]/60 transition-colors pr-20"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-display font-bold text-neutral-400">
                  SOL
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[PRESALE.minBuy, 0.5, 1, 2, PRESALE.maxBuy].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    data-testid={`amount-preset-${v}`}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono hover:border-[#FFD700]/40 hover:text-[#FFD700] transition-all"
                  >
                    {v} SOL
                  </button>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-mono text-neutral-500">
                <span>Min {PRESALE.minBuy} SOL</span>
                <span>Max {PRESALE.maxBuy} SOL</span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#050505] p-4" data-testid="presale-receive-box">
              <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-neutral-500">
                You receive
              </div>
              <div className="mt-1.5 font-display font-black text-2xl md:text-3xl">
                <span className="goat-gradient-text">{fmtTokens(tokensYouGet)}</span>{" "}
                <span className="text-white text-xl md:text-2xl">{TOKEN.ticker}</span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-neutral-500">
                Rate · 1 SOL = {PRESALE.tokensPerSol.toLocaleString()} GOAT7
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={handleBuy}
              disabled={submitting || connecting}
              data-testid="presale-buy-button"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-[#FFD700] text-black font-bold text-base hover:bg-[#FBE14D] transition-all shadow-[0_0_40px_-8px_rgba(255,215,0,0.7)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Confirming on Solana…
                </>
              ) : !connected ? (
                <>
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </>
              ) : ended ? (
                "Presale Ended"
              ) : upcoming ? (
                <>
                  <Clock className="w-5 h-5" />
                  Starts {PRESALE.startDisplay}
                </>
              ) : (
                <>
                  Buy GOAT7
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 text-[11px] text-neutral-500 leading-relaxed">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-600" />
              <span>
                You&apos;re sending SOL directly to the GOAT7 presale wallet on Solana mainnet.
                Tokens will be airdropped after the presale concludes. Crypto is volatile — DYOR.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, testId, accent }) {
  const gold = accent === "gold";
  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#050505] p-4"
      data-testid={testId}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`w-3.5 h-3.5 ${gold ? "text-[#FFD700]" : "text-[#10B981]"}`}
        />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">
          {label}
        </span>
      </div>
      <div className="mt-2 font-display font-bold text-xl md:text-2xl text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}
