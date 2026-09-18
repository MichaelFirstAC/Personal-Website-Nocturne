import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, MapPin, Globe, Compass, Lock, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface ManifestoSectionProps {
  profile: ProfileInfo;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ profile }) => {
  const tenets = [
    {
      roman: 'I',
      title: 'Monolithic Rigor',
      latin: 'Rigor Structurae',
      desc: 'We forge software as stone cathedrals—heavy, enduring, and mathematically balanced, rejecting flimsy ephemeral sandcastles.'
    },
    {
      roman: 'II',
      title: 'Mathematical Invariance',
      latin: 'Veritas Formalis',
      desc: 'Formally proven safety guarantees and deterministic state machines supersede unverified human intuition.'
    },
    {
      roman: 'III',
      title: 'Sovereign Resilience',
      latin: 'Resistentia Perpetua',
      desc: 'Byzantine-fault tolerant systems designed to maintain consensus and zero-data loss even during adversarial partitions.'
    }
  ];

  return (
    <section
      id="manifesto"
      className="py-24 relative border-b border-zinc-900 bg-[#08080a]"
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

            {/* Quick Dossier Snapshot Bento */}
            <div className="p-5 rounded-lg border border-zinc-850 bg-zinc-950/80 text-xs font-mono-code space-y-3">
              <div className="text-zinc-400 uppercase tracking-wider text-[11px] pb-2 border-b border-zinc-900 flex justify-between items-center">
                <span>System Profile</span>
                <span className="text-zinc-300">TIER-1 ARCHITECT</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-zinc-400">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Dialects</span>
                  <span className="text-zinc-200">Rust, C++20, Go, TS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Verification</span>
                  <span className="text-emerald-400">Formal TLA+ / Lean</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Consensus</span>
                  <span className="text-zinc-200">Raft / Paxos / BFT</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Availability</span>
                  <span className="text-zinc-200">Consulting & Advisory</span>
                </div>
              </div>
            </div>
          </DisintegrateOnScroll>
        </div>
      </div>
    </section>
  );
};
