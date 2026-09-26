import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ArrowUpRight, Gift, ShieldCheck, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    totalCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [calligraphyNote, setCalligraphyNote] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Karachi');

  if (!isCartOpen) return null;

  const giftBoxFee = includeGiftBox ? 1500 : 0;
  const grandTotal = totalAmount + giftBoxFee;

  const buildWhatsappMessage = () => {
    let text = `Assalam u Alaikum TAMANUS Concierge,\n\nI would like to place an order from my reserve:\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} (${item.packSize}) x ${item.quantity} = PKR ${(
        item.price * item.quantity
      ).toLocaleString()}\n`;
    });
    if (includeGiftBox) {
      text += `+ Bespoke Luxury Rigid Gift Box (+PKR 1,500)\n`;
    }
    if (calligraphyNote.trim()) {
      text += `+ Calligraphy Message: "${calligraphyNote.trim()}"\n`;
    }
    text += `\nDelivery City: ${deliveryCity}\nGrand Total: PKR ${grandTotal.toLocaleString()}\n\nPlease confirm availability and payment instructions.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0D281E]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#FAF8F5] border-l border-[#E8E3D7] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#0D281E] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <h3 className="font-serif text-xl tracking-wide flex items-center gap-2">
              <span>Your Gifting Reserve</span>
              <span className="font-mono text-xs bg-[#C6A052] text-[#0D281E] font-bold px-2 py-0.5">
                {totalCount} {totalCount === 1 ? 'Pack' : 'Packs'}
              </span>
            </h3>
            <p className="text-xs text-[#E8DFC8]/75 font-light">
              Carefully packed in sealed barrier packaging
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#E8DFC8]/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Reserve"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#86968E]">
              <Gift className="w-12 h-12 stroke-[1] text-[#C6A052]" />
              <div className="space-y-1">
                <p className="font-serif text-lg text-[#0D281E]">Your Reserve is Empty</p>
                <p className="text-xs text-[#596A61] max-w-xs font-light">
                  Explore our nine royal date cultivars and curate your bespoke box.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.packSize}`}
                  className="bg-white border border-[#E8E3D7] p-4 flex gap-4 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover bg-[#E8E3D7] shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-serif text-base font-medium text-[#0D281E] truncate">
                        {item.product.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-[#0D281E]">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#596A61]">
                      <span className="font-mono uppercase bg-[#EFE8DA] px-1.5 py-0.2 text-[#154230]">
                        {item.packSize}
                      </span>
                      <span>PKR {item.price.toLocaleString()} each</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E8E3D7] bg-[#FAF8F5]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.packSize, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-xs text-[#596A61] hover:bg-[#EFE8DA]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold text-[#0D281E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.packSize, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-xs text-[#596A61] hover:bg-[#EFE8DA]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.packSize)}
                        className="text-xs text-[#86968E] hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bespoke Gifting Enhancements */}
              <div className="pt-4 border-t border-[#E8E3D7] space-y-3">
                <label className="flex items-start gap-3 p-3 bg-[#EFE8DA] border border-[#D8BA7E]/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    className="mt-0.5 text-[#154230] rounded-none focus:ring-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-[#0D281E] block">
                      Include Rigid Emerald Gift Chest (+PKR 1,500)
                    </span>
                    <span className="text-[#596A61] text-[11px] font-light">
                      Foil-embossed presentation chest with satin ribbon and individual compartments.
                    </span>
                  </div>
                </label>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#86968E] block">
                    Handwritten Calligraphy Card (Complimentary)
                  </span>
                  <input
                    type="text"
                    value={calligraphyNote}
                    onChange={(e) => setCalligraphyNote(e.target.value)}
                    placeholder="e.g., Wishing you a blessed Ramadan, from Tariq & family..."
                    className="w-full px-3 py-2 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#86968E] block">
                    Delivery Destination
                  </span>
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  >
                    <option value="Karachi">Karachi (Same Day / 24h Express)</option>
                    <option value="Lahore">Lahore (Next Day Express)</option>
                    <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi (Next Day)</option>
                    <option value="Other Pakistan Cities">Other Cities in Pakistan (48h)</option>
                    <option value="UAE / Saudi / GCC">UAE, Saudi Arabia & GCC (Express Air Cargo)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Calculation */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E3D7] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#596A61]">
                <span>Cultivars Subtotal</span>
                <span className="font-mono text-[#0D281E]">PKR {totalAmount.toLocaleString()}</span>
              </div>
              {includeGiftBox && (
                <div className="flex justify-between text-[#596A61]">
                  <span>Luxury Rigid Gift Chest</span>
                  <span className="font-mono text-[#0D281E]">PKR 1,500</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-[#0D281E] pt-2 border-t border-[#E8E3D7]">
                <span>Grand Total</span>
                <span className="font-mono text-lg text-[#154230]">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/923000000000?text=${buildWhatsappMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#154230] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#0D281E] transition-colors flex items-center justify-center gap-2"
              >
                <span>Dispatch Order via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-[#86968E] text-center">
                Secure ordering via our verified WhatsApp concierge. Payment via Bank Transfer or COD.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
