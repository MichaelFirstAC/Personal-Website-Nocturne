import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Monitor } from 'lucide-react';
import { ProfileInfo } from '../types';

interface NavigationProps {
  profile: ProfileInfo;
  scanlinesActive: boolean;
  onToggleScanlines: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  profile,
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
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-900 py-2.5 shadow-sm'
          : 'bg-transparent border-b border-white/5 py-3'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        {/* Monogram & Brand */}
        <a
          href="#dossier"
          id="nav-brand-seal"
          className="group flex items-center gap-2.5 text-left focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded-md border border-zinc-700 bg-zinc-900/90 flex items-center justify-center shrink-0 group-hover:border-zinc-400 group-hover:bg-zinc-800 transition-all shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-100 leading-none select-none">
              {profile.monogram || 'MAC'}
            </span>
          </div>
          <div className="hidden xl:block shrink-0">
            <div className="text-[13px] font-medium text-zinc-100 group-hover:text-white transition-colors tracking-tight whitespace-nowrap leading-tight">
              {profile.name}
            </div>
            <div className="text-[9px] tracking-[0.08em] text-zinc-500 font-mono-code uppercase whitespace-nowrap leading-tight">
              {profile.title}
            </div>
          </div>
        </a>

        {/* Subtle divider */}
        <div className="hidden lg:block w-px h-5 bg-zinc-800 shrink-0" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                id={`nav-link-${link.id}`}
                className={`relative px-2.5 py-1.5 rounded text-[11px] tracking-[0.06em] transition-all uppercase font-mono-code whitespace-nowrap ${
                  isActive
                    ? 'text-white font-medium bg-zinc-800/80 shadow-[0_0_12px_rgba(255,255,255,0.04)]'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Subtle divider */}
        <div className="hidden lg:block w-px h-5 bg-zinc-800 shrink-0" />

        {/* Header Action Buttons */}
        <div className="hidden lg:flex items-center gap-1 shrink-0">
          {/* CRT Scanline Toggle */}
          <button
            onClick={onToggleScanlines}
            id="nav-toggle-crt-btn"
            title="Toggle CRT Scanline Overlay"
            className={`flex items-center gap-1 px-2 py-1.5 rounded border text-[10px] font-mono-code transition-all ${
              scanlinesActive
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span className="tracking-wider uppercase hidden xl:inline">CRT:{scanlinesActive ? 'ON' : 'OFF'}</span>
          </button>


          <a
            href="#dispatch"
            id="nav-summon-cta-btn"
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-zinc-200 text-black text-[11px] font-medium tracking-wider uppercase transition-all ml-1"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile / Tablet menu toggle */}
        <div className="flex lg:hidden items-center gap-1.5 ml-auto">
          <button
            onClick={onToggleScanlines}
            className={`p-1.5 rounded border text-xs ${
              scanlinesActive
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-800 bg-zinc-900 text-zinc-500'
            }`}
            aria-label="Toggle CRT"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle-btn"
            className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 rounded bg-zinc-900"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-b border-zinc-900 bg-[#08080af8] backdrop-blur-xl px-4 py-5 space-y-3 mt-2 animate-fadeIn"
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md border text-xs font-mono-code transition-colors ${
                  activeSection === link.id
                    ? 'border-zinc-600 bg-zinc-800/80 text-white'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
            <a
              href="#dispatch"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center text-xs bg-zinc-100 hover:bg-white text-black font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
