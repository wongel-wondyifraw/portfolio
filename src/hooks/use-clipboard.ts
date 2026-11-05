"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export function useClipboard() {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(
    async (text: string, label: string = "Copied to clipboard!") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        // Fire festive celebration confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.85 },
            colors: ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"],
          });
        } catch {
          // ignore if canvas is unavailable
        }

        toast.success(label, {
          description: text,
        });

        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("Failed to copy", {
          description: "Please copy manually.",
        });
      }
    },
    []
  );

  return { copied, copy };
}

