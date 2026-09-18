/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AccreditationsSection } from './components/AccreditationsSection';
import { ContactSection } from './components/ContactSection';
import { GothicFooter } from './components/GothicFooter';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialAccreditations
} from './data/initialData';

export default function App() {
  const profile = initialProfile;
  const projects = initialProjects;
  const skills = initialSkills;
  const experience = initialExperience;
  const accreditations = initialAccreditations;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scanlinesActive, setScanlinesActive] = useState(false);

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



  return (
    <div className="min-h-screen bg-[#050507] text-[#ded8cf] selection:bg-[#c5a059]/30 selection:text-[#f3efe6] relative font-sans overflow-hidden">
      <InteractiveBackground />
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
        scanlinesActive={scanlinesActive}
        onToggleScanlines={() => setScanlinesActive((prev) => !prev)}
      />

      {/* Main Portfolio Sections */}
      <main>
        {/* I. Hero & Identity (Dossier) */}
        <HeroSection
          profile={profile}
        />

        {/* II. Manifesto & Philosophical Ethos */}
        <ManifestoSection profile={profile} />

        {/* III. Featured Artifacts (Projects) */}
        <ProjectsSection projects={projects} />

        {/* IV. Skills & Technical Proficiency */}
        <SkillsSection skillCategories={skills} />

        {/* V. Experience & Academic Timeline */}
        <ExperienceSection experience={experience} />

        {/* VI. Accreditations & Credentials */}
        <AccreditationsSection accreditations={accreditations} />

        {/* VII. Contact */}
        <ContactSection profile={profile} />
      </main>

      {/* Gothic Editorial Footer */}
      <GothicFooter profile={profile} />
    </div>
  );
}
