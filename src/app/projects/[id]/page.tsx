import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  User,
  Sparkles,
  Code2,
  Terminal,
  Bot,
  Smartphone,
  LayoutDashboard,
  Workflow,
} from "lucide-react";
import { getProjects, getProjectDetail, getPersonalInformation } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/portfolio/footer";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({
    id: p.id,
  }));
}

function ProjectDetailSkeleton() {
  return (
    <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 w-36 bg-muted/60 rounded-full" />
        <div className="h-12 w-2/3 bg-muted/60 rounded-xl" />
        <div className="h-5 w-1/2 bg-muted/60 rounded-lg" />
      </div>
      <div className="w-full aspect-video max-h-[460px] bg-muted/50 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-32 bg-muted/30 rounded-xl" />
          <div className="h-40 bg-muted/30 rounded-xl" />
        </div>
        <div className="lg:col-span-4 h-64 bg-muted/30 rounded-xl" />
      </div>
    </div>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectDetail(id);
  const personal = getPersonalInformation();

  if (!project) {
    notFound();
  }

  const allProjects = getProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="secondary" className="font-sans font-medium text-xs px-3 py-1">
            {project.category}
          </Badge>
          {project.year && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/50">
              <Calendar className="size-3 text-primary" />
              {project.year}
            </span>
          )}
          {project.metrics && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
              <Sparkles className="size-3" />
              {project.metrics}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans">
          {project.title}
        </h1>

        {project.subtitle && (
          <p className="text-lg sm:text-xl text-muted-foreground font-sans max-w-3xl leading-relaxed text-justify">
            {project.subtitle}
          </p>
        )}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/50 text-xs font-mono text-muted-foreground">
          {project.role && (
            <div className="flex items-center gap-2">
              <User className="size-3.5 text-primary" />
              <span>
                Role: <strong className="text-foreground">{project.role}</strong>
              </span>
            </div>
          )}
          {project.client && (
            <div>
              <span>
                Client / Context: <strong className="text-foreground">{project.client}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Project Featured Visual Banner */}
      {project.image && (
        <div className="relative w-full rounded-2xl overflow-hidden border border-border/70 bg-[#eef4fb] dark:bg-[#151c27] aspect-video max-h-[460px] flex items-center justify-center">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={cn(
              project.image.endsWith(".png")
                ? "object-contain p-8 sm:p-12"
                : "object-cover"
            )}
            priority
            unoptimized
          />
        </div>
      )}

      {/* Narrative Content: Overview, Challenge, Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-10">
          {/* Executive Overview */}
          {project.overview && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                Project Overview
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed text-justify">
                {project.overview}
              </p>
            </section>
          )}

          {/* Architectural Challenge */}
          {project.challenge && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
                <Layers className="size-4" />
                <span>Scale Challenge</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                The Problem &amp; Bottlenecks
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed bg-muted/25 p-5 rounded-xl border border-border/60 text-justify">
                {project.challenge}
              </p>
            </section>
          )}

          {/* Engineering Solution */}
          {project.solution && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="size-4" />
                <span>Engineering Solution</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                Architectural Strategy
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed bg-muted/25 p-5 rounded-xl border border-border/60 text-justify">
                {project.solution}
              </p>
            </section>
          )}

          {/* Product Architecture Diagram (Driven by JSON Data) */}
          {project.productArchitecture && (() => {
            const arch = project.productArchitecture;
            return (
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
                  <Workflow className="size-4" />
                  <span>Product Architecture</span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
                    Three-Tier Product Architecture
                  </h2>
                  {arch.overview && (
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed text-justify">
                      {arch.overview}
                    </p>
                  )}
                </div>

                {/* Simplified: 3 Circular Icons with Titles */}
                <div className="p-6 sm:p-8 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 md:gap-20">
                    {arch.pillars.map((pillar) => {
                      const isBot = pillar.id === "telegram-bot";
                      const isMiniApp = pillar.id === "telegram-mini-app";
                      const isAdmin = pillar.id === "admin-web-console";

                      return (
                        <div
                          key={pillar.id}
                          className="flex flex-col items-center text-center group"
                        >
                          {/* Circular Icon */}
                          <div
                            className={cn(
                              "size-16 sm:size-20 rounded-full flex items-center justify-center shrink-0 border-2 shadow-sm transition-transform duration-300 group-hover:scale-105",
                              isBot && "bg-sky-500/10 text-sky-500 border-sky-500/30",
                              isMiniApp && "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
                              isAdmin && "bg-purple-500/10 text-purple-500 border-purple-500/30"
                            )}
                          >
                            {isBot && <Bot className="size-7 sm:size-8" />}
                            {isMiniApp && <Smartphone className="size-7 sm:size-8" />}
                            {isAdmin && <LayoutDashboard className="size-7 sm:size-8" />}
                          </div>

                          {/* Title */}
                          <h3 className="text-sm sm:text-base font-bold text-foreground mt-3 font-sans">
                            {pillar.title}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })()}

          {/* Verified Metrics Detail */}
          {project.architecture?.metricsDetail && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                Verified Production Telemetry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.metricsDetail.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-card border border-border/70 flex items-start gap-2.5 text-xs font-mono text-foreground"
                  >
                    <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Development Process (For Coded Systems) */}
          {project.developmentProcess && project.developmentProcess.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
                <Terminal className="size-4" />
                <span>Full-Stack Engineering Lifecycle</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                Development Process
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.developmentProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3"
                  >
                    <span className="size-6 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed text-justify">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground font-sans">
                Key Outcomes &amp; Impact
              </h2>
              <ul className="space-y-2.5">
                {project.outcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-justify">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar: Deployed Tech Stack & Links */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md space-y-6">
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-wider font-semibold mb-3">
                  <Code2 className="size-3.5" />
                  <span>Core Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="font-mono text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 font-semibold"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                Deployed Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-mono text-xs px-2.5 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 space-y-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  )}
                >
                  <span>Launch Production App</span>
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "w-full rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  )}
                >
                  <Icons.gitHub className="size-4" />
                  <span>View Source Code</span>
                </a>
              ) : null}

              <a
                href={`mailto:${personal.email}?subject=Inquiry regarding ${encodeURIComponent(project.title)}`}
                className={cn(
                  buttonVariants({
                    variant: project.liveUrl ? "outline" : "default",
                    size: "default",
                  }),
                  "w-full rounded-xl cursor-pointer flex items-center justify-center gap-2"
                )}
              >
                <span>Inquire About Project</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Next / Prev Project Navigation */}
      <div className="pt-12 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Prev: {prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const personal = getPersonalInformation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {/* Top Header Navigation (Instant App Shell) */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
              {personal.name}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Project Case Study Wrapped in Suspense */}
      <main className="flex-1 py-12 sm:py-16">
        <React.Suspense fallback={<ProjectDetailSkeleton />}>
          <ProjectDetailContent params={params} />
        </React.Suspense>
      </main>

      {/* Detail Page Footer with Full Margin & Container Padding */}
      <footer className="w-full border-t border-border/60 bg-background/50 mt-12 sm:mt-20">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <Footer className="border-t-0" />
        </div>
      </footer>
    </div>
  );
}
