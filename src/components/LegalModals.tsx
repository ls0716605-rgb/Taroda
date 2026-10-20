import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#090E1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-cyan-400" />
            ) : (
              <FileText className="w-5 h-5 text-cyan-400" />
            )}
            <h3 className="text-base font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service & Authorization'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-amber-300/90 font-mono">
                [BUSINESS DETAILS PLACEHOLDER: Taroda LLC • Registered in Delaware, USA • Contact: privacy@taroda.com]
              </div>

              <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
              <p>
                When you use our public DNS evaluation tool, we query public domain name system (DNS) records (TXT, MX, CNAME) accessible globally on the public internet. We do not inspect private email contents, user mailboxes, passwords, or internal networks.
              </p>
              <p>
                When you submit an assessment inquiry, we collect your name, business email address, company name, domain name, email provider, and optional notes you provide.
              </p>

              <h4 className="text-sm font-bold text-white">2. How We Use Information</h4>
              <p>
                We use the submitted information solely to analyze your domain email authentication configuration, communicate our findings, and provide cybersecurity consulting services. We never sell, rent, or trade your contact details to third parties.
              </p>

              <h4 className="text-sm font-bold text-white">3. Data Retention & Security</h4>
              <p>
                Data is retained only as long as necessary to fulfill consulting inquiries and maintain commercial records. All server communications utilize TLS encryption in transit.
              </p>
            </>
          ) : (
            <>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-amber-300/90 font-mono">
                [LEGAL ENTITY PLACEHOLDER: Taroda Email Security & Consulting Services LLC • Terms Version 1.2]
              </div>

              <h4 className="text-sm font-bold text-white">1. Scope of Services</h4>
              <p>
                Taroda provides domain email authentication analysis, SPF, DKIM, and DMARC configuration guidance, and related email infrastructure consulting.
              </p>

              <h4 className="text-sm font-bold text-white">2. Explicit Authorization Requirement</h4>
              <p>
                Taroda does not make DNS record changes, register records, or alter DNS zone files without prior written authorization from the verified domain registrant or authorized IT administrator. Clients retain sole control of their DNS provider accounts.
              </p>

              <h4 className="text-sm font-bold text-white">3. Realistic Scope & Limitation of Guarantees</h4>
              <p>
                Email authentication protocols (SPF, DKIM, DMARC) are technical standards designed to prove sender domain authenticity and instruct mail receivers how to treat unauthenticated mail.
              </p>
              <p className="font-semibold text-slate-200">
                Taroda never warrants or promises that email authentication alone will prevent 100% of phishing attacks, guarantee inbox placement in every mail provider, or bypass recipient anti-spam heuristics. Deliverability is subject to multiple factors including recipient filtering policies and sender behavior.
              </p>

              <h4 className="text-sm font-bold text-white">4. DNS Propagation Notice</h4>
              <p>
                DNS record updates require global propagation time (typically between 15 minutes and 48 hours depending on TTL values). Clients acknowledge that changes may not take effect instantaneously worldwide.
              </p>
            </>
          )}
        </div>

        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 text-right flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
