export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'ongoing' | 'in development' | 'published' | 'live';
  technologies: string[];
  year: string;
  category: 'web' | 'mobile' | 'ai' | 'saas';
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years: string;
  projects: number;
  percentage: number;
  category: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  category: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Publication {
  title: string;
  journal: string;
}
