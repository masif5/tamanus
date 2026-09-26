import React from 'react';
import { CMS } from '../data/tamanusData';
import { ArrowUpRight, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSommelier: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSommelier }) => {
  return (
    <footer className="bg-[#0A1F16] text-[#FAF8F5] border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Top Split: Wordmark & Newsletter / Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif tracking-[0.2em] text-[#FAF8F5] uppercase">
              TAMANUS
            </h2>
            <span className="font-arabic text-xl text-[#C6A052] block">
              تَمَنّس — التمور الملكية والخيرات الطبيعية
            </span>
            <p className="text-sm text-[#E8DFC8]/75 font-light max-w-sm leading-relaxed">
              An epicurean house honoring single-origin date cultivars from the volcanic soils of Madinah
              and the subterranean aquifers of Al-Qassim.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenSommelier}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A052] hover:text-white transition-colors"
              >
                <span>Consult Sommelier AI</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            {/* Column 1: Explore */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A052] font-semibold block">
                The Collections
              </span>
              <ul className="space-y-2.5 text-[#E8DFC8]/80 font-light">
                <li>
                  <button onClick={() => onNavigate('collection')} className="hover:text-white transition-colors">
                    The 9 Royal Cultivars
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('matrix')} className="hover:text-white transition-colors">
                    Sensory Taste Matrix
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gifting')} className="hover:text-white transition-colors">
                    Bespoke Gifting Chests
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('knowledge')} className="hover:text-white transition-colors">
                    Knowledge Centre & Guides
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                    FAQs & Transparency
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Natural Food Roadmap */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A052] font-semibold block">
                Future Releases
              </span>
              <ul className="space-y-2.5 text-[#86968E] font-light">
                <li>Raw Mountain Sidr Honey</li>
                <li>Organic Persian Nuts</li>
                <li>Sun-cured White Figs</li>
                <li>Ramadan Gold Hampers</li>
                <li>Artisanal Tahini Sets</li>
              </ul>
            </div>

            {/* Column 3: Direct Concierge */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A052] font-semibold block">
                Concierge & Orders
              </span>
              <div className="space-y-2.5 text-[#E8DFC8]/80 font-light">
                <a
                  href={`mailto:${CMS.contact.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6A052]" />
                  <span>{CMS.contact.email}</span>
                </a>
                <a
                  href={`https://wa.me/923000000000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A052]" />
                  <span>WhatsApp: {CMS.contact.whatsapp}</span>
                </a>
                <div className="flex items-start gap-2 text-[11px] text-[#86968E] pt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A052] shrink-0 mt-0.5" />
                  <span>Pakistan & GCC Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#86968E]">
          <p>© {new Date().getFullYear()} TAMANUS.COM. All rights reserved. Sourced with honor in Arabia.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/tamanusofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/tamanus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
