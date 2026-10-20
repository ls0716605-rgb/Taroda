import React, { useState, useEffect } from 'react';
import { PageId, ResourceArticle } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { CheckerPage } from './pages/CheckerPage';
import { AssessmentModal } from './components/AssessmentModal';
import { SampleAuditReportModal } from './components/SampleAuditReportModal';
import { ArticleModal } from './components/ArticleModal';
import { LegalModal } from './components/LegalModals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [prefilledDomain, setPrefilledDomain] = useState('');
  const [isSampleReportOpen, setIsSampleReportOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync with browser URL hash for friendly deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'services',
        'how-it-works',
        'industries',
        'about',
        'resources',
        'contact',
        'checker'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = (domain?: string) => {
    if (domain) {
      setPrefilledDomain(domain);
    }
    setIsAssessmentModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onRequestAudit={() => handleOpenAssessment()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onRequestAudit={handleOpenAssessment}
            onOpenSampleReport={() => setIsSampleReportOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onRequestAudit={(service) => handleOpenAssessment()}
            onOpenSampleReport={() => setIsSampleReportOpen(true)}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={navigateTo}
            onRequestAudit={() => handleOpenAssessment()}
            onOpenSampleReport={() => setIsSampleReportOpen(true)}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onNavigate={navigateTo}
            onRequestAudit={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onRequestAudit={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onNavigate={navigateTo}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onRequestAudit={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onOpenPrivacy={() => setLegalModalType('privacy')}
          />
        )}

        {currentPage === 'checker' && (
          <CheckerPage
            onNavigate={navigateTo}
            onRequestAudit={handleOpenAssessment}
          />
        )}
      </main>

      {/* Global Modals */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        prefilledDomain={prefilledDomain}
      />

      <SampleAuditReportModal
        isOpen={isSampleReportOpen}
        onClose={() => setIsSampleReportOpen(false)}
        onRequestAudit={() => handleOpenAssessment()}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onRequestAudit={() => handleOpenAssessment()}
      />

      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType || 'privacy'}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenSampleReport={() => setIsSampleReportOpen(true)}
      />
    </div>
  );
}
