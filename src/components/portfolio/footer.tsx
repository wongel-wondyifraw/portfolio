"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio-data";
import { useAudio } from "@/components/providers/audio-provider";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string } = {}) {
  const { playClick } = useAudio();
  const [time, setTime] = React.useState<string>("");
  const [year, setYear] = React.useState<number>(2026);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setYear(now.getFullYear());
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={cn(
        "border-t border-border/50 pt-8 pb-12 text-xs text-muted-foreground",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-foreground">
            {portfolioData.personal.name}
          </span>
          <span>•</span>
          <span className="font-mono">
            {portfolioData.personal.location} ({time || "--:--:--"})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>© {year} All rights reserved.</span>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={scrollToTop}
            className="cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="size-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
