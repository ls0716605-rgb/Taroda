import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  Key,
  FileText,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  Building2,
  Stethoscope,
  Hammer,
  Briefcase,
  Megaphone,
  Store
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/services';
import { INDUSTRIES_SERVED } from '../data/industries';
import { EmailAuthChecker } from '../components/EmailAuthChecker';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onRequestAudit: (prefillDomain?: string) => void;
  onOpenSampleReport: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestAudit,
  onOpenSampleReport
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [demoDashboardMode, setDemoDashboardMode] = useState<'interactive' | 'visual'>('interactive');

  const faqs = [
    {
      q: 'Will configuring SPF, DKIM, and DMARC prevent 100% of phishing emails?',
      a: 'No, and any cybersecurity provider that makes that promise is not being candid. SPF, DKIM, and DMARC protect against exact-domain spoofing (when an attacker sends an email literally pretending to be @yourcompany.com). They do not prevent phishing from lookalike typosquatting domains (e.g., @y0urcompany.com) or compromised employee mailboxes, which require endpoint security, multi-factor authentication (MFA), and user security training.'
    },
    {
      q: 'Does email authentication guarantee our emails will land in client inboxes?',
      a: 'Proper authentication is a mandatory baseline requirement for inbox delivery—especially with Google and Yahoo 2024 sender requirements. However, inbox placement also depends on your domain reputation, recipient spam filters, sending volume, recipient engagement, and message content. Authentication proves identity; it does not dictate recipient spam algorithms.'
    },
    {
      q: 'Do you need access to our email passwords or private communications?',
      a: 'Never. Email authentication is handled strictly at the public DNS record level (TXT and CNAME records) and tenant administrative settings (such as generating DKIM keys in Google Workspace or Microsoft 365). Taroda never asks for, nor requires, access to employee email accounts, mailboxes, or passwords.'
    },
    {
      q: 'What is the RFC 10-lookup limit in SPF, and why does it break email delivery?',
      a: 'RFC 7208 mandates that evaluating an SPF record must not require more than 10 DNS queries. When companies add multiple cloud platforms (Google, HubSpot, Zendesk, Salesforce), nested includes quickly exceed 10. Receiving mail servers abort the evaluation with a "PermError", frequently dumping legitimate customer invoices and quotes straight into spam.'
    },
    {
      q: 'How long does a typical implementation take, and will our email go down?',
      a: 'Standard implementations do not cause any email downtime. We prepare all records in advance, review them with your team, and implement them during scheduled change windows. Because DNS updates take time to propagate worldwide (typically 1 to 24 hours), we use safe transition methods to ensure uninterrupted communication.'
    },
    {
      q: 'Why should we hire Taroda instead of relying on generic online generators?',
      a: 'Automated generators produce naive records that frequently break third-party SaaS senders, exceed the 10-lookup limit, or leave DMARC permanently stuck on p=none. Taroda provides human cybersecurity engineering: we map your entire email ecosystem, verify alignment across all your software, review every change before deployment, and safely guide you to strict enforcement.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>B2B Email Authentication & Domain Protection</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Your Domain Deserves <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  to Be Trusted.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Protect your business email identity with properly configured SPF, DKIM, and DMARC. Taroda helps businesses strengthen domain authentication, investigate configuration issues, and build a more trustworthy email foundation.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => onRequestAudit()}
                  className="w-full sm:w-auto px-6 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-cyan-500/25 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Your Free Email Security Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-6 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Trust Statement */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Clear recommendations. Practical implementation. No unnecessary technical complexity.</span>
              </div>
            </div>

            {/* Right Column: Custom Visual Dashboard / Live Checker */}
            <div className="lg:col-span-5">
              {/* Visual Demo Card */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                  {/* Card Header with Demo Pill */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                      <span className="text-xs font-mono text-slate-400 ml-2">auth-dashboard.taroda</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Demo Illustration
                    </span>
                  </div>

                  {/* Target Domain Row */}
                  <div className="flex items-center justify-between mb-4 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Verified Host</span>
                      <span className="text-sm font-bold text-white font-mono">client-business.com</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Enforced (p=reject)
                    </span>
                  </div>

                  {/* 3 Pillars Visual Status */}
                  <div className="space-y-3 mb-5">
                    {/* SPF Status */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono">SPF RECORD</div>
                          <div className="text-[11px] text-slate-400">Optimized • 4/10 DNS lookups</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">PASS</span>
                    </div>

                    {/* DKIM Status */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <Key className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono">DKIM SIGNATURE</div>
                          <div className="text-[11px] text-slate-400">2048-bit RSA • 3 Selectors Aligned</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">ALIGNED</span>
                    </div>

                    {/* DMARC Status */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono">DMARC POLICY</div>
                          <div className="text-[11px] text-slate-400">Policy: p=reject • pct=100%</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">PROTECTED</span>
                    </div>
                  </div>

                  {/* Interactive Quick Action */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Want to test your real domain?</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('checker')}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Launch Live Checker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE CHECKER EMBED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Inspect Your Domain in Real Time
          </h2>
          <p className="text-sm text-slate-400">
            Query public DNS records to verify if your domain has valid SPF, DKIM selectors, and DMARC enforcement.
          </p>
        </div>

        <EmailAuthChecker
          onRequestAudit={(domain) => onRequestAudit(domain)}
        />
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why Business Email Identity Is Under Attack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            The fundamental architecture of email was built without sender verification. Today, threat actors exploit this design flaw while complex cloud setups trigger silent deliverability errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem 1 */}
          <div className="bg-[#090E1A] p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Direct-Domain Email Spoofing</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Without an enforced DMARC policy, criminals can send emails with your exact name and domain in the "From:" field. Your clients, homeowners, or patients receive fraudulent payment links that appear completely legitimate.
            </p>
          </div>

          {/* Problem 2 */}
          <div className="bg-[#090E1A] p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">DNS Misconfiguration & PermErrors</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Adding third-party software like CRM, billing, and marketing platforms causes DNS bloat. Exceeding the strict RFC 10-lookup limit causes receiving servers to abort checks and silently route legitimate company proposals into spam.
            </p>
          </div>

          {/* Problem 3 */}
          <div className="bg-[#090E1A] p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2024+ Mandates & Inbox Rejection</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Google, Yahoo, and Microsoft now actively enforce strict authentication standards for inbound business mail. Domains without aligned SPF, DKIM, and DMARC suffer immediate delivery throttling, spam penalties, and outright rejection.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Engineered Domain Protection Services
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Turnkey authentication, optimization, and auditing tailored to your unique cloud stack.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800 font-semibold">
                  {service.badge}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.tagline}
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  {service.benefits.slice(0, 2).map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Learn Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section className="bg-slate-950/70 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
              The Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              How Taroda Secures Your Domain
            </h2>
            <p className="text-sm text-slate-400">
              A proven four-stage methodology designed for zero downtime and strict change control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Discovery & Assessment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We inspect your publicly available DNS records and map your third-party SaaS tools (Google, Microsoft 365, marketing platforms, invoicing tools).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Diagnosis & Recommendations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We identify SPF lookup limits, syntax flaws, missing DKIM keys, and unaligned return paths. We provide copy-paste ready DNS records.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Authorized Implementation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                With your explicit authorization, we deploy approved configurations. DNS changes are phased carefully to respect worldwide propagation.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">Verification & Reporting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We test header alignment with real test mail sends, confirm global DNS propagation, and deliver an audit summary with ongoing maintenance steps.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Explore our full 4-stage process and authorization standards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. WHY TARODA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
              The Taroda Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Why Businesses Trust Taroda With Their Domain
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We are not a generalist IT helpdesk or a generic software subscription. We are specialized cybersecurity engineers dedicated solely to email identity and DNS configuration.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Clear explanations without technical jargon</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We translate complex RFC specifications and XML telemetry into actionable business decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Strict change review before deployment</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every DNS proposal is human-reviewed by email engineers to guarantee zero mail disruption.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transparent scope and honest boundaries</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We never make false claims that authentication alone stops all phishing or guarantees inbox placement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tailored to your exact business stack</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Whether you use Google Workspace, Microsoft 365, JobNimbus, or HubSpot, we customize the setup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white">Standard Delivery Comparison</h3>
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold flex-shrink-0">
                    ✕
                  </div>
                  <div>
                    <strong className="text-slate-200 block">Generic Online Record Generators</strong>
                    <p className="text-slate-400 mt-1">
                      Spit out generic records without verifying lookup limits, fail to align third-party software, and leave DMARC stuck on p=none without monitoring.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Taroda Engineering Engagement</strong>
                    <p className="text-slate-300 mt-1">
                      Complete discovery of all cloud senders, 2048-bit DKIM key generation, SPF flattening under 10 lookups, phased DMARC rollout to p=reject, and full verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Target Focus
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Specialized Protection for Key Industries
          </h2>
          <p className="text-sm text-slate-400">
            We understand the specific operational software, invoicing risks, and client communication dynamics of your sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SERVED.map((ind) => (
            <div
              key={ind.id}
              className="bg-[#090E1A] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  {ind.id === 'healthcare' && <Stethoscope className="w-5 h-5" />}
                  {ind.id === 'home-services' && <Hammer className="w-5 h-5" />}
                  {ind.id === 'professional-services' && <Briefcase className="w-5 h-5" />}
                  {ind.id === 'marketing-agencies' && <Megaphone className="w-5 h-5" />}
                  {ind.id === 'small-business' && <Store className="w-5 h-5" />}
                  <h3 className="text-base font-bold text-white">{ind.name}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {ind.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ind.riskProfile}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Industry Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SAMPLE AUDIT REPORT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border border-cyan-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              Transparent Deliverable
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              See What a Taroda Audit Looks Like
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We believe in complete transparency. Explore an interactive sample audit report featuring DNS record checks, lookup analyses, SaaS alignment matrices, and prioritized remediation steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenSampleReport}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Preview Sample Audit Report</span>
            </button>
            <button
              type="button"
              onClick={() => onRequestAudit()}
              className="w-full sm:w-auto px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Your Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Straight answers to common questions about email authentication and domain security.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-[#090E1A] border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 to-[#070C16] border border-slate-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Let's Make Your Business Email More Trustworthy.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Take the first step with a complimentary, non-invasive assessment of your public email DNS records. Get clear recommendations with zero obligation.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onRequestAudit()}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-cyan-500/25 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Your Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Talk to Taroda</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
