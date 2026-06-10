import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { PRESALE } from "@/lib/goat-data";

const RPC = PRESALE.rpcEndpoint || "https://api.mainnet-beta.solana.com";

// Poll interval (ms). 30s avoids public RPC rate limits.
const POLL_INTERVAL = 30_000;
const SIG_PAGE_SIZE = 1000;

/**
 * Real-time presale stats derived 100% from on-chain data.
 *  - Total Raised: lamport balance of the recipient wallet.
 *  - Tokens Sold:  raised / salePrice  (==  raised * tokensPerSol).
 *  - Participants: count of unique signers in the recipient's incoming
 *                  transactions (best-effort via getSignaturesForAddress
 *                  + batched getParsedTransactions).
 *  - Progress:     raised / hardCap.
 */
export function usePresaleStats() {
  const connection = useMemo(() => new Connection(RPC, "confirmed"), []);
  const recipient = useMemo(() => {
    try {
      return new PublicKey(PRESALE.recipient);
    } catch {
      return null;
    }
  }, []);

  const [raisedSol, setRaisedSol] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const cancelledRef = useRef(false);

  const fetchStats = useCallback(async () => {
    if (!recipient) {
      setError("Invalid recipient wallet");
      setLoading(false);
      return;
    }
    try {
      // 1) Balance — single cheap call
      const lamports = await connection.getBalance(recipient, "confirmed");
      if (cancelledRef.current) return;
      setRaisedSol(lamports / LAMPORTS_PER_SOL);

      // 2) Participants — fetch latest signatures, parse senders.
      // Best-effort: limit to last 1000 sigs; batch parsed-tx fetches.
      try {
        const sigInfos = await connection.getSignaturesForAddress(recipient, {
          limit: SIG_PAGE_SIZE,
        });
        if (cancelledRef.current) return;

        const successful = sigInfos.filter((s) => !s.err);
        if (successful.length === 0) {
          setParticipants(0);
        } else {
          // Batch in groups of 100 (RPC limit per call)
          const sigs = successful.map((s) => s.signature);
          const senders = new Set();
          for (let i = 0; i < sigs.length; i += 100) {
            const batch = sigs.slice(i, i + 100);
            const txs = await connection.getParsedTransactions(batch, {
              commitment: "confirmed",
              maxSupportedTransactionVersion: 0,
            });
            if (cancelledRef.current) return;
            for (const tx of txs || []) {
              if (!tx) continue;
              const ix = tx.transaction?.message?.instructions || [];
              for (const inst of ix) {
                // System program transfer to recipient
                if (
                  inst?.program === "system" &&
                  inst?.parsed?.type === "transfer" &&
                  inst?.parsed?.info?.destination === recipient.toBase58() &&
                  inst?.parsed?.info?.source
                ) {
                  senders.add(inst.parsed.info.source);
                }
              }
            }
          }
          if (!cancelledRef.current) setParticipants(senders.size);
        }
      } catch (sigErr) {
        // Don't fail the whole call if signature parsing is rate-limited.
        if (!cancelledRef.current) {
          // Leave participants as-is (may stay null until next successful poll)
          console.warn("Participants fetch failed:", sigErr?.message);
        }
      }

      setError(null);
      setUpdatedAt(Date.now());
    } catch (err) {
      if (!cancelledRef.current) setError(err?.message || "Failed to load stats");
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [connection, recipient]);

  useEffect(() => {
    cancelledRef.current = false;
    // Defer first fetch outside the synchronous effect body so any state
    // updates happen after commit (avoids react-hooks/set-state-in-effect).
    const initial = setTimeout(fetchStats, 0);
    const id = setInterval(fetchStats, POLL_INTERVAL);
    return () => {
      cancelledRef.current = true;
      clearTimeout(initial);
      clearInterval(id);
    };
  }, [fetchStats]);

  const tokensSold = raisedSol === null ? null : raisedSol * PRESALE.tokensPerSol;
  const remaining = tokensSold === null ? null : Math.max(PRESALE.presaleAllocation - tokensSold, 0);
  const progressPct =
    raisedSol === null ? null : Math.min((raisedSol / PRESALE.hardCap) * 100, 100);

  return {
    raisedSol,
    tokensSold,
    participants,
    remaining,
    progressPct,
    loading,
    error,
    updatedAt,
    refetch: fetchStats,
  };
}
