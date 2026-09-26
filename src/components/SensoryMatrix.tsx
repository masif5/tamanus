import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/tamanusData';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface SensoryMatrixProps {
  onSelectProduct: (product: Product) => void;
}

export const SensoryMatrix: React.FC<SensoryMatrixProps> = ({ onSelectProduct }) => {
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]); // Ajwa by default
  const [quizPreference, setQuizPreference] = useState<'sweet-soft' | 'caramel-plump' | 'mild-firm' | null>(null);

  const handleQuiz = (pref: 'sweet-soft' | 'caramel-plump' | 'mild-firm') => {
    setQuizPreference(pref);
    if (pref === 'sweet-soft') {
      const p = PRODUCTS.find((x) => x.id === 'sukri') || PRODUCTS[0];
      setActiveProduct(p);
    } else if (pref === 'caramel-plump') {
      const p = PRODUCTS.find((x) => x.id === 'medjhool') || PRODUCTS[0];
      setActiveProduct(p);
    } else {
      const p = PRODUCTS.find((x) => x.id === 'mabroom') || PRODUCTS[0];
      setActiveProduct(p);
    }
  };

  return (
    <section id="matrix" className="py-24 bg-[#0D281E] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.22em] text-[#C6A052] font-semibold block">
              The Sensory Matrix
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
              Calibrated by Sweetness & Texture
            </h2>
            <p className="text-sm text-[#E8DFC8]/75 max-w-xl font-light">
              Every palate is unique. Explore where each Saudi cultivar sits along the spectrum from gentle
              earthy restraint to intense crystalline honey, and from velvet tenderness to structured chew.
            </p>
          </div>

          {/* Quick Palate Finder Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleQuiz('sweet-soft')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                quizPreference === 'sweet-soft'
                  ? 'bg-[#C6A052] text-[#0D281E] border-[#C6A052] font-bold'
                  : 'bg-white/5 border-white/20 text-[#E8DFC8] hover:bg-white/10'
              }`}
            >
              Melting & Honeyed
            </button>
            <button
              onClick={() => handleQuiz('caramel-plump')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                quizPreference === 'caramel-plump'
                  ? 'bg-[#C6A052] text-[#0D281E] border-[#C6A052] font-bold'
                  : 'bg-white/5 border-white/20 text-[#E8DFC8] hover:bg-white/10'
              }`}
            >
              Royal Plush Caramel
            </button>
            <button
              onClick={() => handleQuiz('mild-firm')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                quizPreference === 'mild-firm'
                  ? 'bg-[#C6A052] text-[#0D281E] border-[#C6A052] font-bold'
                  : 'bg-white/5 border-white/20 text-[#E8DFC8] hover:bg-white/10'
              }`}
            >
              Firm & Understated
            </button>
          </div>
        </div>

        {/* Matrix Visualization & Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Scatter Grid */}
          <div className="lg:col-span-7 bg-[#154230]/40 border border-white/15 p-6 sm:p-10 relative aspect-[4/3] flex flex-col justify-between">
            {/* Axis Y Label */}
            <div className="absolute top-4 left-6 text-[10px] uppercase tracking-widest text-[#C6A052]">
              ▲ Firm & Structured Chew
            </div>
            <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-widest text-[#86968E]">
              ▼ Melting & Velvet Soft
            </div>

            {/* Axis X Label */}
            <div className="absolute bottom-4 right-6 text-[10px] uppercase tracking-widest text-[#C6A052]">
              Intense Sweetness ►
            </div>
            <div className="absolute top-4 right-6 text-[10px] uppercase tracking-widest text-[#86968E]">
              ◄ Mild Earthy Restraint
            </div>

            {/* Grid Crosshairs */}
            <div className="absolute inset-x-8 top-1/2 h-[1px] bg-white/10 -translate-y-1/2" />
            <div className="absolute inset-y-8 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />

            {/* Scatter Points for each cultivar */}
            <div className="relative w-full h-full my-auto">
              {PRODUCTS.map((p) => {
                // Map sweetness (1-5) to X (10% to 90%)
                const left = `${15 + (p.sweetnessLevel - 1) * 18}%`;
                // Map firmness (1-5) to Y (inverted: 1 is soft bottom, 5 is firm top)
                const bottom = `${15 + (p.firmnessLevel - 1) * 18}%`;
                const isSelected = activeProduct.id === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(p)}
                    style={{ left, bottom }}
                    className={`absolute -translate-x-1/2 translate-y-1/2 group transition-all duration-300 z-10 cursor-pointer focus:outline-none`}
                    title={`${p.name} - Sweetness: ${p.sweetnessLevel}/5, Firmness: ${p.firmnessLevel}/5`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#C6A052] text-[#0D281E] border-white scale-125 shadow-lg'
                          : 'bg-[#0D281E] text-white border-white/30 hover:border-[#C6A052] hover:scale-110'
                      }`}
                    >
                      <span className="font-serif text-xs font-semibold">{p.name.slice(0, 2)}</span>
                    </div>

                    {/* Hover Tooltip Label */}
                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap bg-[#0D281E] border border-white/20 text-[#E8DFC8] ${
                        isSelected ? 'opacity-100 font-bold text-[#C6A052]' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Cultivar Radar & Sommelier Card */}
          <div className="lg:col-span-5 bg-[#154230] border border-white/20 p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A052] block font-mono">
                  Selected Profile
                </span>
                <h3 className="text-3xl font-serif text-white font-medium">
                  {activeProduct.name}
                </h3>
              </div>
              <span className="font-arabic text-2xl text-[#E8DFC8]">
                {activeProduct.arabicName}
              </span>
            </div>

            <p className="text-sm text-[#E8DFC8]/90 font-light leading-relaxed">
              {activeProduct.shortDescription}
            </p>

            {/* Flavor & Texture Indicators */}
            <div className="space-y-4 py-3 text-xs">
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Sweetness Level</span>
                  <span className="font-mono text-[#C6A052]">{activeProduct.sweetnessLevel} / 5</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 overflow-hidden">
                  <div
                    className="bg-[#C6A052] h-full transition-all duration-500"
                    style={{ width: `${(activeProduct.sweetnessLevel / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Firmness & Chew</span>
                  <span className="font-mono text-[#E8DFC8]">{activeProduct.firmnessLevel} / 5</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 overflow-hidden">
                  <div
                    className="bg-white/80 h-full transition-all duration-500"
                    style={{ width: `${(activeProduct.firmnessLevel / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Serving & Pairing Note */}
            <div className="bg-[#0D281E]/60 p-4 border border-white/10 space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#C6A052] block">
                Sommelier Serving Note
              </span>
              <p className="text-[#E8DFC8] font-light leading-relaxed">
                Best served with {activeProduct.pairings.join(', ')}. {activeProduct.tasteProfile}.
              </p>
            </div>

            <button
              onClick={() => onSelectProduct(activeProduct)}
              className="w-full py-3.5 bg-[#FAF8F5] text-[#0D281E] text-xs uppercase tracking-widest font-semibold hover:bg-[#C6A052] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inspect {activeProduct.name} Cultivar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
