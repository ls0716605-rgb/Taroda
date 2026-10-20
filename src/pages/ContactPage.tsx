import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Globe,
  Lock,
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Server
} from 'lucide-react';
import { LeadFormData, PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacy: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenPrivacy
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    domain: '',
    company: '',
    provider: 'Google Workspace',
    concern: 'Eliminating domain spoofing / phishing risks',
    message: '',
    preferredContact: 'email',
    consent: true,
    website_trap: '' // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<{
    leadId: string;
    message: string;
    details: { domain: string; contact: string; referenceId: string };
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        throw new Error(data.error || 'Submission failed.');
      }

      setSubmissionResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-cyan-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Consultation & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Talk to a Taroda Security Specialist
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Request a domain audit, ask a question regarding SPF lookup limits, or discuss our ongoing DMARC monitoring services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Office & Commitments */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#090E1A] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white">Direct Communications</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Inquiries:</strong>
                  <span className="text-cyan-300 font-mono">security@taroda.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Response Commitment:</strong>
                  <span className="text-slate-400">Within 1 business day for all domain audits</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Headquarters:</strong>
                  <span className="text-slate-400">Wilmington, Delaware, United States</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-400">
                What to Expect After Submitting:
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">1.</span>
                  <span>We inspect public DNS records for your domain (non-invasive).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">2.</span>
                  <span>We prepare a prioritized report of any syntax errors, lookup limits, or missing policies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">3.</span>
                  <span>You receive copy-paste ready recommendations with zero pressure.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p>
              We respect your confidentiality. We do not sell contact information or share audit telemetry with third parties.
            </p>
          </div>
        </div>

        {/* Right Column: Intake Form or Confirmation */}
        <div className="lg:col-span-7">
          <div className="bg-[#090E1A] p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl">
            {submissionResult ? (
              <div className="py-6 space-y-6 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Inquiry Successfully Recorded</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-left space-y-2.5 text-xs font-mono max-w-md mx-auto">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Tracking Reference:</span>
                    <span className="text-cyan-400 font-bold">{submissionResult.leadId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Domain Under Review:</span>
                    <span className="text-white">{submissionResult.details.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Notification Sent To:</span>
                    <span className="text-white">{submissionResult.details.contact}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmissionResult(null);
                    setFormData({
                      name: '',
                      email: '',
                      domain: '',
                      company: '',
                      provider: 'Google Workspace',
                      concern: 'Eliminating domain spoofing / phishing risks',
                      message: '',
                      preferredContact: 'email',
                      consent: true,
                      website_trap: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                  Domain Assessment Request Form
                </h3>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact_website_trap">Leave empty</label>
                  <input
                    type="text"
                    id="contact_website_trap"
                    value={formData.website_trap}
                    onChange={(e) => setFormData({ ...formData, website_trap: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jordan Reed"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                    />
                    {fieldErrors.name && <p className="text-rose-400 text-[11px] mt-1">{fieldErrors.name}</p>}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jordan@company.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-mono"
                    />
                    {fieldErrors.email && <p className="text-rose-400 text-[11px] mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Domain */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company Domain Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      placeholder="company.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-mono"
                    />
                    {fieldErrors.domain && <p className="text-rose-400 text-[11px] mt-1">{fieldErrors.domain}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company or Practice Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Healthcare Partners"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Email Provider */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business Email Hosting Provider
                    </label>
                    <select
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Google Workspace">Google Workspace</option>
                      <option value="Microsoft 365">Microsoft 365 / Exchange</option>
                      <option value="Proofpoint / Mimecast">Proofpoint / Mimecast</option>
                      <option value="Zoho Mail">Zoho Mail</option>
                      <option value="cPanel or Web Host">cPanel / Host Mail</option>
                      <option value="Not sure">Not sure / Custom server</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'phone' })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option value="email">Email Diagnostic Report</option>
                      <option value="phone">Brief Phone Review</option>
                    </select>
                  </div>
                </div>

                {/* Primary Concern */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    What is your primary concern?
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Eliminating domain spoofing / phishing risks">Eliminating domain spoofing & brand impersonation</option>
                    <option value="Fixing email deliverability / spam folder issues">Fixing deliverability / spam folder issues</option>
                    <option value="Meeting Google/Yahoo 2024 sender requirements">Meeting Google & Yahoo sender mandates</option>
                    <option value="Resolving SPF 10-lookup PermError failures">Resolving SPF 10-lookup PermError failures</option>
                    <option value="Configuring DKIM for third-party tools (CRM, invoicing)">Configuring DKIM for third-party tools (CRM, billing)</option>
                    <option value="Full multi-domain authentication audit">Full multi-domain email audit</option>
                  </select>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Specific Symptoms or Additional Context (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. We recently onboarded HubSpot and our invoices are being bounced by partner servers."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="page_consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    required
                    className="mt-1 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="page_consent" className="text-xs text-slate-400 leading-normal">
                    I authorize Taroda to inspect public DNS records for this domain and provide non-invasive recommendations. I agree to the{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-cyan-400 underline hover:text-cyan-300 inline"
                    >
                      Privacy Policy
                    </button>.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Logging Request to Taroda Engine...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Submit Domain Assessment Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
