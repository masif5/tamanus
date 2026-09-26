import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/tamanusData';
import { useCart } from '../context/CartContext';
import { EditorialImage } from './EditorialImage';
import { Eye, Plus, Check } from 'lucide-react';

interface ProductCollectionProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onSelectProduct }) => {
  const { addItem } = useCart();
  const [filter, setFilter] = useState<'all' | 'madinah' | 'al-qassim' | 'bestsellers' | 'new'>('all');
  const [selectedPackSizes, setSelectedPackSizes] = useState<Record<string, '500g' | '1kg'>>({});
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === 'madinah') return p.origin.toLowerCase().includes('madinah');
    if (filter === 'al-qassim') return p.origin.toLowerCase().includes('qassim') || p.origin.toLowerCase().includes('riyadh');
    if (filter === 'bestsellers') return p.bestSeller;
    if (filter === 'new') return p.newArrival;
    return true;
  });

  const getPackSize = (productId: string) => selectedPackSizes[productId] || '500g';

  const setPackSize = (productId: string, size: '500g' | '1kg') => {
    setSelectedPackSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = getPackSize(product.id);
    addItem(product, size, 1);
    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  return (
    <section id="collection" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#E8E3D7]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold">
            <span>The 2026 Reserve</span>
            <span>·</span>
            <span>Hand-Graded Harvest</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#0D281E] leading-tight">
            The Royal Harvest Collection
          </h2>
          <p className="text-base text-[#596A61] max-w-xl font-light">
            Nine singular cultivars, each celebrated for its distinct texture, sweetness spectrum, and geographic microclimate.
          </p>
        </div>

        {/* Functional Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EFE8DA] rounded-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#154230] text-white shadow-sm'
                : 'text-[#596A61] hover:text-[#0D281E]'
            }`}
          >
            All 9 Cultivars
          </button>
          <button
            onClick={() => setFilter('madinah')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === 'madinah'
                ? 'bg-[#154230] text-white shadow-sm'
                : 'text-[#596A61] hover:text-[#0D281E]'
            }`}
          >
            Madinah Sacred Groves
          </button>
          <button
            onClick={() => setFilter('bestsellers')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === 'bestsellers'
                ? 'bg-[#154230] text-white shadow-sm'
                : 'text-[#596A61] hover:text-[#0D281E]'
            }`}
          >
            Gifting Favorites
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === 'new'
                ? 'bg-[#154230] text-white shadow-sm'
                : 'text-[#596A61] hover:text-[#0D281E]'
            }`}
          >
            New Arrivals
          </button>
        </div>
      </div>

      {/* 9 Cultivars Editorial Grid with GSAP Parallax & Curtain Load */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {filteredProducts.map((product) => {
          const currentSize = getPackSize(product.id);
          const price = currentSize === '500g' ? product.price500g : product.price1kg;

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-[#FAF8F5] border border-[#E8E3D7] hover:border-[#154230] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Product Visual Container with GSAP Parallax and Curtain reveal */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0D281E]">
                <EditorialImage
                  src={product.image}
                  alt={product.name}
                  aspectRatio="h-full w-full"
                  parallaxSpeed={8}
                  overlayText={
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D281E]/70 via-transparent to-transparent pointer-events-none" />

                      {/* Calligraphic Accent & Tags */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-2">
                          {product.bestSeller && (
                            <span className="text-[10px] uppercase tracking-widest bg-[#154230] text-white px-2 py-0.5 font-medium shadow-sm">
                              Best Seller
                            </span>
                          )}
                          {product.newArrival && (
                            <span className="text-[10px] uppercase tracking-widest bg-[#C6A052] text-[#0D281E] px-2 py-0.5 font-bold shadow-sm">
                              New Harvest
                            </span>
                          )}
                        </div>
                        <span className="font-arabic text-xl font-bold text-white drop-shadow-md">
                          {product.arabicName}
                        </span>
                      </div>

                      {/* Bottom Quick Look prompt */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#E8DFC8] font-light">
                        <span className="font-mono text-[11px] uppercase tracking-wider">{product.origin}</span>
                        <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </span>
                      </div>
                    </>
                  }
                />
              </div>

              {/* Product Content Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-serif text-[#0D281E] font-medium group-hover:text-[#154230] transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xs font-arabic text-[#86968E] font-medium">
                      {product.urduName}
                    </span>
                  </div>

                  <p className="text-xs text-[#596A61] leading-relaxed line-clamp-2 font-light">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Sensory Metadata (Clean Unboxed Text with Separators) */}
                <div className="py-3 border-y border-[#EFE8DA] text-xs text-[#596A61] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#86968E] uppercase tracking-wider">Taste:</span>
                    <span className="font-medium text-[#0D281E] text-right truncate max-w-[200px]">
                      {product.tasteProfile}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#86968E] uppercase tracking-wider">Texture:</span>
                    <span className="font-medium text-[#0D281E] text-right truncate max-w-[200px]">
                      {product.texture}
                    </span>
                  </div>
                </div>

                {/* Pack Size Switcher & Price & Reserve Action */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#E8E3D7] p-0.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPackSize(product.id, '500g');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                          currentSize === '500g'
                            ? 'bg-[#154230] text-white font-bold'
                            : 'text-[#596A61] hover:text-[#0D281E]'
                        }`}
                      >
                        500g
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPackSize(product.id, '1kg');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                          currentSize === '1kg'
                            ? 'bg-[#154230] text-white font-bold'
                            : 'text-[#596A61] hover:text-[#0D281E]'
                        }`}
                      >
                        1kg
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-[#0D281E]">
                        PKR {price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full py-3 bg-[#0D281E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#154230] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {addedAnimation === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C6A052]" />
                        <span>Added to Reserve</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Gifting Reserve</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
