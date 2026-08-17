"use client";

import { useState, useEffect } from "react";
import Clock from "./Clock";
import { Playlist } from "@/data/playlists";

interface TopBarProps {
  currentPlaylist: Playlist;
  dullOpacity: number;
  onDullOpacityChange: (opacity: number) => void;
  forceShow?: boolean;
  showCenterTime?: boolean;
}

export default function TopBar({
  currentPlaylist,
  dullOpacity,
  onDullOpacityChange,
  forceShow,
  showCenterTime = false,
}: TopBarProps) {
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [isTopNear, setIsTopNear] = useState<boolean>(false);

  // Proximity-based auto-hiding for Header on PC / Desktop (< 110px from top) with RAF throttle
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) {
        setIsTopNear(false);
        return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsTopNear(e.clientY < 110);
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Quick 1-tap cycle through dim levels: 0% -> 15% -> 40% -> 70% -> 0%
  const handleCycleDull = () => {
    if (dullOpacity === 0) onDullOpacityChange(15);
    else if (dullOpacity <= 15) onDullOpacityChange(40);
    else if (dullOpacity <= 40) onDullOpacityChange(70);
    else onDullOpacityChange(0);
  };

  const isVisible = forceShow || isTopNear;

  return (
    <header
      onMouseEnter={() => setIsTopNear(true)}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-[max(0.75rem,env(safe-area-inset-top))] px-[max(1rem,env(safe-area-inset-right))] pointer-events-none select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      {/* Top-Left: Lucknow Live Clock (hidden if Center Time is ON) + Dull Mode + GitHub Link */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5">
        {!showCenterTime && <Clock />}

        {/* Dull Mode (Blackness Dim Controller) */}
        <div className="relative flex items-center">
          <button
            onClick={handleCycleDull}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowSlider((prev) => !prev);
            }}
            title="Dull Mode: Click to cycle dimming, or hold/right-click for slider"
            className={`glass-badge group flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg border cursor-pointer select-none ${
              dullOpacity > 0
                ? "border-amber-400/80 bg-black/60 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                : "border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/[0.18]"
            }`}
          >
            <span className="text-[12px] sm:text-[13px]">{dullOpacity > 50 ? "🌑" : dullOpacity > 0 ? "🌘" : "🌙"}</span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold">
              {dullOpacity > 0 ? `${dullOpacity}%` : "Dull"}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowSlider((prev) => !prev);
              }}
              className="text-[9px] text-white/50 hover:text-amber-300 ml-0.5"
              title="Open slider"
            >
              ⚙
            </span>
          </button>

          {/* Dull Mode Slider Dropdown */}
          {showSlider && (
            <div className="absolute left-0 top-full mt-1.5 bg-[#101015]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 w-44 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                <span className="font-bold text-amber-300">Dim Overlay</span>
                <span className="tabular-nums font-bold">{dullOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={dullOpacity}
                onChange={(e) => onDullOpacityChange(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between items-center text-[8.5px] font-mono text-white/40 px-0.5">
                <span onClick={() => onDullOpacityChange(0)} className="cursor-pointer hover:text-white">0%</span>
                <span onClick={() => onDullOpacityChange(15)} className="cursor-pointer hover:text-amber-300 font-bold">15%</span>
                <span onClick={() => onDullOpacityChange(45)} className="cursor-pointer hover:text-white">45%</span>
                <span onClick={() => onDullOpacityChange(80)} className="cursor-pointer hover:text-white">80%</span>
              </div>
            </div>
          )}
        </div>

        {/* GitHub Repository Link */}
        <a
          href="https://github.com/AadishY/AadishPLayer"
          target="_blank"
          rel="noopener noreferrer"
          title="View Source on GitHub"
          aria-label="GitHub Repository"
          className="glass-badge flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white/90 hover:text-white hover:border-white/40 hover:bg-white/[0.2] transition-all duration-300 shadow-lg border border-white/20"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* Top-Right: Glassmorphic YouTube Playlist Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        <a
          href={currentPlaylist.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${currentPlaylist.name} Playlist on YouTube`}
          aria-label="Open playlist on YouTube"
          className="glass-badge group flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/15 active:scale-95 shadow-lg border border-white/20 font-medium"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="font-semibold text-[11px] sm:text-[12px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            YouTube
          </span>
          <span className="text-[9px] sm:text-[10px] text-white/50 group-hover:text-white">↗</span>
        </a>
      </div>
    </header>
  );
}
