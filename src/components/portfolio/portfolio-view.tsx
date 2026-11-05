"use client";

import * as React from "react";
import { Sidebar } from "@/components/portfolio/sidebar";
import { AboutSection } from "@/components/portfolio/about-section";
import { BentoGrid } from "@/components/portfolio/bento-grid";
import { Experience } from "@/components/portfolio/experience";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Certifications } from "@/components/portfolio/certifications";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export function PortfolioView() {
  const [activeSection, setActiveSection] = React.useState<string>("about");
  const isClickScrollingRef = React.useRef(false);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSectionClick = React.useCallback((id: string) => {
    setActiveSection(id);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 800);
  }, []);

  React.useEffect(() => {
    const sectionIds = ["about", "projects", "experience", "skills", "certifications", "contact"];

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      // Check if user is scrolled to the absolute bottom of the document
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Reading focal line in top area of viewport
      const focalPoint = Math.min(window.innerHeight * 0.35, 260);
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalPoint) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 2xl:gap-16">
          {/* Left Column: Sticky Profile Sidebar */}
          <header className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 lg:sticky lg:top-14 lg:h-[calc(100vh-7rem)]">
            <Sidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
          </header>

          {/* Right Column: Scrolling Feed */}
          <main className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 space-y-16 mt-12 lg:mt-0 pt-2">
            <AboutSection />
            <BentoGrid />
            <Experience />
            <TechStack />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

