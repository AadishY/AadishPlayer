"use client";

import { useState } from "react";
import { BACKGROUND_SCENES } from "@/data/playlists";

interface BackgroundManagerProps {
  currentScene: string | null;
  onSelectScene: (sceneFile: string) => void;
}

export function useBackgroundState() {
  const [activeBg, setActiveBg] = useState<string | null>(null);

  const randomizeBackground = () => {
    const available = BACKGROUND_SCENES.filter((s) => s.file !== activeBg);
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    setActiveBg(chosen.file);
    return chosen;
  };

  const setBackground = (file: string) => {
    setActiveBg(file);
  };

  return {
    activeBg,
    randomizeBackground,
    setBackground,
  };
}

export default function BackgroundDisplay({ activeBg }: { activeBg: string | null }) {
  return (
    <>
      {/* Dynamic Background layer if customized */}
      {activeBg && (
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${activeBg}')` }}
        />
      )}

      {/* Dark gradient overlay for legibility & contrast */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/35 via-transparent to-black/80 pointer-events-none" />

      {/* Noise / Grain overlay */}
      <div className="fixed inset-0 -z-10 grain-overlay pointer-events-none" />
    </>
  );
}
