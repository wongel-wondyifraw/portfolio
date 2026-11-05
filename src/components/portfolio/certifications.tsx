"use client";

import * as React from "react";
import Image from "next/image";
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { useAudio } from "@/components/providers/audio-provider";

export function Certifications() {
  const { playClick } = useAudio();
  const certifications = portfolioData.certifications || [];

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
          <Award className="size-4" />
          <span>05 // Verified Credentials</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
              Professional Certifications.
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed text-justify">
              Formally verified credentials across systems architecture, agile product ownership, and user experience fundamentals. Click any credential to inspect live issuing authority verifications.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="group relative rounded-2xl border border-border/70 bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top: Thumbnail & Verified Badge */}
            <div>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="block relative aspect-[16/9.5] w-full overflow-hidden bg-muted/30 border-b border-border/60 cursor-pointer"
                aria-label={`Verify ${cert.title}`}
              >
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-60" />

                {/* Platform Badge Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/70 text-[11px] font-mono font-medium text-foreground shadow-xs">
                  <ShieldCheck className="size-3 text-primary" />
                  <span>{cert.platform}</span>
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {cert.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                    <CheckCircle2 className="size-3" />
                    <span>Verified</span>
                  </div>
                </div>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="block group/title"
                >
                  <h3 className="text-base font-bold text-foreground font-sans leading-snug group-hover/title:text-primary transition-colors">
                    {cert.title}
                  </h3>
                </a>

                {/* Issuer & ID */}
                <div className="space-y-1 text-xs font-mono text-muted-foreground pt-1 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70">Issuer:</span>
                    <span className="text-foreground/90 font-medium truncate max-w-[170px]">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground/70">Credential ID:</span>
                    <span className="font-mono text-primary text-[11px] truncate max-w-[160px]">{cert.credentialId}</span>
                  </div>
                </div>

                {/* Competencies */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="p-5 pt-0">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-muted/40 hover:bg-primary text-foreground hover:text-primary-foreground border border-border/70 hover:border-primary text-xs font-mono font-semibold transition-all duration-200 group/btn shadow-2xs"
              >
                <span>Verify Credential</span>
                <ExternalLink className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

