import { useState, useEffect, useCallback } from "react";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const LAMPORTS_PER_SOL = 1_000_000_000;

function getPhantomProvider() {
  if (typeof window === "undefined") return null;
  const w = window;
  if (w.phantom?.solana?.isPhantom) return w.phantom.solana;
  if (w.solana?.isPhantom) return w.solana;
  return null;
}

async function fetchSolBalance(publicKey) {
  const res = await fetch(SOLANA_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    }),
  });
  if (!res.ok) throw new Error("RPC error");
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "RPC error");
  return (data.result?.value ?? 0) / LAMPORTS_PER_SOL;
}

export function usePhantom() {
  // Lazy init so we don't call setState synchronously inside useEffect
  const [provider] = useState(() => getPhantomProvider());
  const [publicKey, setPublicKey] = useState(null);
  const [balance, setBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Eager (silent) connect + account change listener
  useEffect(() => {
    if (!provider) return undefined;
    let cancelled = false;

    const loadBalance = (pk) => {
      fetchSolBalance(pk)
        .then((b) => {
          if (!cancelled) setBalance(b);
        })
        .catch(() => {});
    };

    const tryEagerConnect = async () => {
      try {
        const resp = await provider.connect({ onlyIfTrusted: true });
        const pk = resp.publicKey?.toString?.();
        if (pk && !cancelled) {
          setPublicKey(pk);
          loadBalance(pk);
        }
      } catch {
        /* user not previously trusted — silent fail */
      }
    };
    tryEagerConnect();

    const handleAccountChanged = (pk) => {
      if (cancelled) return;
      if (pk) {
        const key = pk.toString?.() || String(pk);
        setPublicKey(key);
        loadBalance(key);
      } else {
        setPublicKey(null);
        setBalance(null);
      }
    };
    provider.on?.("accountChanged", handleAccountChanged);

    return () => {
      cancelled = true;
      provider.removeListener?.("accountChanged", handleAccountChanged);
    };
  }, [provider]);

  const connect = useCallback(async () => {
    setError(null);
    if (!provider) {
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      setError("Phantom wallet not detected");
      return null;
    }
    try {
      setConnecting(true);
      const resp = await provider.connect();
      const pk = resp.publicKey?.toString?.();
      setPublicKey(pk);
      try {
        const bal = await fetchSolBalance(pk);
        setBalance(bal);
      } catch {
        setBalance(null);
      }
      return pk;
    } catch (err) {
      setError(err?.message || "Connection cancelled");
      return null;
    } finally {
      setConnecting(false);
    }
  }, [provider]);

  const disconnect = useCallback(async () => {
    if (provider?.disconnect) {
      try {
        await provider.disconnect();
      } catch {
        /* ignore disconnect errors */
      }
    }
    setPublicKey(null);
    setBalance(null);
  }, [provider]);

  return {
    isPhantomInstalled: !!provider,
    publicKey,
    balance,
    connecting,
    error,
    connect,
    disconnect,
  };
}
