import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandManifesto } from './components/BrandManifesto';
import { ProductCollection } from './components/ProductCollection';
import { ProductModal } from './components/ProductModal';
import { SensoryMatrix } from './components/SensoryMatrix';
import { TerroirStory } from './components/TerroirStory';
import { GiftingSection } from './components/GiftingSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { PairingRitual } from './components/PairingRitual';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { SommelierChatModal } from './components/SommelierChatModal';
import { CartDrawer } from './components/CartDrawer';
import { Product } from './data/tamanusData';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Smooth Scrolling (Lenis + GSAP ScrollTrigger)
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#141C18] flex flex-col selection:bg-[#154230] selection:text-[#FAF8F5]">
        {/* Navigation Bar adhering to Top Bar Contract */}
        <Navbar
          onOpenSommelier={() => setIsSommelierOpen(true)}
          onNavigate={handleNavigate}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExplore={() => handleNavigate('collection')}
            onOpenSommelier={() => setIsSommelierOpen(true)}
            onOpenGifting={() => handleNavigate('gifting')}
          />

          {/* Curator's Manifesto & Full-Width Terroir Oasis */}
          <BrandManifesto />

          {/* 9 Royal Date Varieties Showcase */}
          <ProductCollection onSelectProduct={(p) => setSelectedProduct(p)} />

          {/* The Interactive 2-Axis Sensory Matrix */}
          <SensoryMatrix onSelectProduct={(p) => setSelectedProduct(p)} />

          {/* Terroir & Agricultural Story */}
          <TerroirStory />

          {/* The Art of Gifting & Bespoke Proposals */}
          <GiftingSection />

          {/* Culinary Pairings & Hospitality Ritual */}
          <PairingRitual onOpenSommelier={() => setIsSommelierOpen(true)} />

          {/* Knowledge Centre Articles */}
          <KnowledgeSection />

          {/* Client Testimonials */}
          <TestimonialsSection />

          {/* FAQs from original website */}
          <FAQSection />
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenSommelier={() => setIsSommelierOpen(true)}
        />

        {/* Floating Sommelier AI Button */}
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsSommelierOpen(true)}
            className="group flex items-center gap-3 px-5 py-3.5 bg-[#0D281E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#154230] shadow-2xl border border-[#C6A052]/50 transition-all hover:scale-105 cursor-pointer"
            aria-label="Open AI Date Sommelier"
          >
            <Sparkles className="w-4 h-4 text-[#C6A052] animate-pulse" />
            <span className="hidden sm:inline">Sommelier Concierge</span>
          </button>
        </div>

        {/* Dialogs and Drawers */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenSommelier={() => setIsSommelierOpen(true)}
        />

        <SommelierChatModal
          isOpen={isSommelierOpen}
          onClose={() => setIsSommelierOpen(false)}
        />

        <CartDrawer />
      </div>
    </CartProvider>
  );
}
