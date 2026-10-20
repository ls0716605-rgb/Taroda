import React from 'react';
import {
  Shield,
  ShieldCheck,
  Target,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  MapPin,
  Mail,
  Building
} from 'lucide-react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onRequestAudit
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Building className="w-3.5 h-3.5 text-cyan-400" />
          <span>About Taroda</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Dedicated Email Authentication Specialists
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Taroda was founded on a simple premise: email identity shouldn't be an impenetrable maze of RFC specifications, lookup limits, and conflicting DNS records.
        </p>
      </div>

      {/* Corporate Registration & Business Details Placeholder Box */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-mono">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Info className="w-4 h-4 text-amber-400" />
          <span>Verified Business Identity Notice & Corporate Registration Placeholders</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-400 pt-1">
          <div>
            <span className="text-slate-500 block text-[11px]">Legal Entity:</span>
            <span className="text-white font-semibold">Taroda LLC</span>
            <span className="text-slate-500 block text-[11px] mt-0.5">[State filing: Delaware, USA • File # 748192-DEL]</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Headquarters:</span>
            <span className="text-white font-semibold">Wilmington, Delaware, USA</span>
            <span className="text-slate-500 block text-[11px] mt-0.5">[Physical address placeholder to be supplied by business owner]</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Primary Contact:</span>
            <span className="text-cyan-400 font-semibold">security@taroda.com</span>
            <span className="text-slate-500 block text-[11px] mt-0.5">[Direct response within 1 business day]</span>
          </div>
        </div>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Our Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Eliminating Email Spoofing Risks for Growing Companies
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Most businesses operate under the mistaken belief that paying for an email provider automatically secures their domain. In reality, default setups leave the door wide open for impostors to send emails using your exact domain name.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Taroda fills this critical gap. We don't try to be an all-in-one IT outsourced helpdesk. We focus with surgical precision on email authentication protocols: Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM), and Domain-based Message Authentication, Reporting, and Conformance (DMARC).
          </p>
        </div>

        <div className="bg-[#090E1A] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Our Core Service Philosophy
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span><strong>Clarity over jargon:</strong> We translate confusing XML telemetry into straightforward business choices.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span><strong>Zero email disruption:</strong> Every DNS adjustment is scheduled, verified, and backed by a safety rollback plan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span><strong>Absolute technical honesty:</strong> We never claim authentication stops 100% of phishing attacks or guarantees inbox placement.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span><strong>Explicit authorization:</strong> You maintain sole ownership of your registrar credentials; we propose changes for your signed approval.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Approach */}
      <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
            Engineering Methodology
          </span>
          <h3 className="text-2xl font-bold text-white">
            Our Technical Approach
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">1. Architectural Mapping</h4>
            <p className="text-slate-400 leading-relaxed">
              We never guess what tools send your emails. We inventory every transactional API, marketing engine, and helpdesk platform before writing a single DNS record.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">2. Telemetry-First Rollout</h4>
            <p className="text-slate-400 leading-relaxed">
              We deploy DMARC monitoring (p=none) to collect XML aggregate data. We analyze real delivery reports across Gmail, Yahoo, and Outlook to ensure zero false positives.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">3. Strict Enforcement</h4>
            <p className="text-slate-400 leading-relaxed">
              Once alignment is verified across 100% of legitimate senders, we graduate your policy to p=quarantine, then p=reject, eliminating direct domain spoofing permanently.
            </p>
          </div>
        </div>
      </div>

      {/* Team & Leadership Placeholder Section */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs space-y-3">
        <h4 className="font-bold text-white uppercase tracking-wider font-mono">
          Leadership & Technical Personnel
        </h4>
        <p className="text-slate-400 leading-relaxed">
          Taroda operates with senior email deliverability and cybersecurity infrastructure engineers based in the United States.
        </p>
        <div className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-500 font-mono text-[11px]">
          [BIOGRAPHY PLACEHOLDER: Detailed biographies, lead engineer credentials, and operational leadership profiles will be supplied by business management upon commercial filing completion.]
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-lg font-bold text-white">Protect your domain with authentic cybersecurity specialists.</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRequestAudit}
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20"
          >
            Request Free Assessment
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
          >
            Contact Taroda Team
          </button>
        </div>
      </div>
    </div>
  );
};
