import { ResourceArticle } from '../types';

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'what-are-spf-dkim-dmarc',
    title: 'What Are SPF, DKIM, and DMARC? The Complete Business Guide',
    slug: 'what-are-spf-dkim-dmarc',
    readTime: '6 min read',
    category: 'Fundamentals',
    summary: 'A plain-English breakdown of the three pillars of email authentication and why modern businesses must implement all three in harmony.',
    publishedDate: '2026-10-01',
    authorRole: 'Taroda Security Advisory Staff',
    keyTakeaways: [
      'SPF defines who is permitted to send mail for your domain.',
      'DKIM adds a tamper-proof cryptographic signature to verify message integrity.',
      'DMARC ties SPF and DKIM together and tells receiving mail servers what to do if checks fail.',
      'Authentication significantly reduces domain spoofing, though it does not eliminate all phishing.'
    ],
    content: [
      'Email was invented decades ago without built-in identity verification. Anyone with basic networking knowledge could send an email with any "From:" address they chose. To solve this foundational flaw, three complementary standards were created: SPF, DKIM, and DMARC.',
      '1. Sender Policy Framework (SPF): SPF is a TXT record published in your domain\'s DNS. It acts like a guest list of IP addresses and third-party mail servers (such as Google Workspace, Microsoft 365, or Zendesk) that are authorized to send email on your behalf.',
      '2. DomainKeys Identified Mail (DKIM): DKIM uses asymmetric cryptography. Your sending mail server signs every outbound email with a private key. The receiving server looks up your public key in your DNS and mathematically confirms the email was not modified in transit.',
      '3. Domain-based Message Authentication, Reporting, and Conformance (DMARC): DMARC is the policy layer. Even with SPF and DKIM in place, receivers wouldn\'t know what action to take if an unauthorized message arrived. DMARC tells them: monitor (p=none), quarantine (p=quarantine), or outright reject (p=reject). It also instructs receivers to send XML aggregate reports back to you so you can see who is attempting to send on your behalf.'
    ]
  },
  {
    id: 'how-to-check-email-authentication',
    title: "How to Check Your Domain's Email Authentication",
    slug: 'how-to-check-email-authentication',
    readTime: '5 min read',
    category: 'Troubleshooting',
    summary: 'A step-by-step procedure to inspect your public DNS records using command-line tools or public web analyzers without risking domain downtime.',
    publishedDate: '2026-09-15',
    authorRole: 'Taroda Engineering Team',
    keyTakeaways: [
      'Inspect your root TXT records for v=spf1 and look for syntax errors.',
      'Check _dmarc.yourdomain.com for policy settings and valid rua reporting mailto links.',
      'Understand why DKIM selectors require specific queries rather than generic scans.',
      'Send a test email to examine raw Authentication-Results headers.'
    ],
    content: [
      'Before making any DNS changes, you must accurately assess your existing records. Public DNS is open, meaning anyone can look up the records protecting your domain.',
      'Method 1: Using the Command Line (dig or nslookup). Run `dig TXT yourcompany.com` to inspect your SPF record. To check DMARC, run `dig TXT _dmarc.yourcompany.com`. Look for `v=spf1` and `v=DMARC1;` respectively.',
      'Method 2: Inspecting Raw Headers. Send an email from your work address to an external account (e.g. personal Gmail or Outlook). Open the email, select "Show Original" or "View Message Details", and locate the `Authentication-Results:` header.',
      'Look for three distinct lines: `spf=pass`, `dkim=pass`, and `dmarc=pass`. If any line says `fail`, `neutral`, or `none`, your domain authentication has an active vulnerability or misconfiguration.'
    ]
  },
  {
    id: 'common-spf-record-errors',
    title: 'Common SPF Record Errors: The 10-Lookup Limit & Syntax Traps',
    slug: 'common-spf-record-errors',
    readTime: '7 min read',
    category: 'Troubleshooting',
    summary: 'Why multiple SPF records break delivery, how the RFC 10-DNS-lookup limit causes silent PermError failures, and how to optimize your records.',
    publishedDate: '2026-08-20',
    authorRole: 'Taroda Technical Consulting',
    keyTakeaways: [
      'Never publish multiple SPF records; combine all authorized senders into a single TXT entry.',
      'RFC 7208 mandates a strict 10 DNS lookup maximum during SPF evaluation.',
      'Nested includes from CRM, marketing, and ticketing tools rapidly trigger PermError.',
      'Avoid +all at all costs, as it explicitly authorizes the entire internet to spoof your domain.'
    ],
    content: [
      'SPF appears simple on the surface, but subtle technical RFC rules cause widespread delivery headaches for growing businesses.',
      'Trap 1: Multiple SPF Records. When adding a new service like HubSpot or SendGrid, non-technical admins often create a second TXT record starting with `v=spf1`. According to RFC 7208 section 3.2, if a domain has multiple SPF records, receiving mail servers must abort and return `PermError`. This causes legitimate emails to be marked as spam.',
      'Trap 2: The 10-Lookup Limit. During SPF evaluation, mechanisms that trigger a new DNS query (such as `include:`, `a`, `mx`, `redirect`) count against a hard limit of 10 lookups. If a single SaaS vendor includes three sub-includes internally, your lookup count climbs quickly. Exceeding 10 triggers PermError.',
      'Trap 3: The Danger of +all. An SPF record ending with `+all` literally tells the world: "Any computer on Earth is allowed to send email from my domain." This is worse than having no SPF record at all.'
    ]
  },
  {
    id: 'what-does-dmarc-policy-do',
    title: 'What Does a DMARC Policy Actually Do? (p=none vs quarantine vs reject)',
    slug: 'what-does-dmarc-policy-do',
    readTime: '6 min read',
    category: 'Policy Enforcement',
    summary: 'De-mystifying the three policy phases of DMARC and why setting p=none is only the starting line, not the finish line.',
    publishedDate: '2026-07-14',
    authorRole: 'Taroda Security Advisory Staff',
    keyTakeaways: [
      'p=none is monitoring mode; it collects telemetry but takes zero action against spoofed messages.',
      'p=quarantine moves unaligned emails to the recipient spam or junk folder.',
      'p=reject instructs receiving mail servers to discard unauthenticated emails before delivery.',
      'Never jump straight to p=reject without analyzing aggregate XML reports first.'
    ],
    content: [
      'Many business owners believe that having a DMARC record automatically protects their brand. However, the protection level depends entirely on the `p=` tag.',
      'Policy Level 1: p=none (Monitoring). At this level, if an attacker sends an email spoofing your CEO or billing department, the recipient\'s server still accepts and delivers the email into the user\'s inbox! The only benefit is that an XML report is generated.',
      'Policy Level 2: p=quarantine (Guarded). If an email fails DMARC, the receiver places it into the user\'s Spam or Quarantine folder. This provides protection while offering a safety net if a legitimate internal sender was accidentally misconfigured.',
      'Policy Level 3: p=reject (Strict Enforcement). Receivers drop spoofed emails immediately at the SMTP handshake. The malicious email never reaches the recipient. This is the gold standard for domain reputation protection.'
    ]
  },
  {
    id: 'why-legitimate-emails-fail-authentication',
    title: 'Why Legitimate Business Emails Can Fail Authentication',
    slug: 'why-legitimate-emails-fail-authentication',
    readTime: '8 min read',
    category: 'Troubleshooting',
    summary: 'Exploring DMARC alignment failures, email forwarding, automated billing systems, and third-party SaaS senders.',
    publishedDate: '2026-06-28',
    authorRole: 'Taroda Engineering Team',
    keyTakeaways: [
      'SPF authentication passes based on Return-Path, but DMARC alignment requires matching the visible From header.',
      'Automatic email forwarding breaks SPF because the forwarding server IP is not listed in your SPF record.',
      'DKIM survives email forwarding intact because the cryptographic signature travels inside the message headers.',
      'Third-party invoicing and CRM tools must have custom DKIM configured to align.'
    ],
    content: [
      'One of the most perplexing issues business managers encounter is discovering that their own genuine emails are failing authentication.',
      'The SPF Forwarding Dilemma: Imagine a client receives your email and has automatic forwarding set up to forward emails to their personal address. When their mail server re-sends your email, the sending IP address changes to their server\'s IP. Since their server is not in your SPF record, SPF checks fail immediately. This is why DKIM is indispensable: DKIM signatures survive forwarding without breaking.',
      'The DMARC Alignment Trap: An email can pass SPF technically while still failing DMARC. How? If your billing software sends an email from `invoices@quickbooks.com` as the envelope sender (Return-Path), SPF passes for quickbooks.com. But if the visible "From:" header says `billing@yourcompany.com`, the domain names do not align, causing DMARC to fail. Solving this requires configuring custom domain DKIM in each third-party tool.'
    ]
  },
  {
    id: 'how-to-prepare-domain-before-enforcing-dmarc',
    title: 'How to Prepare Your Domain Before Enforcing DMARC',
    slug: 'how-to-prepare-domain-before-enforcing-dmarc',
    readTime: '7 min read',
    category: 'Policy Enforcement',
    summary: 'A structured 5-step checklist to safely transition your organization to p=quarantine and p=reject without interrupting operations.',
    publishedDate: '2026-05-18',
    authorRole: 'Taroda Security Advisory Staff',
    keyTakeaways: [
      'Audit every department to uncover shadow IT sending tools (HR portals, marketing newsletters, CRM, ERP).',
      'Ingest and analyze aggregate RUA reports for a minimum of 4 consecutive weeks.',
      'Establish DKIM keys with 2048-bit key length for every identified sender.',
      'Use pct= percentages for progressive rollout (e.g. pct=25 -> pct=50 -> pct=100).'
    ],
    content: [
      'Enforcing DMARC `p=reject` is a powerful security milestone, but rushing it without preparation can accidentally block legitimate company invoices, password resets, or customer proposals.',
      'Step 1: Departmental Discovery. Ask your marketing, sales, accounting, and HR teams: "What online software sends emails to our clients or staff?" You will almost certainly discover platforms that IT was unaware of.',
      'Step 2: Collect Telemetry via p=none. Deploy `v=DMARC1; p=none; rua=mailto:...` and collect daily XML reports. These reports reveal the IP addresses of every server sending mail with your domain name.',
      'Step 3: Remediate and Align. For each legitimate sender identified in the telemetry, configure custom DKIM and update SPF. For unauthorized or rogue IPs, prepare to block them.',
      'Step 4: Phased Quarantine Rollout. Transition to `p=quarantine pct=20`. Monitor support queues for any delivery reports. Gradually increase `pct` to 50, then 100.',
      'Step 5: Lock Down with p=reject. Once reports show 99%+ alignment across all legitimate senders, advance to `p=reject`.'
    ]
  }
];
