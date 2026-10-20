import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Key,
  FileText,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Search,
  Clock
} from 'lucide-react';
import { CORE_SERVICES } from '../data/services';
import { PageId } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: (serviceId?: string) => void;
  onOpenSampleReport: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onRequestAudit,
  onOpenSampleReport
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CORE_SERVICES[0].id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Specialized Cybersecurity Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Email Authentication & Domain Protection Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From fixing RFC 10-lookup limits in SPF to orchestrating safe DMARC p=reject rollouts, Taroda delivers human-reviewed email infrastructure engineering.
        </p>
      </div>

      {/* Scope Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3 max-w-4xl mx-auto">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Our Technical Philosophy:</strong> We explain technical concepts in straightforward business language. Email authentication is fundamental to proving domain identity and stopping direct spoofing, but it does not guarantee inbox placement or eliminate all phishing threats (such as typo domains or malware attachments).
        </p>
      </div>

      {/* Services List - Deep Dives */}
      <div className="space-y-12">
        {CORE_SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 scroll-mt-28"
          >
            {/* Service Top Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800 font-semibold inline-block">
                  {service.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {service.name}
                </h2>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                  {service.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRequestAudit(service.name)}
                className="w-full lg:w-auto px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Request {service.badge} Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.description}
            </p>

            {/* Detailed Grid: Benefits & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Benefits */}
              <div className="space-y-3 bg-slate-950/60 p-5 sm:p-6 rounded-xl border border-slate-800/80">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Business Benefits
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {service.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What is Included */}
              <div className="space-y-3 bg-slate-950/60 p-5 sm:p-6 rounded-xl border border-slate-800/80">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  What Is Included
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {service.included.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Client Prerequisites & Scope Statement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono">
                  What You Need to Provide:
                </h4>
                <ul className="space-y-1.5 text-slate-400">
                  {service.clientPrerequisites.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-slate-500">→</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Realistic Scope & Boundaries:
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {service.realisticScope}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Not Sure Which Service Your Domain Needs?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Start with our free public email authentication check or talk directly to our engineering team. We inspect your records and tell you exactly what is missing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('checker')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-700 transition-colors"
          >
            Launch Live DNS Checker
          </button>
          <button
            type="button"
            onClick={() => onRequestAudit()}
            className="w-full sm:w-auto px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
          >
            Request Free Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
