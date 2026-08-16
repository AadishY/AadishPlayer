"use client";

import { useState, useMemo, useEffect } from "react";
import { Playlist, PLAYLISTS, getBackgroundsForPlaylist, Track } from "@/data/playlists";

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlaylist: Playlist;
  currentTrack?: Track;
  onSelectPlaylist: (playlist: Playlist) => void;
  onSelectTrack?: (playlist: Playlist, trackIndex: number) => void;
  onSelectScene: (sceneFile: string) => void;
}

export default function PlaylistDrawer({
  isOpen,
  onClose,
  currentPlaylist,
  currentTrack,
  onSelectPlaylist,
  onSelectTrack,
  onSelectScene,
}: PlaylistDrawerProps) {
  const [selectedStationId, setSelectedStationId] = useState<string>(currentPlaylist.id);
  const [activeTab, setActiveTab] = useState<"tracks" | "scenes">("tracks");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Keep selectedStationId in sync with currentPlaylist when drawer opens or currentPlaylist changes
  useEffect(() => {
    if (isOpen) {
      setSelectedStationId(currentPlaylist.id);
      setSearchQuery("");
    }
  }, [isOpen, currentPlaylist.id]);

  const activeStation = useMemo(() => {
    return PLAYLISTS.find((p) => p.id === selectedStationId) || currentPlaylist;
  }, [selectedStationId, currentPlaylist]);

  const allowedScenes = useMemo(() => {
    return getBackgroundsForPlaylist(activeStation.id);
  }, [activeStation.id]);

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeStation.tracks.map((t, idx) => ({ track: t, originalIndex: idx }));
    }
    const q = searchQuery.toLowerCase();
    return activeStation.tracks
      .map((t, idx) => ({ track: t, originalIndex: idx }))
      .filter(
        ({ track }) =>
          track.title.toLowerCase().includes(q) ||
          track.artist.toLowerCase().includes(q) ||
          (track.film && track.film.toLowerCase().includes(q))
      );
  }, [activeStation.tracks, searchQuery]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ALL HOOKS ARE CALLED UNCONDITIONALLY ABOVE
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Glass Modal Content */}
      <div className="relative w-full max-w-2xl glass-card rounded-[28px] p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/20 z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-amber-400">✦</span> AadishPlayer Stations & Tracks
            </h3>
            <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
              153 curated tracks across 3 nostalgia stations
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors text-xs"
          >
            ✕
          </button>
        </div>

        {/* Station Switcher Tabs */}
        <div className="flex items-center gap-1.5 pt-3 pb-2 overflow-x-auto no-scrollbar shrink-0">
          {PLAYLISTS.map((playlist) => {
            const isSelected = playlist.id === activeStation.id;
            const isPlayingThis = playlist.id === currentPlaylist.id;

            return (
              <button
                key={playlist.id}
                onClick={() => {
                  setSelectedStationId(playlist.id);
                  setSearchQuery("");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-[1.02]"
                    : "bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border-white/10"
                }`}
              >
                {isPlayingThis && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-slate-950 animate-ping" : "bg-amber-400"}`} />
                )}
                <span>{playlist.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? "bg-slate-950/20 text-slate-950" : "bg-white/15 text-white/70"}`}>
                  {playlist.tracks.length}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setActiveTab(activeTab === "scenes" ? "tracks" : "scenes")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ml-auto border ${
              activeTab === "scenes"
                ? "bg-purple-500 text-white border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                : "bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border-white/10"
            }`}
          >
            🖼 Scenes ({allowedScenes.length})
          </button>
        </div>

        {/* View Toggle: Scenes Gallery OR Song Tracks */}
        {activeTab === "scenes" ? (
          <div className="overflow-y-auto py-3 space-y-3 custom-scrollbar flex-1 pr-1">
            <h4 className="text-xs font-semibold text-purple-300 font-mono tracking-wider uppercase">
              {activeStation.name} Scenes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {allowedScenes.map((scene) => (
                <div
                  key={scene.id}
                  onClick={() => {
                    onSelectScene(scene.file);
                    onClose();
                  }}
                  className="group relative rounded-xl overflow-hidden border border-white/15 hover:border-purple-400 cursor-pointer transition-all aspect-video shadow-md hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url('${scene.file}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2 flex flex-col justify-end">
                    <p className="text-[11px] font-bold text-white leading-tight truncate">
                      {scene.name}
                    </p>
                    <p className="text-[9px] text-purple-200/80 font-mono truncate">{scene.mood}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search Input for Active Station */}
            <div className="pt-2 pb-2 shrink-0">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">🔍</span>
                <input
                  type="text"
                  placeholder={`Search ${activeStation.tracks.length} songs in ${activeStation.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-xl pl-8 pr-8 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/70 transition-colors"
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

            {/* Scrollable Tracks List */}
            <div className="overflow-y-auto py-2 space-y-1 custom-scrollbar flex-1 pr-1">
              {filteredTracks.length === 0 ? (
                <div className="py-10 text-center text-white/40 text-xs font-mono">
                  No matching tracks found in {activeStation.name} for "{searchQuery}"
                </div>
              ) : (
                filteredTracks.map(({ track, originalIndex }) => {
                  const isTrackPlaying =
                    activeStation.id === currentPlaylist.id && currentTrack?.id === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        if (onSelectTrack) {
                          onSelectTrack(activeStation, originalIndex);
                        } else {
                          onSelectPlaylist(activeStation);
                        }
                        onClose();
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                        isTrackPlaying
                          ? "bg-amber-400/25 text-amber-300 border border-amber-400/60 shadow-md scale-[1.005]"
                          : "hover:bg-white/10 text-white/85 hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span
                          className={`w-6 text-center text-xs font-mono shrink-0 ${
                            isTrackPlaying ? "text-amber-400 font-bold" : "text-white/40"
                          }`}
                        >
                          {isTrackPlaying ? "▶" : originalIndex + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate leading-snug">{track.title}</p>
                          <p className="text-[10.5px] text-white/60 truncate">
                            {track.artist} {track.film ? `• ${track.film}` : ""}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-white/50 shrink-0">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Footer: Creator & Deployments */}
        <div className="pt-3 mt-1 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/60 shrink-0">
          <div className="flex items-center gap-2">
            <span>
              Crafted by{" "}
              <a
                href="https://github.com/AadishY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-semibold"
              >
                Aadish Yadav (@AadishY)
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://aadishplayer.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Cloudflare Pages ↗
            </a>
            <span>•</span>
            <a
              href="https://aadishplayer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Vercel ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
