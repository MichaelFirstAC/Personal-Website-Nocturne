import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useArcade } from './ArcadeContext';

/**
 * GameControllerDock — A ghostly controller icon in the top-right of the Dossier.
 * Does nothing on click. Glows when a companion is dragged over it.
 * Dropping a companion on it launches the corresponding game.
 */

const CONTROLLER_PIXELS = [
  '   WWWW    WWWW   ',
  ' WWWWWWWWWWWWWWWW ',
  ' WW W WWWWWW W WW ',
  ' W WWW WWWW WWW W ',
  ' WW W WWWWWW W WW ',
  ' WWWWWWWWWWWWWWWW ',
  '  WWWW      WWWW  ',
  '   WW        WW   '
];

const ControllerSprite: React.FC<{ glowing: boolean }> = ({ glowing }) => {
  return (
    <div className="flex flex-col items-center">
      {CONTROLLER_PIXELS.map((row, y) => (
        <div key={y} className="flex" style={{ height: '3px' }}>
          {row.split('').map((char, x) => (
            <div
              key={x}
              style={{
                width: '3px',
                height: '3px',
                backgroundColor: char === 'W'
                  ? (glowing ? '#c084fc' : '#52525b')
                  : 'transparent',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const GameControllerDock: React.FC = () => {
  const { registerDock, dockHovered } = useArcade();
  const dockElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerDock(dockElRef.current);
    return () => registerDock(null);
  }, [registerDock]);

  return (
    <motion.div
      ref={dockElRef}
      className="absolute top-20 right-6 sm:right-10 z-40 pointer-events-none select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <motion.div
        className="relative p-3 rounded-lg"
        animate={
          dockHovered
            ? {
                scale: [1, 1.15, 1.08, 1.12],
                rotate: [0, -2, 2, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={
          dockHovered
            ? { duration: 0.6, repeat: Infinity, repeatType: 'mirror' }
            : { duration: 0.4 }
        }
        style={{
          opacity: dockHovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
          filter: dockHovered
            ? 'drop-shadow(0 0 12px rgba(168,85,247,0.6)) drop-shadow(0 0 24px rgba(168,85,247,0.3))'
            : 'none',
        }}
      >
        <ControllerSprite glowing={dockHovered} />

        {/* Glow ring when hovered */}
        {dockHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              border: '1px solid rgba(168,85,247,0.5)',
              boxShadow: '0 0 20px rgba(168,85,247,0.3), inset 0 0 20px rgba(168,85,247,0.1)',
            }}
          />
        )}

        {/* "DROP HERE" text hint */}
        {dockHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-code text-[8px] tracking-[0.15em] text-purple-400 uppercase"
          >
            DROP HERE
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
