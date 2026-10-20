import React from 'react';
import {
  Compass,
  Search,
  KeyRound,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  FileCheck,
  Lock,
  Globe
} from 'lucide-react';
import { PageId } from '../types';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: () => void;
  onOpenSampleReport: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onRequestAudit,
  onOpenSampleReport
}) => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      tagline: 'Ecosystem Mapping & Requirement Definition',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      description: 'We meet with your team or review your intake data to catalogue your complete email footprint. We document your primary mail host (Google Workspace, Microsoft 365), your transactional sending systems (QuickBooks, Shopify, custom apps), marketing platforms (HubSpot, Mailchimp), and support desks (Zendesk, Freshdesk).',
      deliverable: 'Outbound Mail Sender Inventory & Alignment Scope',
      clientAction: 'Provide list of third-party platforms that send emails using your business domain.'
    },
    {
      number: '02',
      title: 'Assessment',
      tagline: 'Deep DNS Diagnostic & Telemetry Baseline',
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      description: 'We query your public DNS records, calculate SPF lookup counts, inspect active DKIM selectors, and check for DMARC policy deployment. If DMARC telemetry is absent, we deploy a zero-risk monitoring record (p=none) to collect raw XML reports directly from mail receivers worldwide.',
      deliverable: 'Detailed Diagnostic Report with identified PermErrors and alignment gaps',
      clientAction: 'Review initial findings and approve the proposed remediation architecture.'
    },
    {
      number: '03',
      title: 'Authorized Implementation',
      tagline: 'Controlled Deployment with Explicit Client Approval',
      icon: <KeyRound className="w-6 h-6 text-cyan-400" />,
      description: 'We generate copy-paste ready DNS records or apply them directly to your DNS management console with your explicit written authorization. We optimize SPF records under the 10-lookup limit, publish 2048-bit DKIM keys, and establish alignment for all authorized SaaS platforms.',
      deliverable: 'Production-ready SPF, DKIM, and DMARC DNS changes deployed',
      clientAction: 'Provide authorization and add/approve proposed DNS records in your DNS provider.'
    },
    {
      number: '04',
      title: 'Verification & Reporting',
      tagline: 'Global Propagation Testing & Delivery Sign-Off',
      icon: <CheckCircle2 className="w-6 h-6 text-cyan-400" />,
      description: 'We verify global DNS propagation across authoritative worldwide nameservers. We perform live diagnostic email sends to verify header authentication results (SPF pass, DKIM pass, DMARC pass). Finally, we deliver an executive completion report and ongoing maintenance guidelines.',
      deliverable: 'Executive Completion Certificate, Deliverability Audit, & Ongoing Guidelines',
      clientAction: 'Retain the completion documentation and review ongoing monthly recommendations.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Proven Four-Stage Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Taroda Protects Your Domain
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Zero email downtime. No blind guesses. A transparent, human-reviewed engineering workflow designed to safely achieve strict DMARC enforcement.
        </p>
      </div>

      {/* Critical Authorization Notice */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Explicit Authorization Standards</h4>
            <p className="text-slate-400 leading-relaxed">
              Taroda never alters or modifies your DNS zone files without prior written authorization from your domain administrator. You retain full control of your registrar credentials at all times.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">DNS Propagation Awareness</h4>
            <p className="text-slate-400 leading-relaxed">
              Global DNS propagation takes between 15 minutes and 24 hours depending on existing TTL (Time to Live) values. We structure every change to ensure zero mail disruption during propagation.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8 relative">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all hover:border-slate-700"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400 font-bold text-sm">STAGE {step.number}</span>
                    <span className="text-xs text-slate-500">|</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                    {step.tagline}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
              {step.description}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px] uppercase font-sans font-bold mb-1">Deliverable:</span>
                <span className="text-emerald-400">{step.deliverable}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[11px] uppercase font-sans font-bold mb-1">Your Role:</span>
                <span className="text-slate-300">{step.clientAction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Downtime Guarantee Section */}
      <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          Our Zero-Downtime Guarantee & Safety Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block font-bold">1. Non-Destructive Addition</strong>
            <p className="text-slate-400 leading-relaxed">
              We never delete existing mail server records until new cryptographic selectors and SPF entries have propagated and passed verification.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block font-bold">2. Phased DMARC Rollout</strong>
            <p className="text-slate-400 leading-relaxed">
              We never deploy <code>p=reject</code> on Day 1. We spend weeks in <code>p=none</code> analyzing telemetry to ensure every legitimate sending system aligns.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block font-bold">3. Rollback Readiness</strong>
            <p className="text-slate-400 leading-relaxed">
              We snapshot your existing DNS zone state before any modifications, ensuring instant reversion if any unforeseen third-party software anomaly arises.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-lg font-bold text-white">Ready to initiate Stage 1 Discovery?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onRequestAudit}
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20"
          >
            Start Free Discovery Assessment
          </button>
          <button
            type="button"
            onClick={onOpenSampleReport}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
          >
            View Sample Deliverable Report
          </button>
        </div>
      </div>
    </div>
  );
};
