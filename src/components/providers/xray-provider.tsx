"use client";

import * as React from "react";
import { Terminal, X } from "lucide-react";

interface XRayContextType {
  xrayActive: boolean;
  toggleXRay: () => void;
}

const XRayContext = React.createContext<XRayContextType>({
  xrayActive: false,
  toggleXRay: () => {},
});

export function XRayProvider({ children }: { children: React.ReactNode }) {
  const [xrayActive, setXRayActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (xrayActive) {
        document.documentElement.classList.add("xray-mode");
      } else {
        document.documentElement.classList.remove("xray-mode");
      }
    }
  }, [xrayActive]);

  const toggleXRay = React.useCallback(() => {
    setXRayActive((prev) => !prev);
  }, []);

  return (
    <XRayContext.Provider value={{ xrayActive, toggleXRay }}>
      {children}
      {xrayActive && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-950/90 border border-amber-600/50 text-amber-200 text-xs font-mono shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Terminal className="size-3.5 text-amber-400 animate-pulse" />
          <span>X-RAY BLUEPRINT: ON</span>
          <span className="text-amber-400/60">•</span>
          <span className="text-[10px] text-amber-300/80">BOUNDING BOXES VISIBLE</span>
          <button
            onClick={toggleXRay}
            className="ml-1 p-0.5 rounded-full hover:bg-amber-900/60 text-amber-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Disable X-Ray"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
    </XRayContext.Provider>
  );
}

export function useXRay() {
  return React.useContext(XRayContext);
}

