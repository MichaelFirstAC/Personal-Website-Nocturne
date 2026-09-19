import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

interface SuiseiCardProps {
  onClose: () => void;
}

export const SuiseiCard: React.FC<SuiseiCardProps> = ({ onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play audio on mount
    audioRef.current = new Audio('/suisei-hi-honey_qwUSTa0.mp3');
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(e => console.error("Audio play failed:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ perspective: 1000 }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dark Blur Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* SVG Gradient for Stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="suisei-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c026d3" /> {/* Fuchsia */}
            <stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
            <stop offset="100%" stopColor="#7dd3fc" /> {/* Light Blue */}
          </linearGradient>
        </defs>
      </svg>

      {/* Flickering Ambient Stars Surrounding the Card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => {
          const size = 12 + Math.random() * 20; // 12px to 32px
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: 180 }}
              transition={{ 
                duration: 3 + Math.random() * 4, 
                repeat: Infinity, 
                delay: Math.random() * 5, 
                ease: "easeInOut" 
              }}
              className="absolute"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
            >
              <Star 
                style={{ width: size, height: size }}
                fill="url(#suisei-star-gradient)"
                stroke="url(#suisei-star-gradient)"
                strokeWidth={1}
                className="drop-shadow-[0_0_10px_rgba(192,38,211,0.6)]"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Majestic Aurora / Rays Behind the Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden mix-blend-screen"
      >
        <div className="absolute w-[400px] h-[400px] bg-sky-400/20 blur-[100px] rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full animate-[pulse_5s_ease-in-out_infinite_reverse]" />
      </motion.div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50, rotateY: 45, rotateX: 20, rotateZ: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateY: 10, rotateX: 5, rotateZ: -3 }}
        exit={{ opacity: 0, scale: 0.8, y: 50, rotateY: 45, rotateX: 20, rotateZ: -10 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative w-full max-w-sm aspect-[3/4] rounded-2xl group cursor-default shadow-[0_20px_60px_rgba(14,165,233,0.4)] z-20"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
      >
        {/* Outer Frame Decorations (Discord Style) */}
        <Star className="absolute -top-6 -right-6 w-12 h-12 text-sky-200 drop-shadow-[0_0_12px_#7dd3fc] animate-[spin_8s_linear_infinite] z-30" fill="currentColor" />
        <Star className="absolute -bottom-5 -left-5 w-10 h-10 text-fuchsia-300 drop-shadow-[0_0_12px_#f0abfc] animate-[spin_6s_linear_infinite_reverse] z-30" fill="currentColor" />
        <Sparkles className="absolute -top-3 -left-3 w-8 h-8 text-white drop-shadow-[0_0_8px_#fff] animate-pulse z-30" />
        <Sparkles className="absolute -bottom-2 -right-4 w-6 h-6 text-sky-100 drop-shadow-[0_0_8px_#bae6fd] animate-[pulse_2s_infinite] z-30" />

        {/* The Animated Border Container */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {/* Discord-style Spinning Border Gradients */}
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_270deg,rgba(56,189,248,1)_360deg)] animate-[spin_4s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_180deg,transparent_0_270deg,rgba(192,38,211,1)_360deg)] animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 to-fuchsia-500/30 mix-blend-overlay" />
        </div>
        
        {/* Inner Card Content */}
        <div className="absolute inset-[3px] bg-zinc-950 rounded-[13px] overflow-hidden">
          {/* Background Image */}
          <img 
            src="/suichan.png" 
            alt="Suisei" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Top Gradient Overlay */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10" />

          {/* Top Text (Hoshimachi Suisei) */}
          <div className="absolute top-0 left-0 right-0 p-6 flex flex-col items-center justify-start text-center z-20">
            <h2 className="font-sans uppercase tracking-[0.3em] text-[10px] text-sky-200/70 mb-1">
              Hololive 0th Gen
            </h2>
            <h1 className="font-serif font-light italic text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
              Hoshimachi Suisei
            </h1>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

          {/* Holographic Foil Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sky-300/30 to-fuchsia-500/20 mix-blend-color-dodge pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)] mix-blend-overlay pointer-events-none z-10 opacity-60" />

          {/* Particle Stars */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-ping" />
          <div className="absolute top-1/4 right-8 w-1.5 h-1.5 bg-sky-200 rounded-full shadow-[0_0_8px_#bae6fd] animate-[ping_3s_infinite]" />
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff] animate-[ping_2s_infinite]" />
          
          {/* Decorative Star Icons */}
          <Star className="absolute top-12 right-12 w-4 h-4 text-sky-200/60 drop-shadow-[0_0_5px_#bae6fd] animate-[spin_6s_linear_infinite]" fill="currentColor" />
          <Star className="absolute top-1/3 left-8 w-3 h-3 text-fuchsia-200/50 drop-shadow-[0_0_4px_#f5d0fe] animate-[spin_4s_linear_infinite_reverse]" fill="currentColor" />
          <Star className="absolute bottom-1/4 right-1/4 w-5 h-5 text-sky-100/40 drop-shadow-[0_0_6px_#e0f2fe] animate-[pulse_3s_infinite]" fill="currentColor" />

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 flex flex-col items-center justify-end text-center z-20">
            <Sparkles className="w-8 h-8 text-sky-200 mb-6 animate-[spin_4s_linear_infinite]" />
            <h3 className="font-serif uppercase tracking-[0.3em] font-light text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-white to-sky-200 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]">
              Your Shooting Star
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
