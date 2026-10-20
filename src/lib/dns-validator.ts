/**
 * Taroda DNS and Email Authentication Validator
 * Pure logic module for domain normalization, SPF/DMARC/DKIM parsing, and security heuristics.
 */

export interface SpfMechanism {
  raw: string;
  type: 'include' | 'ip4' | 'ip6' | 'a' | 'mx' | 'ptr' | 'exists' | 'redirect' | 'all' | 'unknown';
  value?: string;
  qualifier: '+' | '-' | '~' | '?' ;
  description: string;
  causesDnsLookup: boolean;
}

export interface SpfAnalysis {
  found: boolean;
  rawRecord: string | null;
  recordsCount: number;
  mechanisms: SpfMechanism[];
  allPolicy: '+' | '-' | '~' | '?' | null;
  policyDescription: string;
  estimatedLookupCount: number;
  exceedsLookupLimit: boolean;
  warnings: string[];
  passedBasicSyntax: boolean;
}

export interface DmarcAnalysis {
  found: boolean;
  rawRecord: string | null;
  policy: 'none' | 'quarantine' | 'reject' | 'unknown';
  subdomainPolicy?: 'none' | 'quarantine' | 'reject';
  percentage: number;
  reportingAddresses: string[];
  forensicAddresses: string[];
  adkim: 'r' | 's'; // relaxed or strict
  aspf: 'r' | 's';  // relaxed or strict
  enforcementLevel: 'none' | 'partial' | 'full';
  warnings: string[];
  recommendations: string[];
}

export interface DkimSelectorResult {
  selector: string;
  found: boolean;
  rawRecord?: string;
  keyType?: string;
  keyLengthEstimate?: string;
  warnings: string[];
}

export interface DomainCheckResult {
  domain: string;
  timestamp: string;
  isDemo: boolean;
  mxRecords: Array<{ exchange: string; priority: number }>;
  mailProvider: string;
  spf: SpfAnalysis;
  dmarc: DmarcAnalysis;
  dkimTested: DkimSelectorResult[];
  overallStatus: 'secure' | 'warning' | 'critical' | 'informational';
  summaryBadge: string;
  keyTakeaways: string[];
}

/**
 * Normalizes and strictly validates a domain name.
 * Prevents SSRF, shell injection, invalid characters, and private IP/local domains.
 */
export function normalizeAndValidateDomain(input: string): { valid: boolean; domain: string; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, domain: '', error: 'Domain name is required.' };
  }

  let cleaned = input.trim().toLowerCase();

  // Strip protocol prefixes if typed
  cleaned = cleaned.replace(/^https?:\/\//i, '');
  // Strip trailing slashes or paths
  cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0];
  // Strip mailto: prefix
  cleaned = cleaned.replace(/^mailto:/i, '');
  // Strip trailing dot if present
  if (cleaned.endsWith('.')) {
    cleaned = cleaned.slice(0, -1);
  }

  if (cleaned.length === 0 || cleaned.length > 253) {
    return { valid: false, domain: cleaned, error: 'Domain length must be between 1 and 253 characters.' };
  }

  // Reject IP literals
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(cleaned) || cleaned.includes(':')) {
    return { valid: false, domain: cleaned, error: 'Please enter a valid domain name (e.g. yourcompany.com), not an IP address.' };
  }

  // Reject localhost, internal, test domains to prevent SSRF
  const blockedSuffixes = ['.local', '.localhost', '.internal', '.corp', '.home', '.lan', '.arpa', '.test', '.example', '.invalid'];
  if (cleaned === 'localhost' || blockedSuffixes.some(suffix => cleaned.endsWith(suffix))) {
    return { valid: false, domain: cleaned, error: 'Local or internal domains cannot be queried.' };
  }

  // Domain syntax regex check (RFC 1035 / RFC 1123)
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
  if (!domainRegex.test(cleaned)) {
    return { valid: false, domain: cleaned, error: 'Invalid domain format. Enter a valid standard domain like example.com.' };
  }

  return { valid: true, domain: cleaned };
}

/**
 * Parse and evaluate SPF TXT records for a domain.
 */
export function parseSpfRecord(txtRecords: string[]): SpfAnalysis {
  const spfRecords = txtRecords.filter(txt => txt.trim().toLowerCase().startsWith('v=spf1'));
  
  if (spfRecords.length === 0) {
    return {
      found: false,
      rawRecord: null,
      recordsCount: 0,
      mechanisms: [],
      allPolicy: null,
      policyDescription: 'No SPF record found. Email senders claiming to be your domain cannot be verified.',
      estimatedLookupCount: 0,
      exceedsLookupLimit: false,
      warnings: ['Domain lacks an SPF record. Unauthorized senders can spoof your domain with no sender verification.'],
      passedBasicSyntax: false
    };
  }

  const rawRecord = spfRecords[0].trim();
  const warnings: string[] = [];

  if (spfRecords.length > 1) {
    warnings.push('CRITICAL: Multiple SPF records detected. RFC 7208 specifies that domains MUST NOT have more than one SPF record. Having multiple SPF records causes authentication to return PermError.');
  }

  const tokens = rawRecord.split(/\s+/).slice(1); // skip 'v=spf1'
  const mechanisms: SpfMechanism[] = [];
  let estimatedLookupCount = 0;
  let allPolicy: '+' | '-' | '~' | '?' | null = null;

  for (const token of tokens) {
    if (!token) continue;

    let qualifier: '+' | '-' | '~' | '?' = '+';
    let term = token;

    if (['+', '-', '~', '?'].includes(token[0])) {
      qualifier = token[0] as '+' | '-' | '~' | '?';
      term = token.slice(1);
    }

    const lowerTerm = term.toLowerCase();

    if (lowerTerm.startsWith('include:')) {
      const target = term.slice(8);
      estimatedLookupCount += 1;
      mechanisms.push({
        raw: token,
        type: 'include',
        value: target,
        qualifier,
        description: `Includes authorized senders defined in ${target}`,
        causesDnsLookup: true
      });
    } else if (lowerTerm.startsWith('ip4:')) {
      mechanisms.push({
        raw: token,
        type: 'ip4',
        value: term.slice(4),
        qualifier,
        description: `Authorizes IPv4 address or CIDR range: ${term.slice(4)}`,
        causesDnsLookup: false
      });
    } else if (lowerTerm.startsWith('ip6:')) {
      mechanisms.push({
        raw: token,
        type: 'ip6',
        value: term.slice(4),
        qualifier,
        description: `Authorizes IPv6 address or CIDR range: ${term.slice(4)}`,
        causesDnsLookup: false
      });
    } else if (lowerTerm === 'a' || lowerTerm.startsWith('a:')) {
      estimatedLookupCount += 1;
      mechanisms.push({
        raw: token,
        type: 'a',
        value: lowerTerm.startsWith('a:') ? term.slice(2) : undefined,
        qualifier,
        description: 'Authorizes the A / AAAA record of the domain',
        causesDnsLookup: true
      });
    } else if (lowerTerm === 'mx' || lowerTerm.startsWith('mx:')) {
      estimatedLookupCount += 1;
      mechanisms.push({
        raw: token,
        type: 'mx',
        value: lowerTerm.startsWith('mx:') ? term.slice(3) : undefined,
        qualifier,
        description: 'Authorizes inbound MX servers to also send outbound email',
        causesDnsLookup: true
      });
    } else if (lowerTerm.startsWith('redirect=')) {
      estimatedLookupCount += 1;
      mechanisms.push({
        raw: token,
        type: 'redirect',
        value: term.slice(9),
        qualifier: '+',
        description: `Redirects SPF evaluation to ${term.slice(9)}`,
        causesDnsLookup: true
      });
    } else if (lowerTerm === 'all') {
      allPolicy = qualifier;
      mechanisms.push({
        raw: token,
        type: 'all',
        qualifier,
        description: `Default fallback rule for all other senders (${qualifier}all)`,
        causesDnsLookup: false
      });
    } else if (lowerTerm === 'ptr' || lowerTerm.startsWith('ptr:')) {
      estimatedLookupCount += 1;
      warnings.push('The "ptr" mechanism is deprecated in RFC 7208 and should not be used in modern SPF records.');
      mechanisms.push({
        raw: token,
        type: 'ptr',
        qualifier,
        description: 'Deprecated PTR lookup mechanism',
        causesDnsLookup: true
      });
    } else {
      mechanisms.push({
        raw: token,
        type: 'unknown',
        qualifier,
        description: `Custom or modifier mechanism: ${token}`,
        causesDnsLookup: false
      });
    }
  }

  // Heuristic checks
  if (allPolicy === '+') {
    warnings.push('CRITICAL RISK: SPF ends with "+all". This explicitly authorizes ANY mail server in the world to send on behalf of your domain!');
  } else if (allPolicy === '?') {
    warnings.push('Neutral policy "?all" does not advise receiving servers to treat unauthorized senders as suspicious.');
  } else if (!allPolicy) {
    warnings.push('Record does not specify a terminating "all" mechanism (e.g. ~all or -all). Senders not matching explicit rules will not receive a definitive evaluation.');
  }

  if (estimatedLookupCount > 10) {
    warnings.push(`EXCEEDED LOOKUP LIMIT: This record contains ~${estimatedLookupCount} direct DNS lookup mechanisms. RFC 7208 limits SPF evaluations to a maximum of 10 DNS lookups. Receivers will fail authentication with PermError.`);
  } else if (estimatedLookupCount >= 8) {
    warnings.push(`High lookup count: ~${estimatedLookupCount} DNS lookups. Close to the strict RFC limit of 10.`);
  }

  let policyDescription = 'Valid SPF record detected.';
  if (allPolicy === '-') policyDescription = 'Strict HardFail (-all): Only explicitly authorized senders may deliver mail.';
  else if (allPolicy === '~') policyDescription = 'SoftFail (~all): Recommended transition standard for DMARC alignment.';
  else if (allPolicy === '?') policyDescription = 'Neutral (?all): Senders not listed are treated as untrusted but not explicitly failed.';
  else if (allPolicy === '+') policyDescription = 'Permissive (+all): Severe security hazard.';

  return {
    found: true,
    rawRecord,
    recordsCount: spfRecords.length,
    mechanisms,
    allPolicy,
    policyDescription,
    estimatedLookupCount,
    exceedsLookupLimit: estimatedLookupCount > 10,
    warnings,
    passedBasicSyntax: warnings.filter(w => w.startsWith('CRITICAL')).length === 0
  };
}

/**
 * Parse and evaluate DMARC TXT record for a domain.
 */
export function parseDmarcRecord(txtRecords: string[]): DmarcAnalysis {
  const dmarcRecords = txtRecords.filter(txt => txt.trim().toLowerCase().startsWith('v=dmarc1'));

  if (dmarcRecords.length === 0) {
    return {
      found: false,
      rawRecord: null,
      policy: 'unknown',
      percentage: 100,
      reportingAddresses: [],
      forensicAddresses: [],
      adkim: 'r',
      aspf: 'r',
      enforcementLevel: 'none',
      warnings: ['No DMARC record found at _dmarc.<domain>. Without DMARC, receiving servers cannot enforce SPF/DKIM policies or report spoofing attempts.'],
      recommendations: [
        'Deploy a starter DMARC record with p=none and a dedicated rua= reporting address to monitor all outbound email traffic without risk of blocking legitimate email.',
        'Review DMARC XML aggregate reports for 4-8 weeks to identify all authorized sending services (Google Workspace, Microsoft 365, marketing platforms, invoicing tools).',
        'Gradually advance policy to p=quarantine, then p=reject once alignment is verified.'
      ]
    };
  }

  const rawRecord = dmarcRecords[0].trim();
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (dmarcRecords.length > 1) {
    warnings.push('CRITICAL: Multiple DMARC records detected. Receivers will ignore all DMARC records and treat the domain as having no DMARC policy.');
  }

  // Parse tag=value pairs
  const tags: Record<string, string> = {};
  const pairs = rawRecord.split(';');

  for (const pair of pairs) {
    const parts = pair.trim().split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim().toLowerCase();
      const val = parts.slice(1).join('=').trim();
      tags[key] = val;
    }
  }

  const p = (tags['p'] || '').toLowerCase();
  let policy: 'none' | 'quarantine' | 'reject' | 'unknown' = 'unknown';
  if (p === 'none' || p === 'quarantine' || p === 'reject') {
    policy = p;
  }

  const sp = tags['sp'] ? (tags['sp'].toLowerCase() as 'none' | 'quarantine' | 'reject') : undefined;
  const pct = tags['pct'] ? parseInt(tags['pct'], 10) : 100;
  const adkim = tags['adkim']?.toLowerCase() === 's' ? 's' : 'r';
  const aspf = tags['aspf']?.toLowerCase() === 's' ? 's' : 'r';

  const ruaAddresses = tags['rua']
    ? tags['rua'].split(',').map(s => s.trim().replace(/^mailto:/i, '')).filter(Boolean)
    : [];

  const rufAddresses = tags['ruf']
    ? tags['ruf'].split(',').map(s => s.trim().replace(/^mailto:/i, '')).filter(Boolean)
    : [];

  let enforcementLevel: 'none' | 'partial' | 'full' = 'none';

  if (policy === 'reject') {
    enforcementLevel = pct === 100 ? 'full' : 'partial';
  } else if (policy === 'quarantine') {
    enforcementLevel = 'partial';
  } else {
    enforcementLevel = 'none';
  }

  if (policy === 'none') {
    warnings.push('Monitoring Only (p=none): Receiving servers will not block or quarantine unauthorized emails spoofing your domain.');
    recommendations.push('Once your aggregate reports show all legitimate senders are aligned, plan a scheduled transition to p=quarantine.');
  } else if (policy === 'quarantine') {
    recommendations.push('Domain is enforcing quarantine. Verify low false-positive rates before graduating to p=reject.');
  } else if (policy === 'reject') {
    recommendations.push('Maximum domain protection active (p=reject). Unaligned emails claiming your domain will be rejected by compliant mail servers.');
  }

  if (ruaAddresses.length === 0) {
    warnings.push('Missing rua= tag: No aggregate reporting destination configured. You have zero visibility into who is sending email on your domain.');
    recommendations.push('Add an rua=mailto:dmarc-reports@yourdomain.com destination to collect XML telemetry reports.');
  }

  if (pct < 100 && policy !== 'none') {
    warnings.push(`Partial enforcement: Policy applies to only ${pct}% of unaligned messages (pct=${pct}).`);
  }

  return {
    found: true,
    rawRecord,
    policy,
    subdomainPolicy: sp,
    percentage: isNaN(pct) ? 100 : pct,
    reportingAddresses: ruaAddresses,
    forensicAddresses: rufAddresses,
    adkim,
    aspf,
    enforcementLevel,
    warnings,
    recommendations
  };
}

/**
 * Identify likely email service provider from MX records.
 */
export function identifyMailProvider(mxRecords: Array<{ exchange: string; priority: number }>): string {
  if (!mxRecords || mxRecords.length === 0) {
    return 'No inbound mail servers (MX) detected';
  }

  const hosts = mxRecords.map(m => m.exchange.toLowerCase()).join(' ');

  if (hosts.includes('google.com') || hosts.includes('googlemail.com') || hosts.includes('aspmx.l.google.com')) {
    return 'Google Workspace / Gmail for Business';
  }
  if (hosts.includes('outlook.com') || hosts.includes('protection.outlook.com') || hosts.includes('office365.com')) {
    return 'Microsoft 365 / Exchange Online';
  }
  if (hosts.includes('mimecast.com')) {
    return 'Mimecast Email Security Gateway';
  }
  if (hosts.includes('pphosted.com') || hosts.includes('proofpoint.com')) {
    return 'Proofpoint Email Protection';
  }
  if (hosts.includes('barracudanetworks.com')) {
    return 'Barracuda Email Security Gateway';
  }
  if (hosts.includes('zoho.com')) {
    return 'Zoho Mail';
  }
  if (hosts.includes('protonmail.ch') || hosts.includes('proton.me')) {
    return 'Proton Mail';
  }
  if (hosts.includes('fastmail.com')) {
    return 'Fastmail';
  }
  if (hosts.includes('mailgun.org')) {
    return 'Mailgun Transactional Service';
  }
  if (hosts.includes('sendgrid.net')) {
    return 'SendGrid by Twilio';
  }

  return 'Custom or Private Mail Server (' + mxRecords[0].exchange + ')';
}

/**
 * Validate lead intake form submissions
 */
export function validateLeadSubmission(body: Record<string, any>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Honeypot check
  if (body.website_trap && String(body.website_trap).trim().length > 0) {
    return { valid: false, errors: { form: 'Submission rejected by anti-spam filter.' } };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!body.domain || typeof body.domain !== 'string') {
    errors.domain = 'Company domain is required.';
  } else {
    const domainCheck = normalizeAndValidateDomain(body.domain);
    if (!domainCheck.valid) {
      errors.domain = domainCheck.error || 'Please enter a valid domain name.';
    }
  }

  if (body.company && typeof body.company === 'string' && body.company.length > 100) {
    errors.company = 'Company name is too long.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
