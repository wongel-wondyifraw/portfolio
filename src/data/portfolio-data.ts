import {
  getPersonalInformation,
  getSocials,
  getProjects,
  getExperience,
  getSkills,
  getCertifications,
  getProjectCategories,
  getPortfolioData,
} from "@/lib/content";

import type {
  PersonalInformation,
  SocialLink,
  ProjectItem,
  ExperienceItem,
  SkillCategoryItem,
  CertificationItem,
} from "@/data/types";

export type Project = ProjectItem;
export type Experience = ExperienceItem;
export type SkillCategory = SkillCategoryItem;
export type Certification = CertificationItem;

export interface LegacyPortfolioData {
  personal: PersonalInformation & { role: string; status: string; company?: string };
  socials: SocialLink[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  skillCategories: { title: string; skills: { name: string }[] }[];
  certifications: CertificationItem[];
}

const rawPersonal = getPersonalInformation();

export const portfolioData: LegacyPortfolioData = {
  personal: {
    ...rawPersonal,
    role: rawPersonal.title,
    status: "",
  },
  socials: getSocials(),
  projects: getProjects(),
  experiences: getExperience(),
  skillCategories: getSkills().map((cat) => ({
    title: cat.title,
    skills: cat.skills.map((s) => ({ name: s })),
  })),
  certifications: getCertifications(),
};

export {
  getPersonalInformation,
  getSocials,
  getProjects,
  getExperience,
  getSkills,
  getCertifications,
  getProjectCategories,
  getPortfolioData,
};
