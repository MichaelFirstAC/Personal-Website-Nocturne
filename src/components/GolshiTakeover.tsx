import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
  isActivating: boolean;
}

export const GolshiTakeover: React.FC<Props> = ({ onComplete, isActivating }) => {
  const [flash, setFlash] = useState(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (isActivating) {
      // Play jumpscare sound effect only once per activation
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        const sfx = new Audio('/goldshidropkick.mp3');
        sfx.volume = 1;
        sfx.play().catch((e) => console.error("Dropkick SFX failed:", e));
      }

      // Flash happens when she hits the middle of the screen
      const flashTimer = setTimeout(() => {
        setFlash(true);
      }, 150);

      const endTimer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => {
        clearTimeout(flashTimer);
        clearTimeout(endTimer);
      };
    } else {
      // Turning off - just a quick flash
      hasPlayedRef.current = false;
      setFlash(true);
      const endTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(endTimer);
    }
  }, [isActivating, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isActivating ? 0.3 : 0.2 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>

      {isActivating && (
        <>
          {/* Goldship dropkick across screen */}
          <motion.img
            src="/golshipopup.png"
            alt="MADE OF GOLD!"
            className="w-96 h-96 object-contain absolute z-10"
            style={{ imageRendering: 'pixelated' }}
            initial={{ y: '100vh', x: 0, rotate: 0, scale: 0.5 }}
            animate={{
              y: ['100vh', '0vh', '0vh', '20vh'],
              scale: [0.5, 2.8, 2.4, 2.8],
              rotate: [0, -5, 5, 0],
              opacity: [1, 1, 1, 0]
            }}
            transition={{ duration: 2.0, delay: 0.2, times: [0, 0.05, 0.85, 1], ease: 'easeInOut' }}
          />

          {/* Text "MADE OF GOLD!" */}
          <motion.div
            className="absolute text-[12rem] drop-shadow-[0_0_30px_rgba(250,204,21,1)] whitespace-nowrap z-20 leading-none flex"
            style={{ fontFamily: 'Impact, sans-serif', fontStyle: 'italic' }}
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{
              scale: [0, 1.2, 1, 0],
              opacity: [0, 1, 1, 0],
              rotate: [-15, 5, 10, -5]
            }}
            transition={{ duration: 2.0, times: [0, 0.05, 0.85, 1] }}
          >
            {"TRAINER ALERT!".split('').map((char, index) => {
              if (char === ' ') return <span key={index} className="w-8"></span>;
              return (
                <span
                  key={index}
                  className={index % 2 === 0 ? 'text-red-600' : 'text-white'}
                >
                  {char}
                </span>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};
