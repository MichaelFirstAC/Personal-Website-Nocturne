import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, MapPin, Globe, Compass, Lock, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';
import { GolshiTakeover } from './GolshiTakeover';
import { playPrankClick } from '../utils/audio';

interface ManifestoSectionProps {
  profile: ProfileInfo;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ profile }) => {
  const [isTakingOver, setIsTakingOver] = useState(false);

  const handleGolshiClick = () => {
    playPrankClick();
    setIsTakingOver(true);
  };

  const tenets = [
    {
      roman: 'I',
      title: 'Relentless Technical Curiosity',
      latin: 'Curiositas Infinita',
      desc: 'Never sticking to one lane. From Next.js and Firebase to GNNs and Kali Linux, down to reapplying thermal paste for dGPU optimization.'
    },
    {
      roman: 'II',
      title: 'Logic & Narrative Harmony',
      latin: 'Logica et Fabula',
      desc: 'Balancing hardcore CS analytics with creative storytelling, character archetypes, and a deep appreciation for history.'
    },
    {
      roman: 'III',
      title: 'Community & Pragmatism',
      latin: 'Communitas et Usus',
      desc: 'Building practical solutions that optimize life alongside others—fueled by unwavering food loyalty and zero runny eggs.'
    }
  ];

  const terminalLogs = [
    "PakaTuber protocol initiated...",
    "Establishing connection to Tracen Academy... [OK]",
    "Deploying mysterious sunglasses...",
    "Solving Rubik's cube... [3.01s]",
    "Eating yakisoba... 99%",
    "Bypassing starting gate protocols... [WARN]",
    "12 Billion Yen Paper Scraps... [Takarazuka 2015]",
    "Loading The Creature, Gold Ship...",
    "Allocating stamina buffers...",
    "Dropkicking the Trainer... [OK]",
    "Validating beauty metrics... [Number One!]",
    "Decrypting McQueen's payload... 99%",
    "Initializing Unsinkable Battleship mode...",
    "Roaring at the crowd... [OK]",
    "Connecting to Tazuna..",
    "Establishing Golshi tunnel... [OK]",
    "Checking for carrots...",
    "No carrots found. Running rampage build.",
    "Activating Gold subsystems...",
    "System temperature: Peace-peacccccce!!!",
    "Starting main gate...",
    "Gate delay latency: 120ms",
    "Handshake successful (bit the groom).",
    "GOLSHI.EXE IS ONLINE!!!!",
    "TRAINER! LOOK AT THIS! SO COOL!!!"
  ];

  return (
    <section
      id="manifesto"
      className="py-24 relative border-b border-zinc-900 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>01 // ARCHITECTURAL MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Philosophy & Ethos
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-serif italic">
            First principles governing distributed systems, resilience, and software architecture.
          </p>
        </DisintegrateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Manifesto statement */}
          <DisintegrateOnScroll className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-lg border border-zinc-800/80 bg-zinc-950/70 shadow-sm relative">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-900">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <span className="font-mono-code text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Engineering Statement
                </span>
              </div>

              <div className="space-y-4 font-serif text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                {profile.manifesto.map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-500">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-400">Formal Verification: Enforced</span>
                </div>
              </div>
            </div>
          </DisintegrateOnScroll>

          {/* Right Column: Three Architectural Axioms & Coordinates */}
          <DisintegrateOnScroll className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono-code uppercase tracking-wider text-zinc-400 mb-2 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Core Tenets</span>
            </div>

            {tenets.map((tenet) => (
              <div
                key={tenet.roman}
                className="p-5 rounded-lg border border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 transition-colors group mb-3"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center font-mono font-medium text-zinc-300 text-xs shrink-0">
                    {tenet.roman}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white">
                        {tenet.title}
                      </h4>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                      {tenet.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Digital Terminal Animation Box */}
            <div className="p-5 rounded-lg border border-zinc-850 bg-zinc-950 text-xs font-mono-code relative overflow-hidden group h-56 shadow-sm">
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />

              {/* Vertical Fade Edges */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none z-30" />

              {/* Scrolling Container */}
              <div className="relative z-10 text-[10px] tracking-wider w-full h-full">
                <div className="animate-terminal-scroll flex flex-col">
                  {[...terminalLogs, ...terminalLogs].map((log, idx) => (
                    <div key={idx} className="flex items-center space-x-2 py-0.5">
                      <span className="text-zinc-500 shrink-0">{'>'}</span>
                      <span className={
                        log === 'GOLSHI.ONLINE' ? 'text-red-500 font-bold'
                          : (idx % 5 === 0) ? 'text-yellow-400/90'
                            : (idx % 2 === 0) ? 'text-red-400/90'
                              : 'text-zinc-200/90'
                      }>{log}</span>
                      {log === 'GOLSHI.ONLINE' && (
                        <span className="w-1.5 h-3 bg-red-500 animate-pulse block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicators */}
              <div className="absolute top-3 right-3 flex space-x-1.5 z-40">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-[pulse_2s_infinite]" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-[pulse_2s_infinite_200ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 animate-[pulse_2s_infinite_400ms]" />
              </div>

              {/* Goldship GIF Mascot */}
              <div className="absolute bottom-1 right-6 z-40 opacity-60 group-hover:opacity-100 transition-opacity duration-500 group/golshi">
                {/* Speech Bubble */}
                <div className="absolute -top-6 -right-2 opacity-0 group-hover/golshi:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                  <div className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-sans px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl relative">
                    Hey Hey Trainer! Check This Out!
                    {/* Bubble tail */}
                    <div className="absolute -bottom-1 right-12 w-2 h-2 bg-zinc-900 border-b border-r border-zinc-700 rotate-45" />
                  </div>
                </div>

                <img
                  src="/gold-ship-uma-musume.gif"
                  alt="Terminal Mascot"
                  data-custom-sound="true"
                  onClick={handleGolshiClick}
                  className="w-32 h-32 object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.3)] cursor-pointer active:scale-95 transition-transform"
                />
              </div>
            </div>
          </DisintegrateOnScroll>
        </div>
      </div>

      {isTakingOver && (
        <GolshiTakeover
          isActivating={true}
          onComplete={() => setIsTakingOver(false)}
        />
      )}
    </section>
  );
};
