import React from 'react';
import { X, Calendar, User, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { ResourceArticle } from '../types';

interface ArticleModalProps {
  article: ResourceArticle | null;
  onClose: () => void;
  onRequestAudit: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onRequestAudit
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#090E1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
      >
        {/* Top Bar */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Tag className="w-3.5 h-3.5" />
            <span>{article.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
          <div>
            <h2 id="article-title" className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Published {article.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {article.authorRole}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Executive Key Takeaways
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Text */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Call to action card at end of article */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Have questions about your domain configuration?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Taroda can assess your public DNS records and provide an actionable, jargon-free report.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestAudit();
              }}
              className="px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <span>Get Free Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 text-right flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
