"use client";

import * as React from "react";
import { portfolioData } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-border/50">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
          01 // About &amp; Track Record
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          Product Discovery &amp; System Leadership.
        </h2>
      </div>

      {/* Main Narrative */}
      <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
        <p className="text-justify">
          I am a <strong className="text-foreground font-semibold">Product Owner and Business Analyst</strong> with hands-on experience driving enterprise platforms through their complete lifecycle—from initial requirements elicitation and workflow modeling to backlog refinement, agile sprints, and deployment.
        </p>
        <p className="text-justify">
          Holding a <strong className="text-foreground font-semibold">B.Sc. in Electrical and Computer Engineering (2025)</strong>, I bridge business objectives with technical execution. I specialize in preparing Functional Requirements Documents (FRDs), Product Requirements Documents (PRDs), interactive AI prototyping, and aligning cross-functional teams of software engineers, QA specialists, and stakeholders.
        </p>
      </div>

      {/* 4 Credential Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
        {portfolioData.personal.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-border/60 bg-card shadow-2xs flex flex-col justify-between"
          >
            <span className="text-2xl sm:text-3xl font-tall tracking-wider text-foreground font-bold">
              {stat.value}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

