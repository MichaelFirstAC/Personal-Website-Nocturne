import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
  isActivating: boolean;
}

export const AdoEasterEgg: React.FC<Props> = ({ onComplete, isActivating }) => {
  const [phase, setPhase] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (isActivating) {
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        setPhase(1);

        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playBassDrop = () => {
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 2);
          
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 2);
        };

        const playGlitch = () => {
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.type = 'sawtooth';
          
          // Glitchy, aggressive frequency jumps spreading across 1.2 seconds
          osc.frequency.setValueAtTime(150, audioCtx.currentTime);
          osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.1);
          osc.frequency.setValueAtTime(200, audioCtx.currentTime + 0.2);
          osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.35);
          osc.frequency.setValueAtTime(100, audioCtx.currentTime + 0.45);
          osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.6);
          osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 1.2);
          
          gain.gain.setValueAtTime(0, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05); // sharp attack
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2); // fade out slowly matching the text
          
          osc.start();
          osc.stop(audioCtx.currentTime + 1.2);
        };

        const playRockstar = () => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(console.error);
          }
        };

        playBassDrop();

        const t1 = setTimeout(() => {
          setPhase(2);
          playGlitch();
        }, 1500);

        const t2 = setTimeout(() => {
          setPhase(3);
          playRockstar();
        }, 3000);

        const t3 = setTimeout(() => {
          setPhase(4);
          // Fade out audio
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 10000); // Give the GIF 7 seconds to play

        const t4 = setTimeout(() => {
          onComplete();
          setPhase(0);
        }, 11000);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(t4);
        };
      }
    } else {
      hasPlayedRef.current = false;
      setPhase(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {isActivating && (
        <motion.div
          className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Rockstar audio */}
          <audio ref={audioRef} src="/rockstarcuts.mp3" preload="auto" />
          {/* Background effects */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent mix-blend-screen"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Phase 1: Quote */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                className="text-blue-500 font-blackletter text-5xl sm:text-7xl tracking-wider text-center drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              >
                "Are you ready for the show?"
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2: Glitch texts (Usseewa style) */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -2 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.1, 1.2, 1.4], rotate: [-2, 0, 0, 2] }}
                  transition={{ duration: 1.4, times: [0, 0.1, 0.8, 1] }}
                  className="text-5xl md:text-7xl font-black text-transparent tracking-tighter will-change-transform text-center"
                  style={{ WebkitTextStroke: '3px #dc2626' }}
                >
                  WORLD DOMINATION!
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3: The GIF */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center w-full h-full"
              >
                {/* Dark Blue Rays of Light Illuminating the GIF - optimized */}
                <div 
                  className="absolute w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] animate-spin z-0 opacity-50 will-change-transform"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(30,58,138,0) 0deg, rgba(59,130,246,0.6) 60deg, rgba(30,58,138,0) 120deg, rgba(59,130,246,0.6) 180deg, rgba(30,58,138,0) 240deg, rgba(59,130,246,0.6) 300deg, rgba(30,58,138,0) 360deg)',
                    animationDuration: '15s',
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                  }}
                />

                {/* Floating blue petals - optimized */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 z-10 will-change-transform"
                    initial={{
                      x: (Math.random() - 0.5) * 1000,
                      y: (Math.random() - 0.5) * 1000 + 300,
                      rotate: Math.random() * 360,
                      scale: 0.5 + Math.random() * 0.8
                    }}
                    animate={{
                      y: [null, (Math.random() - 0.5) * 1000 - 400],
                      x: [null, (Math.random() - 0.5) * 1000 + (Math.random() > 0.5 ? 200 : -200)],
                      rotate: [null, Math.random() * 360 + 180]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                      <path d="M50 0 C 80 30, 90 70, 50 100 C 10 70, 20 30, 50 0" fill="currentColor" opacity="0.8" />
                    </svg>
                  </motion.div>
                ))}

                <motion.img
                  src="/adocampanella.gif"
                  alt="Ado Campanella"
                  className="w-[90vw] md:w-[60vw] max-w-4xl object-cover rounded-xl shadow-[0_0_60px_rgba(37,99,235,0.6)] border-2 border-blue-600/50 relative z-20"
                />
                
                {/* Niconico style Danmaku comments - optimized */}
                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                  {[
                    "うっせぇわ!!", "Ado-chan!!!", "THE FIRST CLOUD", "SHOW TIME!",
                    "Campanella", "最高！", "神曲", "blue rose", "愛して愛して愛して",
                    "ギラギラ", "踊", "Ready for my rule?", "I'm a controversy",
                    "阿修羅ちゃん", "レディメイド", "逆光", "Tot Musica", "新時代",
                    "Ado最高!!", "うおおおおお", "88888888", "天才", "I love Ado!!"
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="absolute whitespace-nowrap font-bold text-white/90 drop-shadow-md will-change-transform"
                      style={{ 
                        top: `${5 + Math.random() * 85}%`, 
                        fontSize: `${1.5 + Math.random() * 2}rem`,
                        textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                      }}
                      initial={{ x: '100vw' }}
                      animate={{ x: '-150vw' }}
                      transition={{
                        duration: 3 + Math.random() * 4,
                        delay: Math.random() * 4,
                        ease: "linear",
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanline overlay for aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-50 opacity-20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
