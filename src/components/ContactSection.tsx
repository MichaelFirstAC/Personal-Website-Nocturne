import React, { useState } from 'react';
import { Mail, Shield, Copy, Check, Send, ArrowUpRight, Github, Twitter, Linkedin, Terminal, Sparkles, Instagram, MessageSquare } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const handleCopyPgp = () => {
    navigator.clipboard.writeText(profile.pgpKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <section
      id="dispatch"
      className="py-24 relative border-b border-zinc-900 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <DisintegrateOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-zinc-500 font-mono-code text-xs tracking-[0.2em] uppercase mb-2">
            <span>06 // INQUIRIES & DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-zinc-100 font-serif">
            Contact & Consultation
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-serif italic">
            Initiate direct communication for mission-critical architectural engagements, advisory, or keynotes.
          </p>
        </DisintegrateOnScroll>

        <div className="max-w-2xl mx-auto items-start">
            {/* Direct Coordinates Card */}
            <div className="p-6 rounded-lg border border-zinc-850 bg-zinc-950/60 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-zinc-900">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="font-mono-code text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Direct Channels
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono-code">
                <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-zinc-500 uppercase shrink-0">Primary Email:</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-zinc-200 hover:text-white transition-colors break-all sm:text-right"
                  >
                    {profile.email}
                  </a>
                </div>

                {profile.secondaryEmail && (
                  <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-zinc-500 uppercase shrink-0">Secondary Email:</span>
                    <a
                      href={`mailto:${profile.secondaryEmail}`}
                      className="text-zinc-200 hover:text-white transition-colors break-all sm:text-right"
                    >
                      {profile.secondaryEmail}
                    </a>
                  </div>
                )}

                {profile.phonePlaceholder && (
                  <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-zinc-500 uppercase shrink-0">Phone:</span>
                    <span className="text-zinc-300 break-words sm:text-right">{profile.phonePlaceholder}</span>
                  </div>
                )}

                <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-zinc-500 uppercase shrink-0">Location:</span>
                  <span className="text-zinc-300 break-words sm:text-right">{profile.location}</span>
                </div>
              </div>

              {/* Social Link Badges */}
              {(profile.github || profile.twitter || profile.linkedin || profile.discord || profile.instagram) && (
                <div className="pt-3 border-t border-zinc-900">
                  <div className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-500 mb-2">
                    Network Presences
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.github && (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {profile.instagram && (
                      <a
                        href={profile.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {profile.discord && (
                      <a
                        href={profile.discord}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discord</span>
                      </a>
                    )}
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cryptographic Key Detail Box */}
            {profile.pgpKey && (
              <div className="p-6 rounded-lg border border-zinc-850 bg-zinc-950/60 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-zinc-300 font-medium uppercase tracking-wider">
                    <Shield className="w-4 h-4 text-zinc-400" />
                    <span>PGP Public Fingerprint</span>
                  </div>
                  <button
                    onClick={handleCopyPgp}
                    className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-[10px] font-mono-code uppercase tracking-wider transition-colors flex items-center space-x-1"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-mono-code text-[11px] text-zinc-300 bg-zinc-900/90 p-3 rounded-md border border-zinc-800/80 tracking-wider break-all select-all">
                  {profile.pgpKey}
                </p>
                <div className="text-[10px] font-mono-code text-zinc-500">
                  Signed with 4096-bit RSA master authority.
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};
