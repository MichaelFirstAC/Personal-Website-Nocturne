import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, ArrowUpRight, Zap, Terminal, Shield, ExternalLink, Sparkles, Eye } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Systems & Arch',
    'Cryptographic',
    'Engine & UI',
    'Security'
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-24 relative border-b border-zinc-900 bg-[#08080a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>02 // SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Projects & Architecture
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3 font-serif italic">
            High-throughput distributed consensus fabrics, zero-knowledge verification, and low-latency systems.
          </p>
        </DisintegrateOnScroll>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono-code uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'border border-zinc-200 bg-white text-black font-medium shadow-sm'
                    : 'border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <DisintegrateOnScroll key={project.id} delay={idx * 0.07} className="h-full">
              <div className="h-full group rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-zinc-650 hover:bg-zinc-900/40 hover:-translate-y-1 transition-all duration-300 relative shadow-sm">
                <div>
                  {/* Meta Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono-code uppercase tracking-wider font-medium">
                      {project.codeName}
                    </span>
                    <span className="text-[11px] font-mono-code text-zinc-500">
                      {project.period}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Impact Highlight Pill */}
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-xs font-mono-code mb-4 shadow-sm">
                    <Zap className="w-3 h-3 text-zinc-400" />
                    <span className="font-semibold text-zinc-100">{project.impactMetric}</span>
                    <span className="text-zinc-400 text-[10px]">· {project.impactLabel}</span>
                  </div>

                  {/* Summary */}
                  <p className="font-serif text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3 font-light">
                    {project.summary}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-[11px] font-mono-code"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-500 text-[11px] font-mono-code">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Trigger Row */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono-code text-zinc-400 hover:text-white tracking-wider uppercase group/btn"
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:scale-110 transition-transform" />
                    <span>Inspect Case Study</span>
                  </button>

                  <div className="flex items-center space-x-2 text-zinc-500 text-xs">
                    {project.links.repository && (
                      <a
                        href={project.links.repository}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View source repository"
                        className="hover:text-zinc-200 p-1 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </DisintegrateOnScroll>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
