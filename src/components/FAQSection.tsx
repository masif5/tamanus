import React, { useState } from 'react';
import { FAQS } from '../data/tamanusData';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#F4EFE6] border-t border-[#E8E3D7]">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
            Clarity & Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0D281E]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#596A61] font-light">
            Answers regarding our sourcing standards, packaging integrity, and direct gifting logistics.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E8E3D7] transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#0D281E]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#154230] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#596A61] font-light leading-relaxed border-t border-[#EFE8DA]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
