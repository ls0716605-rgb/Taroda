import { IndustryItem } from '../types';

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'healthcare',
    name: 'Medical Practices & Healthcare Providers',
    subtitle: 'Protecting patient trust, safeguarding provider communications, and preventing invoice fraud.',
    riskProfile: 'High target for identity impersonation and business email compromise (BEC). Healthcare practices regularly exchange sensitive treatment plans, lab referrals, and patient billing statements via email.',
    whyItMatters: 'If your practice domain is spoofed, patients and insurance carriers can be tricked by fraudulent payment links or fake appointment notices. Modern email providers increasingly block emails from medical practices lacking verified SPF, DKIM, and DMARC records.',
    commonPitfalls: [
      'Practice management systems, telehealth platforms, and patient reminder services sending mail without proper DKIM alignment.',
      'Unmonitored SPF records exceeding 10 lookups due to multiple medical SaaS integrations.',
      'DMARC set to p=none indefinitely, leaving patients vulnerable to spoofed billing notices.'
    ],
    recommendedStrategy: 'Implement strict 2048-bit DKIM across practice management software, consolidate SPF records, and advance DMARC to p=quarantine and p=reject to ensure only authentic practice communications reach patients.',
    realWorldScenario: 'A regional orthopedic clinic discovers that patients received fake billing reminders demanding payment via wire transfer. The clinic had no DMARC record, allowing the attacker to spoof the practice\'s exact @orthoclinic-example.com domain without raising red flags.'
  },
  {
    id: 'home-services',
    name: 'Roofing & Home-Service Companies',
    subtitle: 'Securing high-dollar homeowner estimates, subcontractor invoices, and project deposits.',
    riskProfile: 'Frequent target for payment redirection schemes. Homeowners routinely receive five-figure roofing and remodeling estimates and deposit invoices via email.',
    whyItMatters: 'A homeowner receiving an email from your exact business domain with modified bank wiring details can result in devastating financial loss and severe damage to your local reputation. Legitimate estimate emails also get routed to spam folders if basic authentication is missing.',
    commonPitfalls: [
      'Field estimating software (e.g. JobNimbus, Roofr, Housecall Pro, QuickBooks) sending invoices from unaligned mail relays.',
      'Using consumer Gmail or ISP addresses alongside custom domain records without coordinated SPF authorization.',
      'Zero visibility into whether quotes and proposals are being delivered to homeowners or trapped in spam filters.'
    ],
    recommendedStrategy: 'Align estimating and accounting platforms with authenticated DKIM keys and publish an enforced DMARC policy so criminals cannot forge your company name when asking for project deposits.',
    realWorldScenario: 'A roofing contractor lost an $18,000 project deposit when a threat actor spoofed their domain to send updated wiring instructions to a homeowner the day before roofing materials were delivered.'
  },
  {
    id: 'professional-services',
    name: 'Professional Services (CPA, Legal & Wealth Management)',
    subtitle: 'Defending confidential client transactions, wire verifications, and advisory reputation.',
    riskProfile: 'Prime target for sophisticated executive impersonation and wire transfer fraud. CPAs and attorneys handle tax filings, escrow instructions, and proprietary financial filings.',
    whyItMatters: 'Clients expect uncompromising confidentiality and security. An unauthenticated domain allows attackers to impersonate senior partners or legal counsel during critical negotiations or tax season.',
    commonPitfalls: [
      'Multiple legacy domains, practice mergers, or subsidiary domains left completely unprotected without DMARC records.',
      'Client portal notification relays failing SPF alignment checks.',
      'Hesitation to move past p=none out of fear of breaking partner email delivery.'
    ],
    recommendedStrategy: 'Comprehensive multi-domain authentication audit, 4-week telemetry analysis, verified alignment of client portals, and strict enforcement of DMARC p=reject with automated alert reporting.',
    realWorldScenario: 'During a commercial real estate closing, a law firm\'s domain was spoofed to send fraudulent escrow wiring details. Because DMARC was not enforced, the buyer\'s email server accepted the spoofed email.'
  },
  {
    id: 'marketing-agencies',
    name: 'Marketing Agencies & High-Volume Senders',
    subtitle: 'Meeting 2024+ Google & Yahoo mandates, protecting client deliverability, and mastering alignment.',
    riskProfile: 'Vulnerable to reputation destruction and widespread inbox throttling. Agencies send newsletters, product announcements, and drip campaigns on behalf of diverse clients.',
    whyItMatters: 'Google and Yahoo require bulk senders to enforce SPF, DKIM, and DMARC with aligned domain identifiers. Failure to comply leads to immediate rate-limiting, spam placement, and domain reputation blacklisting.',
    commonPitfalls: [
      'Sending marketing emails with third-party return-paths that fail DMARC alignment checks.',
      'Bloated SPF records from adding multiple ESPs (Klaviyo, Mailchimp, ActiveCampaign, HubSpot) simultaneously.',
      'Inconsistent custom domain tracking links breaking cryptographic headers.'
    ],
    recommendedStrategy: 'Implement dedicated branded sending subdomains (e.g., news.client.com), configure custom DKIM selectors, and maintain 100% alignment across all client campaigns.',
    realWorldScenario: 'An agency launching a major holiday campaign for an e-commerce client experienced a 65% drop in open rates when Gmail throttled unaligned emails following the 2024 sender authentication guidelines.'
  },
  {
    id: 'small-business',
    name: 'Small & Medium Businesses (SMBs)',
    subtitle: 'Enterprise-grade domain protection without hiring an internal CISO or IT department.',
    riskProfile: 'Frequently targeted because threat actors know small businesses rarely have dedicated cybersecurity personnel to manage complex DNS configurations.',
    whyItMatters: 'Your business domain is your digital storefront. When customer inquiries, vendor orders, and employee emails get flagged as suspicious or blocked entirely, revenue stops and trust is eroded.',
    commonPitfalls: [
      'Assuming that purchasing Google Workspace or Microsoft 365 automatically sets up SPF, DKIM, and DMARC (it does not).',
      'Configuring a standard SPF record but never setting up DKIM or DMARC.',
      'No technical staff to interpret complex XML failure reports.'
    ],
    recommendedStrategy: 'Turnkey setup by Taroda engineers: we analyze your current setup, create verified copy-paste DNS records or configure them directly with your authorization, test the results, and deliver peace of mind.',
    realWorldScenario: 'A local plumbing supply distributor couldn\'t figure out why their invoices were consistently landing in customer spam folders for three months. A 30-minute Taroda audit revealed duplicate conflicting SPF records and an absent DMARC policy.'
  }
];
