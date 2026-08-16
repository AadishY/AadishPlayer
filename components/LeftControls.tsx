"use client";

import { useState, useEffect } from "react";

interface LeftControlsProps {
  onRandomBg: () => void;
}

export default function LeftControls({ onRandomBg }: LeftControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen toggle error:", e);
    }
  };

  return (
    <aside
      aria-label="Left Screen Quick Controls"
      className="fixed left-0 top-[30%] sm:top-[35%] z-30 flex flex-col gap-2.5 items-start select-none pl-0"
    >
      {/* 90-Degree Rotated Scene Randomizer Button on Leftmost Border (Glassmorphic) */}
      <button
        onClick={onRandomBg}
        title="Change scene background (Hotkey: S)"
        aria-label="Change scene background"
        className="glass-card group rounded-r-2xl border-r border-y border-white/25 bg-white/[0.12] backdrop-blur-2xl p-2.5 flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 hover:translate-x-1.5 hover:border-amber-400/70 hover:bg-white/[0.20] active:scale-95 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          <svg
            className="w-4 h-4 fill-current text-amber-400 group-hover:rotate-90 transition-transform duration-300 drop-shadow-sm"
            viewBox="0 0 24 24"
          >
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
          <span
            className="text-[10px] font-mono font-extrabold tracking-widest text-white uppercase [writing-mode:vertical-lr] rotate-180 drop-shadow-sm"
          >
            SCENE
          </span>
        </div>
      </button>

      {/* Fullscreen Toggle Button on Leftmost Border (Glassmorphic) */}
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen (Hotkey: F)"}
        aria-label="Toggle Fullscreen"
        className="glass-card group rounded-r-2xl border-r border-y border-white/25 bg-white/[0.12] backdrop-blur-2xl p-2.5 flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 hover:translate-x-1.5 hover:border-amber-400/70 hover:bg-white/[0.20] active:scale-95 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          {isFullscreen ? (
            <svg className="w-4 h-4 fill-current text-amber-400 drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current text-white group-hover:text-amber-300 transition-colors drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          )}
          <span
            className="text-[10px] font-mono font-extrabold tracking-widest text-white uppercase [writing-mode:vertical-lr] rotate-180 drop-shadow-sm"
          >
            {isFullscreen ? "EXIT" : "FULL"}
          </span>
        </div>
      </button>
    </aside>
  );
}
