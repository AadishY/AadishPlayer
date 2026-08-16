"use client";

import { useState, useMemo, useEffect } from "react";
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
  forceShow?: boolean;
}

export default function CassetteRack({
  currentPlaylist,
  currentTrack,
  isPlaying,
  onSelectPlaylist,
  onSelectTrack,
  onNextTrack,
  onPrevTrack,
  onOpenPlaylistDrawer,
  forceShow,
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

  const [isRightNear, setIsRightNear] = useState(false);

  // Proximity-based auto-hiding on PC / Desktop (> window.innerWidth - 260px) with RAF throttle
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsRightNear(e.clientX > window.innerWidth - 260);
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const isVisible = forceShow || isRightNear;

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP: Auto-Hiding Scaled-Down Right Border Docked Cassette Rack */}
      {/* ======================================================== */}
      <aside
        onMouseEnter={() => setIsRightNear(true)}
        aria-label="Cassette & DVD Deck Bay"
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-2.5 select-none pr-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-[calc(100%-14px)] opacity-40 hover:translate-x-0 hover:opacity-100"
        }`}
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
      {/* MOBILE: Horizontal Mini DVD & Cassette Rack docked at Bottom */}
      {/* ======================================================== */}
      <div className="md:hidden flex items-center justify-center gap-1.5 w-full px-1 py-1">
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
              className={`flex-1 min-w-0 p-1.5 rounded-2xl glass-card transition-all duration-300 cursor-pointer active:scale-95 select-none ${
                isActive
                  ? "border-2 border-amber-400 bg-white/[0.22] shadow-[0_0_24px_rgba(251,191,36,0.65),inset_0_1px_0_rgba(255,255,255,0.6)] ring-2 ring-amber-400/60 scale-[1.03] z-10"
                  : "border border-white/10 bg-black/45 hover:bg-white/[0.08] opacity-75 hover:opacity-100"
              }`}
            >
              {/* Mini DVD / Cassette Spool Visual */}
              <div
                className={`w-full h-7 rounded-lg overflow-hidden relative bg-black/60 mb-1 flex items-center justify-center shadow-inner ${
                  isActive ? "border border-amber-400/60" : "border border-white/15"
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${playlist.cassetteColor} ${isActive ? "opacity-90" : "opacity-60"}`} />

                {/* Cassette Dual Spools & Tape Bridge */}
                <div className="relative z-10 flex items-center justify-center gap-2 bg-black/70 px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                  {/* Left Hub */}
                  <div className="relative w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center bg-black">
                    <div
                      className={`w-2 h-2 rounded-full border border-dashed border-amber-300 ${
                        isActive && isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                      }`}
                    />
                    <div className="w-0.5 h-0.5 rounded-full bg-white" />
                  </div>

                  {/* Tape Bridge */}
                  <div className="w-2.5 h-0.5 bg-amber-500/70 rounded-full" />

                  {/* Right Hub */}
                  <div className="relative w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center bg-black">
                    <div
                      className={`w-2 h-2 rounded-full border border-dashed border-amber-300 ${
                        isActive && isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                      }`}
                    />
                    <div className="w-0.5 h-0.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Station Name & Active Dot */}
              <div className="flex items-center gap-1 w-full justify-center">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,1)]" : "bg-white/30"
                  }`}
                />
                <span className={`font-bold text-[10.5px] sm:text-[11.5px] truncate text-center leading-tight ${
                  isActive ? "text-amber-200" : "text-white"
                }`}>
                  {playlist.name}
                </span>
              </div>

              {/* Clean Status Badge */}
              <span className={`text-[7.5px] font-mono font-bold mt-0.5 uppercase tracking-wider ${
                isActive ? "text-amber-300 font-extrabold" : "text-white/50"
              }`}>
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

          <div className="relative w-full max-w-md bg-[#121217]/95 border border-white/20 rounded-2xl shadow-2xl p-4 z-10 flex flex-col max-h-[85vh] backdrop-blur-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${popupPlaylist.cassetteColor}`} />
                <h3 className="font-bold text-sm text-white">{popupPlaylist.name}</h3>
                <span className="text-xs font-mono text-white/50">({popupPlaylist.tracks.length} songs)</span>
              </div>
              <button
                onClick={() => setPopupPlaylist(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="my-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search song, artist, film..."
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/70"
              />
            </div>

            {/* Songs List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 no-scrollbar max-h-[50vh]">
              {displayedTracks.map(({ track, originalIndex }, idx) => {
                const isCurrentlyPlaying =
                  popupPlaylist.id === currentPlaylist.id && track.id === currentTrack.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      onSelectTrack(popupPlaylist, originalIndex);
                      setPopupPlaylist(null);
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                      isCurrentlyPlaying
                        ? "bg-amber-400/20 border border-amber-400/50 text-amber-200"
                        : "bg-white/[0.04] hover:bg-white/[0.1] border border-white/5 text-white/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-mono text-white/40 w-4 text-right">
                        {originalIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate text-white">{track.title}</p>
                        <p className="text-[10px] text-white/50 truncate">
                          {track.artist} {track.film ? `• ${track.film}` : ""}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-white/40 ml-2">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                );
              })}

              {displayedTracks.length === 0 && (
                <div className="text-center py-6 text-xs text-white/40">No songs match your search</div>
              )}
            </div>

            {/* Incremental Pagination (Show More +10) */}
            {!searchQuery.trim() && visibleCount < filteredTracks.length && (
              <div className="pt-3 border-t border-white/10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-amber-300 transition-all border border-white/10 hover:border-amber-400/40 active:scale-95"
                >
                  Show More (+10) • {filteredTracks.length - visibleCount} remaining
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
