import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Whitepaper from "@/components/Whitepaper";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

function Landing() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white grain" data-testid="landing-page">
      <Header />
      <main>
        <Hero />
        <Tokenomics />
        <Roadmap />
        <Whitepaper />
        <FAQ />
      </main>
      <Footer />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
