"use client";

import * as React from "react";

interface HighlightContextType {
  hoveredTech: string | null;
  setHoveredTech: (tech: string | null) => void;
  hoveredProject: string | null;
  setHoveredProject: (projectId: string | null) => void;
}

const HighlightContext = React.createContext<HighlightContextType>({
  hoveredTech: null,
  setHoveredTech: () => {},
  hoveredProject: null,
  setHoveredProject: () => {},
});

export function HighlightProvider({ children }: { children: React.ReactNode }) {
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  return (
    <HighlightContext.Provider
      value={{
        hoveredTech,
        setHoveredTech,
        hoveredProject,
        setHoveredProject,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
}

export function useHighlight() {
  return React.useContext(HighlightContext);
}

