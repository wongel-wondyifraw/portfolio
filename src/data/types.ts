export interface PersonalHeadline {
  line1?: string;
  line2?: string;
  line3?: string;
  lead?: string;
  italicWord?: string;
  middle?: string;
  gradient?: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  gpa: string;
  exitExam: string;
}

export interface PersonalInformation {
  name: string;
  title: string;
  headline?: PersonalHeadline;
  bio: string;
  about?: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  stats: StatItem[];
  education?: EducationInfo;
  certificates?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "mail";
}

export interface ArchitecturePillar {
  id: string;
  title: string;
  badge?: string;
  role?: string;
  platform?: string;
  description?: string;
  icon?: string;
  features?: string[];
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
}

export interface ProductArchitectureDiagram {
  overview?: string;
  pillars: ArchitecturePillar[];
  connections?: ArchitectureConnection[];
  dataFlow?: { from: string; to: string; label: string }[];
  sharedInfrastructure?: {
    backend: string;
    database: string;
    aiEngine?: string;
  };
}

export interface ProjectArchitecture {
  problem: string;
  tradeoffs: string;
  topology?: string;
  metricsDetail: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  category: string;
  featured: boolean;
  tags: string[];
  techStack?: string[];
  developmentProcess?: string[];
  productArchitecture?: ProductArchitectureDiagram;
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  architecture?: ProjectArchitecture;
}

export interface ProjectDetail extends ProjectItem {
  subtitle?: string;
  year?: string;
  role?: string;
  client?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  outcomes?: string[];
  gallery?: { url: string; caption?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface SkillCategoryItem {
  title: string;
  skills: string[];
}

export interface PortfolioDataStore {
  personal: PersonalInformation;
  socials: SocialLink[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  skills: SkillCategoryItem[];
}

