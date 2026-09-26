import React, { useState } from 'react';
import { Product } from '../data/tamanusData';
import { useCart } from '../context/CartContext';
import { X, Check, ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Coffee } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSommelier: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenSommelier,
}) => {
  if (!product) return null;

  const { addItem } = useCart();
  const [packSize, setPackSize] = useState<'500g' | '1kg'>('500g');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = packSize === '500g' ? product.price500g : product.price1kg;

  const handleAdd = () => {
    addItem(product, packSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam u Alaikum TAMANUS Concierge, I am inquiring about ${quantity}x ${product.name} (${packSize}) - Total PKR ${(price * quantity).toLocaleString()}. Could you please guide me on delivery?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D281E]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#FAF8F5] border border-[#E8E3D7] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#FAF8F5]/80 backdrop-blur-sm border border-[#E8E3D7] flex items-center justify-center text-[#0D281E] hover:bg-[#154230] hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Asset & Terroir Badge */}
        <div className="md:w-1/2 relative bg-[#E8E3D7] min-h-[340px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D281E]/80 via-transparent to-transparent pointer-events-none" />

          {/* Top Arabic Wordmark */}
          <div className="absolute top-6 left-6 text-white space-y-1">
            <span className="font-arabic text-3xl font-bold block drop-shadow-md text-[#E8DFC8]">
              {product.arabicName}
            </span>
            <span className="font-mono text-xs text-white/80 tracking-widest uppercase">
              {product.origin}
            </span>
          </div>

          {/* Bottom Sensory Radar Snippet */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0D281E]/60 backdrop-blur-sm p-3 border border-white/10">
              <div>
                <span className="text-[#86968E] block text-[10px] uppercase tracking-wider">Sweetness</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={`h-1.5 flex-1 ${
                        level <= product.sweetnessLevel ? 'bg-[#C6A052]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[#86968E] block text-[10px] uppercase tracking-wider">Firmness</span>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={`h-1.5 flex-1 ${
                        level <= product.firmnessLevel ? 'bg-[#154230]' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Culinary & Purchasing Details */}
        <div className="md:w-1/2 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A052] font-semibold mb-1">
                <span>Single-Estate Harvest</span>
                <span>·</span>
                <span>Tamar Stage</span>
              </div>
              <h2 className="text-3xl font-serif text-[#0D281E] leading-tight">
                {product.name}
              </h2>
              <span className="text-sm font-arabic text-[#86968E]">
                {product.urduName} · {product.arabicName}
              </span>
            </div>

            <p className="text-sm text-[#596A61] font-light leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Sensory Matrix */}
            <div className="space-y-2 py-4 border-y border-[#E8E3D7] text-xs">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#86968E] uppercase tracking-wider shrink-0">Taste Profile:</span>
                <span className="font-medium text-[#0D281E] text-right">{product.tasteProfile}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#86968E] uppercase tracking-wider shrink-0">Texture:</span>
                <span className="font-medium text-[#0D281E] text-right">{product.texture}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#86968E] uppercase tracking-wider shrink-0">Storage:</span>
                <span className="font-light text-[#596A61] text-right">{product.storageAdvice}</span>
              </div>
            </div>

            {/* Sommelier Culinary Pairings */}
            <div className="bg-[#EFE8DA] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#154230] font-medium">
                <Coffee className="w-3.5 h-3.5 text-[#C6A052]" />
                <span>Recommended Pairings</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-[#0D281E]">
                {product.pairings.map((p, idx) => (
                  <span key={idx} className="bg-[#FAF8F5] px-2.5 py-1 border border-[#E8E3D7]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Reservation Block */}
          <div className="space-y-4 pt-4 border-t border-[#E8E3D7]">
            <div className="flex items-center justify-between">
              {/* Pack Size Selector */}
              <div className="flex items-center border border-[#E8E3D7] p-1 bg-[#FAF8F5]">
                <button
                  onClick={() => setPackSize('500g')}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-colors ${
                    packSize === '500g'
                      ? 'bg-[#154230] text-white font-bold'
                      : 'text-[#596A61] hover:text-[#0D281E]'
                  }`}
                >
                  500g Pouch
                </button>
                <button
                  onClick={() => setPackSize('1kg')}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-colors ${
                    packSize === '1kg'
                      ? 'bg-[#154230] text-white font-bold'
                      : 'text-[#596A61] hover:text-[#0D281E]'
                  }`}
                >
                  1kg Luxury Box
                </button>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-[#E8E3D7] bg-[#FAF8F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-xs text-[#596A61] hover:bg-[#EFE8DA]"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono font-bold text-[#0D281E]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs text-[#596A61] hover:bg-[#EFE8DA]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-[#86968E]">Total Value</span>
              <span className="font-mono text-xl font-bold text-[#0D281E]">
                PKR {(price * quantity).toLocaleString()}
              </span>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className="py-3 bg-[#154230] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#0D281E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#C6A052]" />
                    <span>Added to Reserve</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reserve Box</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/923000000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-[#EFE8DA] text-[#154230] border border-[#D8BA7E]/50 text-xs uppercase tracking-widest font-medium hover:bg-[#E5DCC9] transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>WhatsApp Order</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenSommelier();
              }}
              className="w-full text-center text-[11px] text-[#596A61] hover:text-[#154230] flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
              <span>Ask Sommelier AI how to pair or gift this date</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
