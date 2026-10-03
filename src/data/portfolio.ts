import seed from '../../seed/portfolio.json';

export type ProjectStatus = 'working' | 'deployed' | 'completed';

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon_key?: string | null;
  sort_order?: number;
}

export interface Project {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  github_url: string | null;
  live_url: string | null;
  image_path: string | null;
  featured: boolean;
  sort_order: number;
  technologies: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  result: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  image_path: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  experience: ExperienceItem[];
  education: EducationItem[];
}

export interface PortfolioPayload {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

export const FALLBACK_PORTFOLIO = seed as PortfolioPayload;
