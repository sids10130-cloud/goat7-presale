import { useMemo } from "react";
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import "@solana/wallet-adapter-react-ui/styles.css";

const RPC_ENDPOINT = process.env.REACT_APP_SOLANA_RPC || "https://api.mainnet-beta.solana.com";

export default function AppWalletProvider({ children }) {
  const endpoint = RPC_ENDPOINT;

  // Wallet Standard wallets (Phantom, Solflare, Backpack, Glow, etc.) are
  // auto-detected by the wallet-adapter-react. We explicitly register the
  // most-used adapters so they show up in the modal even before the user
  // has them installed. Backpack auto-registers via wallet standard.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
