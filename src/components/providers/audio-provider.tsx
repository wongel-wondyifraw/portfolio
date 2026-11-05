"use client";

import * as React from "react";

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playPop: () => void;
  playSwitch: () => void;
  playSuccess: () => void;
}

const AudioContext = React.createContext<AudioContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playPop: () => {},
  playSwitch: () => {},
  playSuccess: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("alex_portfolio_sound") === "true";
    } catch {
      return false;
    }
  });
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClick = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.02);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // silent fallback
    }
  }, [soundEnabled]);

  const playPop = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.035);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // silent fallback
    }
  }, [soundEnabled]);

  const playSwitch = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // silent fallback
    }
  }, [soundEnabled]);

  const playSuccess = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.06;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {
      // silent fallback
    }
  }, [soundEnabled]);

  const toggleSound = React.useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("alex_portfolio_sound", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick,
        playPop,
        playSwitch,
        playSuccess,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return React.useContext(AudioContext);
}
