"use client";

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
  if (!isOpen) return null;

  const allowedScenes = getBackgroundsForPlaylist(currentPlaylist.id);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Glass Modal Content */}
      <div className="relative w-full max-w-xl glass-card rounded-[28px] p-5 sm:p-6 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border border-white/20 z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-amber-400">✦</span> AadishPlayer Stations & Songs
            </h3>
            <p className="text-xs text-white/60 mt-0.5">Click any song or station to start playing</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Channels & Tracks list */}
        <div className="overflow-y-auto py-4 space-y-4 custom-scrollbar flex-1 pr-1">
          {PLAYLISTS.map((playlist) => {
            const isPlaylistActive = playlist.id === currentPlaylist.id;
            return (
              <div
                key={playlist.id}
                className={`rounded-2xl p-3.5 transition-all duration-300 border ${
                  isPlaylistActive
                    ? "border-amber-400/60 bg-white/[0.10] shadow-[0_4px_20px_rgba(245,158,11,0.25)]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                {/* Playlist Header */}
                <div
                  onClick={() => onSelectPlaylist(playlist)}
                  className="flex items-start justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        isPlaylistActive
                          ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                          : "bg-white/20 group-hover:bg-amber-400/60"
                      }`}
                    />
                    <h4 className="font-semibold text-white text-[15px] group-hover:text-amber-300 transition-colors">
                      {playlist.name}
                    </h4>
                  </div>
                  <span className="text-[10.5px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                    {playlist.tracks.length} tracks
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1 pl-5.5">{playlist.tagline}</p>

                {/* Interactive Song List */}
                <div className="mt-3 pl-2 sm:pl-3 space-y-1">
                  {playlist.tracks.map((track, idx) => {
                    const isTrackPlaying = isPlaylistActive && currentTrack?.id === track.id;
                    return (
                      <div
                        key={track.id}
                        onClick={() => {
                          if (onSelectTrack) {
                            onSelectTrack(playlist, idx);
                          } else {
                            onSelectPlaylist(playlist);
                          }
                          onClose();
                        }}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          isTrackPlaying
                            ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm"
                            : "hover:bg-white/10 text-white/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span
                            className={`w-5 text-center text-[11px] font-mono shrink-0 ${
                              isTrackPlaying ? "text-amber-400 font-bold" : "text-white/40"
                            }`}
                          >
                            {isTrackPlaying ? "▶" : idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{track.title}</p>
                            <p className="text-[10px] text-white/50 truncate">
                              {track.artist} {track.film ? `• ${track.film}` : ""}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-white/50 shrink-0">
                          {formatTime(track.duration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Background Scenes Gallery for Active Station */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                <span>🖼️</span> {currentPlaylist.name} Scenes
              </h4>
              <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full">
                {allowedScenes.length} scenes available
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {allowedScenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    onSelectScene(scene.file);
                    onClose();
                  }}
                  className="group flex flex-col items-center text-left rounded-xl p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/50 transition-all overflow-hidden"
                >
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/40 relative mb-1.5">
                    <img
                      src={scene.file}
                      alt={scene.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-white/90 truncate w-full">
                    {scene.name}
                  </span>
                  <span className="text-[9.5px] text-white/50 truncate w-full">
                    {scene.mood}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-white/50 shrink-0">
          <span>AadishPlayer • YouTube IFrame Engine</span>
          <button
            onClick={onClose}
            className="text-amber-400 hover:text-amber-300 font-medium px-3 py-1 rounded bg-amber-400/10 hover:bg-amber-400/20 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
