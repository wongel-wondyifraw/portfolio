"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { SmoothScroll } from "./smooth-scroll";
import { AudioProvider } from "./audio-provider";
import { XRayProvider } from "./xray-provider";
import { HighlightProvider } from "./highlight-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AudioProvider>
        <XRayProvider>
          <HighlightProvider>
            <SmoothScroll>
              <TooltipProvider delay={150}>
                {children}
                <div
                  className="fixed inset-0 pointer-events-none noise-overlay z-40"
                  aria-hidden="true"
                />
                <Toaster
                  position="bottom-right"
                  richColors
                  closeButton
                  toastOptions={{
                    className: "font-sans",
                  }}
                />
              </TooltipProvider>
            </SmoothScroll>
          </HighlightProvider>
        </XRayProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

