"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import { portfolioData } from "@/data/portfolio-data";
import { useClipboard } from "@/hooks/use-clipboard";
import { useAudio } from "@/components/providers/audio-provider";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const { copied, copy } = useClipboard();
  const { playClick } = useAudio();

  const navItems = [
    { id: "about", label: "ABOUT", number: "01" },
    { id: "projects", label: "CASE STUDIES", number: "02" },
    { id: "experience", label: "EXPERIENCE", number: "03" },
    { id: "skills", label: "SKILLS & MATRIX", number: "04" },
    { id: "certifications", label: "CERTIFICATIONS", number: "05" },
    { id: "contact", label: "CONTACT", number: "06" },
  ];

  const linkedinUrl =
    portfolioData.socials.find((s) => s.icon === "linkedin")?.url ||
    "https://linkedin.com/in/wongel-kassa";

  const scrollTo = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between py-2 overflow-y-auto no-scrollbar pr-0 lg:pr-2">
      {/* Top Part: Identity & Bio */}
      <div>
        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] font-extrabold tracking-tight text-foreground font-sans leading-none">
            {portfolioData.personal.name}
          </h1>
          <p className="text-base sm:text-lg xl:text-xl font-mono text-primary font-semibold tracking-wide">
            {portfolioData.personal.title}
          </p>
          <div className="flex items-center gap-1.5 text-xs xl:text-sm font-mono text-muted-foreground pt-1">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span>{portfolioData.personal.location}</span>
            <span>•</span>
            <span>{portfolioData.personal.timezone}</span>
          </div>
        </div>

        {/* Editorial Value Statement */}
        <div className="my-6 py-4 border-y border-border/50">
          <p className="font-tall text-xl sm:text-2xl xl:text-[1.75rem] tracking-wide uppercase text-foreground leading-snug">
            {portfolioData.personal.headline?.line1 || "Changing business need to"}{" "}
            <span className="text-primary font-bold">
              {portfolioData.personal.headline?.line2 || "scalable products."}
            </span>
          </p>
        </div>

        {/* Grounded Bio */}
        <p className="text-sm xl:text-base text-muted-foreground leading-relaxed text-justify">
          B.Eng. (2025) and Product Owner leading Selamnew Workspace, Service Desk (SD), and CRM platforms end-to-end at IE Networking Solutions. Translating business goals into functional PRDs, clear workflows, and scalable systems.
        </p>

        {/* Desktop Sticky Navigation with Dynamic Active Indicators */}
        <nav className="hidden lg:flex flex-col gap-3 mt-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "group flex items-center gap-3 text-xs font-mono font-medium tracking-wider text-left transition-all cursor-pointer py-1",
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    isActive
                      ? "w-8 bg-primary"
                      : "w-3 bg-border group-hover:w-6 group-hover:bg-muted-foreground"
                  )}
                />
                <span className="text-muted-foreground/60">{item.number}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Part: Quick Action Contacts & Theme */}
      <div className="mt-8 lg:mt-0 pt-6 border-t border-border/50 space-y-3.5 text-xs font-mono">
        {/* Direct Contact Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              playClick();
              copy(portfolioData.personal.email, "Email copied!");
            }}
            className="rounded-lg gap-1.5 h-8 px-2.5 text-xs font-mono cursor-pointer border-border hover:bg-muted"
          >
            {copied ? (
              <Check className="size-3 text-emerald-500" />
            ) : (
              <Mail className="size-3 text-primary" />
            )}
            <span>{portfolioData.personal.email}</span>
            <span className="text-[10px] text-muted-foreground">
              {copied ? "(Copied)" : "(Copy)"}
            </span>
          </Button>

          {portfolioData.personal.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                playClick();
                copy(portfolioData.personal.phone || "", "Phone copied!");
              }}
              className="rounded-lg gap-1.5 h-8 px-2.5 text-xs font-mono cursor-pointer border-border hover:bg-muted"
            >
              <Phone className="size-3 text-primary" />
              <span>{portfolioData.personal.phone}</span>
            </Button>
          )}
        </div>

        {/* Social Link & Theme Toggle */}
        <div className="flex items-center justify-between pt-1">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.linkedIn className="size-3.5 text-primary" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="size-2.5 opacity-60" />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
