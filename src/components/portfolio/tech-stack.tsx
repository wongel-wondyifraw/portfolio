"use client";

import * as React from "react";
import { Layers, Terminal, Cpu, Award, GraduationCap } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio-data";
import { useHighlight } from "@/components/providers/highlight-provider";
import { useAudio } from "@/components/providers/audio-provider";
import { cn } from "@/lib/utils";

export function TechStack() {
  const { hoveredTech, setHoveredTech, hoveredProject } = useHighlight();
  const { playClick } = useAudio();

  const activeProject = portfolioData.projects.find((p) => p.id === hoveredProject);
  const activeProjectTags = activeProject ? activeProject.tags.map((t) => t.toLowerCase()) : [];

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="size-4 text-primary" />;
      case 1:
        return <Cpu className="size-4 text-primary" />;
      case 2:
      default:
        return <Terminal className="size-4 text-primary" />;
    }
  };

  const isSkillActive = (skillName: string) => {
    const sLower = skillName.toLowerCase();
    if (hoveredTech && sLower.includes(hoveredTech.toLowerCase())) return true;
    if (activeProjectTags.some((tag) => sLower.includes(tag) || tag.includes(sLower))) return true;
    return false;
  };

  return (
    <section id="skills" className="scroll-mt-20 space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-border/50">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
          04 // Skills &amp; Credentials
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          Competencies &amp; Education.
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-justify">
          Product methodologies, relational database modeling, software development, and verified academic credentials.
        </p>
      </div>

      {/* Skills Cards: 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portfolioData.skillCategories.map((cat, index) => {
          return (
            <Card key={cat.title} className="border-border/70 bg-card p-5 rounded-2xl shadow-2xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-muted/60 border border-border/50">
                      {getCategoryIcon(index)}
                    </div>
                    <CardTitle className="text-sm font-bold text-foreground">
                      {cat.title}
                    </CardTitle>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {cat.skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => {
                    const active = isSkillActive(skill.name);
                    return (
                      <button
                        key={skill.name}
                        onMouseEnter={() => setHoveredTech(skill.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                        onClick={() => playClick()}
                        className={cn(
                          "text-xs font-mono px-2 py-1 rounded-md border transition-all cursor-pointer text-left",
                          active
                            ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                            : "bg-muted/30 hover:bg-muted text-foreground/85 border-border/60"
                        )}
                      >
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Education & Certification Section */}
      {portfolioData.personal.education && (
        <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card shadow-2xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Degree */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-wider mb-1 font-semibold">
                <GraduationCap className="size-3.5" />
                <span>Academic Degree</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                {portfolioData.personal.education.degree}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {portfolioData.personal.education.institution} • {portfolioData.personal.education.period}
              </p>
              <div className="flex items-center gap-2 mt-2.5 text-xs font-mono">
                <span className="bg-muted/50 px-2 py-0.5 rounded border border-border/40 text-foreground font-medium">
                  GPA: {portfolioData.personal.education.gpa}
                </span>
                <span className="bg-muted/50 px-2 py-0.5 rounded border border-border/40 text-foreground font-medium">
                  Exit Exam: {portfolioData.personal.education.exitExam}
                </span>
              </div>
            </div>

            {/* Accreditations & Certifications Link */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-primary uppercase tracking-wider mb-1 font-semibold">
                  <Award className="size-3.5" />
                  <span>Verified Accreditations</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  3 industry certifications verified across Coursera and Credly in Systems Architecture, Agile Scrum Product Ownership, and UX Design Fundamentals.
                </p>
              </div>
              <div className="pt-3">
                <a
                  href="#certifications"
                  className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>View Verified Certifications</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
