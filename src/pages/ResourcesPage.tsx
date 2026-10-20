import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { RESOURCE_ARTICLES } from '../data/resources';
import { ResourceArticle, PageId } from '../types';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectArticle: (article: ResourceArticle) => void;
  onRequestAudit: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onNavigate,
  onSelectArticle,
  onRequestAudit
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Fundamentals', 'Troubleshooting', 'Policy Enforcement'];

  const filteredArticles = RESOURCE_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Knowledge Base & Technical Guides</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Email Authentication Resources
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Deep, human-written technical guides on SPF limits, DKIM cryptographic verification, and safe DMARC policy enforcement.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090E1A] p-4 rounded-2xl border border-slate-800">
        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {article.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {article.summary}
              </p>

              {/* Key Takeaways Preview */}
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Key Takeaway:
                </span>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  • {article.keyTakeaways[0]}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                {article.publishedDate}
              </span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Resource Bottom Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Need Help Implementing What You Just Read?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Taroda can inspect your domain DNS records and execute the proper SPF, DKIM, and DMARC changes with zero email downtime.
        </p>
        <button
          type="button"
          onClick={onRequestAudit}
          className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20"
        >
          Request Free Assessment
        </button>
      </div>
    </div>
  );
};
