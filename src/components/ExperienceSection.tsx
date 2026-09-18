import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { ExperienceRole } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface ExperienceSectionProps {
  experience: ExperienceRole[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section
      id="experience"
      className="py-24 relative border-b border-zinc-900 bg-[#08080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>04 // WORK HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Experience & Stewardship
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-serif italic">
            A chronological record of architectural leadership, infrastructure engineering, and systems strategy.
          </p>
        </DisintegrateOnScroll>

        {/* Minimalist Timeline */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 md:ml-28 space-y-10 pb-6">
          {experience.map((role, idx) => (
            <DisintegrateOnScroll
              key={role.id}
              delay={idx * 0.08}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Minimal Node on Timeline */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border border-zinc-400 bg-zinc-900 group-hover:bg-white transition-colors" />

              {/* Epoch Tag for larger screens positioned to left */}
              <div className="hidden md:block absolute -left-32 top-1 text-right w-24 text-[11px] font-mono-code text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <span className="block font-medium">{role.period.split(' ')[0]}</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-600">Era</span>
              </div>

              {/* Chronicle Card */}
              <div className="rounded-lg border border-zinc-850 bg-zinc-950/60 p-6 sm:p-7 hover:border-zinc-700 transition-colors shadow-sm">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-zinc-400">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-200 font-medium">{role.organization}</span>
                    {role.division && (
                      <span className="text-zinc-500 hidden sm:inline">· {role.division}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono-code text-zinc-400">
                    <span className="flex items-center space-x-1 md:hidden">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{role.period}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{role.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="text-lg sm:text-xl font-medium text-zinc-100 mb-3 group-hover:text-white transition-colors">
                  {role.role}
                </h3>

                {/* Narrative Summary */}
                <p className="font-serif text-sm sm:text-base text-zinc-300 leading-relaxed mb-5 font-light">
                  {role.summary}
                </p>

                {/* Feats & Achievements */}
                <div className="space-y-2 mb-5">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-zinc-400 flex items-center space-x-2">
                    <Award className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Key Milestones & Outcomes</span>
                  </div>
                  {role.achievements.map((item, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start space-x-2.5 text-xs sm:text-sm font-serif text-zinc-300 leading-normal font-light"
                    >
                      <span className="text-zinc-500 text-xs mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Utilized */}
                <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono-code text-zinc-500 uppercase mr-2 tracking-wider">
                    Stack:
                  </span>
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono-code"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </DisintegrateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
