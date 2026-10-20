import React from 'react';
import {
  Stethoscope,
  Hammer,
  Briefcase,
  Megaphone,
  Store,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { INDUSTRIES_SERVED } from '../data/industries';
import { PageId } from '../types';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: (industryPrefill?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  onRequestAudit
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'healthcare':
        return <Stethoscope className="w-6 h-6 text-cyan-400" />;
      case 'home-services':
        return <Hammer className="w-6 h-6 text-cyan-400" />;
      case 'professional-services':
        return <Briefcase className="w-6 h-6 text-cyan-400" />;
      case 'marketing-agencies':
        return <Megaphone className="w-6 h-6 text-cyan-400" />;
      default:
        return <Store className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Domain Protection by Industry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tailored Email Security for Your Industry
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Every industry uses a distinct software stack and faces unique impersonation risks. Taroda delivers targeted authentication architectures built for your operational reality.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="space-y-12">
        {INDUSTRIES_SERVED.map((industry) => (
          <div
            key={industry.id}
            id={industry.id}
            className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 scroll-mt-28"
          >
            {/* Industry Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  {getIcon(industry.id)}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {industry.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                    {industry.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestAudit(industry.name)}
                className="w-full lg:w-auto px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Protect {industry.name.split(' ')[0]} Domain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Why It Matters & Risk Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Primary Risk Exposure
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {industry.riskProfile}
                </p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Why Authentication Matters
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {industry.whyItMatters}
                </p>
              </div>
            </div>

            {/* Common Pitfalls & Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Common Industry DNS Pitfalls
                </h4>
                <ul className="space-y-2 text-slate-400">
                  {industry.commonPitfalls.map((pitfall, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Recommended Taroda Strategy
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {industry.recommendedStrategy}
                </p>
              </div>
            </div>

            {/* Illustrative Use Case Scenario */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs">
              <span className="text-[11px] font-mono font-bold uppercase text-cyan-400 block mb-1">
                Illustrative Threat Scenario
              </span>
              <p className="text-slate-400 italic leading-relaxed">
                "{industry.realWorldScenario}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#090E1A] p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Is Your Business Sector at Risk of Domain Spoofing?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Request an assessment customized to your industry. We will identify all third-party platforms sending mail on your behalf and deliver an audit with zero disruption.
        </p>
        <button
          type="button"
          onClick={() => onRequestAudit()}
          className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20"
        >
          Request Industry Assessment
        </button>
      </div>
    </div>
  );
};
