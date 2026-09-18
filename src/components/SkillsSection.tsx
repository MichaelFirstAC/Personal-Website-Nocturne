import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Shield, Layout, Terminal, Sparkles, Check, Flame } from 'lucide-react';
import { SkillCategory, SkillItem } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#c5a059]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#c5a059]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#c5a059]" />;
      case 'Terminal':
      default:
        return <Terminal className="w-5 h-5 text-[#c5a059]" />;
    }
  };

  const getTierColor = (tier: SkillItem['tier']) => {
    switch (tier) {
      case 'Grandmaster':
        return 'text-zinc-200 border-zinc-700 bg-zinc-800/60';
      case 'Master':
        return 'text-zinc-300 border-zinc-800 bg-zinc-900/60';
      case 'Adept':
      default:
        return 'text-zinc-400 border-zinc-850 bg-zinc-900/30';
    }
  };

  return (
    <section
      id="skills"
      className="py-24 relative border-b border-zinc-900 bg-[#08080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>03 // TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Skills & Competencies
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-serif italic">
            Hardened proficiencies across low-latency systems, cryptographic invariants, and distributed architecture.
          </p>
        </DisintegrateOnScroll>

        {/* Category Navigation Pills */}
        <DisintegrateOnScroll className="w-full mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {skillCategories.map((cat, idx) => {
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-4 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                    isSelected
                      ? 'border-zinc-500 bg-zinc-900 shadow-sm'
                      : 'border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-200">
                      {cat.title}
                    </div>
                    <div className="text-[11px] font-mono-code text-zinc-500 uppercase tracking-wider mt-0.5">
                      {cat.skills.length} Competencies
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </DisintegrateOnScroll>

        {/* Active Category Disciplines Showcase */}
        {skillCategories[activeCategoryIndex] && (
          <DisintegrateOnScroll className="rounded-lg border border-zinc-850 bg-zinc-950/70 p-6 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-zinc-900 gap-3">
                  <div>
                    <h3 className="text-xl font-medium text-zinc-100">
                      {skillCategories[activeCategoryIndex].title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1 font-serif font-light">
                      {skillCategories[activeCategoryIndex].description}
                    </p>
                  </div>
                  <div className="text-xs font-mono-code text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded self-start sm:self-auto">
                    Verified Proficiencies
                  </div>
                </div>

                {/* Skill Bars List */}
                <div className="space-y-6">
                  {skillCategories[activeCategoryIndex].skills.map((skill, sIdx) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-xs font-mono-code gap-2">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-medium text-zinc-200 text-sm tracking-wide">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[9px] uppercase px-2 py-0.5 rounded border tracking-wider font-medium ${getTierColor(
                              skill.tier
                            )}`}
                          >
                            {skill.tier}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-zinc-400">
                          {skill.specialty && (
                            <span className="text-[11px] text-zinc-400 italic font-serif hidden sm:inline">
                              Focus: {skill.specialty}
                            </span>
                          )}
                          <span className="font-medium text-zinc-200 font-mono-code">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress track */}
                      <div className="h-1.5 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.7, delay: sIdx * 0.05, ease: 'easeOut' }}
                          className="h-full bg-zinc-200 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Micro Note */}
                <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between text-xs font-mono-code text-zinc-500 gap-2">
                  <span className="flex items-center space-x-1.5">
                    <Flame className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Proficiencies validated in high-throughput production environments.</span>
                  </span>
                  <span>STANDARD: APEX VERIFIED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </DisintegrateOnScroll>
        )}
      </div>
    </section>
  );
};
