"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { portfolioData } from "@/data/portfolio-data";
import { useClipboard } from "@/hooks/use-clipboard";
import { useAudio } from "@/components/providers/audio-provider";

export function Hero() {
  const { copied, copy } = useClipboard();
  const { playClick } = useAudio();

  const linkedinUrl =
    portfolioData.socials.find((s) => s.icon === "linkedin")?.url ||
    "https://linkedin.com/in/wongel-kassa";

  return (
    <section id="about" className="pt-28 pb-12 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        {/* Identity & Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-1"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
            {portfolioData.personal.name}
          </h1>
          <p className="text-base sm:text-lg font-mono text-primary font-medium">
            {portfolioData.personal.title}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground pt-0.5">
            <MapPin className="size-3 text-primary" />
            <span>{portfolioData.personal.location}</span>
            <span>•</span>
            <span>{portfolioData.personal.timezone}</span>
          </div>
        </motion.div>

        {/* Headline Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="my-6 py-4 border-y border-border/50"
        >
          <p className="font-tall text-2xl sm:text-3xl tracking-wide uppercase text-foreground leading-snug">
            {portfolioData.personal.headline?.line1 || "Changing business need to"}{" "}
            <span className="text-primary font-bold">
              {portfolioData.personal.headline?.line2 || "scalable products."}
            </span>
          </p>
        </motion.div>

        {/* Narrative Profile */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-base sm:text-lg text-muted-foreground leading-relaxed font-sans mb-8"
        >
          {portfolioData.personal.about || portfolioData.personal.bio}
        </motion.p>

        {/* Direct Contact Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2.5 pb-8 border-b border-border/50 text-xs font-mono"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              playClick();
              copy(portfolioData.personal.email, "Email copied!");
            }}
            className="rounded-lg gap-1.5 h-8 px-3 cursor-pointer border-border hover:bg-muted font-mono"
          >
            {copied ? (
              <Check className="size-3 text-emerald-500" />
            ) : (
              <Mail className="size-3 text-primary" />
            )}
            <span>{portfolioData.personal.email}</span>
            <span className="text-[10px] text-muted-foreground ml-1">
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
              className="rounded-lg gap-1.5 h-8 px-3 cursor-pointer border-border hover:bg-muted font-mono"
            >
              <Phone className="size-3 text-primary" />
              <span>{portfolioData.personal.phone}</span>
            </Button>
          )}

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick()}
            className="inline-flex items-center gap-1 px-3 h-8 rounded-lg border border-border hover:bg-muted text-foreground transition-colors font-mono"
          >
            <Icons.linkedIn className="size-3 text-primary" />
            <span>LinkedIn</span>
            <ExternalLink className="size-2.5 opacity-60" />
          </a>
        </motion.div>

        {/* Key Credentials Inline Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs font-mono"
        >
          {portfolioData.personal.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-tall tracking-wider text-foreground font-bold">
                {stat.value}
              </span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
