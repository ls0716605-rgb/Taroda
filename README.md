# Taroda — Premium Email Security & Domain Authentication Platform

A modern, production-grade web platform for **Taroda**, a specialized American B2B cybersecurity company providing email authentication, SPF optimization, DKIM cryptographic verification, DMARC policy enforcement, and DNS diagnostics.

---

## 1. Quick Start & Local Setup

### Prerequisites
- Node.js 20+ or 22+
- npm (v9+)

### Installation
```bash
# 1. Clone repository and navigate to folder
git clone https://github.com/taroda-security/taroda-platform.git
cd taroda-platform

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env

# 4. Start the development server (runs full-stack Express + Vite on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 2. Testing & Quality Verification

Run the test suite using Node's native test runner:
```bash
npm test
```

### Verification Checklist
- [x] **SSRF & Domain Normalization**: Verifies that URLs, protocols, private IP ranges (e.g. `192.168.1.1`), `localhost`, and internal domains (`.local`, `.internal`) are safely blocked.
- [x] **SPF Evaluation**: Validates syntax parsing, detection of duplicate SPF records (RFC 7208 violation), DNS lookup count estimation, and flags dangerous policies like `+all`.
- [x] **DMARC Parser**: Evaluates policy levels (`p=none`, `p=quarantine`, `p=reject`), alignment tags (`adkim`, `aspf`), percentage (`pct`), and reporting mailto URIs (`rua`/`ruf`).
- [x] **Lead Intake Validation**: Enforces valid email syntax, domain validation, and anti-spam honeypot detection.
- [x] **Live Server-Side DNS Resolver**: Resolves TXT and MX records with strict timeouts to prevent hanging client requests.

---

## 3. Production Deployment

### Building for Production
```bash
# Build the client SPA bundle into dist/
npm run build

# Start the full-stack server in production mode
NODE_ENV=production npm start
```

### Container / Cloud Run Deployment
Taroda runs natively as an Express Node.js application serving static assets and API routes. The provided `server.ts` automatically serves `/dist` when `NODE_ENV=production`.

---

## 4. Remaining Tasks for the Business Owner

Before launching commercially to paying clients, the business owner must provide:
1. **Corporate Registration Details**: Update the Delaware filing number and formal corporate address in `src/pages/AboutPage.tsx` and `src/components/LegalModals.tsx`.
2. **Transactional Lead Notification**: Configure an external CRM webhook or SMTP provider (e.g., Postmark or SendGrid) in `server.ts` to forward incoming assessment leads directly to sales representatives.
3. **Custom Domain DNS**: Point your branded domain (e.g., `taroda.com`) to your Cloud Run or hosting provider.
4. **Authoritative Staff Biographies**: Replace leadership placeholders in `src/pages/AboutPage.tsx` with authentic team profiles.
