"use client";

import * as React from "react";
import { Sidebar } from "@/components/portfolio/sidebar";
import { AboutSection } from "@/components/portfolio/about-section";
import { BentoGrid } from "@/components/portfolio/bento-grid";
import { Experience } from "@/components/portfolio/experience";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export function PortfolioView() {
  const [activeSection, setActiveSection] = React.useState<string>("about");

  React.useEffect(() => {
    const sectionIds = ["about", "projects", "experience", "skills", "contact"];

    const handleScroll = () => {
      // If reached the bottom of the page, activate the contact section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("contact");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 2xl:gap-16">
          {/* Left Column: Sticky Profile Sidebar */}
          <header className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 lg:sticky lg:top-14 lg:h-[calc(100vh-7rem)]">
            <Sidebar activeSection={activeSection} />
          </header>

          {/* Right Column: Scrolling Feed */}
          <main className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 space-y-16 mt-12 lg:mt-0 pt-2">
            <AboutSection />
            <BentoGrid />
            <Experience />
            <TechStack />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

