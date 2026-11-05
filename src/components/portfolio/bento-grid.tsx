"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Code2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio-data";
import { useAudio } from "@/components/providers/audio-provider";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  const { playClick } = useAudio();

  const featuredProjects = portfolioData.projects.filter(
    (p) => p.featured !== false
  );
  const additionalProjects = portfolioData.projects.filter(
    (p) => p.featured === false
  );

  return (
    <section id="projects" className="scroll-mt-20 space-y-8">
      {/* Section Header */}
      <div className="pb-3 border-b border-border/50">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
          02 // Selected Case Studies
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          Products &amp; Systems Shipped.
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-justify">
          Full lifecycle product ownership across Selamnew Workspace, Service Desk (SD), and CRM platforms—driving backlog management, PRDs, system workflows, and production release delivery at IE Networking Solutions.
        </p>
      </div>

      {/* Editorial Project List: Core Product Owner Platforms */}
      <div className="space-y-8">
        {featuredProjects.map((project, index) => {
          return (
            <article
              key={project.id}
              className="group p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all duration-200 shadow-2xs space-y-4"
            >
              {/* Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">0{index + 1}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{project.category}</span>
                </div>
                {project.metrics && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {project.metrics}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  <Link
                    href={`/projects/${project.id}`}
                    onClick={() => playClick()}
                    className="cursor-pointer"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 text-justify">
                  {project.description}
                </p>
              </div>

              {/* Visual Thumbnail */}
              {project.image && (
                <Link
                  href={`/projects/${project.id}`}
                  onClick={() => playClick()}
                  className="relative block h-56 sm:h-64 lg:h-72 w-full rounded-xl overflow-hidden border border-border/50 bg-[#eef4fb] dark:bg-[#151c27] cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-102",
                      project.image.endsWith(".png")
                        ? "object-contain p-6 sm:p-10"
                        : "object-cover"
                    )}
                    sizes="(max-width: 1024px) 100vw, 900px"
                    unoptimized
                  />
                </Link>
              )}

              {/* Challenge & Solution Architecture: 2-Column Responsive Layout */}
              {project.architecture?.problem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/40 text-xs sm:text-sm flex flex-col justify-between">
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      <strong className="text-foreground font-semibold block mb-1.5 text-[11px] font-mono uppercase tracking-wider text-primary">
                        Business Challenge
                      </strong>
                      {project.architecture.problem}
                    </p>
                  </div>
                  {project.architecture.tradeoffs && (
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/40 text-xs sm:text-sm flex flex-col justify-between">
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        <strong className="text-foreground font-semibold block mb-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Product Solution
                        </strong>
                        {project.architecture.tradeoffs}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Deliverables: 2-Column Grid */}
              {project.architecture?.metricsDetail && (
                <div className="pt-1 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                    Key Product Deliverables:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.architecture.metricsDetail.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed p-2.5 rounded-lg bg-muted/20 border border-border/40"
                      >
                        <CheckCircle2 className="size-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-justify">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer: Tags & Read Case Study Link */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-[11px] py-0.5 px-2 bg-muted/50 text-muted-foreground border-border/40 font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.id}`}
                  onClick={() => playClick()}
                  className="inline-flex items-center gap-1 text-xs font-mono text-primary font-bold hover:translate-x-1 transition-transform cursor-pointer ml-auto"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Additional Client & Independent Systems */}
      {additionalProjects.length > 0 && (
        <div className="pt-6 border-t border-border/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Code2 className="size-3.5 text-primary" />
                Additional Client &amp; Engineering Systems
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Full-Stack Systems Built &amp; Coded End-to-End
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground self-start sm:self-auto">
              {additionalProjects.length} Shipped Systems
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                onClick={() => playClick()}
                className="group p-5 rounded-xl border border-border/60 bg-card hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold">
                      <Code2 className="size-3" />
                      Coded &amp; Shipped
                    </span>
                    <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed text-justify">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.techStack && (
                  <div className="space-y-1.5 pt-2 border-t border-border/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold block">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-mono text-[10px] py-0.5 px-2 bg-muted/60 text-foreground/90 font-medium border border-border/40"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Development Process Highlights */}
                {project.developmentProcess && (
                  <div className="space-y-1.5 pt-2 border-t border-border/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold flex items-center gap-1">
                      <Terminal className="size-3 text-primary" />
                      Development Process
                    </span>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      {project.developmentProcess.slice(0, 2).map((proc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="size-1 rounded-full bg-primary/70 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
