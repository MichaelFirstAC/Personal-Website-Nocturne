import React from 'react';
import { X, ExternalLink, Github, BookOpen, Layers, CheckCircle, Cpu, Zap } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-zinc-800 bg-[#09090b] shadow-2xl p-6 sm:p-8 text-zinc-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono-code uppercase tracking-wider font-medium">
            {project.codeName}
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[10px] font-mono-code uppercase">
            {project.category}
          </span>
          <span className="text-zinc-500 text-xs font-mono-code">
            {project.period}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-light font-serif text-white mb-2 tracking-tight">
          {project.title}
        </h3>

        {/* Impact Stat Banner */}
        <div className="my-5 p-4 rounded-md border border-zinc-850 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-zinc-400" />
            <div>
              <div className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-400">
                {project.impactLabel}
              </div>
              <div className="text-2xl font-bold font-mono-code text-white">
                {project.impactMetric}
              </div>
            </div>
          </div>
          <span className="text-xs font-mono-code text-zinc-400 border border-zinc-800 bg-zinc-900 px-3 py-1 rounded">
            Audited & Verified
          </span>
        </div>

        {/* Full Overview */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-zinc-200 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-zinc-400" />
            <span>Overview & Architecture</span>
          </h4>
          <p className="font-serif text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {project.fullDescription}
          </p>
        </div>

        {/* Architectural Highlights */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-zinc-200 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <span>Key Engineering Milestones</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.architecturalHighlights.map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded border border-zinc-850 bg-zinc-900/40 flex items-start space-x-2.5 text-xs font-mono-code text-zinc-300"
              >
                <CheckCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="space-y-2 mb-8">
          <h4 className="text-sm font-medium text-zinc-200 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span>Technologies & Stack</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono-code"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* External Links Action Bar */}
        <div className="pt-5 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            {project.links.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono-code uppercase tracking-wider transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
            {project.links.documentation && (
              <a
                href={project.links.documentation}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono-code uppercase tracking-wider transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documentation</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-zinc-100 hover:bg-white text-black font-medium text-xs font-mono-code uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
