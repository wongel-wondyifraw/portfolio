import {
  getPersonalInformation,
  getSocials,
  getProjects,
  getExperience,
  getSkills,
  getProjectCategories,
  getPortfolioData,
} from "@/lib/content";

import type {
  PersonalInformation,
  SocialLink,
  ProjectItem,
  ExperienceItem,
  SkillCategoryItem,
} from "@/data/types";

export type Project = ProjectItem;
export type Experience = ExperienceItem;
export type SkillCategory = SkillCategoryItem;

export interface LegacyPortfolioData {
  personal: PersonalInformation & { role: string; status: string; company?: string };
  socials: SocialLink[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  skillCategories: { title: string; skills: { name: string }[] }[];
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
};

export {
  getPersonalInformation,
  getSocials,
  getProjects,
  getExperience,
  getSkills,
  getProjectCategories,
  getPortfolioData,
};
