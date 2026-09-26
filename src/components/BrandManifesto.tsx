import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PILLARS, IMAGES } from '../data/tamanusData';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const BrandManifesto: React.FC = () => {
  const fullScreenOasisRef = useRef<HTMLDivElement>(null);
  const oasisBgImgRef = useRef<HTMLImageElement>(null);
  const oasisCurtainRef = useRef<HTMLDivElement>(null);
  const oasisTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Left-to-Right luxury curtain reveal
      if (oasisCurtainRef.current) {
        gsap.fromTo(
          oasisCurtainRef.current,
          { scaleX: 1, transformOrigin: 'right' },
          {
            scaleX: 0,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: fullScreenOasisRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Parallax zoom & vertical drift for the full-screen oasis image
      if (oasisBgImgRef.current && fullScreenOasisRef.current) {
        gsap.fromTo(
          oasisBgImgRef.current,
          { yPercent: -15, scale: 1.25, filter: 'blur(4px)' },
          {
            yPercent: 15,
            scale: 1.05,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: fullScreenOasisRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Staggered text entrance
      if (oasisTextRef.current) {
        gsap.fromTo(
          oasisTextRef.current.querySelectorAll('.gsap-oasis-fade'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fullScreenOasisRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, fullScreenOasisRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#FAF8F5] relative overflow-hidden">
      {/* Editorial Philosophy Narrative */}
      <div className="py-24 sm:py-28 max-w-7xl mx-auto px-6 sm:px-12 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E8E3D7] pb-16">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
              The TAMANUS Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#0D281E] leading-tight">
              Purity of origin.
              <br />
              Dignity of presentation.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl font-serif text-[#596A61] font-light leading-relaxed">
              We founded TAMANUS on a singular conviction: dates are among humanity’s most ancient culinary treasures,
              yet their true variety, terroir, and refined presentation are rarely experienced with modern transparency.
              We present Saudi Arabia’s royal cultivars with the precision of single-estate vintages.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid with Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="bg-[#FAF8F5] border border-[#E8E3D7] p-8 sm:p-10 flex flex-col justify-between space-y-6 relative group hover:border-[#154230] transition-colors shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs tracking-widest text-[#86968E] uppercase">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="font-mono text-[#C6A052] font-bold">{pillar.subtitle}</span>
                </div>
                <h3 className="text-2xl font-serif text-[#0D281E] font-medium leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#596A61] leading-relaxed font-light">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DA] flex items-center gap-2 text-xs font-medium text-[#154230]">
                <CheckCircle2 className="w-4 h-4 text-[#C6A052]" />
                <span className="tracking-wider uppercase">{pillar.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN, IMMERSIVE PARALLAX OASIS SECTION */}
      <div
        ref={fullScreenOasisRef}
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#071610] text-[#FAF8F5]"
      >
        {/* Left-to-Right Curtain Reveal (Scales to right: 0) */}
        <div
          ref={oasisCurtainRef}
          className="absolute inset-0 bg-[#071610] z-30 pointer-events-none origin-right"
        />

        {/* Parallax Background Visual */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            ref={oasisBgImgRef}
            src={IMAGES.oasis}
            alt="Cinematic wide view of majestic date palm oasis grove in Saudi Arabia during golden hour"
            className="w-full h-[135%] -top-[17.5%] absolute left-0 object-cover object-center will-change-transform"
          />

          {/* Luxury Film Gradients and Chiaroscuro Overlays */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#071610] via-[#071610]/50 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#071610]/95 via-[#071610]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#071610] via-[#071610]/60 to-transparent" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Top Context Sub-Header */}
        <div className="relative z-10 w-full border-b border-white/10 px-6 sm:px-12 py-5 pt-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-[#E8DFC8]/75 font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C6A052] inline-block" />
              <span>Oasis Geography · Al-Qassim Basin & Madinah Valley</span>
            </div>
            <span className="hidden sm:inline font-arabic text-sm text-[#C6A052]">
              واحات النخيل العريقة — مياه عذبة وتربة بركانية
            </span>
          </div>
        </div>

        {/* Main Content Area (Monumental Editorial Presentation) */}
        <div
          ref={oasisTextRef}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full my-auto py-16 sm:py-24"
        >
          <div className="max-w-3xl space-y-8">
            <div className="gsap-oasis-fade inline-flex items-center gap-2.5 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.28em] text-[#C6A052]">
              <Compass className="w-3.5 h-3.5 text-[#C6A052]" />
              <span>Single-Origin Provenance</span>
            </div>

            <div className="space-y-4">
              <h2 className="gsap-oasis-fade text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.04] tracking-tight">
                Ancient Aquifers. <br />
                <span className="italic text-[#E8DFC8] drop-shadow-md">Relentless Sun.</span>
              </h2>

              <p className="gsap-oasis-fade font-serif text-2xl sm:text-3xl text-[#C6A052] font-light italic">
                The Terroir of Madinah and Al-Qassim.
              </p>
            </div>

            <p className="gsap-oasis-fade text-base sm:text-lg text-[#E8DFC8]/90 font-light leading-relaxed max-w-2xl">
              Each palm tree draws from natural subterranean spring systems that have sustained desert caravans for millennia.
              Under 45°C summer heat, the fruit cures slowly on the frond, concentrating minerals, natural sucrose, and subtle
              tannins without ever encountering artificial dehydrators or chemical fumigation.
            </p>

            {/* Spec Cards on Travertine Glass */}
            <div className="gsap-oasis-fade grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-xl">
              <div className="bg-[#071610]/70 backdrop-blur-md border border-white/15 p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A052] block">
                  Subterranean Aquifer
                </span>
                <p className="font-serif text-lg text-white font-medium">Naturally Mineralized Springs</p>
                <p className="text-xs text-[#E8DFC8]/75 font-light">Filtered through volcanic basalt and ancient sandstone</p>
              </div>

              <div className="bg-[#071610]/70 backdrop-blur-md border border-white/15 p-5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A052] block">
                  Natural Maturation
                </span>
                <p className="font-serif text-lg text-white font-medium">100% Tree-Cured Tamar</p>
                <p className="text-xs text-[#E8DFC8]/75 font-light">Zero sulfur, zero glucose bath, zero chemical fumigation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Oasis Bottom Horizon Bar */}
        <div className="relative z-10 w-full border-t border-white/10 bg-[#071610]/80 backdrop-blur-md px-6 sm:px-12 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFC8]/75">
            <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest">
              <span>Soil: Volcanic Basalt</span>
              <span>·</span>
              <span>Water: Artesian Spring</span>
              <span>·</span>
              <span>Altitude: 600m</span>
            </div>
            <span className="text-[#C6A052] text-[11px] font-mono uppercase tracking-widest">
              Preserved in Cold-Chain Rooms at 4°C
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
