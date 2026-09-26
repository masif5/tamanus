import React, { useState } from 'react';
import { IMAGES } from '../data/tamanusData';
import { EditorialImage } from './EditorialImage';
import { ArrowRight, Check, Send, PhoneCall } from 'lucide-react';

export const GiftingSection: React.FC = () => {
  const [recipientType, setRecipientType] = useState<'corporate' | 'family' | 'wedding'>('corporate');
  const [guestCount, setGuestCount] = useState('25-50');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientContact) return;
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  const giftTiers = [
    {
      name: 'The Royal Madinah Duo',
      subtitle: 'Ajwa & Amber Presentation Box',
      description: 'A bespoke deep-emerald rigid box housing 500g of Madinah Ajwa alongside 500g of Amber dates. Finished with hand-tied satin ribbon.',
      price: 'PKR 9,500',
      tag: 'Most Cherished',
    },
    {
      name: 'The Sovereign Nine Chest',
      subtitle: 'Complete 9-Cultivar Tasting Vault',
      description: 'An architectural wooden or heavyweight rigid chest containing all 9 single-origin cultivars, tasting guide cards, and custom foiled seal.',
      price: 'PKR 28,000',
      tag: 'Executive Reserve',
    },
    {
      name: 'The Festive Hospitality Tray',
      subtitle: 'Seedless Sugai & Plump Medjhool',
      description: 'Designed for effortless reception and wedding hospitality. Seedless dates arranged with roasted raw nuts and personalized calligraphy note.',
      price: 'PKR 14,500',
      tag: 'Hospitality Favorite',
    },
  ];

  return (
    <section id="gifting" className="py-28 bg-[#F4EFE6] border-t border-[#E8E3D7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E3D7] pb-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
              Chapter III · The Art of Gifting
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#0D281E] leading-tight">
              Honoring centuries of Arabian hospitality.
            </h2>
            <p className="text-sm sm:text-base text-[#596A61] max-w-xl font-light">
              From diplomatic tokens of esteem to intimate family celebrations and corporate Ramadan hampers,
              TAMANUS presentation boxes transform dates into an enduring symbol of reverence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923000000000?text=Assalam%20u%20Alaikum%20TAMANUS%20Concierge,%20I%20would%20like%20to%20inquire%20about%20bespoke%20corporate%20or%20wedding%20gifting%20boxes."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#154230] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#0D281E] transition-colors flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Gifting Concierge</span>
            </a>
          </div>
        </div>

        {/* Feature Visual + 3 Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Luxury Gifting Box Photography with GSAP Parallax */}
          <div className="lg:col-span-5 relative shadow-2xl overflow-hidden min-h-[440px]">
            <EditorialImage
              src={IMAGES.giftingBox}
              alt="Bespoke luxury gift box open on travertine surface showing glistening dates"
              aspectRatio="h-full min-h-[440px]"
              parallaxSpeed={12}
              overlayText={
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071610]/95 via-[#071610]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#C6A052] font-mono">
                      Packaging Craftsmanship
                    </span>
                    <h3 className="text-2xl font-serif text-[#FAF8F5]">
                      Custom Hot-Foiled Typography & Linen Liners
                    </h3>
                    <p className="text-xs text-[#E8DFC8]/80 font-light">
                      Tailored for corporations, wedding favors, and international delegates across Pakistan and the GCC.
                    </p>
                  </div>
                </>
              }
            />
          </div>

          {/* Right: The 3 Curated Boxes */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {giftTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E8E3D7] hover:border-[#154230] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all shadow-sm hover:shadow-md"
              >
                <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase bg-[#154230] text-white px-2 py-0.5">
                      {tier.tag}
                    </span>
                    <span className="text-xs font-mono text-[#86968E]">{tier.subtitle}</span>
                  </div>
                  <h4 className="text-2xl font-serif text-[#0D281E]">{tier.name}</h4>
                  <p className="text-xs text-[#596A61] font-light leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 space-y-2">
                  <span className="font-mono text-lg font-bold text-[#0D281E] block">
                    {tier.price}
                  </span>
                  <a
                    href={`https://wa.me/923000000000?text=Assalam%20u%20Alaikum%20TAMANUS,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(
                      tier.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#154230] hover:text-[#C6A052] font-semibold"
                  >
                    <span>Inquire Set</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge Customization Request Form */}
        <div className="bg-[#FAF8F5] border border-[#E8E3D7] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A052] font-semibold block">
                Bespoke Orders
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#0D281E]">
                Request a Custom Corporate or Event Gifting Proposal
              </h3>
              <p className="text-xs sm:text-sm text-[#596A61] font-light">
                Our gifting curator will provide tailored mockups with your family insignia or corporate branding within 24 hours.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-[#EFE8DA] border border-[#D8BA7E] text-[#154230] flex items-center gap-3">
                <Check className="w-5 h-5 text-[#C6A052]" />
                <span className="text-xs font-medium">
                  Thank you. Your bespoke inquiry has been received. Our gifting director will reach out via WhatsApp / Email shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / Company Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-4 py-3 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp Number or Email"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="px-4 py-3 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={recipientType}
                    onChange={(e: any) => setRecipientType(e.target.value)}
                    className="px-4 py-3 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  >
                    <option value="corporate">Executive Corporate Hampers</option>
                    <option value="wedding">Wedding Hospitality Trays</option>
                    <option value="family">Private Ramadan & Eid Gifting</option>
                  </select>

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="px-4 py-3 bg-white border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230]"
                  >
                    <option value="10-25">Quantity: 10 - 25 Boxes</option>
                    <option value="25-50">Quantity: 25 - 50 Boxes</option>
                    <option value="50-100">Quantity: 50 - 100 Boxes</option>
                    <option value="100+">Quantity: 100+ Custom Chests</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#0D281E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#154230] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Bespoke Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
