import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK on server side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Multi-turn Gemini Chatbot with Google Search Grounding and resilient fallbacks
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userQuery } = req.body;

    // Transform conversation history to match Gemini format
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const m of messages) {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || m.text || '' }],
        });
      }
    }

    if (userQuery) {
      contents.push({
        role: 'user',
        parts: [{ text: userQuery }],
      });
    }

    if (contents.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    const systemInstruction = `You are the Master Sommelier & Gifting Concierge for TAMANUS (www.tamanus.com), an ultra-luxury heritage food brand dedicated to the finest single-origin date cultivars from Madinah and Saudi Arabia (Ajwa, Kalmi, Sukri, Sugai, Medjhool, Rabeya, Amber, Sugai seedless, Mabroom) and expanding into raw Sidr honey, organic dry fruits, and bespoke corporate gifting chests.

Your persona:
- Elegant, articulate, deeply knowledgeable in culinary traditions, sensory profiles, and Middle Eastern hospitality.
- Guide users on date varieties: sweetness levels (e.g. Sukri is intense honeyed sweetness, Ajwa is gentle earthy prune, Mabroom is toasted and understated), textures (plump Medjhool vs firm chewy Mabroom vs dual-texture Sugai), pairings (Arabic Qahwa cardamom coffee, mint tea, blue cheeses, nuts, tahini), and storage advice.
- Assist with corporate & festive gifting advice (packaging, custom embossed boxes, recipient matching).
- TAMANUS is based in Pakistan with GCC operations. Prices are in PKR (e.g., 500g Ajwa: PKR 4,200, Medjhool: PKR 4,800, Sukri: PKR 2,200).
- Keep answers concise, beautiful, and helpful. Use formatting with clean spacing. Avoid generic buzzwords.`;

    // Try models in order: gemini-3.8-flash, gemini-3.5-flash, gemini-3.1-flash-lite
    const modelsToTry = [
      { name: 'gemini-3.8-flash', tools: [{ googleSearch: {} }] },
      { name: 'gemini-3.5-flash', tools: [{ googleSearch: {} }] },
      { name: 'gemini-3.1-flash-lite', tools: [] },
    ];

    let lastError: any = null;

    for (const modelConfig of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelConfig.name,
          contents,
          config: {
            systemInstruction,
            ...(modelConfig.tools.length > 0 ? { tools: modelConfig.tools } : {}),
          },
        });

        const candidate = response.candidates?.[0];
        const text = response.text || '';
        const groundingMetadata = candidate?.groundingMetadata;

        return res.json({
          text,
          groundingChunks: groundingMetadata?.groundingChunks || [],
          webSearchQueries: groundingMetadata?.webSearchQueries || [],
        });
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelConfig.name} failed, trying next fallback:`, err?.message?.slice(0, 120));
      }
    }

    // Curated domain knowledge fallback if all external API quotas are exhausted
    const lastUserQuery = (userQuery || messages?.[messages.length - 1]?.content || '').toLowerCase();
    let fallbackText = `Welcome to TAMANUS. As your Date Sommelier, I am pleased to guide your selection:\n\n`;

    if (lastUserQuery.includes('ajwa')) {
      fallbackText += `• **Madinah Ajwa (عجوة)**: Cultivated exclusively in Madinah Al-Munawwarah. Distinguishable by its deep dark obsidian skin and mild, earthy prune-like sweetness. It is never cloying, making it the most revered cultivar for contemplative morning rituals.\n\nPairing: Freshly ground green cardamom Qahwa and blanched raw almonds.\nPrice: PKR 4,200 (500g) / PKR 8,000 (1kg).`;
    } else if (lastUserQuery.includes('sukri') || lastUserQuery.includes('sweet')) {
      fallbackText += `• **Al-Qassim Sukri (سكري)**: Known across Arabia as 'The Sweet One.' Soft, moist, and golden-hued with intense honeyed and brown sugar undertones that melt effortlessly on the tongue.\n\nPairing: Pure sesame tahini drizzle and fresh clotted cream (qashta).\nPrice: PKR 2,200 (500g) / PKR 4,200 (1kg).`;
    } else if (lastUserQuery.includes('medjhool') || lastUserQuery.includes('large') || lastUserQuery.includes('king')) {
      fallbackText += `• **Royal Medjhool (مجهول)**: The undisputed King of Dates. Monumental, plump, and deeply caramelized with a plush, chewy texture reminiscent of butterscotch toffee.\n\nPairing: Roasted walnuts, aged blue cheeses (Roquefort/Stilton), and espresso.\nPrice: PKR 4,800 (500g) / PKR 9,200 (1kg).`;
    } else if (lastUserQuery.includes('sugai')) {
      fallbackText += `• **Sugai (صقعي)**: Remarkable for its dual-texture: a crisp, light-golden dry crown atop an amber, chewy body with balanced toasted caramel notes.\n\nAvailable both whole and Seedless (prepared for easy reception serving).\nPrice: PKR 2,400 (500g whole) / PKR 3,000 (500g seedless).`;
    } else if (lastUserQuery.includes('gift') || lastUserQuery.includes('box') || lastUserQuery.includes('chest')) {
      fallbackText += `• **The TAMANUS Gifting Collections**:\n1. The Royal Madinah Duo (Ajwa & Amber in rigid foiled emerald box) — PKR 9,500\n2. The Sovereign Nine Chest (All 9 single-origin cultivars in partitioned presentation chest) — PKR 28,000\n3. The Hospitality Tray (Seedless Sugai & Medjhool with almonds) — PKR 14,500\n\nAll gift boxes include hot-foiled calligraphy greeting cards and custom satin ribbons.`;
    } else if (lastUserQuery.includes('pair') || lastUserQuery.includes('coffee') || lastUserQuery.includes('tea')) {
      fallbackText += `• **Sommelier Pairing Rules**:\n- Earthy & Gentle (Ajwa, Mabroom): Pair with spiced Cardamom Qahwa or Chai Karak.\n- Honey & Caramel (Sukri, Medjhool): Pair with unsweetened mountain mint tea, dark espresso, or sharp blue cheeses to balance sweetness.\n- Crispy Two-Tone (Sugai): Pair with roasted salted pistachios and green tea.`;
    } else {
      fallbackText += `We offer 9 royal single-estate date cultivars from Madinah and Al-Qassim:\n- **Ajwa**: Earthy depth & sacred heritage (PKR 4,200 / 500g)\n- **Medjhool**: Plump, indulgent caramel (PKR 4,800 / 500g)\n- **Sukri**: Velvety honeyed sweetness (PKR 2,200 / 500g)\n- **Sugai & Sugai Seedless**: Two-tone crisp & chewy (from PKR 2,400 / 500g)\n- **Amber & Mabroom**: Aristocratic, large & firm (from PKR 3,800 / 500g)\n\nWould you like guidance on culinary pairings, storage advice, or curating a gift box?`;
    }

    return res.json({
      text: fallbackText,
      groundingChunks: [],
      webSearchQueries: [],
    });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({
      error: 'Failed to generate response from concierge',
      message: error?.message || 'Unknown error',
    });
  }
});

// Mount Vite or static build
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
