"use client";

import * as React from "react";
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-border/50">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
          03 // Experience &amp; Track Record
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          Professional Experience.
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-justify">
          Product lifecycle management across enterprise Workspace, Service Desk, and CRM platforms.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {portfolioData.experiences.map((exp) => {
          return (
            <article
              key={exp.id}
              className="p-6 rounded-2xl border border-border/70 bg-card shadow-2xs space-y-4"
            >
              {/* Header: Role & Period */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3.5 border-b border-border/50">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mt-1">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="size-3.5 text-primary" />
                      {exp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <MapPin className="size-3 text-muted-foreground" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/40 self-start sm:self-auto">
                  <Calendar className="size-3 text-primary" />
                  {exp.period}
                </span>
              </div>

              {/* Narrative Overview */}
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                {exp.description}
              </p>

              {/* Key Deliverables Bullet List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                  Key Responsibilities &amp; Deliverables:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed p-2.5 rounded-lg bg-muted/20 border border-border/40"
                    >
                      <CheckCircle2 className="size-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-justify">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Deployed */}
              <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-border/50">
                {exp.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-mono text-[11px] py-0.5 px-2 bg-muted/50 text-muted-foreground border-border/40 font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
