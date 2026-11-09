"use client";

import * as React from "react";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { useAudio } from "@/components/providers/audio-provider";

export function Certifications() {
  const { playClick } = useAudio();
  const certifications = portfolioData.certifications || [];

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
          <Award className="size-4" />
          <span>05 // Certifications</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
          Certifications.
        </h2>
      </div>

      {/* Simple Clickable Cards Grid: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {certifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            className="group block rounded-2xl border border-border/70 bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-3.5 sm:p-4 cursor-pointer"
            aria-label={`View ${cert.title}`}
          >
            {/* Elegant Thumbnail */}
            {cert.thumbnail && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/30 border border-border/40">
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Course Name Only */}
            <div className="pt-3.5 pb-1 px-1 flex items-center justify-between gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-foreground font-sans leading-snug group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
