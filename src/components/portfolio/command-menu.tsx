"use client";

import * as React from "react";
import {
  FolderGit2,
  Mail,
  User,
  Briefcase,
  Wrench,
  Sun,
  Moon,
  Laptop,
  Copy,
  Volume2,
  Terminal,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Icons } from "@/components/icons";
import { portfolioData } from "@/data/portfolio-data";
import { useClipboard } from "@/hooks/use-clipboard";
import { useAudio } from "@/components/providers/audio-provider";
import { useXRay } from "@/components/providers/xray-provider";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { setTheme } = useTheme();
  const { copy } = useClipboard();
  const { soundEnabled, toggleSound, playClick } = useAudio();
  const { xrayActive, toggleXRay } = useXRay();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const scrollTo = (id: string) => {
    playClick();
    onOpenChange(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => scrollTo("about")}>
            <User className="mr-2 size-4" />
            <span>About &amp; Overview</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <FolderGit2 className="mr-2 size-4" />
            <span>Projects &amp; Systems</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("experience")}>
            <Briefcase className="mr-2 size-4" />
            <span>Experience &amp; Career</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("skills")}>
            <Wrench className="mr-2 size-4" />
            <span>Skills &amp; Tech Stack</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("contact")}>
            <Mail className="mr-2 size-4" />
            <span>Contact &amp; Connect</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Technologist Controls">
          <CommandItem
            onSelect={() => {
              toggleSound();
              playClick();
              onOpenChange(false);
            }}
          >
            <Volume2 className="mr-2 size-4" />
            <span>Toggle Synthesized Audio ({soundEnabled ? "Disable" : "Enable"})</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              toggleXRay();
              playClick();
              onOpenChange(false);
            }}
          >
            <Terminal className="mr-2 size-4" />
            <span>Toggle X-Ray Blueprint Mode ({xrayActive ? "Disable" : "Enable"})</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => {
              playClick();
              onOpenChange(false);
              copy(portfolioData.personal.email, "Email copied to clipboard!");
            }}
          >
            <Copy className="mr-2 size-4" />
            <span>Copy Email Address</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              playClick();
              onOpenChange(false);
              const linkedin = portfolioData.socials.find((s) => s.icon === "linkedin")?.url || "https://linkedin.com/in/wongel-kassa";
              window.open(linkedin, "_blank");
            }}
          >
            <Icons.linkedIn className="mr-2 size-4" />
            <span>Open LinkedIn Profile</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              playClick();
              setTheme("light");
              onOpenChange(false);
            }}
          >
            <Sun className="mr-2 size-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              playClick();
              setTheme("dark");
              onOpenChange(false);
            }}
          >
            <Moon className="mr-2 size-4" />
            <span>Dark Mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              playClick();
              setTheme("system");
              onOpenChange(false);
            }}
          >
            <Laptop className="mr-2 size-4" />
            <span>System Default</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
