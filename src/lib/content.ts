import personalJson from "@/data/content/personalInformation.json";
import socialsJson from "@/data/content/socials.json";
import projectsJson from "@/data/content/projects.json";
import experienceJson from "@/data/content/experience.json";
import skillsJson from "@/data/content/skills.json";

// Import individual project detail JSON sources
import selamnewWorkspaceDetail from "@/data/content/project-details/selamnew-workspace.json";
import selamnewCrmDetail from "@/data/content/project-details/selamnew-crm.json";
import selamnewServiceDeskDetail from "@/data/content/project-details/selamnew-service-desk.json";
import fleetLogisticsDetail from "@/data/content/project-details/fleet-logistics.json";
import medafSkincareDetail from "@/data/content/project-details/medaf-skincare.json";

import type {
  PersonalInformation,
  SocialLink,
  ProjectItem,
  ProjectDetail,
  ExperienceItem,
  SkillCategoryItem,
  PortfolioDataStore,
} from "@/data/types";

const projectDetailsMap: Record<string, ProjectDetail> = {
  "selamnew-workspace": selamnewWorkspaceDetail as unknown as ProjectDetail,
  "selamnew-crm": selamnewCrmDetail as unknown as ProjectDetail,
  "crm": selamnewCrmDetail as unknown as ProjectDetail,
  "selamnew-service-desk": selamnewServiceDeskDetail as unknown as ProjectDetail,
  "service-desk": selamnewServiceDeskDetail as unknown as ProjectDetail,
  "fleet-logistics": fleetLogisticsDetail as unknown as ProjectDetail,
  "medaf-skincare": medafSkincareDetail as unknown as ProjectDetail,
};

export function getPersonalInformation(): PersonalInformation {
  return {
    name: personalJson.name || "Wongel Wondyifraw",
    title: personalJson.title || "Business Analyst | Product Owner",
    headline: personalJson.headline || {
      lead: "Shaping digital",
      italicWord: "products",
      middle: "with strategic vision &",
      gradient: "engineering execution.",
    },
    bio: personalJson.bio || "",
    about: personalJson.about || "",
    location: personalJson.location || "Addis Abeba, Ethiopia",
    timezone: personalJson.timezone || "UTC+3",
    email: personalJson.email || "weniichrist@gmail.com",
    phone: personalJson.phone,
    resumeUrl: personalJson.resumeUrl || "#resume",
    stats: Array.isArray(personalJson.stats) ? personalJson.stats : [],
  };
}

export function getSocials(): SocialLink[] {
  if (!Array.isArray(socialsJson)) return [];
  return socialsJson as SocialLink[];
}

export function getProjects(): ProjectItem[] {
  if (!Array.isArray(projectsJson)) return [];
  return projectsJson as ProjectItem[];
}

export function getProjectDetail(id: string): ProjectDetail | null {
  if (projectDetailsMap[id]) {
    return projectDetailsMap[id];
  }
  const base = getProjects().find((p) => p.id === id);
  if (!base) return null;
  return {
    ...base,
    overview: base.description,
  };
}

export function getProjectCategories(): string[] {
  const projects = getProjects();
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  return ["All", ...uniqueCategories];
}

export function getExperience(): ExperienceItem[] {
  if (!Array.isArray(experienceJson)) return [];
  return experienceJson as ExperienceItem[];
}

export function getSkills(): SkillCategoryItem[] {
  if (!Array.isArray(skillsJson)) return [];
  return skillsJson as SkillCategoryItem[];
}

export function getPortfolioData(): PortfolioDataStore {
  return {
    personal: getPersonalInformation(),
    socials: getSocials(),
    projects: getProjects(),
    experiences: getExperience(),
    skills: getSkills(),
  };
}
