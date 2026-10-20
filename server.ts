import express, { Request, Response } from 'express';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  normalizeAndValidateDomain,
  parseSpfRecord,
  parseDmarcRecord,
  identifyMailProvider,
  validateLeadSubmission,
  DkimSelectorResult
} from './src/lib/dns-validator.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count++;
  return true;
}

// In-memory lead storage for demonstration & review
interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  domain: string;
  company?: string;
  provider?: string;
  concern?: string;
  message?: string;
  preferredContact?: string;
  consent: boolean;
  ip: string;
}
const leadsDatabase: LeadRecord[] = [];

// Helper to query TXT records with a strict timeout
async function safeResolveTxt(hostname: string, timeoutMs = 3500): Promise<string[]> {
  const queryPromise = dns.promises.resolveTxt(hostname)
    .then(records => records.map(chunks => chunks.join('')))
    .catch((err: any) => {
      // Standard DNS errors indicating no record
      if (['ENOTFOUND', 'ENODATA', 'SERVFAIL', 'NXDOMAIN', 'EREFUSED'].includes(err.code)) {
        return [];
      }
      return [];
    });

  const timeoutPromise = new Promise<string[]>((resolve) => {
    setTimeout(() => resolve([]), timeoutMs);
  });

  return Promise.race([queryPromise, timeoutPromise]);
}

// Helper to query MX records with timeout
async function safeResolveMx(hostname: string, timeoutMs = 3500): Promise<dns.MxRecord[]> {
  const queryPromise = dns.promises.resolveMx(hostname)
    .catch(() => [] as dns.MxRecord[]);

  const timeoutPromise = new Promise<dns.MxRecord[]>((resolve) => {
    setTimeout(() => resolve([]), timeoutMs);
  });

  return Promise.race([queryPromise, timeoutPromise]);
}

// Sample presets for demo/sandbox mode when users want to test without typing
const DEMO_PRESETS: Record<string, any> = {
  'demo-unsecured.com': {
    domain: 'demo-unsecured.com',
    isDemo: true,
    mailProvider: 'Google Workspace / Gmail for Business',
    mxRecords: [{ exchange: 'aspmx.l.google.com', priority: 1 }],
    spf: {
      found: false,
      rawRecord: null,
      recordsCount: 0,
      mechanisms: [],
      allPolicy: null,
      policyDescription: 'No SPF record found. Senders cannot be verified.',
      estimatedLookupCount: 0,
      exceedsLookupLimit: false,
      warnings: ['Domain lacks an SPF record. Anyone can send forged emails claiming to be demo-unsecured.com.'],
      passedBasicSyntax: false
    },
    dmarc: {
      found: false,
      rawRecord: null,
      policy: 'unknown',
      percentage: 100,
      reportingAddresses: [],
      forensicAddresses: [],
      adkim: 'r',
      aspf: 'r',
      enforcementLevel: 'none',
      warnings: ['No DMARC record found at _dmarc.demo-unsecured.com. No authentication enforcement.'],
      recommendations: ['Create a DMARC record starting with p=none to gain visibility.']
    },
    dkimTested: [
      { selector: 'google', found: false, warnings: ['Selector google._domainkey not found'] },
      { selector: 'k1', found: false, warnings: ['Selector k1._domainkey not found'] }
    ],
    overallStatus: 'critical',
    summaryBadge: 'High Spoofing Risk',
    keyTakeaways: [
      'Zero email authentication configured.',
      'Vulnerable to direct-domain sender spoofing in employee or client inboxes.',
      'Immediate risk of domain reputation damage and phishing impersonation.'
    ]
  },
  'demo-monitoring.com': {
    domain: 'demo-monitoring.com',
    isDemo: true,
    mailProvider: 'Microsoft 365 / Exchange Online',
    mxRecords: [{ exchange: 'demomonitoring-com.mail.protection.outlook.com', priority: 0 }],
    spf: {
      found: true,
      rawRecord: 'v=spf1 include:spf.protection.outlook.com include:sendgrid.net ~all',
      recordsCount: 1,
      mechanisms: [
        { raw: 'include:spf.protection.outlook.com', type: 'include', value: 'spf.protection.outlook.com', qualifier: '+', description: 'Authorizes Microsoft 365', causesDnsLookup: true },
        { raw: 'include:sendgrid.net', type: 'include', value: 'sendgrid.net', qualifier: '+', description: 'Authorizes SendGrid', causesDnsLookup: true },
        { raw: '~all', type: 'all', qualifier: '~', description: 'SoftFail (~all) default fallback', causesDnsLookup: false }
      ],
      allPolicy: '~',
      policyDescription: 'SoftFail (~all) active.',
      estimatedLookupCount: 2,
      exceedsLookupLimit: false,
      warnings: [],
      passedBasicSyntax: true
    },
    dmarc: {
      found: true,
      rawRecord: 'v=DMARC1; p=none; rua=mailto:dmarc-reports@demo-monitoring.com; pct=100',
      policy: 'none',
      percentage: 100,
      reportingAddresses: ['dmarc-reports@demo-monitoring.com'],
      forensicAddresses: [],
      adkim: 'r',
      aspf: 'r',
      enforcementLevel: 'none',
      warnings: ['Monitoring Only (p=none): Receiving mail servers will NOT block spoofed emails from this domain.'],
      recommendations: [
        'Review RUA telemetry reports for legitimate unaligned senders.',
        'Plan progression from p=none to p=quarantine once alignment exceeds 98%.'
      ]
    },
    dkimTested: [
      { selector: 'selector1', found: true, rawRecord: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...', warnings: [] }
    ],
    overallStatus: 'warning',
    summaryBadge: 'Monitoring Mode Only',
    keyTakeaways: [
      'SPF and DKIM are established, but DMARC is set to p=none.',
      'Spoofed messages are monitored via reports, but still delivered to recipient inboxes.',
      'Ready for Taroda-guided policy enforcement transition.'
    ]
  },
  'demo-secured.com': {
    domain: 'demo-secured.com',
    isDemo: true,
    mailProvider: 'Google Workspace / Gmail for Business',
    mxRecords: [{ exchange: 'aspmx.l.google.com', priority: 1 }],
    spf: {
      found: true,
      rawRecord: 'v=spf1 include:_spf.google.com ~all',
      recordsCount: 1,
      mechanisms: [
        { raw: 'include:_spf.google.com', type: 'include', value: '_spf.google.com', qualifier: '+', description: 'Authorizes Google Workspace mail servers', causesDnsLookup: true },
        { raw: '~all', type: 'all', qualifier: '~', description: 'SoftFail default fallback', causesDnsLookup: false }
      ],
      allPolicy: '~',
      policyDescription: 'Optimized SPF with single authorized provider.',
      estimatedLookupCount: 1,
      exceedsLookupLimit: false,
      warnings: [],
      passedBasicSyntax: true
    },
    dmarc: {
      found: true,
      rawRecord: 'v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@taroda-managed.com; aspf=s; adkim=s',
      policy: 'reject',
      subdomainPolicy: 'reject',
      percentage: 100,
      reportingAddresses: ['dmarc-rua@taroda-managed.com'],
      forensicAddresses: [],
      adkim: 's',
      aspf: 's',
      enforcementLevel: 'full',
      warnings: [],
      recommendations: ['Maintain continuous monitoring of third-party SaaS senders to avoid accidental alignment breaks.']
    },
    dkimTested: [
      { selector: 'google', found: true, rawRecord: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCg...', warnings: [] }
    ],
    overallStatus: 'secure',
    summaryBadge: 'Strictly Enforced (p=reject)',
    keyTakeaways: [
      'Optimal email authentication configuration.',
      'DMARC p=reject instructs worldwide mail receivers to discard spoofed emails immediately.',
      'SPF and DKIM are strictly aligned.'
    ]
  }
};

// DNS Check Endpoint
app.get('/api/dns-check', async (req: Request, res: Response): Promise<void> => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute before running another DNS check.' });
    return;
  }

  const rawDomain = req.query.domain as string;
  const customSelector = req.query.selector as string | undefined;

  const validation = normalizeAndValidateDomain(rawDomain);
  if (!validation.valid) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const domain = validation.domain;

  // Check demo presets first if requested
  if (DEMO_PRESETS[domain]) {
    res.json({
      ...DEMO_PRESETS[domain],
      timestamp: new Date().toISOString()
    });
    return;
  }

  try {
    // 1. Resolve TXT records on root domain for SPF
    const rootTxtRecords = await safeResolveTxt(domain);
    const spfAnalysis = parseSpfRecord(rootTxtRecords);

    // 2. Resolve TXT records at _dmarc.<domain>
    const dmarcHostname = `_dmarc.${domain}`;
    const dmarcTxtRecords = await safeResolveTxt(dmarcHostname);
    const dmarcAnalysis = parseDmarcRecord(dmarcTxtRecords);

    // 3. Resolve MX records
    const mxRecords = await safeResolveMx(domain);
    const mailProvider = identifyMailProvider(mxRecords);

    // 4. Test DKIM selectors
    const selectorsToTest = ['google', 'k1', 'default', 's1', 'selector1', 'mail'];
    if (customSelector && customSelector.trim()) {
      const cleanSelector = customSelector.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
      if (cleanSelector && !selectorsToTest.includes(cleanSelector)) {
        selectorsToTest.unshift(cleanSelector);
      }
    }

    const dkimTested: DkimSelectorResult[] = [];
    // Query selectors concurrently with timeout limit
    await Promise.all(
      selectorsToTest.slice(0, 5).map(async (selector) => {
        const dkimHost = `${selector}._domainkey.${domain}`;
        const records = await safeResolveTxt(dkimHost, 2500);
        const dkimRecord = records.find(r => r.toLowerCase().includes('v=dkim1') || r.toLowerCase().includes('k=rsa') || r.toLowerCase().includes('p='));
        if (dkimRecord) {
          dkimTested.push({
            selector,
            found: true,
            rawRecord: dkimRecord,
            keyType: dkimRecord.includes('k=ed25519') ? 'Ed25519' : 'RSA',
            warnings: []
          });
        } else {
          dkimTested.push({
            selector,
            found: false,
            warnings: [`No TXT record found at ${selector}._domainkey.${domain}`]
          });
        }
      })
    );

    // Calculate overall domain security status
    let overallStatus: 'secure' | 'warning' | 'critical' | 'informational' = 'informational';
    let summaryBadge = 'Unconfigured';
    const keyTakeaways: string[] = [];

    if (!spfAnalysis.found && !dmarcAnalysis.found) {
      overallStatus = 'critical';
      summaryBadge = 'Critical: No Authentication';
      keyTakeaways.push('No SPF or DMARC records were discovered for this domain.');
      keyTakeaways.push('Any sender anywhere can forge your domain in the "From:" header.');
      keyTakeaways.push('High vulnerability to business email compromise (BEC) and client spoofing.');
    } else if (!dmarcAnalysis.found || dmarcAnalysis.policy === 'none') {
      overallStatus = 'warning';
      summaryBadge = dmarcAnalysis.found ? 'Monitoring Only (p=none)' : 'Missing DMARC Protection';
      if (!dmarcAnalysis.found) {
        keyTakeaways.push('SPF is present, but missing DMARC means receivers cannot enforce SPF/DKIM validation.');
      } else {
        keyTakeaways.push('DMARC policy is set to "p=none", which provides reporting but zero active protection against spoofing.');
      }
      if (spfAnalysis.exceedsLookupLimit) {
        keyTakeaways.push('SPF exceeds the RFC 10-lookup limit and will fail authentication intermittently.');
      }
      keyTakeaways.push('Gradual policy enforcement recommended to reach p=quarantine or p=reject.');
    } else if (dmarcAnalysis.policy === 'reject' || dmarcAnalysis.policy === 'quarantine') {
      overallStatus = 'secure';
      summaryBadge = dmarcAnalysis.policy === 'reject' ? 'Enforced (p=reject)' : 'Guarded (p=quarantine)';
      keyTakeaways.push(`Active DMARC policy (${dmarcAnalysis.policy}) enforces receiver rejection of fraudulent senders.`);
      if (spfAnalysis.found) keyTakeaways.push('SPF record is properly established.');
      if (dmarcAnalysis.reportingAddresses.length > 0) {
        keyTakeaways.push(`Aggregate reports are routed to: ${dmarcAnalysis.reportingAddresses.join(', ')}`);
      }
    }

    res.json({
      domain,
      timestamp: new Date().toISOString(),
      isDemo: false,
      mxRecords,
      mailProvider,
      spf: spfAnalysis,
      dmarc: dmarcAnalysis,
      dkimTested,
      overallStatus,
      summaryBadge,
      keyTakeaways
    });
  } catch (err: any) {
    res.status(500).json({
      error: 'DNS lookup failed due to network timeout or resolver issue.',
      detail: err?.message || 'Unknown DNS resolution error'
    });
  }
});

// Lead Submission & Audit Request Endpoint
app.post('/api/leads', (req: Request, res: Response): void => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({ error: 'Too many submissions. Please wait a moment.' });
    return;
  }

  const validation = validateLeadSubmission(req.body);
  if (!validation.valid) {
    res.status(400).json({ error: 'Validation failed', fieldErrors: validation.errors });
    return;
  }

  const leadId = 'TAR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const newLead: LeadRecord = {
    id: leadId,
    createdAt: new Date().toISOString(),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    domain: req.body.domain.trim(),
    company: req.body.company ? req.body.company.trim() : undefined,
    provider: req.body.provider ? req.body.provider.trim() : undefined,
    concern: req.body.concern ? req.body.concern.trim() : undefined,
    message: req.body.message ? req.body.message.trim() : undefined,
    preferredContact: req.body.preferredContact || 'email',
    consent: Boolean(req.body.consent),
    ip: clientIp
  };

  leadsDatabase.push(newLead);

  res.json({
    success: true,
    leadId,
    timestamp: newLead.createdAt,
    message: 'Your email authentication inquiry has been securely recorded. A Taroda security specialist will inspect your public domain records and provide clear recommendations within 1 business day.',
    details: {
      domain: newLead.domain,
      contact: newLead.email,
      referenceId: leadId
    }
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    leadQueueCount: leadsDatabase.length,
    service: 'Taroda Email Security Engine'
  });
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Development mode: Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Taroda Engine] Server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch(err => {
  console.error('[Taroda Engine] Failed to start server:', err);
  process.exit(1);
});
