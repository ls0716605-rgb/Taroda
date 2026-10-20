import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { TarodaLogo } from './TarodaLogo';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onRequestAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onRequestAudit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'industries', label: 'Industries' },
    { id: 'about', label: 'About Taroda' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1 -ml-1 text-left cursor-pointer"
          aria-label="Taroda Home"
        >
          <TarodaLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-slate-900/80 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Quick Check Button */}
          <button
            type="button"
            onClick={() => handleNavClick('checker')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'checker'
                ? 'bg-slate-800 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-600 text-slate-300 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Check Domain</span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onRequestAudit}
            className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <span>Free Security Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            type="button"
            onClick={onRequestAudit}
            className="px-2.5 py-1.5 bg-cyan-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider rounded-lg"
          >
            Check
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090E1A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.id
                  ? 'text-cyan-400 bg-slate-900 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <button
              type="button"
              onClick={() => handleNavClick('checker')}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Interactive DNS Authentication Checker</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestAudit();
              }}
              className="w-full py-3 px-4 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Get Your Free Email Security Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
