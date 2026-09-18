import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const InteractiveBackground: React.FC = () => {
  // Mouse position for the background glow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ambient Mouse Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-[#c5a059]/5 blur-[150px] pointer-events-none -ml-[400px] -mt-[400px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      
      {/* Subtle minimalist grid backdrop (moved from HeroSection to be global) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Draggable Artifact 1: The Hexagon */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 150, top: 0, bottom: windowSize.height - 150 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute top-[20%] left-[15%] w-36 h-36 pointer-events-auto cursor-grab"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full border border-zinc-700/40 bg-zinc-900/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.05)] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400 group-hover:text-[#c5a059] transition-colors duration-500">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" y1="22" x2="12" y2="12" />
            <line x1="22" y1="8.5" x2="12" y2="12" />
            <line x1="2" y1="8.5" x2="12" y2="12" />
          </svg>
        </div>
      </motion.div>

      {/* Draggable Artifact 2: The Core */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 200, top: 0, bottom: windowSize.height - 200 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 pointer-events-auto cursor-grab"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          rotate: [0, -20, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-full h-full rounded-full border border-zinc-800/60 bg-[#08080a]/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.03)] overflow-hidden relative group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="w-24 h-24 border border-zinc-700/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
             <div className="w-12 h-12 border border-zinc-600/50 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
           </div>
        </div>
      </motion.div>

      {/* Draggable Artifact 3: The Data Node */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 100, top: 0, bottom: windowSize.height - 100 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute top-[60%] left-[40%] w-20 h-20 pointer-events-auto cursor-grab hidden md:block"
        animate={{
          y: [0, 20, -10, 0],
          x: [0, 10, -10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-full h-full border border-zinc-700/30 bg-zinc-900/30 backdrop-blur-xl rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative group">
          <div className="text-[9px] font-mono-code text-zinc-600 group-hover:text-zinc-300 transition-colors">
            NODE_03
          </div>
        </div>
      </motion.div>

      {/* Draggable Artifact 4: The Prism */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 100, top: 0, bottom: windowSize.height - 250 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute bottom-[10%] left-[25%] w-16 h-40 pointer-events-auto cursor-grab"
        animate={{
          y: [0, -20, 10, 0],
          rotate: [0, 5, -2, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-full h-full border border-zinc-700/40 bg-zinc-900/20 backdrop-blur-lg rounded-xl flex flex-col items-center justify-between py-4 shadow-[0_0_30px_rgba(255,255,255,0.02)] overflow-hidden relative group">
          <div className="w-8 h-px bg-zinc-600/50" />
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c5a059]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="w-8 h-px bg-zinc-600/50" />
        </div>
      </motion.div>

      {/* Draggable Artifact 5: The Orbit */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 250, top: 0, bottom: windowSize.height - 100 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute top-[15%] right-[35%] w-40 h-16 pointer-events-auto cursor-grab hidden lg:block"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <div className="w-full h-full border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-sm rounded-full flex items-center px-4 shadow-lg overflow-hidden relative group">
          <div className="w-full h-px bg-zinc-800 relative">
            <motion.div
              className="absolute top-1/2 left-0 w-3 h-3 -mt-1.5 rounded-full bg-[#c5a059]/80 shadow-[0_0_10px_#c5a059]"
              animate={{ x: [0, 120, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Draggable Artifact 6: The Glyph */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 80, top: 0, bottom: windowSize.height - 80 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
        className="absolute top-[80%] left-[70%] w-12 h-12 pointer-events-auto cursor-grab"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <div className="w-full h-full border border-[#c5a059]/30 bg-[#c5a059]/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.1)] group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#c5a059] group-hover:rotate-90 transition-transform duration-700">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </motion.div>

      {/* Draggable Artifact 7: The Monolith */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: windowSize.width - 80, top: 0, bottom: windowSize.height - 300 }}
        dragElastic={0.2}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        className="absolute top-[40%] right-[10%] w-10 h-64 pointer-events-auto cursor-grab hidden md:block"
        animate={{
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full border border-zinc-800/50 bg-[#050507]/60 backdrop-blur-xl rounded-sm shadow-2xl overflow-hidden relative group flex justify-center">
          <motion.div
            className="w-full h-1 bg-[#c5a059]/50 shadow-[0_0_15px_#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ y: [0, 250, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
