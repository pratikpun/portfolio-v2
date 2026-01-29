// Profile types
export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  social: Social;
  resumeUrl: string;
}

// Skills types
export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

// Projects types
export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  tags: string[];
  links: ProjectLinks;
  featured: boolean;
}

export interface ProjectsData {
  projects: Project[];
}

// Experience types
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface ExperienceData {
  experiences: Experience[];
}

// Blog types
export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
