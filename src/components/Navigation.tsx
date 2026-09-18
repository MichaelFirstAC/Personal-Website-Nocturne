import React, { useState, useEffect } from 'react';
import { Shield, Printer, Edit3, ArrowUpRight, Menu, X, Monitor, Sparkles } from 'lucide-react';
import { ProfileInfo } from '../types';

interface NavigationProps {
  profile: ProfileInfo;
  onOpenCustomizer: () => void;
  onPrintCV: () => void;
  scanlinesActive: boolean;
  onToggleScanlines: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  profile,
  onOpenCustomizer,
  onPrintCV,
  scanlinesActive,
  onToggleScanlines,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dossier');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      const sections = ['dossier', 'manifesto', 'projects', 'skills', 'experience', 'relics', 'dispatch'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { id: 'dossier', label: 'Dossier' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'relics', label: 'Credentials' },
    { id: 'dispatch', label: 'Contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-900 py-3 shadow-sm'
          : 'bg-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Minimalist Monogram & Title */}
        <a
          href="#dossier"
          id="nav-brand-seal"
          className="group flex items-center space-x-3 text-left focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 min-w-10 min-h-10 aspect-square rounded-md border border-zinc-700 bg-zinc-900/90 flex items-center justify-center shrink-0 p-2 group-hover:border-zinc-400 group-hover:bg-zinc-800 transition-all shadow-sm">
            <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-100 leading-none select-none text-center">
              {profile.monogram || 'MAC'}
            </span>
          </div>
          <div className="shrink-0">
            <div className="text-sm font-medium text-zinc-100 group-hover:text-white transition-colors tracking-tight whitespace-nowrap">
              {profile.name}
            </div>
            <div className="text-[10px] tracking-wider text-zinc-400 font-mono-code uppercase whitespace-nowrap">
              {profile.title}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                id={`nav-link-${link.id}`}
                className={`relative px-2 py-1 rounded text-xs tracking-wider transition-colors uppercase font-mono-code whitespace-nowrap ${
                  isActive
                    ? 'text-white font-medium bg-zinc-900'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden lg:flex items-center space-x-1.5 shrink-0">
          {/* CRT Scanline Toggle */}
          <button
            onClick={onToggleScanlines}
            id="nav-toggle-crt-btn"
            title="Toggle CRT Scanline Overlay"
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded border text-[11px] font-mono-code transition-all ${
              scanlinesActive
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="tracking-wider uppercase">CRT:{scanlinesActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Customizer Drawer Toggle */}
          <button
            onClick={onOpenCustomizer}
            id="nav-edit-template-btn"
            title="Edit Personal Data"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-900/80 text-zinc-300 text-xs font-mono-code hover:border-zinc-600 hover:text-white transition-all shadow-sm group"
          >
            <Edit3 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
            <span className="tracking-wider">Edit Data</span>
          </button>

          {/* Print/Export CV Button */}
          <button
            onClick={onPrintCV}
            id="nav-print-cv-btn"
            title="Export / Print Professional Dossier"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-300 text-xs font-mono-code hover:border-zinc-600 hover:text-white transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            <span className="tracking-wider">Print</span>
          </button>

          {/* Quick Dispatch CTA */}
          <a
            href="#dispatch"
            id="nav-summon-cta-btn"
            className="flex items-center space-x-1 px-3 py-1.5 rounded bg-white hover:bg-zinc-200 text-black text-xs font-medium tracking-wider uppercase transition-all"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile / Tablet menu toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={onToggleScanlines}
            className={`p-1.5 rounded border text-xs font-mono-code ${
              scanlinesActive
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400'
            }`}
            aria-label="Toggle CRT"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenCustomizer}
            className="p-1.5 text-zinc-300 hover:text-white border border-zinc-800 rounded bg-zinc-900"
            aria-label="Edit Template"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle-btn"
            className="p-1.5 text-zinc-300 hover:text-white border border-zinc-800 rounded bg-zinc-900"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-b border-zinc-900 bg-[#08080af8] backdrop-blur-xl px-4 py-5 space-y-3 mt-3 animate-fadeIn"
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white text-xs font-mono-code transition-colors"
              >
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPrintCV();
              }}
              className="flex-1 py-2 text-center text-xs border border-zinc-800 hover:border-zinc-700 rounded-md text-zinc-300 font-mono-code flex items-center justify-center space-x-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              <span>Print CV</span>
            </button>
            <a
              href="#dispatch"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center text-xs bg-zinc-100 hover:bg-white text-black font-medium rounded-md flex items-center justify-center space-x-1 transition-colors"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

