export type PageId = 'home' | 'services' | 'how-it-works' | 'industries' | 'about' | 'resources' | 'contact' | 'checker';

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  benefits: string[];
  included: string[];
  clientPrerequisites: string[];
  realisticScope: string;
  targetAudience: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  subtitle: string;
  riskProfile: string;
  whyItMatters: string;
  commonPitfalls: string[];
  recommendedStrategy: string;
  realWorldScenario: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  category: 'Fundamentals' | 'Troubleshooting' | 'Policy Enforcement' | 'Compliance';
  summary: string;
  content: string[];
  keyTakeaways: string[];
  publishedDate: string;
  authorRole: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  domain: string;
  company?: string;
  provider?: string;
  concern?: string;
  message?: string;
  preferredContact?: 'email' | 'phone';
  consent: boolean;
  website_trap?: string; // honeypot
}
