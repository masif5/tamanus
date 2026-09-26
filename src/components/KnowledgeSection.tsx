import React, { useState } from 'react';
import { ARTICLES, Article } from '../data/tamanusData';
import { ArticleModal } from './ArticleModal';
import { ArrowRight, BookOpen } from 'lucide-react';

export const KnowledgeSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="knowledge" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E3D7] pb-10">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C6A052] font-semibold block">
            Chapter IV · Transparent Education
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#0D281E] leading-tight">
            The Knowledge Centre
          </h2>
          <p className="text-sm sm:text-base text-[#596A61] max-w-xl font-light">
            Clear, sourceable guides on date cultivars, natural storage chemistry, and traditional Arabian serving rituals.
          </p>
        </div>
      </div>

      {/* Broadsheet 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((article, idx) => (
          <article
            key={article.slug}
            onClick={() => setSelectedArticle(article)}
            className="group bg-[#FAF8F5] border border-[#E8E3D7] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-[#154230] transition-colors cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs tracking-widest text-[#86968E] uppercase">
                <span>Article 0{idx + 1}</span>
                <span className="text-[#C6A052] font-medium">{article.category}</span>
              </div>

              <h3 className="text-2xl font-serif text-[#0D281E] font-medium leading-snug group-hover:text-[#154230] transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-[#596A61] font-light leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#EFE8DA] flex items-center justify-between text-xs">
              <span className="text-[#86968E] font-mono">{article.readingTime}</span>
              <span className="text-[#154230] font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  );
};
