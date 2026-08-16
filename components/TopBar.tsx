"use client";

import Clock from "./Clock";
import { Playlist } from "@/data/playlists";

interface TopBarProps {
  currentPlaylist: Playlist;
}

export default function TopBar({ currentPlaylist }: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-[max(1rem,env(safe-area-inset-top))] px-[max(1.25rem,env(safe-area-inset-right))] pointer-events-none select-none">
      {/* Top-Left: Lucknow Live Clock + GitHub Link */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        <Clock />

        {/* GitHub Repository Link */}
        <a
          href="https://github.com/AadishY/AadishPLayer"
          target="_blank"
          rel="noopener noreferrer"
          title="View Source on GitHub"
          aria-label="GitHub Repository"
          className="glass-badge flex items-center justify-center w-8 h-8 rounded-full text-white/90 hover:text-white hover:border-white/40 hover:bg-white/[0.2] transition-all duration-300 shadow-lg border border-white/20"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
          className="glass-badge group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/15 active:scale-95 shadow-lg border border-white/20 font-medium"
        >
          <svg className="w-4 h-4 fill-current text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="font-semibold text-[12px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            YouTube
          </span>
          <span className="text-[10px] text-white/50 group-hover:text-white">↗</span>
        </a>
      </div>
    </header>
  );
}
