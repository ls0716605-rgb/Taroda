import React, { useState } from 'react';
import {
  X,
  FileCheck,
  Download,
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  Calendar,
  Lock,
  Printer
} from 'lucide-react';

interface SampleAuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestAudit: () => void;
}

export const SampleAuditReportModal: React.FC<SampleAuditReportModalProps> = ({
  isOpen,
  onClose,
  onRequestAudit
}) => {
  const [tab, setTab] = useState<'summary' | 'dns' | 'alignment' | 'remediation'>('summary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#090E1A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-report-title"
      >
        {/* Document Top Bar */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="sample-report-title" className="text-sm sm:text-base font-bold text-white font-mono">
                  TARODA-AUDIT-SAMPLE-2026.pdf
                </h3>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive preview of a standard Taroda Domain Authentication Audit Deliverable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close report preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-2 flex items-center gap-4 text-xs font-medium overflow-x-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setTab('summary')}
            className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'summary' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Executive Summary & Risk Rating
          </button>
          <button
            type="button"
            onClick={() => setTab('dns')}
            className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'dns' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. DNS Record Inventory & Warnings
          </button>
          <button
            type="button"
            onClick={() => setTab('alignment')}
            className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'alignment' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. SaaS Alignment Matrix
          </button>
          <button
            type="button"
            onClick={() => setTab('remediation')}
            className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'remediation' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Phased Remediation Plan
          </button>
        </div>

        {/* Report Document Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
          {tab === 'summary' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Report Header Card */}
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Audit Target Domain</span>
                  <span className="text-base font-bold text-white font-mono">apexhealth-partners.com</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Sample Client: Healthcare Provider</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Overall Posture Rating</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> High Spoofing Risk (DMARC p=none)
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Prepared By</span>
                  <span className="text-sm font-semibold text-slate-200 block">Taroda Engineering Team</span>
                  <span className="text-xs text-slate-500">Delivered within standard SLA</span>
                </div>
              </div>

              {/* High-Level Findings */}
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Key Audit Findings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                    <strong className="text-rose-400 block mb-1">1. DMARC Set to Inactive Monitoring</strong>
                    <p className="text-slate-400 leading-relaxed">
                      DMARC policy is currently set to <code>p=none</code>. Spoofed emails appearing to originate from executive accounts or billing staff are not blocked by Google Workspace, Microsoft 365, or Yahoo receivers.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                    <strong className="text-amber-400 block mb-1">2. SPF Lookup Limit Exceeded (11/10)</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Cumulative SPF mechanisms trigger 11 DNS queries due to nested SaaS includes (Google, HubSpot, Zendesk, SendGrid). Intermittent PermError causes legitimate customer emails to route to spam.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                    <strong className="text-emerald-400 block mb-1">3. DKIM Present for Primary Mailbox</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Google Workspace DKIM is verified and cryptographically signed with 2048-bit RSA keys.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                    <strong className="text-amber-400 block mb-1">4. Unaligned Marketing Service</strong>
                    <p className="text-slate-400 leading-relaxed">
                      HubSpot sends marketing emails using a generic return-path without custom DKIM alignment, failing strict DMARC checks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'dns' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">Full DNS Record Inventory</h4>

                <div className="space-y-3 font-mono text-xs">
                  {/* SPF */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-slate-400 mb-1 text-[11px]">
                      <span>Host: apexhealth-partners.com (TXT)</span>
                      <span className="text-amber-400 font-bold">11 DNS Lookups (Exceeds RFC 7208)</span>
                    </div>
                    <p className="text-cyan-300 break-all">
                      v=spf1 include:_spf.google.com include:sendgrid.net include:mail.zendesk.com include:hubspotemail.net ~all
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 font-sans">
                      Taroda Recommendation: Flatten or eliminate legacy SendGrid include to restore total lookups to 7.
                    </p>
                  </div>

                  {/* DMARC */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-slate-400 mb-1 text-[11px]">
                      <span>Host: _dmarc.apexhealth-partners.com (TXT)</span>
                      <span className="text-amber-400">Monitoring Mode Only</span>
                    </div>
                    <p className="text-cyan-300 break-all">
                      v=DMARC1; p=none; sp=none; pct=100; rua=mailto:reports@apexhealth-partners.com
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 font-sans">
                      Taroda Recommendation: Route XML telemetry to Taroda analyzer; advance to p=quarantine on Week 3.
                    </p>
                  </div>

                  {/* DKIM Google */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-slate-400 mb-1 text-[11px]">
                      <span>Host: google._domainkey.apexhealth-partners.com (TXT)</span>
                      <span className="text-emerald-400">Valid 2048-bit Key</span>
                    </div>
                    <p className="text-slate-400 truncate">
                      v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3fJ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'alignment' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">SaaS Email Sender Alignment Matrix</h4>
                <p className="text-xs text-slate-400">
                  Every service sending mail on behalf of your domain must achieve alignment under DMARC before enforcing <code>p=reject</code>.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
                      <tr>
                        <th className="p-2.5">Sending System</th>
                        <th className="p-2.5">SPF Alignment</th>
                        <th className="p-2.5">DKIM Alignment</th>
                        <th className="p-2.5">DMARC Pass</th>
                        <th className="p-2.5">Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Google Workspace</td>
                        <td className="p-2.5 text-emerald-400">Pass (Aligned)</td>
                        <td className="p-2.5 text-emerald-400">Pass (Aligned)</td>
                        <td className="p-2.5 text-emerald-400 font-bold">PASS</td>
                        <td className="p-2.5 text-slate-400">None - Optimized</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">HubSpot Marketing</td>
                        <td className="p-2.5 text-rose-400">Fail (Return-Path unaligned)</td>
                        <td className="p-2.5 text-rose-400">Fail (Missing CNAME)</td>
                        <td className="p-2.5 text-rose-400 font-bold">FAIL</td>
                        <td className="p-2.5 text-cyan-300">Add 2x HubSpot DKIM CNAME records</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">Zendesk Support</td>
                        <td className="p-2.5 text-emerald-400">Pass (SPF include)</td>
                        <td className="p-2.5 text-slate-500">Unconfigured</td>
                        <td className="p-2.5 text-emerald-400 font-bold">PASS (via SPF)</td>
                        <td className="p-2.5 text-cyan-300">Add Zendesk DKIM to protect forwarded mail</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-white">QuickBooks Invoicing</td>
                        <td className="p-2.5 text-rose-400">Fail</td>
                        <td className="p-2.5 text-rose-400">Fail</td>
                        <td className="p-2.5 text-rose-400 font-bold">FAIL</td>
                        <td className="p-2.5 text-cyan-300">Switch invoice delivery to verified relay</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === 'remediation' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Taroda 4-Week Phased Remediation Roadmap
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-cyan-400 border border-slate-800">
                    <strong className="text-white block font-bold">Week 1: Hygiene & Telemetry Setup</strong>
                    <p className="text-slate-400 mt-0.5">
                      Prune unused SPF includes to solve the 10-lookup PermError. Establish centralized RUA aggregate reporting.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-blue-500 border border-slate-800">
                    <strong className="text-white block font-bold">Week 2: Third-Party Alignment Verification</strong>
                    <p className="text-slate-400 mt-0.5">
                      Configure custom DKIM selectors for HubSpot, Zendesk, and QuickBooks. Verify that all outbound SaaS sources pass cryptographic checks.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-amber-500 border border-slate-800">
                    <strong className="text-white block font-bold">Week 3: Soft Enforcement (p=quarantine)</strong>
                    <p className="text-slate-400 mt-0.5">
                      Promote DMARC policy to <code>p=quarantine pct=25</code>, scaling to <code>pct=100</code> after 5 days with zero legitimate delivery interruption.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-emerald-500 border border-slate-800">
                    <strong className="text-white block font-bold">Week 4: Full Enforcement (p=reject) & Final Verification</strong>
                    <p className="text-slate-400 mt-0.5">
                      Lock domain with <code>p=reject</code>. Deliver comprehensive completion report and ongoing monitoring guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-slate-400">
            Want this level of clarity for your organization's domain?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestAudit();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
            >
              Request Real Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
