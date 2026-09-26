import React from 'react';
import { TESTIMONIALS } from '../data/tamanusData';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[#E8E3D7] space-y-16">
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
          Client Endorsements
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#0D281E] leading-tight">
          Words from Discerning Patrons
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#FAF8F5] border border-[#E8E3D7] p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex gap-1 text-[#C6A052]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C6A052]" />
                ))}
              </div>
              <p className="font-serif text-lg text-[#0D281E] font-light italic leading-relaxed">
                “{t.quote}”
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFE8DA] flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-[#0D281E] block">{t.name}</span>
                <span className="text-[#86968E]">{t.location}</span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#154230] bg-[#EFE8DA] px-2 py-0.5">
                {t.occasion}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
