import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

const COLOR_MAP: Record<string, string> = {
  'W': '#e4e4e7', // Zinc 200 (White)
  'Y': '#facc15', // Yellow 400
  'P': '#a855f7', // Purple 500
  'R': '#ef4444', // Red 500
  'B': '#18181b', // Zinc 900 (Black)
  'L': '#93c5fd', // Blue 300 (Visor/Window)
  ' ': 'transparent'
};

const SPACESHIP_FRAME_1 = [
  "               ",
  "  WWWWWRR      ",
  "   WW          ",
  "    WWWW       ",
  "YRRRWWWWLLRR   ",
  "YRRRW          ",
  "     RR WWW    ",
  "WWWWWWWRRWWWWWW",
  "     RR WWW    ",
  "YRRRW          ",
  "YRRRWWWWLLRR   ",
  "    WWWW       ",
  "   WW          ",
  "  WWWWWRR      ",
  "               "
];

const SPACESHIP_FRAME_2 = [
  "               ",
  "  WWWWWRR      ",
  "   WW          ",
  "    WWWW       ",
  " RRRWWWWLLRR   ",
  "YRRRW          ",
  "     RR WWW    ",
  "WWWWWWWRRWWWWWW",
  "     RR WWW    ",
  "YRRRW          ",
  " RRRWWWWLLRR   ",
  "    WWWW       ",
  "   WW          ",
  "  WWWWWRR      ",
  "               "
];

const INVADER_FRAME_1 = [
  "   P    P   ",
  "    P  P    ",
  "   PPPPPP   ",
  "  PP PP PP  ",
  " PPPPPPPPPP ",
  " P PPPPPP P ",
  " P P    P P ",
  "    PP PP   "
];

const INVADER_FRAME_2 = [
  "   P    P   ",
  "  P P  P P  ",
  "  P PPPPPP  ",
  "  PPP  PPP  ",
  " PPPPPPPPPP ",
  "  P PPPP P  ",
  " P P    P P ",
  " P        P "
];

const PACMAN_FRAME_1 = [
  "          ",
  "   YYYY   ",
  " YYYYYYYY ",
  " YYYYYY   ",
  " YYYY     ",
  " YYYY     ",
  " YYYYYY   ",
  " YYYYYYYY ",
  "   YYYY   ",
  "          "
];

const PACMAN_FRAME_2 = [
  "          ",
  "   YYYY   ",
  " YYYYYYYY ",
  " YYYYYYYY ",
  " YYYYYYYY ",
  " YYYYYYYY ",
  " YYYYYYYY ",
  " YYYYYYYY ",
  "   YYYY   ",
  "          "
];

const PixelSprite = ({ frame }: { frame: string[] }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ minWidth: '32px', minHeight: '32px' }}>
      {frame.map((row, y) => (
        <div key={y} className="flex h-1">
          {row.split('').map((char, x) => (
            <div
              key={x}
              className="w-1 h-1"
              style={{ backgroundColor: COLOR_MAP[char] || 'transparent' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Companion = ({
  frames,
  duration,
  speech,
  position,
  flip = true,
  scale = 1,
  startRight = false,
  constraintsRef
}: {
  frames: string[][],
  duration: number,
  speech: string,
  position: { top?: string, bottom?: string },
  flip?: boolean,
  scale?: number,
  startRight?: boolean,
  constraintsRef: React.RefObject<HTMLDivElement>
}) => {
  const [frame, setFrame] = useState(0);
  const controls = useAnimation();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const x = useMotionValue(startRight ? windowWidth - 100 : 0);

  const [facingRight, setFacingRight] = useState(!startRight);
  const [isPaused, setIsPaused] = useState(false);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 0 ? 1 : 0));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused || windowWidth === 0) return;

    let isMounted = true;
    const roam = async () => {
      const currentX = x.get();
      const targetX = facingRight ? windowWidth - 100 : 0;
      
      const distance = Math.abs(targetX - currentX);
      const fullDistance = Math.max(windowWidth - 100, 1);
      const currentDuration = Math.max(duration * (distance / fullDistance), 0.1);

      await controls.start({
        x: targetX,
        transition: { duration: currentDuration, ease: "linear" }
      });

      if (isMounted) {
        setFacingRight(!facingRight);
      }
    };

    roam();

    return () => { 
      isMounted = false; 
      controls.stop(); 
    };
  }, [isPaused, windowWidth, facingRight, duration, controls, x]);

  const handleDragStart = () => {
    setIsPaused(true);
    if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
  };

  const handleDragEnd = () => {
    dragTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="absolute z-50 pointer-events-auto cursor-grab"
      style={{ ...position, x }}
      initial={{ scale }}
      animate={controls}
      whileHover={{ scale: scale * 1.2 }}
      whileDrag={{ scale: scale * 1.5, cursor: 'grabbing' }}
    >
      <div className="relative group p-4">
        <div style={{ transform: `scaleX(${!flip ? 1 : facingRight ? 1 : -1})`, transition: 'transform 0s' }}>
          <PixelSprite frame={frames[frame]} />
        </div>
        
        {/* Chat bubble on hover */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-500 text-zinc-300 text-[9px] font-mono-code px-2 py-1 rounded whitespace-nowrap pointer-events-none shadow-lg z-10">
          {speech}
        </div>
      </div>
    </motion.div>
  );
};

export const PixelCompanion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      <Companion 
        frames={[SPACESHIP_FRAME_1, SPACESHIP_FRAME_2]} 
        duration={50} 
        speech="*vroom*" 
        position={{ bottom: "2rem" }} 
        scale={0.6}
        constraintsRef={containerRef}
      />
      <Companion 
        frames={[INVADER_FRAME_1, INVADER_FRAME_2]} 
        duration={55} 
        speech="*pew pew*" 
        position={{ top: "4rem" }} 
        flip={false} 
        scale={0.9}
        constraintsRef={containerRef}
      />
      <Companion 
        frames={[PACMAN_FRAME_1, PACMAN_FRAME_2]} 
        duration={40} 
        speech="*waka waka*" 
        position={{ bottom: "2rem" }} 
        scale={0.9}
        startRight={true}
        constraintsRef={containerRef}
      />
    </div>
  );
};
