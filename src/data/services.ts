import { ServiceItem } from '../types';

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'spf',
    name: 'SPF Configuration & Optimization',
    tagline: 'Authorize legitimate email senders and eliminate DNS lookup limit errors.',
    badge: 'Sender Policy Framework',
    description: 'Sender Policy Framework (SPF) allows domain owners to publish a list of IP addresses and mail platforms authorized to send emails on their behalf. Taroda analyzes your entire outbound mail ecosystem, removes duplicate records, prevents syntax errors, and restructures records to keep you strictly under the RFC 10-lookup threshold.',
    benefits: [
      'Eliminates RFC 7208 10-lookup limit PermErrors that cause legitimate business emails to be flagged as spam.',
      'Prevents multiple SPF record conflicts when new SaaS platforms are onboarded.',
      'Explicitly protects your domain identity from unauthorized servers pretending to send from your domain.',
      'Clean consolidation of third-party vendors (Google Workspace, Microsoft 365, marketing platforms, invoicing systems).'
    ],
    included: [
      'Full inventory audit of all internal mailboxes and third-party sending applications.',
      'Analysis of nested includes, direct IPv4/IPv6 ranges, and DNS lookup counts.',
      'Resolution of deprecated mechanisms (e.g. ptr, mx wildcard bloat).',
      'Preparation of a unified, production-ready SPF record with ~all or -all enforcement.',
      'Post-implementation DNS validation and verification.'
    ],
    clientPrerequisites: [
      'List of known third-party SaaS vendors sending emails using your domain (e.g., Zendesk, HubSpot, QuickBooks, payroll).',
      'Administrative access to your domain DNS provider (Cloudflare, GoDaddy, Route 53, Namecheap, etc.) or internal IT delegate.'
    ],
    realisticScope: 'SPF alone does not validate the visible "From:" header in recipient mail clients, and SPF checks naturally break during automated email forwarding. It must be paired with DKIM and DMARC for comprehensive domain protection.',
    targetAudience: 'Companies adding multiple cloud tools or experiencing bounced messages and SPF PermError warnings.'
  },
  {
    id: 'dkim',
    name: 'DKIM Configuration & Verification',
    tagline: 'Cryptographic message signing that survives email forwarding and proves authenticity.',
    badge: 'DomainKeys Identified Mail',
    description: 'DKIM attaches an encrypted digital signature to outbound emails using public-key cryptography. When an email reaches the recipient, their server retrieves your public key from DNS to verify that the email originated from your domain and was not altered in transit.',
    benefits: [
      'Survives email forwarding without failing authentication (unlike SPF).',
      'Guarantees cryptographic integrity, ensuring no third party modified message content or attachments in transit.',
      'Enables full DMARC alignment for third-party platforms that send from custom domains.',
      'Increases positive sender reputation across major enterprise mail filters.'
    ],
    included: [
      'Generation and DNS publication of modern 2048-bit RSA or Ed25519 DKIM keys.',
      'Configuration of custom DKIM selectors for primary mail platforms (Google Workspace, Microsoft 365).',
      'Setup of custom CNAME/TXT selector delegations for marketing, billing, and transactional email providers.',
      'Verification of selector syntax, public key lengths, and header signature validity.',
      'Selector key rotation guidelines for ongoing security maintenance.'
    ],
    clientPrerequisites: [
      'Admin access to primary email hosting tenant to generate public/private key pairs.',
      'Admin access to third-party sending accounts to obtain vendor-specific selector strings.'
    ],
    realisticScope: 'DKIM verifies message integrity and signing domain authenticity. It does not dictate how receivers handle unsigned messages unless governed by a published DMARC policy.',
    targetAudience: 'Businesses sending invoices, contracts, proposals, or transactional notifications where message integrity is critical.'
  },
  {
    id: 'dmarc',
    name: 'DMARC Implementation & Policy Rollout',
    tagline: 'Take command of your domain identity with phased enforcement from p=none to p=reject.',
    badge: 'Domain-based Message Authentication',
    description: 'DMARC is the policy and reporting backbone of email security. It links SPF and DKIM to the domain in the visible "From:" header, instructs receiving servers how to handle unauthenticated emails, and delivers XML aggregate telemetry so you know exactly who is sending mail using your brand.',
    benefits: [
      'Provides full visibility into who is sending email under your domain name worldwide.',
      'Empowers you to instruct Gmail, Outlook, Yahoo, and corporate firewalls to reject (discard) fraudulent spoofed messages.',
      'Protects your customers, partners, and employees from direct-domain impersonation phishing.',
      'Complies with 2024+ sender authentication mandates enforced by Google and Yahoo.'
    ],
    included: [
      'Deployment of initial DMARC record at _dmarc with p=none and dedicated RUA/RUF telemetry endpoints.',
      'Ingestion and analysis of XML aggregate reports over a 30 to 60-day baseline period.',
      'Identification and alignment of shadow IT senders and rogue IP addresses.',
      'Structured rollout strategy: progression from p=none to p=quarantine, graduating to p=reject.',
      'Alignment parameter configuration (adkim, aspf, pct, and subdomain policies).'
    ],
    clientPrerequisites: [
      'Existing or newly configured SPF and DKIM records.',
      'Willingness to review telemetry findings during the monitoring phase prior to strict enforcement.'
    ],
    realisticScope: 'DMARC protects against exact-domain spoofing (e.g. sending as @yourcompany.com). It does not prevent lookalike domain spoofing (e.g. @y0urc0mpany.com) or compromised account takeovers, which require complementary perimeter and identity security.',
    targetAudience: 'Any business seeking to protect its brand reputation, customer trust, and executive identity from email forgery.'
  },
  {
    id: 'audit',
    name: 'Comprehensive Email Authentication Audit',
    tagline: 'In-depth diagnostic review of your DNS, sending systems, alignment status, and risk profile.',
    badge: 'Technical Diagnostic',
    description: 'A thorough, human-reviewed security audit of your organization\'s email infrastructure. Taroda inspects public DNS records, examines live email headers, identifies unaligned SaaS tools, and delivers a clear, prioritized remediation roadmap.',
    benefits: [
      'Uncovers hidden vulnerabilities before attackers exploit them for invoice fraud or impersonation.',
      'Delivers an executive-level summary suitable for leadership and board compliance reviews.',
      'Provides specific, copy-paste ready DNS records reviewed by email security engineers.',
      'Identifies why legitimate business emails may be landing in spam folders.'
    ],
    included: [
      'Examination of SPF records, lookup calculations, syntax modifiers, and fallback qualifiers.',
      'Inspection of known and discovered DKIM selectors, key lengths, and cryptographic algorithms.',
      'DMARC policy evaluation, alignment criteria, and reporting configuration.',
      'Analysis of MX hosts, reverse DNS (PTR) alignment, and TLS encryption in transit.',
      'Formal PDF Audit Report with findings, risk ratings, and a step-by-step remediation guide.'
    ],
    clientPrerequisites: [
      'Domain name(s) to be audited.',
      'Sample raw email header from a sent outbound business email.'
    ],
    realisticScope: 'Audits examine DNS records, mail configurations, and public mail server responses. They do not constitute an internal penetration test or source-code audit.',
    targetAudience: 'Organizations preparing for compliance reviews, cyber insurance renewals, or experiencing deliverability drops.'
  },
  {
    id: 'troubleshooting',
    name: 'Configuration Troubleshooting & Monitoring',
    tagline: 'Targeted investigation of delivery failures, DMARC alignment errors, and DNS conflicts.',
    badge: 'Troubleshooting & Support',
    description: 'When business emails suddenly bounce, get caught in recipient spam filters, or fail security checks on partner gateways, Taroda investigates the root technical cause and provides proven solutions.',
    benefits: [
      'Rapid root-cause identification for mysterious email delivery failures.',
      'Expert guidance when onboarding complex marketing automation tools (Marketo, HubSpot, Klaviyo).',
      'Ongoing monitoring where agreed to ensure new SaaS platforms don\'t silently break existing DMARC policies.',
      'Confidence that DNS changes are safely reviewed prior to live deployment.'
    ],
    included: [
      'Detailed header inspection and SMTP bounce code analysis.',
      'DNS conflict resolution and propagation tracking.',
      'Third-party sending service alignment verification.',
      'Emergency remediation for critical delivery disruptions.',
      'Optional ongoing monthly monitoring and XML report triage.'
    ],
    clientPrerequisites: [
      'Detailed descriptions of recent delivery failure symptoms and sample NDR/bounce messages.',
      'Access to test recipients or ability to send test diagnostics.'
    ],
    realisticScope: 'We diagnose and resolve email authentication and DNS configuration problems. We do not provide IT desktop helpdesk support or clean recipient blacklists caused by spam sending.',
    targetAudience: 'Companies dealing with urgent deliverability roadblocks or needing ongoing DNS authentication oversight.'
  }
];
