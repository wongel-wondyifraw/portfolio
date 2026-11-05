"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { portfolioData } from "@/data/portfolio-data";
import { useAudio } from "@/components/providers/audio-provider";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const { playClick } = useAudio();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/60 shadow-2xs"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Personal Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs font-bold">
            {portfolioData.personal.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="text-sm font-semibold">
            {portfolioData.personal.name}
          </span>
        </Link>

        {/* Minimal Nav Links */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-4 text-xs font-mono text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => playClick()}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-border/60 hidden sm:block" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
