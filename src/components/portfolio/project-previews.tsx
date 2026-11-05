"use client";

import * as React from "react";
import { Truck, Sparkles, Play, RefreshCw } from "lucide-react";
import { useAudio } from "@/components/providers/audio-provider";

export function FleetLogisticsPreview() {
  const { playPop } = useAudio();
  const [activeRoute, setActiveRoute] = React.useState<number>(1);
  const [isSimulating, setIsSimulating] = React.useState(false);

  const simulateDispatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPop();
    setIsSimulating(true);
    setTimeout(() => {
      setActiveRoute((prev) => (prev % 3) + 1);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/25 via-orange-600/15 to-transparent blur-xl pointer-events-none" />

      <div className="relative w-full max-w-sm rounded-xl border border-amber-600/30 bg-background/85 backdrop-blur-md p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-border/40 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-semibold">
            <Truck className="size-3.5" />
            <span>FLEET_DISPATCH_HUB</span>
          </div>
          <button
            onClick={simulateDispatch}
            disabled={isSimulating}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-600/15 hover:bg-amber-600/25 border border-amber-500/40 text-amber-800 dark:text-amber-200 text-[10px] cursor-pointer transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="size-2.5 animate-spin" />
                <span>ROUTING...</span>
              </>
            ) : (
              <>
                <Play className="size-2.5" />
                <span>DISPATCH</span>
              </>
            )}
          </button>
        </div>

        {/* Route Graph Display */}
        <div className="relative my-3 h-20 flex items-center justify-between px-2">
          <div className="z-10 p-2 rounded-lg bg-amber-600/15 border border-amber-500/40 text-center">
            <span className="text-[10px] font-mono text-amber-800 dark:text-amber-200 block font-semibold">Hub α</span>
            <span className="text-[9px] text-muted-foreground">Depot 01</span>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 200 80">
            <path
              d="M 50 40 C 90 15, 110 65, 150 40"
              fill="none"
              stroke="#d97706"
              strokeWidth="2.5"
              strokeDasharray={isSimulating ? "3 3" : "none"}
              className={isSimulating ? "animate-pulse" : ""}
            />
          </svg>

          <div className="z-10 p-2 rounded-lg bg-orange-600/15 border border-orange-500/40 text-center shadow-lg">
            <span className="text-[10px] font-mono text-orange-800 dark:text-orange-200 block font-bold">Route #{activeRoute}</span>
            <span className="text-[9px] text-emerald-500 font-medium">Assigned</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[10px] font-mono text-muted-foreground">
          <span>Relational DB: PostgreSQL</span>
          <span className="text-emerald-500 font-semibold">Real-Time Sync</span>
        </div>
      </div>
    </div>
  );
}

export function MedafSkincarePreview() {
  const { playPop } = useAudio();
  const [selectedSkinType, setSelectedSkinType] = React.useState<string>("Hydrating");

  const skinTypes = ["Hydrating", "Clarifying", "Barrier Care"];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600/20 via-teal-600/10 to-transparent blur-xl pointer-events-none" />

      <div className="relative w-full max-w-sm rounded-xl border border-emerald-500/30 bg-background/85 backdrop-blur-md p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-border/40 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Sparkles className="size-3.5" />
            <span>AI_DIAGNOSTIC_MATCH</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">98% Match</span>
        </div>

        {/* Skin Type Toggles */}
        <div className="my-3 flex items-center justify-between gap-1.5">
          {skinTypes.map((type) => (
            <button
              key={type}
              onClick={(e) => {
                e.stopPropagation();
                playPop();
                setSelectedSkinType(type);
              }}
              className={`flex-1 py-1 px-1.5 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                selectedSkinType === type
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                  : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[10px] font-mono">
          <span className="text-muted-foreground">Active Routine: <strong className="text-foreground">{selectedSkinType}</strong></span>
          <span className="text-emerald-400 font-semibold">Next.js • E-Com</span>
        </div>
      </div>
    </div>
  );
}
