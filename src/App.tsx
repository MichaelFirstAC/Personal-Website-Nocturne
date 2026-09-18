/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Edit3, Printer, Sparkles, Shield, ChevronUp } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AccreditationsSection } from './components/AccreditationsSection';
import { ContactSection } from './components/ContactSection';
import { GothicFooter } from './components/GothicFooter';
import { TemplateEditorModal } from './components/TemplateEditorModal';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialAccreditations
} from './data/initialData';
import { ProfileInfo } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('nocturne_cv_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [projects] = useState(initialProjects);
  const [skills] = useState(initialSkills);
  const [experience] = useState(initialExperience);
  const [accreditations] = useState(initialAccreditations);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scanlinesActive, setScanlinesActive] = useState(false);

  // Update profile and persist locally
  const handleUpdateProfile = (updated: ProfileInfo) => {
    setProfile(updated);
    localStorage.setItem('nocturne_cv_profile', JSON.stringify(updated));
  };

  // Scroll Progress Listener for dynamic scroll-triggered header and ambient shadow depth
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrintCV = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#ded8cf] selection:bg-[#c5a059]/30 selection:text-[#f3efe6] relative font-sans">
      {/* Optional Y2K CRT Scanlines layer */}
      {scanlinesActive && (
        <div className="fixed inset-0 pointer-events-none z-40 y2k-scanlines opacity-75" />
      )}

      {/* Scroll Progress Bar at the top edge */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#8c702a] via-[#c5a059] to-[#eedc9a] z-50 transition-all duration-100 shadow-[0_0_8px_#c5a059]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Primary Navigation Bar */}
      <Navigation
        profile={profile}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        onPrintCV={handlePrintCV}
        scanlinesActive={scanlinesActive}
        onToggleScanlines={() => setScanlinesActive((prev) => !prev)}
      />

      {/* Main Portfolio Sections */}
      <main>
        {/* I. Hero & Identity (Dossier) */}
        <HeroSection
          profile={profile}
          onOpenCustomizer={() => setCustomizerOpen(true)}
          onPrintCV={handlePrintCV}
        />

        {/* II. Manifesto & Philosophical Ethos */}
        <ManifestoSection profile={profile} />

        {/* III. Featured Artifacts (Projects) */}
        <ProjectsSection projects={projects} />

        {/* IV. Guildcraft & Arcane Disciplines (Skills) */}
        <SkillsSection skillCategories={skills} />

        {/* V. Chronicles & Provenance (Experience) */}
        <ExperienceSection experience={experience} />

        {/* VI. Accreditations & Scholarly Relics */}
        <AccreditationsSection accreditations={accreditations} />

        {/* VII. Summoning & Encrypted Dispatch (Contact) */}
        <ContactSection profile={profile} />
      </main>

      {/* Gothic Editorial Footer */}
      <GothicFooter profile={profile} onPrintCV={handlePrintCV} />

      {/* Floating Quick Action Widget (Persistent helper) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 no-print">
        <button
          onClick={() => setCustomizerOpen(true)}
          id="floating-customize-btn"
          title="Open Template Customizer"
          className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#c5a059]/50 bg-[#12121a]/95 text-[#c5a059] hover:text-[#eedc9a] hover:border-[#c5a059] text-xs font-mono-code shadow-[0_10px_25px_-5px_rgba(0,0,0,0.9),0_0_15px_rgba(197,160,89,0.2)] backdrop-blur-md transition-all group"
        >
          <Edit3 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Customize Template Data</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>

      {/* Live Template Customizer Modal */}
      <TemplateEditorModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
