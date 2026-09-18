import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ProfileInfo } from '../types';

interface GothicFooterProps {
  profile: ProfileInfo;
}

export const GothicFooter: React.FC<GothicFooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 relative bg-[#060608] text-zinc-500 font-mono-code text-xs border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
        {/* Latin Benediction & Name (Logo removed as requested) */}
        <div className="space-y-2">
          <div className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
            {profile.name}
          </div>
          <div className="font-serif italic text-zinc-400 text-sm tracking-wide">
            &ldquo;"I slept, with the poets lips as my pillow."&rdquo;
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400 text-xs">
          <a href="#dossier" className="hover:text-white transition-colors">
            Dossier
          </a>
          <a href="#manifesto" className="hover:text-white transition-colors">
            Manifesto
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#relics" className="hover:text-white transition-colors">
            Credentials
          </a>
          <a href="#dispatch" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Return to Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full border border-zinc-800 hover:border-zinc-500 bg-zinc-950 text-zinc-400 hover:text-white transition-all shadow-sm group"
          aria-label="Return to top"
          title="Return to Zenith"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-zinc-400 group-hover:text-white" />
        </button>

        {/* Minimal License & Cryptographic Hash */}
        <div className="pt-4 border-t border-zinc-900 w-full max-w-xl text-[11px] text-zinc-600 flex flex-wrap justify-between items-center gap-2">
          <span>DETERMINISTIC BUILD // 0x7F2A...E91C</span>
          <span>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};
