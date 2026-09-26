import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenSommelier: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSommelier, onNavigate }) => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Royal Harvest', id: 'collection' },
    { label: 'Terroir & Oasis', id: 'terroir' },
    { label: 'Tasting Matrix', id: 'matrix' },
    { label: 'Knowledge Centre', id: 'knowledge' },
    { label: 'The Art of Gifting', id: 'gifting' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-40 w-full bg-[#071610]/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-2xl md:text-3xl font-serif tracking-[0.28em] text-[#FAF8F5] hover:text-[#C6A052] transition-colors text-left uppercase cursor-pointer"
        >
          TAMANUS
        </button>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium text-[#E8DFC8]/75">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-white transition-colors py-1 relative group cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A052] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSommelier}
            className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-[#E8DFC8] bg-white/5 hover:bg-white/10 border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            title="Consult Date Sommelier with AI & Search"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
            <span className="hidden sm:inline">Sommelier AI</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#071610] bg-[#C6A052] hover:bg-white transition-all cursor-pointer whitespace-nowrap relative shadow-lg"
            aria-label="View Gifting Reserve"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reserve</span>
            <span className="font-mono text-[11px] bg-[#071610] text-[#C6A052] font-bold px-1.5 py-0.2 ml-1">
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C6A052] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E3D7] px-6 py-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#86968E]">Navigation</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="block w-full text-left text-lg font-serif text-[#0D281E] hover:text-[#154230] py-2 border-b border-[#EFE8DA]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E3D7] flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenSommelier();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#EFE8DA] text-[#154230] text-xs uppercase tracking-widest font-medium"
            >
              <Sparkles className="w-4 h-4 text-[#C6A052]" />
              <span>Consult Date Sommelier (AI)</span>
            </button>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#154230] text-white text-xs uppercase tracking-widest font-medium"
            >
              <span>WhatsApp Direct Concierge</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
