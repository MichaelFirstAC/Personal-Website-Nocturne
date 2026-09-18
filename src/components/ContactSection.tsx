import React, { useState } from 'react';
import { Mail, Shield, Copy, Check, Send, ArrowUpRight, Github, Twitter, Linkedin, Terminal, Sparkles } from 'lucide-react';
import { ProfileInfo } from '../types';
import { DisintegrateOnScroll } from './DisintegrateOnScroll';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [intent, setIntent] = useState('Architectural Advisory & Auditing');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const intents = [
    'Architectural Advisory & Auditing',
    'Executive / Fellow Council',
    'Confidential Protocol Inquiry',
    'Scholarly Colloquium / Keynote'
  ];

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(profile.pgpKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) {
      setSubmittedStatus('Please provide both your dispatch address and message text.');
      return;
    }

    const subject = encodeURIComponent(`[DISPATCH: ${intent}] from ${senderName || 'Anonymous Sovereign'}`);
    const body = encodeURIComponent(
      `Sovereign: ${senderName}\nDispatch Address: ${senderEmail}\nIntent: ${intent}\n\nMessage:\n${message}\n\n---\nTransmitted via Nocturne Cryptographic Dossier`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmittedStatus('Dispatch channel initiated in your mail client.');
    setTimeout(() => setSubmittedStatus(null), 5000);
  };

  return (
    <section
      id="dispatch"
      className="py-24 relative border-b border-zinc-900 bg-[#08080a]"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Dispatch Terminal */}
          <DisintegrateOnScroll className="lg:col-span-7">
            <form
              onSubmit={handleSendMessage}
              className="rounded-lg border border-zinc-850 bg-zinc-950/60 p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                <div className="flex items-center space-x-2.5">
                  <Terminal className="w-4 h-4 text-zinc-400" />
                  <span className="font-mono-code text-xs uppercase tracking-wider text-zinc-300 font-medium">
                    Dispatch Console
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded bg-zinc-900">
                  Direct Ingress
                </span>
              </div>

              {/* Intent Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                  Select Ingress Intent
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {intents.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setIntent(item)}
                      className={`p-2.5 rounded-md text-left text-xs font-mono-code transition-colors ${
                        intent === item
                          ? 'border border-zinc-300 bg-white text-black font-medium shadow-sm'
                          : 'border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                    Name / Organization
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Elena Vance / Principal"
                    className="w-full px-3.5 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono-code focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                    Return Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="architect@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono-code focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                  Message Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Articulate the parameters of the engagement, target timeline, and systemic architecture requirements..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono-code focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600 resize-none"
                />
              </div>

              {submittedStatus && (
                <div className="p-3 rounded-md border border-zinc-700 bg-zinc-900 text-xs font-mono-code text-zinc-200">
                  {submittedStatus}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-zinc-100 hover:bg-white text-black font-medium text-xs font-mono-code uppercase tracking-wider transition-colors flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>

                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs font-mono-code text-zinc-400 hover:text-zinc-200 underline underline-offset-4"
                >
                  Direct email client
                </a>
              </div>
            </form>
          </DisintegrateOnScroll>

          {/* Right Column: Direct Channels, PGP, and Coordinates */}
          <DisintegrateOnScroll className="lg:col-span-5 space-y-6">
            {/* Direct Coordinates Card */}
            <div className="p-6 rounded-lg border border-zinc-850 bg-zinc-950/60 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-zinc-900">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="font-mono-code text-xs uppercase tracking-wider text-zinc-300 font-medium">
                  Direct Channels
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono-code">
                <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex items-center justify-between">
                  <span className="text-zinc-500 uppercase">Primary Email:</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-zinc-200 hover:text-white transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>

                <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex items-center justify-between">
                  <span className="text-zinc-500 uppercase">Phone:</span>
                  <span className="text-zinc-300">{profile.phonePlaceholder}</span>
                </div>

                <div className="p-3 rounded-md bg-zinc-900/70 border border-zinc-850 flex items-center justify-between">
                  <span className="text-zinc-500 uppercase">Location:</span>
                  <span className="text-zinc-300">{profile.location}</span>
                </div>
              </div>

              {/* Social Link Badges */}
              <div className="pt-3 border-t border-zinc-900">
                <div className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-500 mb-2">
                  Network Presences
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X.com</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-md border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center space-x-1.5 text-xs font-mono-code transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Cryptographic Key Detail Box */}
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
          </DisintegrateOnScroll>
        </div>
      </div>
    </section>
  );
};
