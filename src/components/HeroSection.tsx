import React from 'react';
import { motion } from 'motion/react';
import { Shield, Terminal, ArrowDown, ChevronRight, Copy, Check, Sparkles, Award } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface HeroSectionProps {
  profile: ProfileInfo;
  onOpenCustomizer: () => void;
  onPrintCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenCustomizer,
  onPrintCV,
}) => {
  const [copiedKey, setCopiedKey] = React.useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(profile.pgpKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <section
      id="dossier"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden border-b border-zinc-900 bg-[#08080a]"
    >
      {/* Subtle minimalist grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle radial ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-zinc-700/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center w-full">
        <DisintegrateOnScroll isHero={true} className="w-full flex flex-col items-center">
          {/* Minimalist Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 mb-8 backdrop-blur-sm shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono-code tracking-wider text-zinc-300 uppercase">
              {profile.status || 'AVAILABLE FOR INQUIRIES'}
            </span>
          </motion.div>

          {/* Name in Refined, Minimalist High-End Serif Display */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3 mb-6"
          >
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-zinc-100 font-light select-all leading-none">
              {profile.name}
            </h1>
            <div className="text-sm sm:text-base font-mono-code tracking-[0.2em] text-zinc-400 uppercase">
              {profile.title}
            </div>
          </motion.div>

          {/* Minimalist Quote / Summary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 text-center italic font-light"
          >
            &ldquo;{profile.bioSummary}&rdquo;
          </motion.p>

          {/* Minimalist Action Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <a
              href="#projects"
              id="hero-explore-artifacts-btn"
              className="px-5 py-2.5 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-wider font-mono-code uppercase transition-all shadow-sm flex items-center space-x-2 group"
            >
              <span>View Projects</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={onPrintCV}
              id="hero-summon-dossier-btn"
              className="px-5 py-2.5 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 text-xs tracking-wider font-mono-code uppercase transition-all flex items-center space-x-2"
            >
              <Award className="w-3.5 h-3.5 text-zinc-400" />
              <span>Export CV (PDF)</span>
            </button>

            <a
              href="#dispatch"
              id="hero-transmit-dispatch-btn"
              className="px-5 py-2.5 rounded-md border border-zinc-850 hover:border-zinc-700 bg-transparent text-zinc-400 hover:text-zinc-200 text-xs tracking-wider font-mono-code uppercase transition-all"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Cryptographic Key Minimalist Quick Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-lg p-2.5 rounded-md border border-zinc-900 bg-zinc-950/60 flex items-center justify-between text-left text-xs font-mono-code text-zinc-400 mb-12 shadow-sm"
          >
            <div className="flex items-center space-x-2 truncate">
              <Shield className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider shrink-0">
                PGP:
              </span>
              <span className="text-zinc-300 truncate text-[11px] select-all font-mono-code">
                {profile.pgpKey}
              </span>
            </div>
            <button
              onClick={handleCopyKey}
              id="hero-copy-pgp-btn"
              className="ml-2 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] tracking-wider uppercase transition-colors shrink-0 flex items-center space-x-1 border border-zinc-800"
            >
              {copiedKey ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Minimalist Bento Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full text-left"
          >
            {profile.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-zinc-800/80 bg-zinc-950/70 hover:border-zinc-700 transition-colors group relative"
              >
                <div className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center justify-between mb-1.5">
                  <span>{stat.label}</span>
                  <span className="text-[9px] text-zinc-600">0{idx + 1}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-zinc-100 tracking-tight mb-1 font-mono-code">
                  {stat.value}
                </div>
                {stat.subtext && (
                  <div className="text-[11px] font-serif text-zinc-400 leading-snug line-clamp-2">
                    {stat.subtext}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </DisintegrateOnScroll>
      </div>

      {/* Subtle Downward Scroll Indicator */}
      <a
        href="#manifesto"
        aria-label="Scroll to manifesto"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-300 transition-colors p-2"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

