import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeAndValidateDomain,
  parseSpfRecord,
  parseDmarcRecord,
  identifyMailProvider,
  validateLeadSubmission
} from './dns-validator.ts';

test('normalizeAndValidateDomain handles clean domains and strips URLs', () => {
  const result1 = normalizeAndValidateDomain('https://example.com/some/path');
  assert.equal(result1.valid, true);
  assert.equal(result1.domain, 'example.com');

  const result2 = normalizeAndValidateDomain('  SUB.DOMAIN.CO.UK  ');
  assert.equal(result2.valid, true);
  assert.equal(result2.domain, 'sub.domain.co.uk');

  const result3 = normalizeAndValidateDomain('taroda.security.');
  assert.equal(result3.valid, true);
  assert.equal(result3.domain, 'taroda.security');
});

test('normalizeAndValidateDomain blocks SSRF, IPs, and invalid targets', () => {
  assert.equal(normalizeAndValidateDomain('').valid, false);
  assert.equal(normalizeAndValidateDomain('localhost').valid, false);
  assert.equal(normalizeAndValidateDomain('server.local').valid, false);
  assert.equal(normalizeAndValidateDomain('192.168.1.1').valid, false);
  assert.equal(normalizeAndValidateDomain('test..invalid').valid, false);
});

test('parseSpfRecord detects valid records, mechanisms, and lookup estimation', () => {
  const raw = 'v=spf1 include:_spf.google.com include:sendgrid.net ip4:198.51.100.1 ~all';
  const result = parseSpfRecord([raw]);

  assert.equal(result.found, true);
  assert.equal(result.allPolicy, '~');
  assert.equal(result.exceedsLookupLimit, false);
  assert.equal(result.mechanisms.length, 4);

  const includes = result.mechanisms.filter(m => m.type === 'include');
  assert.equal(includes.length, 2);
});

test('parseSpfRecord flags critical risks like multiple records and +all', () => {
  const multiResult = parseSpfRecord([
    'v=spf1 include:_spf.google.com ~all',
    'v=spf1 include:mailgun.org -all'
  ]);
  assert.equal(multiResult.recordsCount, 2);
  assert.ok(multiResult.warnings.some(w => w.includes('Multiple SPF records')));

  const plusAllResult = parseSpfRecord(['v=spf1 +all']);
  assert.equal(plusAllResult.allPolicy, '+');
  assert.ok(plusAllResult.warnings.some(w => w.includes('CRITICAL RISK')));
});

test('parseDmarcRecord correctly parses tags and policy stage', () => {
  const raw = 'v=DMARC1; p=reject; sp=quarantine; pct=100; rua=mailto:dmarc@taroda.com; adkim=s; aspf=r';
  const result = parseDmarcRecord([raw]);

  assert.equal(result.found, true);
  assert.equal(result.policy, 'reject');
  assert.equal(result.subdomainPolicy, 'quarantine');
  assert.equal(result.percentage, 100);
  assert.equal(result.enforcementLevel, 'full');
  assert.equal(result.reportingAddresses[0], 'dmarc@taroda.com');
  assert.equal(result.adkim, 's');
  assert.equal(result.aspf, 'r');
});

test('parseDmarcRecord detects missing record or p=none', () => {
  const empty = parseDmarcRecord([]);
  assert.equal(empty.found, false);
  assert.equal(empty.enforcementLevel, 'none');

  const pNone = parseDmarcRecord(['v=DMARC1; p=none; rua=mailto:rep@example.com']);
  assert.equal(pNone.policy, 'none');
  assert.equal(pNone.enforcementLevel, 'none');
  assert.ok(pNone.warnings.some(w => w.includes('Monitoring Only')));
});

test('identifyMailProvider detects Google Workspace and Microsoft 365', () => {
  const google = identifyMailProvider([{ exchange: 'aspmx.l.google.com', priority: 1 }]);
  assert.ok(google.includes('Google Workspace'));

  const ms = identifyMailProvider([{ exchange: 'company-com.mail.protection.outlook.com', priority: 0 }]);
  assert.ok(ms.includes('Microsoft 365'));
});

test('validateLeadSubmission checks required fields and rejects honeypots', () => {
  const validLead = {
    name: 'Sarah Connor',
    email: 'sarah@skynet-defense.com',
    domain: 'skynet-defense.com',
    company: 'Skynet Defense Systems'
  };
  const val = validateLeadSubmission(validLead);
  assert.equal(val.valid, true);

  const spambot = {
    ...validLead,
    website_trap: 'http://spam-link.biz'
  };
  const spamVal = validateLeadSubmission(spambot);
  assert.equal(spamVal.valid, false);
});
