import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Music } from 'lucide-react';

interface Props {
  onComplete: () => void;
  isActivating: boolean;
}

export const TripleBakaEasterEgg: React.FC<Props> = ({ onComplete, isActivating }) => {
  const [phase, setPhase] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (isActivating && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      setPhase(1); // Triggers GIF and 1st BAKA

      // Play audio automatically
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(console.error);
      }

      // Timing for the other two "BAKA!" shouts
      timeoutRefs.current.push(setTimeout(() => setPhase(2), 400));
      timeoutRefs.current.push(setTimeout(() => setPhase(3), 800));

      return () => {
        timeoutRefs.current.forEach(clearTimeout);
      };
    }
  }, [isActivating]);

  // Set a fixed lifetime for the easter egg since the audio is very short
  useEffect(() => {
    if (isActivating) {
      const lifetime = setTimeout(() => {
        setPhase(0);
        hasPlayedRef.current = false;
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        onComplete();
      }, 2500); // 2.5 seconds total duration, matching the short audio
      
      timeoutRefs.current.push(lifetime);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {isActivating && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Audio */}
          <audio 
            ref={audioRef} 
            src="/triple-baka-smartphone-short.mp3" 
            autoPlay
          />



          <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
            {/* The GIF - Appears immediately with Phase 1 */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: [
                      '0 0 80px rgba(59,130,246,0.8)', // Cyan aura
                      '0 0 80px rgba(239,68,68,0.8)', // Red aura
                      '0 0 80px rgba(234,179,8,0.8)', // Yellow aura
                      '0 0 80px rgba(59,130,246,0.8)'
                    ]
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    opacity: { type: "spring", bounce: 0.6 },
                    scale: { type: "spring", bounce: 0.6 },
                    boxShadow: { duration: 0.8, repeat: Infinity, ease: "linear" }
                  }}
                  className="relative z-30 rounded-xl"
                >
                  {/* Decorative Elements Around GIF */}
                  <div className="absolute -inset-10 z-0 pointer-events-none">
                    {/* Cyan Star */}
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-4 -left-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    >
                      <Star fill="currentColor" size={40} />
                    </motion.div>
                    
                    {/* Red Sparkle */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 -right-12 text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    >
                      <Sparkles size={32} />
                    </motion.div>

                    {/* Yellow Music Note */}
                    <motion.div
                      animate={{ y: [0, 20, 0], rotate: [-10, 10, -10] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-8 left-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                    >
                      <Music size={36} />
                    </motion.div>

                    {/* Extra Small Stars */}
                    <motion.div
                      animate={{ scale: [0, 1, 0], rotate: 180 }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-4 -right-4 text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    >
                      <Star fill="currentColor" size={24} />
                    </motion.div>
                    
                    <motion.div
                      animate={{ scale: [0, 1, 0], rotate: -180 }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                      className="absolute top-0 right-10 text-yellow-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                    >
                      <Sparkles size={20} />
                    </motion.div>
                  </div>

                  <div className="relative z-10 p-[4px] rounded-xl bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 animate-pulse">
                    <img 
                      src="/triplebaka.gif" 
                      alt="Triple Baka" 
                      className="w-[50vw] md:w-[25vw] max-w-xs rounded-xl bg-white object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BAKA 1 (Left - Blue) */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ scale: 0, x: -50, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="absolute left-[5%] md:left-[15%] z-40 text-[3rem] md:text-[5rem] font-black tracking-tighter text-yellow-500 will-change-transform drop-shadow-md -rotate-12"
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  BAKA!
                </motion.div>
              )}
            </AnimatePresence>

            {/* BAKA 2 (Top - Red) */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ scale: 0, y: -50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="absolute top-[35%] md:top-[25%] z-40 text-[3rem] md:text-[5rem] font-black tracking-tighter text-blue-500 will-change-transform drop-shadow-md rotate-6"
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  BAKA!
                </motion.div>
              )}
            </AnimatePresence>

            {/* BAKA 3 (Right - Yellow) */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ scale: 0, x: 50, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="absolute right-[5%] md:right-[15%] z-40 text-[3rem] md:text-[5rem] font-black tracking-tighter text-red-500 will-change-transform drop-shadow-md rotate-12"
                  style={{ WebkitTextStroke: '2px white' }}
                >
                  BAKA!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
