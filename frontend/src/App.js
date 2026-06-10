import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AppWalletProvider from "@/contexts/WalletProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Presale from "@/components/Presale";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Security from "@/components/Security";
import Community from "@/components/Community";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

function Landing() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white grain" data-testid="landing-page">
      <Header />
      <main>
        <Hero />
        <Presale />
        <Tokenomics />
        <Roadmap />
        <Security />
        <Community />
        <FAQ />
      </main>
      <Footer />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

export default function App() {
  return (
    <AppWalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </AppWalletProvider>
  );
}
