import React from 'react';
import { IMAGES } from '../data/tamanusData';
import { EditorialImage } from './EditorialImage';
import { Sparkles } from 'lucide-react';

interface PairingRitualProps {
  onOpenSommelier: () => void;
}

export const PairingRitual: React.FC<PairingRitualProps> = ({ onOpenSommelier }) => {
  const pairings = [
    {
      cultivar: 'Madinah Ajwa',
      beverage: 'Arabian Cardamom Qahwa',
      accompaniment: 'Blanched Raw Almonds',
      note: 'The gentle earthy prune depth of Ajwa cuts the fragrant citrus-spice of roasted green coffee beans.',
    },
    {
      cultivar: 'Royal Medjhool',
      beverage: 'Double Ristretto or Espresso',
      accompaniment: 'Aged Stilton or Blue Cheese',
      note: 'Monolithic toffee sweetness creates an astonishing umami balance against salty, pungent aged cheeses.',
    },
    {
      cultivar: 'Al-Qassim Sukri',
      beverage: 'Unsweetened Mountain Mint Tea',
      accompaniment: 'Pure Sesame Tahini & Qashta',
      note: 'The pure crystalline honey of Sukri softens the nutty bitterness of crushed raw sesame paste.',
    },
    {
      cultivar: 'Madinah Mabroom',
      beverage: 'Chai Karak with Cloves',
      accompaniment: 'Roasted Hazelnuts & Dried Figs',
      note: 'A firm, toasted malt profile designed for slow contemplation and warm spiced tea.',
    },
  ];

  return (
    <section className="py-28 bg-[#0D281E] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
              Culinary Pairings
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
              The Sommelier Pairing Ritual
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#E8DFC8]/80 font-light leading-relaxed">
              Dates possess complex flavor volatile compounds akin to fine single-origin cacao or wine.
              Discover how our sommelier balances sweetness, acidity, and mouthfeel with traditional desert brews.
            </p>
          </div>
        </div>

        {/* Visual & Pairings Split with GSAP Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative shadow-2xl overflow-hidden">
            <EditorialImage
              src={IMAGES.sommelier}
              alt="Sophisticated culinary pairing scene of dates beside Arabic qahwa in brass finjan and roasted almonds"
              aspectRatio="aspect-[4/3]"
              parallaxSpeed={12}
              overlayText={
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D281E]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                    <span className="text-[#C6A052] font-mono uppercase tracking-widest block text-[10px] mb-1">
                      Ritual N° 04
                    </span>
                    <p className="font-serif text-lg text-[#E8DFC8] italic">
                      “Qahwa poured from a brass Dallah awakens the natural esters of tree-ripened dates.”
                    </p>
                  </div>
                </>
              }
            />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pairings.map((pair, idx) => (
              <div
                key={idx}
                className="bg-[#154230]/40 border border-white/10 p-6 space-y-3 flex flex-col justify-between hover:border-[#C6A052]/50 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-mono">
                    {pair.cultivar}
                  </span>
                  <h4 className="text-lg font-serif text-white">{pair.beverage}</h4>
                  <span className="text-xs text-[#E8DFC8]/70 block">
                    with {pair.accompaniment}
                  </span>
                </div>
                <p className="text-xs text-white/80 font-light leading-relaxed pt-2 border-t border-white/10">
                  {pair.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sommelier Prompt Banner */}
        <div className="bg-[#154230] border border-white/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-serif text-white">Seeking a Custom Pairing for Your Dinner Course?</h4>
            <p className="text-xs text-[#E8DFC8]/80 font-light">
              Our AI Sommelier is trained on authentic Middle Eastern hospitality and gourmet flavor profiles.
            </p>
          </div>
          <button
            onClick={onOpenSommelier}
            className="px-6 py-3.5 bg-[#C6A052] text-[#0D281E] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult Sommelier AI</span>
          </button>
        </div>
      </div>
    </section>
  );
};
