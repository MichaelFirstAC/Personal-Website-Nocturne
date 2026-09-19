import React from 'react';
import { Music } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${isPlaying
        ? 'border-[#c5a059]/50 bg-[#c5a059]/10 text-[#c5a059]'
        : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
        }`}
      title={isPlaying ? "Pause Ambient Track" : "Play Ambient Track"}
    >
      {isPlaying ? (
        <div className="flex items-center gap-[2px] h-4">
          <motion.div
            className="w-1 bg-[#c5a059] rounded-full"
            animate={{ height: ['40%', '100%', '60%', '100%', '40%'] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-1 bg-[#c5a059] rounded-full"
            animate={{ height: ['80%', '40%', '100%', '60%', '80%'] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-1 bg-[#c5a059] rounded-full"
            animate={{ height: ['60%', '100%', '40%', '80%', '60%'] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : (
        <Music className="w-4 h-4" />
      )}
      <span className="text-xs font-mono-code uppercase tracking-wider hidden sm:block">
        {isPlaying ? 'Playing' : 'BGM'}
      </span>
    </button>
  );
};
