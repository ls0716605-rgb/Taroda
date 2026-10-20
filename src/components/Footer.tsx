import React from 'react';
import { Shield, Mail, Globe, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { TarodaLogo } from './TarodaLogo';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenSampleReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenSampleReport
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 text-slate-400 text-xs sm:text-sm">
      {/* Upper Footer: Pillars & Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <TarodaLogo size="md" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Taroda is an American email authentication and domain protection consultancy. We help growing businesses configure SPF, DKIM, and DMARC correctly to reduce spoofing risks and build a trusted email foundation.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Headquarters: Wilmington, Delaware, United States</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Direct Inquiries: security@taroda.com</span>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Authentication Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  SPF Optimization & Flattening
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  DKIM Cryptographic Signing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  DMARC Policy Implementation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  DNS Authentication Audits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  SaaS Sender Alignment
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Served */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Industries Served
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Medical Practices & Healthcare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Roofing & Home Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Professional Services (CPA & Legal)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Marketing Agencies & SaaS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Small & Medium Businesses
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Deliverables */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-mono">
              Verification & Insights
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('checker')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-left"
                >
                  Live DNS Auth Checker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSampleReport}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  View Sample Audit Report
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Our 4-Stage Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('resources')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Knowledge Base & Articles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About Our Team & Mission
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Clear Trust Statement Banner */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Technical Transparency Notice:</strong> Taroda explains email authentication in simple business terms. Proper configuration of SPF, DKIM, and DMARC significantly reduces exact-domain spoofing and improves sender reputation. We never promise that email authentication alone guarantees 100% inbox placement or eliminates every form of phishing (such as lookalike domains or compromised third-party accounts).
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="border-t border-slate-900 bg-[#03060c] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Taroda LLC. All rights reserved. Domain Authentication & Protection Services.</p>

          <div className="flex items-center space-x-6 text-xs">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-slate-200 transition-colors"
            >
              Terms & Authorization
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-200 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
