import React, { useState } from 'react';
import { X, RotateCcw, Download, Upload, Check, Sparkles, FileText, User, Shield } from 'lucide-react';
import { ProfileInfo } from '../types';
import { initialProfile } from '../data/initialData';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  onUpdateProfile: (updated: ProfileInfo) => void;
}

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<ProfileInfo>(profile);
  const [saveToast, setSaveToast] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof ProfileInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleManifestoChange = (index: number, value: string) => {
    const updated = [...formData.manifesto];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      manifesto: updated,
    }));
  };

  const handleStatChange = (index: number, field: 'label' | 'value' | 'subtext', value: string) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      stats: updatedStats,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 1000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all personal information back to default placeholder values?')) {
      setFormData(initialProfile);
      onUpdateProfile(initialProfile);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'minimal-cv-profile.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.name && parsed.title) {
            setFormData(parsed);
            onUpdateProfile(parsed);
            alert('Custom profile loaded successfully!');
          }
        } catch (err) {
          alert('Invalid JSON structure.');
        }
      };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-lg border border-zinc-800 bg-[#09090b] shadow-2xl text-zinc-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-900 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-md border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-300">
              <FileText className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white font-serif">
                Template Data Customizer
              </h3>
              <p className="text-xs font-mono-code text-zinc-400">
                Replace placeholder info with your personal credentials, biography, and metrics.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              title="Reset to Default Values"
              className="px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-mono-code flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              title="Export Profile JSON"
              className="px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-mono-code flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Export</span>
            </button>

            <label className="cursor-pointer px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-mono-code flex items-center space-x-1">
              <Upload className="w-3.5 h-3.5 mr-1" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 ml-2"
              aria-label="Close customizer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs font-mono-code">
          {/* Identity Block */}
          <div className="space-y-4">
            <div className="text-zinc-400 font-medium uppercase tracking-wider pb-2 border-b border-zinc-900 flex items-center justify-between">
              <span>Personal Identity & Titles</span>
              <span className="text-zinc-500">01</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleTextChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Monogram Initials (2-3 chars)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.monogram}
                  onChange={(e) => handleTextChange('monogram', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Motto / Subtitle</label>
                <input
                  type="text"
                  value={formData.latinMotto}
                  onChange={(e) => handleTextChange('latinMotto', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Domain Descriptor</label>
                <input
                  type="text"
                  value={formData.epithet}
                  onChange={(e) => handleTextChange('epithet', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Availability Status</label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => handleTextChange('status', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleTextChange('location', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          </div>

          {/* Bio & Manifesto */}
          <div className="space-y-4">
            <div className="text-zinc-400 font-medium uppercase tracking-wider pb-2 border-b border-zinc-900 flex items-center justify-between">
              <span>Bio Summary & Manifesto Excerpts</span>
              <span className="text-zinc-500">02</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 uppercase">Hero Summary</label>
              <textarea
                rows={2}
                value={formData.bioSummary}
                onChange={(e) => handleTextChange('bioSummary', e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500 resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-zinc-400 uppercase">Manifesto Paragraphs</label>
              {formData.manifesto.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[10px] text-zinc-500">Paragraph {idx + 1}:</span>
                  <textarea
                    rows={2}
                    value={p}
                    onChange={(e) => handleManifestoChange(idx, e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar Flex */}
          <div className="space-y-4">
            <div className="text-zinc-400 font-medium uppercase tracking-wider pb-2 border-b border-zinc-900 flex items-center justify-between">
              <span>Metrics & Artifact Banners</span>
              <span className="text-zinc-500">03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {formData.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-md border border-zinc-850 bg-zinc-900/60 space-y-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      className="w-full px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 font-medium font-mono-code"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      className="w-full px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase">Subtext</label>
                    <input
                      type="text"
                      value={stat.subtext || ''}
                      onChange={(e) => handleStatChange(idx, 'subtext', e.target.value)}
                      className="w-full px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communications & Security */}
          <div className="space-y-4">
            <div className="text-zinc-400 font-medium uppercase tracking-wider pb-2 border-b border-zinc-900 flex items-center justify-between">
              <span>Direct Channels & Coordinates</span>
              <span className="text-zinc-500">04</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleTextChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">PGP Key Fingerprint</label>
                <input
                  type="text"
                  value={formData.pgpKey}
                  onChange={(e) => handleTextChange('pgpKey', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase">GitHub Profile URL</label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => handleTextChange('github', e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <div className="text-xs font-mono-code text-zinc-500">
              Updates reflect across all sections instantly.
            </div>

            <div className="flex items-center space-x-3">
              {saveToast && (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Applied!</span>
                </span>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded bg-zinc-100 hover:bg-white text-black font-medium uppercase tracking-wider transition-colors"
              >
                Apply & Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
