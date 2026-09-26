import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Globe, User, Bot, RefreshCw, ExternalLink } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  groundingChunks?: Array<{
    web?: {
      uri?: string;
      title?: string;
    };
  }>;
  webSearchQueries?: string[];
}

interface SommelierChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SommelierChatModal: React.FC<SommelierChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content:
        'Assalam u Alaikum. Welcome to the TAMANUS Private Sanctuary. I am your Master Date Sommelier & Gifting Concierge. Whether you wish to explore the earthy minerality of Madinah Ajwa, calibrate a pairing with cardamom Qahwa, or curate an executive gift chest for your esteemed guests, how may I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Which date is best for someone who dislikes high sweetness?',
    'What makes Madinah Ajwa different from regular dates?',
    'How do I pair Sukri and Medjhool with coffee and tea?',
    'What are the current 2026 Saudi date harvest standards and prices?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const modelMessage: ChatMessage = {
        role: 'model',
        content: data.text || 'I apologize, I could not complete that recommendation.',
        groundingChunks: data.groundingChunks || [],
        webSearchQueries: data.webSearchQueries || [],
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            'Our apologies. The concierge connection encountered a brief delay. Please try asking again or connect directly with our WhatsApp concierge at +92 300 0000000.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        content:
          'Assalam u Alaikum. Conversation reset. How may I guide your date selection or gifting inquiry today?',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0D281E]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg h-full bg-[#FAF8F5] border-l border-[#E8E3D7] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-[#0D281E] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#154230] border border-[#C6A052] flex items-center justify-center text-[#C6A052]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg tracking-wide flex items-center gap-2">
                <span>TAMANUS Sommelier AI</span>
                <span className="text-[10px] font-mono uppercase bg-[#C6A052] text-[#0D281E] px-1.5 py-0.2 font-bold">
                  Grounding Active
                </span>
              </h3>
              <p className="text-[11px] text-[#E8DFC8]/75 font-light">
                Grounded with Google Search & Culinary Knowledge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-2 text-[#E8DFC8]/70 hover:text-white transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#E8DFC8]/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Sommelier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-wider text-[#86968E]">
                {msg.role === 'user' ? (
                  <>
                    <span>You</span>
                    <User className="w-3 h-3 text-[#154230]" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-[#C6A052]" />
                    <span className="text-[#C6A052] font-semibold">Tamanus Sommelier</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[88%] p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#154230] text-white rounded-none'
                    : 'bg-white border border-[#E8E3D7] text-[#141C18] rounded-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap font-light">{msg.content}</p>

                {/* Search Grounding Sources / Citations */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#E8E3D7] text-[11px] text-[#596A61] space-y-1">
                    <div className="flex items-center gap-1.5 text-[#154230] font-medium text-[10px] uppercase tracking-wider">
                      <Globe className="w-3 h-3 text-[#C6A052]" />
                      <span>Verified Search Sources</span>
                    </div>
                    <ul className="space-y-1 pt-1">
                      {msg.groundingChunks.map((chunk, cIdx) => {
                        if (!chunk.web?.uri) return null;
                        return (
                          <li key={cIdx}>
                            <a
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#154230] hover:underline flex items-center gap-1 truncate max-w-[260px]"
                            >
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              <span>{chunk.web.title || chunk.web.uri}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="p-4 bg-white border border-[#E8E3D7] text-xs text-[#596A61] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A052] animate-spin" />
                <span>Consulting harvest archives and Google Search...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Container (Clean buttons, not static pills) */}
        {messages.length <= 3 && (
          <div className="px-6 py-2 border-t border-[#E8E3D7] bg-[#F4EFE6] space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#86968E] block">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => sendMessage(q)}
                  className="px-2.5 py-1 bg-white hover:bg-[#154230] hover:text-white border border-[#E8E3D7] text-[11px] text-[#596A61] transition-colors cursor-pointer text-left truncate max-w-[320px]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Field */}
        <div className="p-4 bg-white border-t border-[#E8E3D7]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cultivars, sweetness, pairings, or gifting..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#E8E3D7] text-xs focus:outline-none focus:border-[#154230] text-[#0D281E]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-[#154230] text-white hover:bg-[#0D281E] disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-[#86968E] text-center pt-2">
            TAMANUS AI Sommelier powered by Gemini 3.5 with Google Search Grounding.
          </p>
        </div>
      </div>
    </div>
  );
};
