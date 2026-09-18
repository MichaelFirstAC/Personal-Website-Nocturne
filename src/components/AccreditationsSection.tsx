import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookCheck, ScrollText, CheckCircle2 } from 'lucide-react';
import { Accreditation } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface AccreditationsSectionProps {
  accreditations: Accreditation[];
}

export const AccreditationsSection: React.FC<AccreditationsSectionProps> = ({
  accreditations,
}) => {
  const getAccreditationIcon = (type: Accreditation['type']) => {
    switch (type) {
      case 'Degree':
        return <GraduationCap className="w-4 h-4 text-zinc-300" />;
      case 'Certification':
        return <Award className="w-4 h-4 text-zinc-300" />;
      case 'Publication':
        return <ScrollText className="w-4 h-4 text-zinc-300" />;
      default:
        return <BookCheck className="w-4 h-4 text-zinc-300" />;
    }
  };

  return (
    <section
      id="relics"
      className="py-24 relative border-b border-zinc-900 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>05 // CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Accreditations & Research
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-serif italic">
            Academic degrees, professional security certifications, and published technical treatises.
          </p>
        </DisintegrateOnScroll>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accreditations.map((item, idx) => (
            <DisintegrateOnScroll
              key={item.id}
              delay={idx * 0.08}
              className="p-6 rounded-lg border border-zinc-850 bg-zinc-950/60 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                      {getAccreditationIcon(item.type)}
                    </div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-400 font-medium">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-zinc-500">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-zinc-100 mb-1 leading-snug group-hover:text-white">
                  {item.title}
                </h3>
                <div className="text-xs font-mono-code text-zinc-400 mb-3">
                  {item.institution}
                </div>

                {item.honor && (
                  <div className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono-code mb-3">
                    {item.honor}
                  </div>
                )}

                <p className="font-serif text-sm text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono-code text-zinc-500">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-400">Credential Status: Active & Verified</span>
                </span>
                <span className="text-zinc-600">ID: #{item.id.slice(-4)}</span>
              </div>
            </DisintegrateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
