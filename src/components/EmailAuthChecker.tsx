import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Server,
  Key,
  FileText,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { DomainCheckResult } from '../lib/dns-validator';

interface EmailAuthCheckerProps {
  initialDomain?: string;
  onRequestAudit: (domain: string) => void;
  className?: string;
  isCompact?: boolean;
}

export const EmailAuthChecker: React.FC<EmailAuthCheckerProps> = ({
  initialDomain = '',
  onRequestAudit,
  className = '',
  isCompact = false
}) => {
  const [domainInput, setDomainInput] = useState(initialDomain);
  const [selectorInput, setSelectorInput] = useState('');
  const [showSelectorInput, setShowSelectorInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<DomainCheckResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'spf' | 'dmarc' | 'dkim' | 'mx'>('overview');

  const runCheck = async (targetDomain?: string, selector?: string) => {
    const domainToCheck = (targetDomain || domainInput).trim();
    if (!domainToCheck) {
      setErrorMsg('Please enter a company domain name (e.g. acme-corp.com).');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const url = new URL('/api/dns-check', window.location.origin);
      url.searchParams.set('domain', domainToCheck);
      if (selector || selectorInput) {
        url.searchParams.set('selector', (selector || selectorInput).trim());
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to inspect domain DNS records.');
      }

      setResult(data);
      setDomainInput(data.domain);
    } catch (err: any) {
      setErrorMsg(err.message || 'DNS resolution encountered an error. Please verify the domain and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoPreset = (presetDomain: string) => {
    setDomainInput(presetDomain);
    runCheck(presetDomain);
  };

  return (
    <div className={`w-full bg-[#0B1220]/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Top Banner / Header */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-5 py-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Public DNS Email Authentication Checker
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                Live Query
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Inspects live public SPF, DKIM selectors, and DMARC policies via secure server-side DNS resolution.
            </p>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
          <span className="text-slate-500 hidden sm:inline">Try preset:</span>
          <button
            type="button"
            onClick={() => loadDemoPreset('demo-unsecured.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
          >
            Demo Unsecured
          </button>
          <button
            type="button"
            onClick={() => loadDemoPreset('demo-monitoring.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
          >
            Demo Monitoring
          </button>
          <button
            type="button"
            onClick={() => loadDemoPreset('demo-secured.com')}
            className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
          >
            Demo Enforced
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-5 sm:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCheck();
          }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => {
                  setDomainInput(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter your domain (e.g. yourcompany.com)"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3.5 pl-11 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-sm sm:text-base"
                disabled={isLoading}
              />
              <Server className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] disabled:opacity-60 cursor-pointer text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Inspecting DNS...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Inspect Domain</span>
                </>
              )}
            </button>
          </div>

          {/* Optional DKIM selector accordion */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <button
              type="button"
              onClick={() => setShowSelectorInput(!showSelectorInput)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{showSelectorInput ? 'Hide custom DKIM selector' : '+ Add custom DKIM selector (optional)'}</span>
            </button>
            <span className="text-slate-500">
              Safe public queries only. No DNS credentials requested.
            </span>
          </div>

          {showSelectorInput && (
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-center gap-3 text-xs">
              <span className="text-slate-400 whitespace-nowrap">DKIM Selector:</span>
              <input
                type="text"
                value={selectorInput}
                onChange={(e) => setSelectorInput(e.target.value)}
                placeholder="e.g. google, default, k1, selector1"
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 flex-1 font-mono"
              />
              <span className="text-slate-500 text-[11px] hidden md:inline">
                Queries &lt;selector&gt;._domainkey.{domainInput || 'domain.com'}
              </span>
            </div>
          )}
        </form>

        {errorMsg && (
          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Lookup notice</p>
              <p className="text-rose-200/90 text-xs mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* Status Summary Banner */}
            <div className={`p-5 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              result.overallStatus === 'secure'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : result.overallStatus === 'warning'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-start gap-3.5">
                {result.overallStatus === 'secure' ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                ) : result.overallStatus === 'warning' ? (
                  <ShieldAlert className="w-8 h-8 text-amber-400 flex-shrink-0" />
                ) : (
                  <Shield className="w-8 h-8 text-rose-400 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-white font-mono">{result.domain}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      result.overallStatus === 'secure'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : result.overallStatus === 'warning'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}>
                      {result.summaryBadge}
                    </span>
                    {result.isDemo && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        Demo Simulation
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Inbound Mail Provider: <strong className="text-white">{result.mailProvider}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestAudit(result.domain)}
                className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <span>Request Professional Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick 3-Pillar Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* SPF Card */}
              <div
                onClick={() => setActiveTab('spf')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'spf'
                    ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">SPF RECORD</span>
                  {result.spf.found ? (
                    result.spf.exceedsLookupLimit || result.spf.warnings.length > 0 ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {result.spf.found ? (
                    result.spf.allPolicy ? (
                      <span>Policy: {result.spf.allPolicy}all</span>
                    ) : (
                      <span>Record Found</span>
                    )
                  ) : (
                    <span className="text-rose-400">Missing SPF</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {result.spf.found
                    ? `${result.spf.estimatedLookupCount} DNS lookups (~10 max)`
                    : 'Unprotected sender identity'}
                </div>
              </div>

              {/* DMARC Card */}
              <div
                onClick={() => setActiveTab('dmarc')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'dmarc'
                    ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">DMARC POLICY</span>
                  {result.dmarc.found ? (
                    result.dmarc.policy === 'reject' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {result.dmarc.found ? (
                    <span className="font-mono">p={result.dmarc.policy}</span>
                  ) : (
                    <span className="text-rose-400">Missing DMARC</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {result.dmarc.found
                    ? result.dmarc.policy === 'none'
                      ? 'Telemetry only (no enforcement)'
                      : `Enforced (${result.dmarc.percentage}%)`
                    : 'No receiver guidance or telemetry'}
                </div>
              </div>

              {/* DKIM Card */}
              <div
                onClick={() => setActiveTab('dkim')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'dkim'
                    ? 'border-cyan-500/80 bg-slate-900/90 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 tracking-wider font-mono">DKIM SELECTORS</span>
                  <Key className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {result.dkimTested.filter(d => d.found).length > 0 ? (
                    <span className="text-emerald-400">
                      {result.dkimTested.filter(d => d.found).length} Selector(s) Verified
                    </span>
                  ) : (
                    <span className="text-slate-300">Common Selectors Absent</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Tested {result.dkimTested.length} standard selector names
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-medium space-x-1 sm:space-x-4 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-cyan-400 text-cyan-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Key Takeaways
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('spf')}
                className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'spf'
                    ? 'border-cyan-400 text-cyan-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                SPF Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dmarc')}
                className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'dmarc'
                    ? 'border-cyan-400 text-cyan-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                DMARC Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dkim')}
                className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'dkim'
                    ? 'border-cyan-400 text-cyan-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                DKIM Selectors
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mx')}
                className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'mx'
                    ? 'border-cyan-400 text-cyan-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                MX Records
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Executive Summary & Security Findings</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {result.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Notice */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-300">Authentication Assessment Disclaimer:</strong>
                    <p className="mt-0.5 leading-relaxed">
                      DNS records provide essential sender identity verification. However, having a record present does not automatically guarantee 100% inbox placement or prevent all phishing. Email deliverability depends on sender reputation, recipient spam algorithms, content hygiene, and proper SPF/DKIM alignment across all third-party services.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: SPF */}
            {activeTab === 'spf' && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>SPF Record on {result.domain}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      Lookups: {result.spf.estimatedLookupCount} / 10 limit
                    </span>
                  </div>

                  {result.spf.rawRecord ? (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
                      {result.spf.rawRecord}
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
                      No TXT record starting with <code>v=spf1</code> was found on this domain.
                    </div>
                  )}

                  {result.spf.warnings.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {result.spf.warnings.map((w, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {result.spf.mechanisms.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Parsed Mechanisms ({result.spf.mechanisms.length})
                      </h5>
                      <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-lg overflow-hidden">
                        {result.spf.mechanisms.map((mech, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-950/40 text-xs flex items-center justify-between gap-2">
                            <span className="font-mono text-cyan-300 font-semibold">{mech.raw}</span>
                            <span className="text-slate-400 text-right">{mech.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: DMARC */}
            {activeTab === 'dmarc' && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>DMARC Record at _dmarc.{result.domain}</span>
                  </h4>

                  {result.dmarc.rawRecord ? (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
                      {result.dmarc.rawRecord}
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
                      No DMARC record found at _dmarc.{result.domain}. Receiving mail systems have no instruction for handling spoofed messages.
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block">Policy (p=)</span>
                      <strong className="text-white font-mono uppercase">{result.dmarc.policy}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block">Percentage (pct=)</span>
                      <strong className="text-white font-mono">{result.dmarc.percentage}%</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block">DKIM Align (adkim=)</span>
                      <strong className="text-white font-mono">{result.dmarc.adkim === 's' ? 'Strict' : 'Relaxed'}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-500 block">SPF Align (aspf=)</span>
                      <strong className="text-white font-mono">{result.dmarc.aspf === 's' ? 'Strict' : 'Relaxed'}</strong>
                    </div>
                  </div>

                  {result.dmarc.reportingAddresses.length > 0 && (
                    <div className="mt-3 p-3 bg-slate-950/60 rounded border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-1">RUA Telemetry Destination:</span>
                      <code className="text-cyan-300 font-mono">{result.dmarc.reportingAddresses.join(', ')}</code>
                    </div>
                  )}

                  {result.dmarc.recommendations.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Taroda Recommended Next Steps
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {result.dmarc.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400">→</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: DKIM */}
            {activeTab === 'dkim' && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Key className="w-4 h-4 text-cyan-400" />
                        <span>DKIM Selector Inspection</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        DKIM public keys are stored under <code>&lt;selector&gt;._domainkey.{result.domain}</code>.
                        DNS does not permit wildcard discovery; we test common industry selectors and your custom selector.
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden">
                    {result.dkimTested.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          {item.found ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
                          )}
                          <span className="font-mono font-bold text-white">{item.selector}._domainkey</span>
                        </div>
                        <div className="text-right">
                          {item.found ? (
                            <span className="text-emerald-400 font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/40">
                              Active {item.keyType} Key
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Not discovered</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-3 italic">
                    Note: If your email provider uses a unique selector (e.g. <code>k2</code>, <code>mandrill</code>, <code>scph0922</code>), use the custom selector field above to query it directly.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 5: MX */}
            {activeTab === 'mx' && (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span>Inbound Mail Exchangers (MX)</span>
                  </h4>

                  {result.mxRecords.length > 0 ? (
                    <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden">
                      {result.mxRecords.map((mx, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/60 flex items-center justify-between text-xs">
                          <span className="font-mono text-cyan-300">{mx.exchange}</span>
                          <span className="text-slate-400 font-mono">Priority: {mx.priority}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No MX records returned for this domain.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
