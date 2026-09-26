import React from 'react';
import { IMAGES } from '../data/tamanusData';
import { EditorialImage } from './EditorialImage';
import { Droplet, Sun, Feather } from 'lucide-react';

export const TerroirStory: React.FC = () => {
  return (
    <section id="terroir" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
      {/* Chapter Title */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
          Chapter II · The Sacred Terroir
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#0D281E] leading-tight max-w-3xl">
          Where volcanic soils meet ancient desert springs.
        </h2>
      </div>

      {/* Editorial Spread: Large Artisan Photo + Asymmetric Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Photo with GSAP Parallax & Curtain Wipe */}
        <div className="lg:col-span-6 relative shadow-2xl">
          <EditorialImage
            src={IMAGES.harvest}
            alt="Artisan farmer hands gently inspecting freshly harvested glossy dates in palm basket"
            aspectRatio="aspect-[4/3]"
            parallaxSpeed={10}
            overlayText={
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D281E]/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                  <span className="text-[#C6A052] uppercase tracking-widest block text-[10px] font-mono mb-1">
                    Hand-Selected at Tamar Stage
                  </span>
                  <p className="font-serif text-lg text-[#E8DFC8] italic">
                    “Each date is harvested individually by climbing the palm, never machine-shaken.”
                  </p>
                </div>
              </>
            }
          />
        </div>

        {/* Right Column: Three Curatorial Pillars */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#154230] font-semibold">
              <Sun className="w-4 h-4 text-[#C6A052]" />
              <span>300+ Days of Relentless Desert Sun</span>
            </div>
            <p className="text-base text-[#596A61] font-light leading-relaxed">
              Dates require immense heat to develop their complex sugar profile. In Madinah and Al-Qassim, temperatures
              regularly surpass 45°C throughout the summer, curing the sucrose naturally on the branch without the need
              for artificial kiln drying or sulfur treatments.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#E8E3D7]">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#154230] font-semibold">
              <Droplet className="w-4 h-4 text-[#C6A052]" />
              <span>Ancient Falaj Irrigation Systems</span>
            </div>
            <p className="text-base text-[#596A61] font-light leading-relaxed">
              The groves are sustained by gravity-fed subterranean channels that transport pristine mineral water from deep
              underground aquifers directly to the taproots of century-old palm trees. This subterranean nourishment creates
              the distinctive tender crumb and deep mineral undertone of TAMANUS dates.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#E8E3D7]">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#154230] font-semibold">
              <Feather className="w-4 h-4 text-[#C6A052]" />
              <span>Zero-Fumigation & Calibrated Moisture</span>
            </div>
            <p className="text-base text-[#596A61] font-light leading-relaxed">
              Unlike mass commercial imports that are subjected to harsh chemical fumigation or glucose glazing,
              every TAMANUS harvest batch is sorted in clean cold-chain rooms, retaining its natural bloom and untouched nutrient density.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
