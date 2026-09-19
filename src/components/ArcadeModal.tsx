import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useArcade, CompanionId } from './ArcadeContext';
import { X } from 'lucide-react';

const GAME_NAMES: Record<CompanionId, string> = {
  galaxia: 'GALAXIA',
  invader: 'SPACE INVADERS',
  pacman: 'PAC-MAN',
};

const GAME_COLORS: Record<CompanionId, string> = {
  galaxia: '#a855f7',
  invader: '#22d3ee',
  pacman: '#facc15',
};

export const ArcadeModal: React.FC = () => {
  const { activeGame, closeGame } = useArcade();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{ stop: () => void } | null>(null);
  const [bootPhase, setBootPhase] = useState<'off' | 'flicker' | 'loading' | 'ready' | 'playing'>('off');

  // Boot sequence when game becomes active
  useEffect(() => {
    if (!activeGame) {
      setBootPhase('off');
      return;
    }

    setBootPhase('flicker');
    const t1 = setTimeout(() => setBootPhase('loading'), 400);
    const t2 = setTimeout(() => setBootPhase('ready'), 1400);
    const t3 = setTimeout(() => setBootPhase('playing'), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeGame]);

  // Start game engine when phase becomes 'playing'
  useEffect(() => {
    if (bootPhase !== 'playing' || !activeGame || !canvasRef.current) return;

    let cancelled = false;

    const loadAndStart = async () => {
      let gameModule: { start: (canvas: HTMLCanvasElement) => { stop: () => void } };

      if (activeGame === 'galaxia') {
        gameModule = await import('../games/GalaxiaGame');
      } else if (activeGame === 'invader') {
        gameModule = await import('../games/InvaderGame');
      } else {
        gameModule = await import('../games/PacmanGame');
      }

      if (!cancelled && canvasRef.current) {
        gameRef.current = gameModule.start(canvasRef.current);
      }
    };

    loadAndStart();

    return () => {
      cancelled = true;
      if (gameRef.current) {
        gameRef.current.stop();
        gameRef.current = null;
      }
    };
  }, [bootPhase, activeGame]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGame) {
        e.preventDefault();
        if (gameRef.current) {
          gameRef.current.stop();
          gameRef.current = null;
        }
        closeGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeGame, closeGame]);

  const handleClose = () => {
    if (gameRef.current) {
      gameRef.current.stop();
      gameRef.current = null;
    }
    closeGame();
  };

  return (
    <AnimatePresence>
      {activeGame && (
        <motion.div
          key="arcade-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
        >
          {/* CRT vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 y2k-scanlines"
          />

          {/* Boot sequence screens */}
          <AnimatePresence mode="wait">
            {bootPhase === 'flicker' && (
              <motion.div
                key="flicker"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0.5, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#050510]"
              />
            )}

            {bootPhase === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center z-10"
              >
                <div
                  className="font-mono-code text-xs tracking-[0.3em] uppercase mb-4 animate-pulse"
                  style={{ color: GAME_COLORS[activeGame] }}
                >
                  LOADING
                </div>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2"
                      style={{ backgroundColor: GAME_COLORS[activeGame] }}
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {bootPhase === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="text-center z-10"
              >
                <div
                  className="font-mono-code text-3xl font-bold tracking-widest mb-3"
                  style={{ color: GAME_COLORS[activeGame] }}
                >
                  {GAME_NAMES[activeGame]}
                </div>
                <div className="font-mono-code text-xs tracking-[0.2em] text-zinc-500 animate-pulse">
                  INSERT COIN
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game canvas — visible during 'playing' phase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: bootPhase === 'playing' ? 1 : 0,
              scale: bootPhase === 'playing' ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
            style={{ width: '90vw', maxWidth: '600px', height: '80vh', maxHeight: '500px' }}
          >
            {/* CRT bezel */}
            <div
              className="absolute -inset-3 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, #1a1a2e, #0a0a14)',
                border: `1px solid ${GAME_COLORS[activeGame]}30`,
                boxShadow: `0 0 30px ${GAME_COLORS[activeGame]}15, inset 0 0 60px rgba(0,0,0,0.5)`,
              }}
            />

            <canvas
              ref={canvasRef}
              className="relative w-full h-full rounded"
              style={{
                imageRendering: 'pixelated',
                boxShadow: `inset 0 0 40px rgba(0,0,0,0.4), 0 0 2px ${GAME_COLORS[activeGame]}40`,
              }}
            />

            {/* Quit button */}
            <button
              onClick={handleClose}
              className="absolute -top-6 -right-6 z-20 w-8 h-8 rounded bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:bg-red-950 flex items-center justify-center transition-all group"
              title="Quit game (Esc)"
            >
              <X className="w-4 h-4 text-zinc-500 group-hover:text-red-400 transition-colors" />
            </button>

            {/* Controls hint */}
            {bootPhase === 'playing' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -bottom-8 left-0 right-0 text-center font-mono-code text-[9px] tracking-widest text-zinc-600 uppercase"
              >
                Arrow keys to move · Space to shoot · Esc to quit
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
