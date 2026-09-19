import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ChevronRight, Github, Star, Music } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';
import { PixelCompanion } from './PixelCompanion';
import { ArcadeProvider } from './ArcadeContext';
import { GameControllerDock } from './GameControllerDock';
import { ArcadeModal } from './ArcadeModal';
import { SuiseiCard } from './SuiseiCard';
import { playStarClick } from '../utils/audio';
import { TripleBakaEasterEgg } from './TripleBakaEasterEgg';

interface HeroSectionProps {
  profile: ProfileInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
}) => {
  const [starClickCount, setStarClickCount] = useState(0);
  const [showSuiseiCard, setShowSuiseiCard] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);
  const [isBakaHovered, setIsBakaHovered] = useState(false);
  const [isTripleBakaActivating, setIsTripleBakaActivating] = useState(false);

  const suiseiQuotes = [
    "Sui-chan wa...",
    "Kyou mo kawaii~!",
    "Stellar Stellar!",
    "Hi Honey~",
    "Shounen shoujo yo..."
  ];

  const handleStarClick = () => {
    playStarClick();
    if (starClickCount < 4) {
      setStarClickCount(prev => prev + 1);
    } else if (starClickCount === 4) {
      setStarClickCount(prev => prev + 1);
      setShowSuiseiCard(true);
    }
  };
  return (
    <section
      id="dossier"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden border-b border-zinc-900 bg-transparent"
    >
      <ArcadeProvider>
        {/* Pixel Companions confined to the Dossier section */}
        <PixelCompanion />

        {/* Ghostly Controller Dock — Easter Egg drop zone */}
        <GameControllerDock />

        {/* Arcade Game Modal — renders via portal when a game is active */}
        <ArcadeModal />
      </ArcadeProvider>

      {/* Subtle minimalist grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Triple Baka Easter Egg Trigger */}
      <div 
        className="absolute bottom-40 left-[5%] lg:left-[10%] z-20 cursor-pointer flex flex-col items-center"
        onClick={() => setIsTripleBakaActivating(true)}
      >
        {/* Floating Triple Baka Text */}
        <AnimatePresence>
          {isBakaHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-10 whitespace-nowrap bg-zinc-900/80 border border-zinc-700 text-zinc-300 text-[10px] font-sans px-2 py-1 rounded-md shadow-lg backdrop-blur-sm pointer-events-none"
            >
              <span className="text-blue-400">Baka </span>
              <span className="text-red-400">Baka </span>
              <span className="text-yellow-400">Baka!</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900/80 border-b border-r border-zinc-700 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          onMouseEnter={() => setIsBakaHovered(true)}
          onMouseLeave={() => setIsBakaHovered(false)}
          animate={isBakaHovered ? "hover" : "rest"}
          variants={{
            hover: {
              color: ["#3b82f6", "#ef4444", "#eab308", "#3b82f6"],
              filter: [
                "drop-shadow(0 0 16px rgba(59,130,246,0.8))",
                "drop-shadow(0 0 16px rgba(239,68,68,0.8))",
                "drop-shadow(0 0 16px rgba(234,179,8,0.8))",
                "drop-shadow(0 0 16px rgba(59,130,246,0.8))"
              ],
              scale: 1.15,
              transition: {
                color: { duration: 1.5, repeat: Infinity, ease: "linear" },
                filter: { duration: 1.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.3 }
              }
            },
            rest: {
              color: "rgba(63, 63, 70, 0.3)",
              filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
              scale: 1,
              transition: {
                duration: 0.3
              }
            }
          }}
        >
          <span className="text-[5rem] font-serif select-none leading-none" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            𝄞
          </span>
        </motion.div>
      </div>

      {/* Suisei Easter Egg Trigger */}
      <div
        className="absolute top-40 right-[15%] lg:right-[20%] z-20 group cursor-pointer p-4 -m-4"
        data-custom-sound="true"
        onClick={handleStarClick}
        onMouseEnter={() => setIsStarHovered(true)}
        onMouseLeave={() => setIsStarHovered(false)}
      >
        {/* Floating Quote Bubble */}
        <AnimatePresence>
          {isStarHovered && starClickCount > 0 && starClickCount < 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-sky-900/80 border border-sky-500 text-sky-100 text-[10px] font-sans px-2 py-1 rounded-md shadow-[0_0_10px_rgba(56,189,248,0.3)] backdrop-blur-sm pointer-events-none"
            >
              {suiseiQuotes[starClickCount - 1] || suiseiQuotes[suiseiQuotes.length - 1]}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-900/80 border-b border-r border-sky-500 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <Star
          className="w-8 h-8 text-zinc-700/20 group-hover:text-sky-400 group-hover:scale-125 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          fill="currentColor"
        />
        {/* Subtle shooting star tail effect on hover */}
        <div className="absolute top-1/2 left-1/2 w-16 h-[4px] bg-gradient-to-r from-sky-400 to-transparent -translate-y-1/2 translate-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 origin-left -rotate-45 pointer-events-none" />
      </div>

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
            <h1 className="hero-title font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-zinc-100 font-light select-all leading-none">
              MichaelFirstAC
            </h1>
            <div className="hero-subtitle text-sm sm:text-base font-mono-code tracking-[0.2em] text-zinc-400 uppercase">
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

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              id="hero-github-btn"
              className="px-5 py-2.5 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 text-xs tracking-wider font-mono-code uppercase transition-all flex items-center space-x-2"
            >
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="#dispatch"
              id="hero-transmit-dispatch-btn"
              className="px-5 py-2.5 rounded-md border border-zinc-850 hover:border-zinc-700 bg-transparent text-zinc-400 hover:text-zinc-200 text-xs tracking-wider font-mono-code uppercase transition-all"
            >
              Get In Touch
            </a>
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

      {/* Suisei Card Overlay */}
      <AnimatePresence>
        {showSuiseiCard && (
          <SuiseiCard onClose={() => {
            setShowSuiseiCard(false);
            setStarClickCount(0);
          }} />
        )}
      </AnimatePresence>

      <TripleBakaEasterEgg 
        isActivating={isTripleBakaActivating} 
        onComplete={() => setIsTripleBakaActivating(false)} 
      />
    </section>
  );
};
