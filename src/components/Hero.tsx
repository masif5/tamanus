import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../data/tamanusData';
import { ArrowDown, ArrowRight, Sparkles, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExplore: () => void;
  onOpenSommelier: () => void;
  onOpenGifting: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onOpenSommelier,
  onOpenGifting,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal Sequence (Left to Right Curtain Reveal)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Curtain wipe reveal from left to right (scaling to right: 0)
      if (curtainRef.current) {
        tl.to(curtainRef.current, {
          scaleX: 0,
          duration: 1.5,
          ease: 'expo.inOut',
          transformOrigin: 'right',
        });
      }

      // Hero image soft zoom-in to scale 1.05 and deblur
      if (heroImgRef.current) {
        tl.fromTo(
          heroImgRef.current,
          { scale: 1.25, filter: 'blur(8px)', xPercent: -3 },
          { scale: 1.05, filter: 'blur(0px)', xPercent: 0, duration: 2, ease: 'power2.out' },
          '-=1.2'
        );
      }

      // Text elements staggered entrance
      if (heroTextRef.current) {
        tl.fromTo(
          heroTextRef.current.querySelectorAll('.gsap-hero-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.16 },
          '-=1.3'
        );
      }

      // 2. Continuous Parallax on scroll
      if (heroImgRef.current && heroRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 18,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [imgLoaded]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#071610] text-[#FAF8F5]"
    >
      {/* Editorial Luxury Curtain Wipe Mask on Page Load (Left to Right) */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-[#071610] z-50 pointer-events-none origin-right"
      />

      {/* Background Full-Screen Parallax Layer */}
      <div ref={heroBgRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={heroImgRef}
          src={IMAGES.hero}
          alt="Cinematic luxury still life of glistening Saudi Arabian dates on dark emerald marble with morning light"
          onLoad={() => setImgLoaded(true)}
          className="w-full h-[126%] -top-[13%] absolute left-0 object-cover object-center will-change-transform"
          loading="eager"
        />

        {/* Sophisticated Multi-Layered Chiaroscuro Scrims */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#071610]/90 via-[#071610]/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#071610]/95 via-[#071610]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#071610] via-[#071610]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top Heritage Status Ticker */}
      <div className="relative z-10 w-full border-b border-white/10 px-6 sm:px-12 py-4 pt-24">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[#E8DFC8]/80 font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A052] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A052]"></span>
            </span>
            <span className="text-[#E8DFC8]">2026 Sovereign Reserve · Madinah & Al-Qassim</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="hidden md:inline font-arabic text-sm text-[#C6A052] font-semibold tracking-normal">
              تَمَنّس — تمور ملكية مختارة بعناية
            </span>
            <span className="hidden sm:inline text-white/50">24°28'N 39°36'E</span>
            <span className="text-[#C6A052]">Express GCC & Pakistan Dispatch</span>
          </div>
        </div>
      </div>

      {/* Main Full-Viewport Centerpiece Content with Staggered Entrance */}
      <div
        ref={heroTextRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto py-12 sm:py-20"
      >
        <div className="max-w-4xl space-y-8">
          {/* Eyebrow Label */}
          <div className="gsap-hero-item inline-flex items-center gap-3 px-3.5 py-1.5 bg-black/40 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.28em] text-[#C6A052]">
            <Compass className="w-3.5 h-3.5 text-[#C6A052]" />
            <span>The Sovereign Date House</span>
          </div>

          {/* Monumental Editorial Headline */}
          <div className="space-y-4">
            <h1 className="gsap-hero-item text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif font-light text-white leading-[0.98] tracking-tight">
              Purity of <br />
              <span className="italic font-normal text-[#E8DFC8] drop-shadow-lg">Sacred Origin.</span>
            </h1>

            <p className="gsap-hero-item font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C6A052] font-light italic">
              Premium dates for everyday hospitality and refined gifting.
            </p>
          </div>

          {/* Editorial Paragraph */}
          <p className="gsap-hero-item text-base sm:text-lg text-[#E8DFC8]/80 font-light max-w-2xl leading-relaxed">
            From the mineral-dense volcanic soils of Madinah to the ancient spring-fed aquifers of Al-Qassim.
            TAMANUS curates nine royal cultivars, harvested exclusively at peak Tamar maturity with zero chemical fumigation.
          </p>

          {/* Action Hub */}
          <div className="gsap-hero-item flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onExplore}
              className="group px-8 py-5 bg-[#C6A052] text-[#071610] text-xs uppercase tracking-[0.22em] font-bold hover:bg-white transition-all flex items-center gap-3 shadow-2xl cursor-pointer"
            >
              <span>Explore 9 Royal Cultivars</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenGifting}
              className="px-8 py-5 bg-[#071610]/80 backdrop-blur-md border border-white/30 text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-white hover:text-[#071610] transition-all cursor-pointer shadow-lg"
            >
              Curate Gifting Chest
            </button>

            <button
              onClick={onOpenSommelier}
              className="px-6 py-5 text-[#E8DFC8] hover:text-[#C6A052] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2.5 cursor-pointer backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C6A052] animate-pulse" />
              <span>Consult Date Sommelier (AI)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#071610]/80 backdrop-blur-md px-6 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#E8DFC8]/75">
          <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full md:w-auto">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#86968E] block">Cultivars</span>
              <span className="font-serif text-base sm:text-lg text-white font-medium">9 Royal Reserves</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#86968E] block">Harvest Standard</span>
              <span className="font-serif text-base sm:text-lg text-[#C6A052] font-medium">Tree-Cured Tamar</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#86968E] block">Presentation</span>
              <span className="font-serif text-base sm:text-lg text-white font-medium">Foil-Embossed Chests</span>
            </div>
          </div>

          <button
            onClick={onExplore}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C6A052] hover:text-white transition-colors cursor-pointer group py-1"
          >
            <span>Descend to the Collection</span>
            <div className="w-7 h-7 rounded-full border border-[#C6A052]/50 flex items-center justify-center group-hover:border-white transition-colors">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
