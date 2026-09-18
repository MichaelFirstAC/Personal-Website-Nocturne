export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProfileInfo {
  name: string;
  monogram: string;
  latinMotto: string;
  title: string;
  epithet: string;
  bioSummary: string;
  manifesto: string[];
  location: string;
  status: string;
  email: string;
  pgpKey: string;
  phonePlaceholder: string;
  github: string;
  twitter: string;
  linkedin: string;
  discord: string;
  instagram: string;
}

export type ProjectCategory = 'All' | 'Web App' | '3D & Graphics' | 'Data Science' | 'Game Dev' | 'Algorithms';

export interface Project {
  id: string;
  title: string;
  codeName: string;
  category: ProjectCategory;
  period: string;
  summary: string;
  fullDescription: string;
  architecturalHighlights: string[];
  impactMetric: string;
  impactLabel: string;
  technologies: string[];
  links: {
    preview?: string;
    repository?: string;
    documentation?: string;
  };
  featured: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  tier: 'Grandmaster' | 'Master' | 'Adept';
  specialty?: string;
}

export interface SkillCategory {
  title: string;
  latinTitle: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceRole {
  id: string;
  role: string;
  organization: string;
  division?: string;
  period: string;
  location: string;
  seal: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface Accreditation {
  id: string;
  title: string;
  institution: string;
  year: string;
  type: 'Degree' | 'Certification' | 'Publication' | 'Patent';
  honor?: string;
  description: string;
}
