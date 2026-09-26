export interface Product {
  id: string;
  name: string;
  arabicName: string;
  urduName: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  tasteProfile: string;
  texture: string;
  origin: string;
  price500g: number;
  price1kg: number;
  packSize: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  sweetnessLevel: number; // 1 to 5
  firmnessLevel: number; // 1 to 5
  pairings: string[];
  storageAdvice: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  readingTime: string;
  date: string;
  excerpt: string;
  category: string;
  content: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  occasion: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// Generated high-fidelity asset paths
export const IMAGES = {
  hero: '/src/assets/images/hero_cinematic_masterpiece_1790429495813.jpg',
  heroStillLife: '/src/assets/images/hero_dates_editorial_1790428864701.jpg',
  oasis: '/src/assets/images/dates_terroir_oasis_1790428877655.jpg',
  giftingBox: '/src/assets/images/luxury_gifting_box_1790428894778.jpg',
  harvest: '/src/assets/images/date_harvest_artisan_1790428909021.jpg',
  sommelier: '/src/assets/images/sommelier_dates_pairing_1790428926062.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'ajwa',
    name: 'Ajwa',
    arabicName: 'عجوة',
    urduName: 'عجوہ',
    slug: 'ajwa',
    shortDescription: 'A cherished Madinah date with a dark finish, soft chew and refined cultural value.',
    fullDescription: 'Ajwa is the revered dark jewel of Madinah Al-Munawwarah. Grown exclusively in the sacred soils surrounding the city of the Prophet, this ancient cultivar is distinguished by its velvety black skin, delicate white creasing, and rich, earthy sweetness that never overwhelms the palate. Prized across centuries as an indispensable morning ritual.',
    tasteProfile: 'Mild sweetness with earthy depth and subtle prune notes',
    texture: 'Soft, dense and pleasantly chewy',
    origin: 'Madinah, Saudi Arabia',
    price500g: 4200,
    price1kg: 8000,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: true,
    newArrival: false,
    sweetnessLevel: 3,
    firmnessLevel: 3,
    pairings: ['Traditional Cardamom Qahwa', 'Blanched Raw Almonds', 'Goat Labneh'],
    storageAdvice: 'Keep in an airtight jar at cool room temperature. For extended preservation beyond 3 months, refrigerate at 4°C.',
    image: IMAGES.hero,
  },
  {
    id: 'medjhool',
    name: 'Medjhool',
    arabicName: 'مجهول',
    urduName: 'مجہول',
    slug: 'medjhool',
    shortDescription: 'A generous, indulgent date with a full bite and glossy premium look.',
    fullDescription: 'Crowned the King of Dates worldwide, TAMANUS Medjhool is hand-graded for monumental size, skin translucency, and plush moisture content. With flesh so soft it resembles artisanal butter toffee, each Medjhool is a monumental centerpiece for royal desert hospitality and grand festive moments.',
    tasteProfile: 'Rich caramel sweetness with a plush, honey-bourbon finish',
    texture: 'Large, plump, moist and meltingly tender',
    origin: 'Saudi Arabia',
    price500g: 4800,
    price1kg: 9200,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: true,
    newArrival: false,
    sweetnessLevel: 5,
    firmnessLevel: 2,
    pairings: ['Roasted Walnuts', 'Aged Stilton or Blue Cheese', 'Double Espresso'],
    storageAdvice: 'High-moisture cultivar. Keep chilled in a sealed container; bring to room temperature 15 minutes before serving.',
    image: IMAGES.giftingBox,
  },
  {
    id: 'sukri',
    name: 'Sukri',
    arabicName: 'سكري',
    urduName: 'سکری',
    slug: 'sukri',
    shortDescription: 'A popular sweet date with a soft bite and naturally rich flavour.',
    fullDescription: 'Sourced from the sun-drenched palm forests of Al-Qassim, Sukri translates simply as "The Sweet One." Its golden, conical silhouette conceals a luscious honey core that softens almost instantaneously on the tongue. It represents the quintessential welcoming confection of Arab hospitality.',
    tasteProfile: 'Intense honeyed sweetness with buttery brown sugar undertones',
    texture: 'Tender, delicate and velvet-soft',
    origin: 'Al-Qassim, Saudi Arabia',
    price500g: 2200,
    price1kg: 4200,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: true,
    newArrival: false,
    sweetnessLevel: 5,
    firmnessLevel: 1,
    pairings: ['Pure Sesame Tahini', 'Fresh Clotted Cream (Qashta)', 'Unsweetened Mint Tea'],
    storageAdvice: 'Best kept chilled to retain its signature honey consistency without crystallization.',
    image: IMAGES.sommelier,
  },
  {
    id: 'sugai',
    name: 'Sugai',
    arabicName: 'صقعي',
    urduName: 'سگئ',
    slug: 'sugai',
    shortDescription: 'A refined two-tone date with gentle caramel notes and gift-worthy appeal.',
    fullDescription: 'Recognized by its distinctive bi-color aesthetic, Sugai boasts a crisp, light-golden base crowned by a soft, amber-brown shoulder. This unique geological gift provides a dual-textural experience: an initial delicate crunch followed by a tender, mellow caramel bite that is remarkably balanced.',
    tasteProfile: 'Caramel sweetness with a balanced, mellow toasted finish',
    texture: 'Soft to semi-dry dual texture with a crisp tip',
    origin: 'Riyadh & Al-Qassim, Saudi Arabia',
    price500g: 2400,
    price1kg: 4600,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: true,
    newArrival: false,
    sweetnessLevel: 3,
    firmnessLevel: 4,
    pairings: ['Roasted Salted Pistachios', 'Cinnamon-infused Chai', 'Sharp Cheddar'],
    storageAdvice: 'Remarkably stable. Keeps wonderfully in a pantry environment out of direct sunlight.',
    image: IMAGES.oasis,
  },
  {
    id: 'amber',
    name: 'Amber',
    arabicName: 'عنبرة',
    urduName: 'عنبر',
    slug: 'amber',
    shortDescription: 'A large premium date known for generous size, smooth texture and graceful gifting value.',
    fullDescription: 'Among the rarest of the holy city harvests, Amber is celebrated for its imposing length and naturally lustrous mahogany coat. Less sweet than Medjhool, its substantial flesh delivers a calm, noble complexity that lingers gently on the palate.',
    tasteProfile: 'Gentle, refined sweetness with a smooth floral finish',
    texture: 'Large, soft, substantial and fleshy',
    origin: 'Madinah, Saudi Arabia',
    price500g: 4600,
    price1kg: 8800,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: false,
    newArrival: true,
    sweetnessLevel: 2,
    firmnessLevel: 3,
    pairings: ['Saffron Green Tea', 'Raw Macadamia Nuts', 'Dried Mountain Figs'],
    storageAdvice: 'Store in airtight containers below 20°C or refrigerated.',
    image: IMAGES.harvest,
  },
  {
    id: 'kalmi',
    name: 'Kalmi',
    arabicName: 'كلمي',
    urduName: 'کلمی',
    slug: 'kalmi',
    shortDescription: 'A dark, satisfying date with a rich taste profile and premium presentation.',
    fullDescription: 'Kalmi is a dark, elongated date featuring a rich, molasses-tinged character with subtle cacao notes. Its firmer outer envelope yields gracefully to a chewy, satisfying interior, making it a favorite for lovers of dark, complex dried fruits.',
    tasteProfile: 'Deep sweetness with dark cocoa and date-molasses notes',
    texture: 'Semi-soft, dark, dense and satisfying',
    origin: 'Saudi Arabia',
    price500g: 2600,
    price1kg: 5000,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: false,
    newArrival: false,
    sweetnessLevel: 4,
    firmnessLevel: 3,
    pairings: ['Dark Roasted Espresso', 'Roasted Pecans', 'Smoked Almonds'],
    storageAdvice: 'Room temperature storage in a dark pantry is optimal.',
    image: IMAGES.hero,
  },
  {
    id: 'rabeya',
    name: 'Rabeya',
    arabicName: 'ربيعة',
    urduName: 'ربيعہ',
    slug: 'rabeya',
    shortDescription: 'A smooth amber-brown date with approachable sweetness and everyday elegance.',
    fullDescription: 'Rabeya displays a warm, glowing amber skin that catches the light with glossy grace. Its rounded sweetness and medium-soft consistency make it the most versatile table date in the TAMANUS reserve.',
    tasteProfile: 'Rounded sweetness with warm amber and toasted honey notes',
    texture: 'Medium-soft and glossy with a gentle chew',
    origin: 'Saudi Arabia',
    price500g: 2800,
    price1kg: 5400,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: false,
    newArrival: true,
    sweetnessLevel: 3,
    firmnessLevel: 3,
    pairings: ['Earl Grey Black Tea', 'Lightly Salted Cashews', 'Fresh Ricotta'],
    storageAdvice: 'Keep in an airtight pouch or glass jar away from moisture.',
    image: IMAGES.sommelier,
  },
  {
    id: 'sugai-seedless',
    name: 'Sugai (seedless)',
    arabicName: 'صقعي بدون نوى',
    urduName: 'سگئ بغیر بیج',
    slug: 'sugai-seedless',
    shortDescription: 'The Sugai profile prepared seedless for easy serving, gifting and sharing.',
    fullDescription: 'All the beloved two-tone character and caramel chew of premium Sugai, individually prepared seedless with surgical care so the fruit retains its whole architecture. Designed specifically for effortless reception trays, corporate dessert courses, and customized nut stuffing.',
    tasteProfile: 'Caramel sweetness in an effortless ready-to-serve format',
    texture: 'Soft, neat, clean and seedless',
    origin: 'Saudi Arabia',
    price500g: 3000,
    price1kg: 5800,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: false,
    newArrival: true,
    sweetnessLevel: 3,
    firmnessLevel: 3,
    pairings: ['Stuffed with Marcona Almonds or Orange Peel', 'Turkish Coffee', 'Aperitif Trays'],
    storageAdvice: 'Store in airtight packaging to prevent inner surface dryness.',
    image: IMAGES.giftingBox,
  },
  {
    id: 'mabroom',
    name: 'Mabroom',
    arabicName: 'مبروم',
    urduName: 'مبروم',
    slug: 'mabroom',
    shortDescription: 'An elegant, elongated date with a firm bite and understated sweetness.',
    fullDescription: 'For those who appreciate subdued sweetness and a firm, aristocratic bite, Mabroom stands unmatched. Its slender, dark bronze cylinder yields gradually, releasing toasted caramel and dried fig nuances that reward slow, contemplative savoring.',
    tasteProfile: 'Subtle, understated sweetness with toasted malt notes',
    texture: 'Firm, slender and elegantly elongated',
    origin: 'Madinah, Saudi Arabia',
    price500g: 3800,
    price1kg: 7200,
    packSize: '500g / 1kg',
    featured: true,
    bestSeller: false,
    newArrival: false,
    sweetnessLevel: 2,
    firmnessLevel: 5,
    pairings: ['Chai Karak', 'Roasted Hazelnuts', 'Aged Manchego'],
    storageAdvice: 'Superior natural shelf life. Stores perfectly at ambient room temperature for many months.',
    image: IMAGES.harvest,
  },
];

export const PILLARS = [
  {
    id: 'brand-proposition',
    title: 'Curated Origin & Pure Terroir',
    subtitle: 'Brand proposition',
    body: 'TAMANUS combines uncompromised agricultural quality, single-estate traceability from Madinah and Al-Qassim oases, and transparent product education.',
    highlight: 'Madinah & Al-Qassim Provenance',
  },
  {
    id: 'gift-presentation',
    title: 'The Ritual of Refined Gifting',
    subtitle: 'Gift presentation',
    body: 'Bespoke rigid presentation boxes, embossed foil typography, linen ribbons, and hand-inscribed calligraphy cards for intimate celebrations and corporate delegations.',
    highlight: 'Bespoke Presentation Chests',
  },
  {
    id: 'quality-indicators',
    title: 'Clarity Without Hyperbole',
    subtitle: 'Product quality',
    body: 'Taste profiles, moisture grades, certified harvest dates, storage guidelines, and pairing rituals explained in precise, sourceable language without unfounded claims.',
    highlight: 'Transparent Sensory Indicators',
  },
];

export const BENEFITS = [
  {
    title: 'Single-Harvest Selection',
    body: 'Each variety is individually hand-inspected for skin adhesion, calibrated size, moisture retention, and unblemished presentation.',
  },
  {
    title: 'Gift-Ready Architecture',
    body: 'Engineered with double-walled luxury boxes and food-grade preservation liners for family feasts, weddings, and executive boardroom gifting.',
  },
  {
    title: 'Compliant & Balanced Education',
    body: 'Nutritional and culinary profiles formulated with verified facts, honoring traditions with modern scientific clarity.',
  },
];

export const ARTICLES: Article[] = [
  {
    slug: 'store-premium-dates',
    title: 'How to Store Premium Dates for Lasting Freshness',
    readingTime: '4 min read',
    date: 'Harvest Season 2026',
    category: 'Preservation & Ritual',
    excerpt: 'A practical TAMANUS guide for preserving moisture, preventing sugar bloom, and savoring dates at their aromatic peak.',
    content: [
      'Dates are living confections of nature. Because premium dates possess different moisture balances—from moist Rutab and tender Tamar to firmer cultivars—storage must be calibrated with intention.',
      'For high-moisture varieties such as Medjhool and fresh Sukri, we recommend cool storage at 4°C in an airtight glass container. This maintains their velvety caramel core and keeps the skin taut and supple.',
      'Firm varieties such as Mabroom, Sugai, and Kalmi can be safely kept at ambient room temperature (below 22°C) inside a dark, well-ventilated pantry away from spices and direct sunlight.',
      'Dates can also be frozen for up to two years without cellular rupture or loss of flavor. Because of their natural fruit sugars, they thaw within fifteen minutes at room temperature, tasting freshly plucked from the palm branch.',
    ],
  },
  {
    slug: 'date-texture-and-taste',
    title: 'Understanding Date Texture, Terroir & Tasting Notes',
    readingTime: '5 min read',
    date: 'Harvest Season 2026',
    category: 'Sommelier Guide',
    excerpt: 'From the earthy depth of Madinah Ajwa to the crystalline honey notes of Al-Qassim Sukri, explore the sensory spectrum of Arabia.',
    content: [
      'Just as fine tea or single-estate cacao reflects its microclimate and soil chemistry, dates from the Arabian peninsula express distinct regional signatures.',
      'Ajwa dates, cultivated in the volcanic volcanic basalts and mineral-rich aquifers of Madinah, offer an earthy, deep prune-like character with gentle restraint. They are never cloying, presenting a calm dignity on the palate.',
      'By contrast, Medjhool thrives under intense desert sunshine with deep alluvial water tables, developing thick, pillow-like folds of caramelized flesh that melt like rich butterscotch.',
      'Understanding the duality of Sugai—a firm, crisp pale crown atop a succulent amber body—allows connoisseurs to appreciate the stages of natural maturation right in a single fruit.',
    ],
  },
  {
    slug: 'choose-dates-for-gifting',
    title: 'The Art of Date Gifting: Etiquette, Occasions & Pairing',
    readingTime: '4 min read',
    date: 'Harvest Season 2026',
    category: 'Gifting Etiquette',
    excerpt: 'Selecting the perfect box for family milestones, corporate tokens of esteem, and Ramadan hospitality.',
    content: [
      'Offering dates to a guest is the oldest and most honorable gesture of hospitality across the Arabian desert. The selection of variety signals deep respect and understanding of the occasion.',
      'For solemn gratitude, elder respect, or sacred milestones, Ajwa and Amber carry deep historical and spiritual resonance, making them the most prestigious gifts.',
      'For celebratory banquets, Eid gatherings, and corporate festive hampers, the monumental proportions and golden allure of Medjhool and two-tone Sugai command immediate admiration.',
      'Pair your gift box with authentic fresh-roasted Arabic Qahwa infused with green cardamom and saffron, accompanied by TAMANUS hand-inscribed calligraphic greeting sleeves.',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ayesha K.',
    location: 'Karachi',
    quote: 'The selection feels thoughtful, exceptionally premium and ideal for family gifting. The Ajwa and Medjhool arrived in pristine condition.',
    rating: 5,
    occasion: 'Family Ramadan Gifting',
  },
  {
    name: 'Omar H.',
    location: 'Lahore',
    quote: 'The product education makes it effortless to choose the right variety. The taste and texture notes are completely accurate and transparent.',
    rating: 5,
    occasion: 'Executive Corporate Hampers',
  },
  {
    name: 'Dr. Tariq M.',
    location: 'Islamabad',
    quote: 'Unquestionably the finest dates available in Pakistan. The packaging is an artwork in itself, worthy of international luxury houses.',
    rating: 5,
    occasion: 'Diplomatic Hospitality',
  },
];

export const FAQS: FAQ[] = [
  {
    category: 'Product & Sourcing',
    question: 'What does TAMANUS sell first?',
    answer: 'TAMANUS begins with 9 royal date varieties sourced directly from Saudi Arabia (Madinah, Al-Qassim, and Riyadh). The platform is architected to expand into pure Sidr honey, organic dry fruits, raw nuts, and bespoke seasonal gifting boxes.',
  },
  {
    category: 'Transparency',
    question: 'Are the product benefits medical claims?',
    answer: 'No. TAMANUS uses careful, compliant wording such as "contains natural minerals," "may support daily vitality," and "forms part of a balanced diet," strictly avoiding unsupported medical guarantees.',
  },
  {
    category: 'Orders & Gifting',
    question: 'Can I order custom corporate gift boxes or bulk event sets?',
    answer: 'Yes. TAMANUS provides dedicated concierge service for corporate orders, weddings, and festive seasons. We offer custom foiled sleeves, personalized message cards, and bespoke assorted assortments. Contact our concierge via WhatsApp or our direct gifting form.',
  },
  {
    category: 'Freshness & Delivery',
    question: 'How do you guarantee freshness during transit?',
    answer: 'All dates are stored in climate-controlled facilities and packed in sealed barrier pouches with food-grade outer boxes to lock in pristine moisture and aroma. Deliveries across Pakistan arrive within 24–48 hours, with GCC shipments dispatched via express air freight.',
  },
];

export const CMS = {
  brandName: 'TAMANUS',
  tagline: 'Premium dates for everyday hospitality and refined gifting',
  contact: {
    email: 'hello@tamanus.com',
    conciergeEmail: 'concierge@tamanus.com',
    phone: '+92 300 0000000',
    whatsapp: '+92 300 0000000',
    locations: 'Lahore · Karachi · Islamabad · GCC Operations',
  },
  socials: [
    { platform: 'Instagram', handle: '@tamanusofficial', url: 'https://www.instagram.com/tamanusofficial' },
    { platform: 'Facebook', handle: 'TAMANUS Foods', url: 'https://facebook.com/tamanus' },
  ],
};
