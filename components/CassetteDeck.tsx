"use client";

import { useState, useMemo } from "react";
import { Playlist, Track, PLAYLISTS } from "@/data/playlists";

interface CassetteRackProps {
  currentPlaylist: Playlist;
  currentTrack: Track;
  isPlaying: boolean;
  onSelectPlaylist: (playlist: Playlist) => void;
  onSelectTrack: (playlist: Playlist, trackIndex: number) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onOpenPlaylistDrawer: () => void;
}

export default function CassetteRack({
  currentPlaylist,
  currentTrack,
  isPlaying,
  onSelectPlaylist,
  onSelectTrack,
  onNextTrack,
  onPrevTrack,
}: CassetteRackProps) {
  const [popupPlaylist, setPopupPlaylist] = useState<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleOpenSongPopup = (playlist: Playlist, e: React.MouseEvent) => {
    e.stopPropagation();
    setPopupPlaylist(playlist);
    setSearchQuery("");
    setVisibleCount(5);
  };

  const filteredTracks = useMemo(() => {
    if (!popupPlaylist) return [];
    if (!searchQuery.trim()) return popupPlaylist.tracks.map((t, idx) => ({ track: t, originalIndex: idx }));
    const q = searchQuery.toLowerCase();
    return popupPlaylist.tracks
      .map((t, idx) => ({ track: t, originalIndex: idx }))
      .filter(
        ({ track }) =>
          track.title.toLowerCase().includes(q) ||
          track.artist.toLowerCase().includes(q) ||
          (track.film && track.film.toLowerCase().includes(q))
      );
  }, [popupPlaylist, searchQuery]);

  const displayedTracks = useMemo(() => {
    if (searchQuery.trim()) return filteredTracks;
    return filteredTracks.slice(0, visibleCount);
  }, [filteredTracks, visibleCount, searchQuery]);

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP: Scaled-Down Right Border Docked (Active POPUP, Inactive POPDOWN) */}
      {/* ======================================================== */}
      <aside
        aria-label="Cassette & DVD Deck Bay"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-2.5 select-none pr-0.5"
      >
        {PLAYLISTS.map((playlist) => {
          const isActive = playlist.id === currentPlaylist.id;

          return (
            <div
              key={playlist.id}
              onClick={() => {
                if (!isActive) {
                  onSelectPlaylist(playlist);
                }
              }}
              title={isActive ? `${playlist.name} (Active in Deck)` : `Click to insert ${playlist.name}`}
              className={`group relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isActive
                  ? "-translate-x-4 scale-100 z-30 opacity-100"
                  : "translate-x-3 hover:translate-x-1.5 scale-90 z-10 opacity-70 hover:opacity-95"
              }`}
            >
              {/* Scaled-Down Cassette Housing Body (168px width) */}
              <div
                className={`w-[168px] rounded-l-[16px] p-2 glass-card border-l border-y transition-all duration-300 shadow-2xl flex flex-col active:scale-95 cursor-pointer ${
                  isActive
                    ? "border-amber-400/90 bg-white/[0.16] shadow-[0_12px_32px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] ring-1 ring-amber-400/40"
                    : "border-white/15 bg-white/[0.05] hover:border-white/30"
                }`}
              >
                {/* Status Tab & Quick Tracklist Popup Trigger */}
                <div className="flex items-center justify-between px-1 mb-1">
                  <span
                    className={`text-[8px] font-mono font-extrabold tracking-wider px-1.5 py-0.5 rounded uppercase ${
                      isActive
                        ? "bg-amber-400 text-slate-950 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {isActive ? "✦ LOADED" : "⬇ RECESS"}
                  </span>

                  <button
                    onClick={(e) => handleOpenSongPopup(playlist, e)}
                    title="Open all songs in popup"
                    className="text-[8px] font-mono text-amber-300 hover:text-amber-200 px-1.5 py-0.5 rounded-full bg-white/10 hover:bg-amber-400/20 hover:border-amber-400/50 border border-white/10 transition-all flex items-center gap-0.5"
                  >
                    <span>{playlist.tracks.length}</span>
                    <span className="text-[8px]">♫</span>
                  </button>
                </div>

                {/* Cassette Face Shell */}
                <div className="w-full rounded-[10px] overflow-hidden bg-black/40 border border-white/15 shadow-xl flex flex-col backdrop-blur-md">
                  {/* Top Label Area with Rich Theme Color */}
                  <div
                    className={`w-full px-2 py-1 bg-gradient-to-r ${playlist.cassetteColor} flex flex-col justify-between border-b border-black/30 shadow-inner`}
                  >
                    <h4 className="font-extrabold text-[10.5px] text-white tracking-wide truncate drop-shadow-md">
                      {playlist.name}
                    </h4>
                    <span className="text-[7.5px] font-mono text-amber-200/90 font-medium truncate">
                      {playlist.cassetteLabel}
                    </span>
                  </div>

                  {/* Active Playing Track Banner & Song Changer */}
                  {isActive && (
                    <div className="bg-black/50 px-1.5 py-0.5 flex items-center justify-between border-b border-white/10">
                      <div
                        onClick={(e) => handleOpenSongPopup(playlist, e)}
                        className="flex items-center gap-1 min-w-0 pr-1 cursor-pointer group/title hover:text-amber-300"
                        title="Click to view songs"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping shrink-0" />
                        <span className="text-[9.5px] font-semibold text-amber-200 truncate group-hover/title:underline">
                          {currentTrack.title}
                        </span>
                      </div>

                      {/* Mini Prev/Next Track Steppers */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPrevTrack();
                          }}
                          title="Previous song"
                          className="w-4 h-4 rounded bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-[8px] transition-colors"
                        >
                          ⏮
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNextTrack();
                          }}
                          title="Next song"
                          className="w-4 h-4 rounded bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-[8px] transition-colors"
                        >
                          ⏭
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Center Spool Window with Dual Spinning Tape Hubs */}
                  <div className="relative px-3 py-2 bg-gradient-to-b from-black/80 to-slate-950/90 flex items-center justify-center gap-4">
                    {/* Left Spool Reel */}
                    <div className="relative w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/60 shadow-inner">
                      <div
                        className={`w-3 h-3 rounded-full border border-dashed border-amber-300/80 ${
                          isActive && isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                        }`}
                      />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    </div>

                    {/* Central Tape View Window */}
                    <div className="w-6 h-3 rounded bg-amber-900/30 border border-white/20 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-600/40 rounded-full" />
                    </div>

                    {/* Right Spool Reel */}
                    <div className="relative w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/60 shadow-inner">
                      <div
                        className={`w-3 h-3 rounded-full border border-dashed border-amber-300/80 ${
                          isActive && isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                        }`}
                      />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    </div>
                  </div>

                  {/* Bottom Footer Details */}
                  <div className="px-2 py-1 bg-black/70 flex items-center justify-between text-[7px] font-mono text-white/50 border-t border-white/5">
                    <span className="truncate">{playlist.tracks.length} TRACKS</span>
                    <button
                      onClick={(e) => handleOpenSongPopup(playlist, e)}
                      className="text-amber-400/90 hover:text-amber-300 underline tracking-tighter"
                    >
                      VIEW LIST
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </aside>

      {/* ======================================================== */}
      {/* MOBILE: Horizontal Mini Cassette Rack docked at Bottom */}
      {/* ======================================================== */}
      <div className="md:hidden flex items-center justify-center gap-2 w-full px-2 py-1">
        {PLAYLISTS.map((playlist) => {
          const isActive = playlist.id === currentPlaylist.id;

          return (
            <div
              key={playlist.id}
              onClick={() => {
                if (!isActive) {
                  onSelectPlaylist(playlist);
                }
              }}
              className={`flex-1 min-w-0 p-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-amber-400 bg-white/20 shadow-[0_4px_16px_rgba(245,158,11,0.3)] scale-[1.02]"
                  : "border-white/10 bg-black/40 hover:bg-black/60"
              }`}
            >
              <div className="flex items-center gap-1.5 w-full justify-center">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-amber-400 animate-pulse" : "bg-white/30"
                  }`}
                />
                <span className="font-bold text-[11px] text-white truncate text-center">
                  {playlist.name}
                </span>
              </div>

              <button
                onClick={(e) => handleOpenSongPopup(playlist, e)}
                className="text-[9px] font-mono text-amber-300/90 my-1 underline"
              >
                {playlist.tracks.length} Songs
              </button>

              <span className="text-[8px] font-mono text-white/60">
                {isActive ? "✦ LOADED" : "⬇ RECESS"}
              </span>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* POPUP MODAL: All Songs in Selected DVD/Cassette Playlist */}
      {/* ======================================================== */}
      {popupPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={() => setPopupPlaylist(null)} />

          <div className="relative w-full max-w-lg glass-card rounded-[26px] p-5 sm:p-6 shadow-2xl border border-amber-400/50 z-10 flex flex-col max-h-[85vh] overflow-hidden">
            {/* Popup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <div>
                  <h3 className="font-bold text-[16px] text-white tracking-tight">
                    {popupPlaylist.name}
                  </h3>
                  <p className="text-[11px] text-amber-200/80 font-mono">
                    {popupPlaylist.cassetteLabel} • {popupPlaylist.tracks.length} Tracks
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPopupPlaylist(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search Input for Instant Filtering */}
            <div className="pt-3 pb-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">🔍</span>
                <input
                  type="text"
                  placeholder="Search tracks, artists, movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-xl pl-8 pr-8 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/70 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Song List in Popup */}
            <div className="overflow-y-auto py-2 space-y-1.5 custom-scrollbar flex-1 pr-1">
              {displayedTracks.length === 0 ? (
                <div className="py-8 text-center text-white/40 text-xs font-mono">
                  No matching songs found for "{searchQuery}"
                </div>
              ) : (
                displayedTracks.map(({ track, originalIndex }) => {
                  const isThisPlaying =
                    popupPlaylist.id === currentPlaylist.id && currentTrack.id === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        onSelectTrack(popupPlaylist, originalIndex);
                        setPopupPlaylist(null);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                        isThisPlaying
                          ? "bg-amber-400/30 text-amber-300 border border-amber-400/70 shadow-md"
                          : "hover:bg-white/15 text-white/90 hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span
                          className={`w-6 text-center text-xs font-mono shrink-0 ${
                            isThisPlaying ? "text-amber-400 font-bold" : "text-white/50"
                          }`}
                        >
                          {isThisPlaying ? "▶" : originalIndex + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate leading-snug">{track.title}</p>
                          <p className="text-[10.5px] text-white/60 truncate">
                            {track.artist} {track.film ? `• ${track.film}` : ""}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-white/60 shrink-0">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  );
                })
              )}

              {/* Incremental "Show More (+10)" button */}
              {!searchQuery && visibleCount < filteredTracks.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="w-full py-2.5 px-3 mt-2 rounded-xl bg-white/10 hover:bg-amber-400/20 text-amber-300 hover:text-amber-200 border border-white/10 hover:border-amber-400/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] shadow-sm"
                >
                  <span>Show More (+10)</span>
                  <span className="text-[10px] text-white/50 font-mono">
                    • {filteredTracks.length - visibleCount} more
                  </span>
                </button>
              )}
            </div>

            {/* Popup Footer */}
            <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60">
              <span>Showing {displayedTracks.length} of {popupPlaylist.tracks.length} tracks</span>
              <button
                onClick={() => setPopupPlaylist(null)}
                className="text-amber-400 hover:text-amber-300 font-semibold px-3 py-1 rounded bg-amber-400/15 hover:bg-amber-400/25 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
