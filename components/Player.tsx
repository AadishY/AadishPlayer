"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Playlist, Track } from "@/data/playlists";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// ==========================================
// MODULE-SCOPE SUB-COMPONENTS (MEMOIZED)
// ==========================================

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

interface VinylDiscProps {
  size?: "sm" | "md";
  isPlaying: boolean;
  coverUrl: string;
  trackTitle: string;
  onTapDisc?: () => void;
}

const VinylDisc = memo(function VinylDisc({ size = "md", isPlaying, coverUrl, trackTitle, onTapDisc }: VinylDiscProps) {
  const sizeClasses = size === "md" ? "w-20 h-20" : "w-12 h-12";
  const labelSizeClasses = size === "md" ? "w-9 h-9" : "w-5 h-5";

  return (
    <div
      onClick={onTapDisc}
      title={isPlaying ? "Click vinyl to pause" : "Click vinyl to play"}
      className={`relative ${sizeClasses} rounded-full shrink-0 flex items-center justify-center select-none shadow-[0_8px_24px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.15)] bg-gradient-to-tr from-[#0a0a0c] via-[#1a1a20] to-[#0a0a0c] animate-spin-vinyl cursor-pointer active:scale-90 transition-transform`}
      style={{
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    >
      {/* Vinyl Grooves Texture */}
      <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[3px] rounded-full border border-white/[0.04]" />
      <div className="absolute inset-[7px] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[11px] rounded-full border border-white/[0.03]" />
      <div className="absolute inset-[15px] rounded-full border border-white/[0.05]" />

      {/* Glossy Sheen Highlight Across Disc */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* Center Label (Cover Artwork) */}
      <div className={`relative ${labelSizeClasses} rounded-full overflow-hidden border border-white/30 shadow-inner flex items-center justify-center bg-black`}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={trackTitle}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-[10px] font-bold text-black">
            ✦
          </div>
        )}
        {/* Center Spindle Hole */}
        <div className="absolute w-2 h-2 rounded-full bg-[#08080a] border border-white/40 shadow-sm" />
      </div>
    </div>
  );
});

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
}

function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  const safeDuration = duration > 0 ? duration : 180;
  const currentRatio = dragProgress !== null ? dragProgress : Math.min(Math.max(currentTime / safeDuration, 0), 1);
  const percent = currentRatio * 100;

  const calculateRatioFromEvent = (clientX: number): number => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const pos = clientX - rect.left;
    return Math.min(Math.max(pos / rect.width, 0), 1);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    const ratio = calculateRatioFromEvent(e.clientX);
    setDragProgress(ratio);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const r = calculateRatioFromEvent(moveEvent.clientX);
      setDragProgress(r);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      if (isDraggingRef.current) {
        const r = calculateRatioFromEvent(upEvent.clientX);
        isDraggingRef.current = false;
        setDragProgress(null);
        onSeek(r * safeDuration);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  return (
    <div
      ref={barRef}
      onPointerDown={handlePointerDown}
      className="group relative w-full h-8 flex items-center cursor-pointer select-none touch-none"
    >
      {/* Background Track */}
      <div className="w-full h-1.5 rounded-full bg-white/[0.12] overflow-hidden group-hover:h-2 transition-all duration-150 relative">
        {/* Filled Progress Bar */}
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full transition-all duration-75 relative"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Scrubbing Thumb */}
      <div
        className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(245,158,11,0.8)] border-2 border-amber-500 transition-transform -translate-x-1/2 scale-0 group-hover:scale-100 active:scale-125"
        style={{ left: `${percent}%` }}
      />
    </div>
  );
}

interface TrackInfoProps {
  track: Track;
  className?: string;
}

function TrackInfo({ track, className = "" }: TrackInfoProps) {
  return (
    <div className={`flex flex-col min-w-0 justify-center ${className}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-[15px] font-semibold text-white tracking-tight truncate leading-tight">
          {track.title}
        </h2>
        {track.year && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-white/10 text-amber-300/90 font-medium shrink-0">
            {track.year}
          </span>
        )}
      </div>
      <p className="text-[12.5px] text-white/70 truncate mt-0.5 font-normal leading-snug">
        {track.artist}
        {track.film && (
          <span className="text-white/40 font-light"> • {track.film}</span>
        )}
      </p>
    </div>
  );
}

interface TransportControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function TransportControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}: TransportControlsProps) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      {/* Previous Track Button */}
      <button
        onClick={onPrev}
        aria-label="Previous track"
        className="min-h-[40px] min-w-[40px] flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all duration-200 rounded-full hover:bg-white/10"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
        </svg>
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-amber-400 to-amber-600 ring-1 ring-white/25 shadow-[0_8px_20px_rgba(217,119,6,0.45)] hover:shadow-[0_10px_24px_rgba(245,158,11,0.6)] flex items-center justify-center text-slate-950 font-bold active:scale-95 transition-all duration-200 hover:scale-105 shrink-0"
      >
        {isPlaying ? (
          <svg className="w-5 h-5 fill-current text-slate-950" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 fill-current text-slate-950 translate-x-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Next Track Button */}
      <button
        onClick={onNext}
        aria-label="Next track"
        className="min-h-[40px] min-w-[40px] flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all duration-200 rounded-full hover:bg-white/10"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>
  );
}

// Audio Volume Control Sub-Component
interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (val: number) => void;
  onToggleMute: () => void;
  className?: string;
}

function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className = "",
}: VolumeControlProps) {
  const currentVal = isMuted ? 0 : volume;

  return (
    <div className={`flex items-center gap-1.5 group/vol ${className}`}>
      <button
        onClick={onToggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        {currentVal === 0 ? (
          <svg className="w-4 h-4 fill-current text-red-400" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
          </svg>
        ) : currentVal < 50 ? (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M7 9v6h4l5 5V4L11 9H7zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

      {/* Volume Slider */}
      <div className="w-16 sm:w-20 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={currentVal}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 transition-all"
        />
      </div>
    </div>
  );
}

// ==========================================
// MAIN PLAYER COMPONENT
// ==========================================

interface PlayerProps {
  currentPlaylist: Playlist;
  selectedTrackIndex?: number | null;
  onPlaylistChange: (playlist: Playlist) => void;
  onOpenPlaylistDrawer: () => void;
  onRandomBg: () => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onCurrentTrackChange?: (track: Track) => void;
}

export default function Player({
  currentPlaylist,
  selectedTrackIndex,
  onPlaylistChange,
  onOpenPlaylistDrawer,
  onRandomBg,
  onPlayStateChange,
  onCurrentTrackChange,
}: PlayerProps) {
  // Deterministic SSR starting track (randomized on client mount)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Client-side mount: pick random starting song
  useEffect(() => {
    const rand = Math.floor(Math.random() * (currentPlaylist.tracks.length || 1));
    if (rand > 0) {
      setCurrentTrackIndex(rand);
    }
  }, []);

  // Sync selected track from playlist drawer
  useEffect(() => {
    if (typeof selectedTrackIndex === "number" && selectedTrackIndex >= 0) {
      setCurrentTrackIndex(selectedTrackIndex);
      setCurrentTime(0);
    }
  }, [selectedTrackIndex]);

  // Notify parent on playback state change
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying);
    }
  }, [isPlaying, onPlayStateChange]);

  const playerRef = useRef<any>(null);
  const isReadyRef = useRef<boolean>(false);
  const pendingPlayRef = useRef<boolean>(false);
  const lastLoadedVideoIdRef = useRef<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = currentPlaylist.tracks[currentTrackIndex] || currentPlaylist.tracks[0];
  const coverUrl = currentTrack ? `https://img.youtube.com/vi/${currentTrack.videoId}/hqdefault.jpg` : "";

  // Notify parent of current track
  useEffect(() => {
    if (onCurrentTrackChange && currentTrack) {
      onCurrentTrackChange(currentTrack);
    }
  }, [currentTrack, onCurrentTrackChange]);

  // Advance to next track (strictly within active playlist)
  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % (currentPlaylist.tracks.length || 1));
    setCurrentTime(0);
  }, [currentPlaylist]);

  // Go to previous track (strictly within active playlist)
  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + (currentPlaylist.tracks.length || 1)) % (currentPlaylist.tracks.length || 1));
    setCurrentTime(0);
  }, [currentPlaylist]);

  // Ref to always hold latest handleNext callback across YouTube events
  const handleNextRef = useRef<() => void>(handleNext);
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  // Reset track index safely when playlist changes
  useEffect(() => {
    if (selectedTrackIndex === null || selectedTrackIndex === undefined) {
      setCurrentTrackIndex(0);
      setCurrentTime(0);
    }
  }, [currentPlaylist.id]);

  // Volume Handlers
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    const player = playerRef.current;
    if (player && typeof player.setVolume === "function") {
      try {
        player.setVolume(newVol);
        if (player.isMuted && player.isMuted()) {
          player.unMute();
        }
      } catch (_) {}
    }
  };

  const handleToggleMute = () => {
    const player = playerRef.current;
    if (player && typeof player.isMuted === "function") {
      try {
        if (player.isMuted()) {
          player.unMute();
          setIsMuted(false);
          if (volume === 0) {
            setVolume(80);
            player.setVolume(80);
          }
        } else {
          player.mute();
          setIsMuted(true);
        }
      } catch (_) {}
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  // Setup YouTube Player Engine strictly ONCE on mount
  useEffect(() => {
    let checkTimer: NodeJS.Timeout | null = null;

    const createPlayer = () => {
      const container = document.getElementById("youtube-live-frame");
      if (!container || !window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player("youtube-live-frame", {
          videoId: currentTrack?.videoId || "9XHrWGJtO1A",
          playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 0,
            enablejsapi: 1,
            fs: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event: any) => {
              isReadyRef.current = true;
              lastLoadedVideoIdRef.current = currentTrack?.videoId || null;
              event.target.setVolume(volume);

              // Set lowest stream quality (144p tiny) for fastest loading & zero audio buffering latency
              if (typeof event.target.setPlaybackQuality === "function") {
                try {
                  event.target.setPlaybackQuality("tiny");
                } catch (_) {}
              }

              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              const state = event.data;
              if (state === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                // Ensure 144p tiny quality during playback
                if (typeof event.target.setPlaybackQuality === "function") {
                  try {
                    event.target.setPlaybackQuality("tiny");
                  } catch (_) {}
                }
              } else if (
                state === window.YT.PlayerState.PAUSED ||
                state === window.YT.PlayerState.BUFFERING
              ) {
                if (state === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                }
                if (state === window.YT.PlayerState.BUFFERING) {
                  if (typeof event.target.setPlaybackQuality === "function") {
                    try {
                      event.target.setPlaybackQuality("tiny");
                    } catch (_) {}
                  }
                }
              } else if (state === window.YT.PlayerState.ENDED) {
                if (handleNextRef.current) {
                  handleNextRef.current();
                }
              }
            },
            onError: (err: any) => {
              console.warn("YouTube player encountered error:", err.data);
              setTimeout(() => {
                if (handleNextRef.current) {
                  handleNextRef.current();
                }
              }, 1200);
            },
          },
        });
      } catch (err) {
        console.error("YouTube init error:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        createPlayer();
      };

      checkTimer = setInterval(() => {
        if (window.YT && window.YT.Player && !isReadyRef.current && !playerRef.current) {
          createPlayer();
          if (checkTimer) clearInterval(checkTimer);
        }
      }, 500);
    }

    return () => {
      if (checkTimer) clearInterval(checkTimer);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch (_) {}
      }
      playerRef.current = null;
      isReadyRef.current = false;
      lastLoadedVideoIdRef.current = null;
    };
  }, []);

  // When track actually changes, load new video in 144p (tiny) for instant audio playback
  useEffect(() => {
    if (!isReadyRef.current || !playerRef.current || !currentTrack) return;

    if (lastLoadedVideoIdRef.current === currentTrack.videoId) {
      return;
    }
    lastLoadedVideoIdRef.current = currentTrack.videoId;

    try {
      if (isPlaying) {
        if (typeof playerRef.current.loadVideoById === "function") {
          playerRef.current.loadVideoById({
            videoId: currentTrack.videoId,
            startSeconds: 0,
            suggestedQuality: "tiny",
          });
        }
        if (typeof playerRef.current.setPlaybackQuality === "function") {
          playerRef.current.setPlaybackQuality("tiny");
        }
      } else {
        if (typeof playerRef.current.cueVideoById === "function") {
          playerRef.current.cueVideoById({
            videoId: currentTrack.videoId,
            startSeconds: 0,
            suggestedQuality: "tiny",
          });
        }
      }
    } catch (e) {
      console.error("Failed to load video:", e);
    }
  }, [currentTrack?.videoId, isPlaying]);

  // Safe Play/Pause Toggle
  const togglePlay = () => {
    if (!isReadyRef.current || !playerRef.current) {
      pendingPlayRef.current = !isPlaying;
      setIsPlaying((p) => !p);
      return;
    }

    try {
      if (isPlaying) {
        if (typeof playerRef.current.pauseVideo === "function") {
          playerRef.current.pauseVideo();
        }
        setIsPlaying(false);
      } else {
        if (typeof playerRef.current.playVideo === "function") {
          playerRef.current.playVideo();
        }
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Play toggle error:", e);
      setIsPlaying((p) => !p);
    }
  };

  // Safe Seeking
  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    const player = playerRef.current;
    if (player && typeof player.seekTo === "function") {
      try {
        player.seekTo(newTime, true);
      } catch (e) {
        console.warn("Seek error:", e);
      }
    }
  };

  // Progress update timer (200ms)
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        const player = playerRef.current;
        if (player && typeof player.getCurrentTime === "function") {
          try {
            const t = player.getCurrentTime();
            if (typeof t === "number" && !isNaN(t)) {
              setCurrentTime(t);
            }
            const dur = player.getDuration();
            if (typeof dur === "number" && dur > 0) {
              setDuration(dur);
            }
          } catch (_) {}
        }
      }, 200);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Global Keyboard Shortcuts (Space: Play/Pause, Arrows: Next/Prev, M: Mute, S: Scene)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        handleToggleMute();
      } else if (e.code === "KeyS") {
        e.preventDefault();
        onRandomBg();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, handleNext, handlePrev, handleToggleMute, onRandomBg]);

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-2">
      {/* 
        VISIBLE YOUTUBE IFRAME CANVAS / ARTWORK SLOT 
        Fully hidden when minimized (0px height, 0 opacity) to prevent any stray black bar
      */}
      <div
        className={`w-full transition-all duration-500 overflow-hidden ${
          showVideoPlayer ? "max-h-[260px] opacity-100 mb-2" : "max-h-0 opacity-0 mb-0 pointer-events-none"
        }`}
      >
        <div className="glass-card rounded-2xl p-2 relative shadow-2xl overflow-hidden border border-white/15">
          <div className="flex items-center justify-between px-2 py-1 mb-1.5">
            <span className="text-[11px] font-mono tracking-wider uppercase text-amber-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Live YouTube Feed & Artwork
            </span>
            <button
              onClick={() => setShowVideoPlayer(false)}
              className="text-[11px] text-white/60 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
            >
              Minimize ✕
            </button>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/60 shadow-inner relative">
            <div id="youtube-live-frame" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP PLAYER (hidden sm:flex) — Single Horizontal Pill */}
      {/* ======================================================== */}
      <div className="hidden sm:flex w-full glass-pill rounded-full p-2.5 pr-4 items-center justify-between gap-3 transition-all duration-300 hover:border-white/20 select-none shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]">
        {/* Left: Spinning Vinyl (Interactive Tap to Play/Pause) */}
        <div className="flex items-center gap-3 shrink-0">
          <VinylDisc
            size="md"
            isPlaying={isPlaying}
            coverUrl={coverUrl}
            trackTitle={currentTrack.title}
            onTapDisc={togglePlay}
          />
        </div>

        {/* Center: Title + Artist & Seek bar & Times */}
        <div className="flex flex-col flex-1 min-w-0 px-1">
          <div className="flex items-center justify-between mb-0.5">
            <TrackInfo track={currentTrack} />

            {/* Audio Volume Slider on Desktop */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onToggleMute={handleToggleMute}
              />

              {/* Toggle Video Display */}
              <button
                onClick={() => setShowVideoPlayer((prev) => !prev)}
                title={showVideoPlayer ? "Hide Visualizer" : "Show Visualizer"}
                className={`p-1.5 rounded-full transition-colors ${
                  showVideoPlayer ? "bg-amber-500/20 text-amber-300" : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-11-7v4l5-2-5-2z" />
                </svg>
              </button>

              {/* Station Drawer Modal Trigger */}
              <button
                onClick={onOpenPlaylistDrawer}
                title="Select Playlist / Tracks"
                className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Seek Bar */}
          <ProgressBar
            currentTime={currentTime}
            duration={duration || currentTrack.duration || 180}
            onSeek={handleSeek}
          />

          {/* Elapsed / Duration */}
          <div className="flex justify-between items-center text-[10.5px] tabular-nums text-white/60 font-medium px-0.5 -mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || currentTrack.duration || 0)}</span>
          </div>
        </div>

        {/* Right: Transport Controls */}
        <div className="flex items-center gap-2 shrink-0 border-l border-white/10 pl-3">
          <TransportControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE PLAYER (sm:hidden) — Compact Scaled-Down Glass Card */}
      {/* ======================================================== */}
      <div className="sm:hidden w-full glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2 select-none shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]">
        {/* Row 1: Scaled Vinyl + Title & Artist */}
        <div className="flex items-center gap-2.5">
          <VinylDisc
            size="sm"
            isPlaying={isPlaying}
            coverUrl={coverUrl}
            trackTitle={currentTrack.title}
            onTapDisc={togglePlay}
          />
          <div className="flex-1 min-w-0">
            <TrackInfo track={currentTrack} />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-medium text-amber-400/90 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {currentPlaylist.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile Song List Button */}
            <button
              onClick={onOpenPlaylistDrawer}
              title="Open song list"
              className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] font-mono text-amber-300 flex items-center gap-1 active:scale-95 transition-all shadow-sm"
              aria-label="Open song list drawer"
            >
              <span>♫</span>
              <span>{currentPlaylist.tracks.length}</span>
            </button>

            {/* Mobile Visualizer Toggle */}
            <button
              onClick={() => setShowVideoPlayer((p) => !p)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle live video screen"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-11-7v4l5-2-5-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Row 2: Full-width Seek Bar */}
        <div className="w-full">
          <ProgressBar
            currentTime={currentTime}
            duration={duration || currentTrack.duration || 180}
            onSeek={handleSeek}
          />
        </div>

        {/* Row 3: Elapsed/duration on left, Transport centred, Audio control */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="text-[9.5px] tabular-nums text-white/70 font-mono font-medium shrink-0">
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/40">/</span>
            <span>{formatTime(duration || currentTrack.duration || 0)}</span>
          </div>

          <div className="flex-1 flex justify-center">
            <TransportControls
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>

          {/* Audio Volume Control on Mobile */}
          <div className="shrink-0">
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={handleVolumeChange}
              onToggleMute={handleToggleMute}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
