import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Send,
  AlertCircle,
  CheckCircle2,
  Lock,
  Building,
  Mail,
  Globe,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { LeadFormData } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDomain?: string;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  prefilledDomain = ''
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    domain: prefilledDomain || '',
    company: '',
    provider: 'Google Workspace',
    concern: 'Eliminating domain spoofing / phishing risks',
    message: '',
    preferredContact: 'email',
    consent: true,
    website_trap: '' // honeypot
  });

  React.useEffect(() => {
    if (prefilledDomain) {
      setFormData(prev => ({ ...prev, domain: prefilledDomain }));
    }
  }, [prefilledDomain, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<{
    leadId: string;
    message: string;
    details: { domain: string; contact: string; referenceId: string };
  } | null>(null);

  if (!isOpen) return null;

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
        throw new Error(data.error || 'Failed to submit request.');
      }

      setSubmissionResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while connecting to the Taroda intake server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#090E1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 id="assessment-modal-title" className="text-base font-bold text-white">
                Request Free Email Security Check
              </h3>
              <p className="text-xs text-slate-400">
                100% confidential. No DNS write permissions requested.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submissionResult ? (
            /* Honest Backend Confirmation */
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Assessment Request Received</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {submissionResult.message}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-500">Reference ID:</span>
                  <span className="text-cyan-400 font-bold">{submissionResult.leadId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-500">Domain to Audit:</span>
                  <span className="text-white">{submissionResult.details.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Notification:</span>
                  <span className="text-white">{submissionResult.details.contact}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Honeypot field (hidden from genuine users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_trap">Leave this blank</label>
                <input
                  type="text"
                  id="website_trap"
                  name="website_trap"
                  value={formData.website_trap}
                  onChange={(e) => setFormData({ ...formData, website_trap: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Michael Vance"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                  />
                  {fieldErrors.name && <p className="text-rose-400 text-[11px] mt-0.5">{fieldErrors.name}</p>}
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Business Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="michael@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs font-mono"
                  />
                  {fieldErrors.email && <p className="text-rose-400 text-[11px] mt-0.5">{fieldErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Domain */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Domain to Protect <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs font-mono"
                  />
                  {fieldErrors.domain && <p className="text-rose-400 text-[11px] mt-0.5">{fieldErrors.domain}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Vance Financial LLC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email Provider */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Email Provider
                  </label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Google Workspace">Google Workspace</option>
                    <option value="Microsoft 365">Microsoft 365 / Exchange</option>
                    <option value="Proofpoint / Mimecast">Proofpoint / Mimecast Gateway</option>
                    <option value="Zoho Mail">Zoho Mail</option>
                    <option value="cPanel / Webhost Mail">cPanel / Host Mail</option>
                    <option value="Not sure">Not sure / Custom</option>
                  </select>
                </div>

                {/* Main Concern */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Concern
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Eliminating domain spoofing / phishing risks">Eliminating domain spoofing & impersonation</option>
                    <option value="Fixing email deliverability / spam folder issues">Fixing deliverability / spam issues</option>
                    <option value="Complying with Google/Yahoo 2024 mandates">Complying with Google/Yahoo mandates</option>
                    <option value="Third-party tool alignment (HubSpot, Salesforce, etc.)">Third-party tool alignment (HubSpot, etc.)</option>
                    <option value="Complete DNS email authentication audit">Complete DNS authentication audit</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Additional Notes or Specific Issues (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Our invoices were recently flagged as spam, or our CRM emails are failing DMARC alignment."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-400 leading-tight">
                  I authorize Taroda to inspect public DNS records for this domain and provide a non-invasive assessment. We respect your privacy and never sell contact information.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>Recording Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
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
  );
};
