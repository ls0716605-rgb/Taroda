import React from 'react';
import { Search, Shield, Info, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { EmailAuthChecker } from '../components/EmailAuthChecker';
import { PageId } from '../types';

interface CheckerPageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: (prefillDomain?: string) => void;
}

export const CheckerPage: React.FC<CheckerPageProps> = ({
  onNavigate,
  onRequestAudit
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Diagnostic Utility</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Check Your Email Authentication
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Test public DNS records for SPF syntax, DKIM selector validity, and DMARC enforcement policies.
        </p>
      </div>

      {/* Main Checker Tool */}
      <div className="max-w-4xl mx-auto">
        <EmailAuthChecker
          onRequestAudit={(domain) => onRequestAudit(domain)}
        />
      </div>

      {/* Educational Explanations below checker */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-5 bg-[#090E1A] border border-slate-800 rounded-2xl space-y-2 text-xs">
          <h3 className="font-bold text-white text-sm font-mono flex items-center gap-2">
            <span className="text-cyan-400">01.</span> SPF Record
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Checks if your domain publishes a list of authorized servers via <code>v=spf1</code>. Evaluates mechanism count to ensure you remain below the 10-lookup RFC limit.
          </p>
        </div>

        <div className="p-5 bg-[#090E1A] border border-slate-800 rounded-2xl space-y-2 text-xs">
          <h3 className="font-bold text-white text-sm font-mono flex items-center gap-2">
            <span className="text-cyan-400">02.</span> DKIM Selectors
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Tests known selectors (e.g. <code>google</code>, <code>k1</code>, <code>default</code>) or your custom selector to verify public cryptographic signature keys.
          </p>
        </div>

        <div className="p-5 bg-[#090E1A] border border-slate-800 rounded-2xl space-y-2 text-xs">
          <h3 className="font-bold text-white text-sm font-mono flex items-center gap-2">
            <span className="text-cyan-400">03.</span> DMARC Policy
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Inspects <code>_dmarc</code> to verify whether receiving mail servers are instructed to monitor (<code>p=none</code>), quarantine, or reject unauthorized spoofed mail.
          </p>
        </div>
      </div>

      {/* Technical Limitations and Security Boundaries Notice */}
      <div className="max-w-4xl mx-auto p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Diagnostic Scope and Boundary Notes:</span>
        </div>
        <ul className="space-y-1.5 list-disc pl-5 leading-relaxed">
          <li>
            <strong>Public Queries Only:</strong> This tool performs standard public DNS lookups. We never access private mailboxes, passwords, or internal network logs.
          </li>
          <li>
            <strong>Selector Discovery Limitation:</strong> The DNS protocol does not support wildcard queries for DKIM selectors. If your organization uses non-standard selector names (e.g. <code>cm1</code> or <code>s2024</code>), enter the selector in the selector input above.
          </li>
          <li>
            <strong>Record Presence vs. Full Security:</strong> Having an SPF or DMARC record published does not guarantee 100% protection if the policy is set to <code>p=none</code> or if third-party senders are not aligned.
          </li>
        </ul>
      </div>
    </div>
  );
};
