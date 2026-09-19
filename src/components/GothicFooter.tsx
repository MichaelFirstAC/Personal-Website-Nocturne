import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { ProfileInfo } from '../types';
import { AdoEasterEgg } from './AdoEasterEgg';
import { motion, AnimatePresence } from 'motion/react';

interface GothicFooterProps {
  profile: ProfileInfo;
}

const FallingPetals = ({ isHovering }: { isHovering: boolean }) => {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate static values once to avoid hydration mismatches or layout thrashing
    setPetals(Array.from({ length: 20 }).map(() => ({
      startX: Math.random() * 100,
      endXOffset: Math.random() > 0.5 ? 200 : -200,
      scale: 0.4 + Math.random() * 0.6,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
    })));
  }, []);

  return (
    <AnimatePresence>
      {isHovering && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >
          {petals.map((petal, i) => (
            <motion.div
              key={i}
              className="absolute w-10 h-10 z-10"
              initial={{
                left: `${petal.startX}vw`,
                top: -50,
                rotate: 0,
                scale: petal.scale
              }}
              animate={{
                top: '110vh',
                left: `calc(${petal.startX}vw + ${petal.endXOffset}px)`,
                rotate: 360
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                ease: "linear",
                delay: petal.delay
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]">
                <path d="M50 0 C 80 30, 90 70, 50 100 C 10 70, 20 30, 50 0" fill="#2563eb" opacity="0.6" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const GothicFooter: React.FC<GothicFooterProps> = ({ profile }) => {
  const [isAdoActivating, setIsAdoActivating] = useState(false);
  const [isHoveringRose, setIsHoveringRose] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdoComplete = React.useCallback(() => {
    setIsAdoActivating(false);
  }, []);

  return (
    <>
      <footer className="pt-6 pb-12 relative bg-[#060608] text-zinc-500 font-mono-code text-xs border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
          {/* Latin Benediction & Name (Logo removed as requested) */}
          <div className="space-y-1 relative">
            <div className="flex justify-center">
              <img 
                src="/bluerose.png" 
                alt="Blue Rose" 
                className="w-10 h-10 object-contain opacity-80 cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-300"
                onClick={() => setIsAdoActivating(true)}
                onMouseEnter={() => setIsHoveringRose(true)}
                onMouseLeave={() => setIsHoveringRose(false)}
              />
            </div>
            <div className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
              {profile.name}
            </div>
            <div className="font-serif italic text-zinc-400 text-sm tracking-wide">
              &ldquo;I slept, with the poets lips as my pillow.&rdquo;
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

      <FallingPetals isHovering={isHoveringRose} />
      <AdoEasterEgg 
        isActivating={isAdoActivating} 
        onComplete={handleAdoComplete} 
      />
    </>
  );
};
