import React from 'react';
import { Article, IMAGES } from '../data/tamanusData';
import { X, BookOpen, Clock, Calendar } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D281E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#FAF8F5] border border-[#E8E3D7] max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative p-8 sm:p-12 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 border border-[#E8E3D7] flex items-center justify-center text-[#0D281E] hover:bg-[#154230] hover:text-white transition-colors cursor-pointer"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C6A052] font-semibold">
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0D281E] leading-tight">
            {article.title}
          </h2>
          <span className="text-xs font-mono text-[#86968E] block">{article.date}</span>
        </div>

        <div className="w-full h-[1px] bg-[#E8E3D7]" />

        {/* Article Body */}
        <div className="prose prose-stone max-w-none space-y-6 text-[#596A61] font-light leading-relaxed text-base sm:text-lg">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-[#E8E3D7] flex items-center justify-between text-xs text-[#86968E]">
          <span>Published by TAMANUS Research & Culinary Office</span>
          <button
            onClick={onClose}
            className="text-[#154230] uppercase tracking-wider font-semibold hover:underline"
          >
            Back to Knowledge Centre
          </button>
        </div>
      </div>
    </div>
  );
};
