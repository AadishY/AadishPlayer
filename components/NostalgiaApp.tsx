"use client";

import { useState, useEffect } from "react";
import { PLAYLISTS, Playlist, getBackgroundsForPlaylist, getWeightedBackground, Track } from "@/data/playlists";
import Player from "@/components/Player";
import TopBar from "@/components/TopBar";
import LeftControls from "@/components/LeftControls";
import PlaylistDrawer from "@/components/PlaylistDrawer";
import CassetteRack from "@/components/CassetteDeck";
import NostalgicTitle from "@/components/NostalgicTitle";

export default function NostalgiaApp() {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>(PLAYLISTS[0]);
  // Deterministic SSR default; randomized on client mount
  const [activeBg, setActiveBg] = useState<string>(PLAYLISTS[0].themeBackground || "/bg/spider.webp");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Track>(PLAYLISTS[0].tracks[0]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dullOpacity, setDullOpacity] = useState<number>(15);
  const [forceShowAll, setForceShowAll] = useState<boolean>(true);
  const [isPlayerNear, setIsPlayerNear] = useState<boolean>(false);
  const [isDynamic, setIsDynamic] = useState<boolean>(true);
  const [showCenterTime, setShowCenterTime] = useState<boolean>(false);
  const [mobileHidden, setMobileHidden] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  // Screen size tracking
  useEffect(() => {
    const checkScreen = () => setIsMobileScreen(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen, { passive: true });
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Load saved user settings from localStorage on client mount
  useEffect(() => {
    try {
      const savedDull = localStorage.getItem("aadishplayer_dullness");
      if (savedDull !== null) {
        const parsed = Number(savedDull);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 90) {
          setDullOpacity(parsed);
        }
      }

      const savedDynamic = localStorage.getItem("aadishplayer_dynamic");
      if (savedDynamic !== null) {
        setIsDynamic(savedDynamic === "true");
      }

      const savedCenterTime = localStorage.getItem("aadishplayer_center_time");
      if (savedCenterTime !== null) {
        setShowCenterTime(savedCenterTime === "true");
      }
    } catch (e) {
      console.warn("Could not load saved settings:", e);
    }
  }, []);

  // Show all side buttons & full player scale for 10 seconds on site mount & on playlist change
  useEffect(() => {
    setForceShowAll(true);
    setMobileHidden(false);
    const timer = setTimeout(() => {
      setForceShowAll(false);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, [currentPlaylist.id]);

  // Robust Single-Channel Pointer Tap & Double-Tap Detector (Hides even if Dynamic is OFF)
  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null;
    let singleTapTimer: NodeJS.Timeout | null = null;
    let lastTapTimestamp = 0;

    const reset10sHideTimer = () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (isDynamic) {
        hideTimer = setTimeout(() => {
          setMobileHidden(true);
        }, 10000); // 10 seconds
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      // Don't intercept clicks on interactive controls
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("[role='button']")
      );

      if (isInteractive) {
        // Keep active when clicking interactive controls
        reset10sHideTimer();
        return;
      }

      const now = Date.now();
      const timeSinceLastTap = now - lastTapTimestamp;

      // Double-Tap Detected (< 350ms and > 40ms) -> Hides ALL controls immediately (even if Dynamic is OFF)
      if (timeSinceLastTap > 40 && timeSinceLastTap < 350) {
        lastTapTimestamp = 0;
        if (singleTapTimer) {
          clearTimeout(singleTapTimer);
          singleTapTimer = null;
        }
        if (hideTimer) clearTimeout(hideTimer);
        setMobileHidden((prev) => !prev);
      } else {
        // First tap: debounce to check if a second tap follows
        lastTapTimestamp = now;
        if (singleTapTimer) clearTimeout(singleTapTimer);
        singleTapTimer = setTimeout(() => {
          // Single tap confirmed: unhide all elements (TopBar, LeftControls, DVD, Player) & start 10s hide timer!
          setMobileHidden(false);
          reset10sHideTimer();
          singleTapTimer = null;
        }, 220);
      }
    };

    // Initialize
    setMobileHidden(false);
    reset10sHideTimer();

    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (singleTapTimer) clearTimeout(singleTapTimer);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDynamic, currentPlaylist.id]);

  // Automatic wallpaper changing interval: 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBg((prevBg) => getWeightedBackground(currentPlaylist.id, prevBg));
    }, 30000); // 30 seconds
    return () => clearInterval(timer);
  }, [currentPlaylist.id]);

  // High-performance RAF-throttled proximity detection for smooth 60fps scaling on PC
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) {
        setIsPlayerNear(true);
        return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsPlayerNear(e.clientY > window.innerHeight - 240);
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Client-side mount: pick random background from allowed pool & preload all images
  useEffect(() => {
    const chosenBg = getWeightedBackground(PLAYLISTS[0].id);
    setActiveBg(chosenBg);

    // Preload all background scenes for 0ms instant switching
    const allBgs = [
      "/bg/saloon.avif",
      "/bg/House.webp",
      "/bg/spider.webp",
      "/bg/spider2.webp",
      "/bg/console.webp",
      "/bg/music-box.webp",
      "/bg/music-player.webp",
      "/bg/music-player2.webp",
      "/bg/study.webp",
      "/bg/table.webp",
      "/bg/scene-wide.png",
      "/bg/scene-tall.png",
    ];
    allBgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDullOpacityChange = (val: number) => {
    setDullOpacity(val);
    try {
      localStorage.setItem("aadishplayer_dullness", String(val));
    } catch (e) {
      console.warn("Could not save dullness:", e);
    }
  };

  const handleToggleDynamic = () => {
    setIsDynamic((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aadishplayer_dynamic", String(next));
      } catch (e) {
        console.warn("Could not save dynamic setting:", e);
      }
      showToast(next ? "Dynamic Auto-Hide: ON" : "Dynamic Auto-Hide: OFF (Always Visible)");
      return next;
    });
  };

  const handleToggleCenterTime = () => {
    setShowCenterTime((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aadishplayer_center_time", String(next));
      } catch (e) {
        console.warn("Could not save center time setting:", e);
      }
      showToast(next ? "Center Clock: ON" : "Center Clock: OFF");
      return next;
    });
  };

  // Manual Random Background Button Click with 48/48/4 probability distribution
  const handleRandomBg = () => {
    const nextBg = getWeightedBackground(currentPlaylist.id, activeBg);
    setActiveBg(nextBg);
    const pool = getBackgroundsForPlaylist(currentPlaylist.id);
    const sceneInfo = pool.find((s) => s.file === nextBg);
    showToast(`Scene: ${sceneInfo?.name || "Retro Scene"}`);
  };

  const handleSelectScene = (sceneFile: string) => {
    setActiveBg(sceneFile);
  };

  // Playlist Change with weighted background selection (48% Saloon, 48% House, 4% others for Indian Saloon)
  const handlePlaylistChange = (playlist: Playlist) => {
    if (playlist.id === currentPlaylist.id) return;
    setCurrentPlaylist(playlist);
    setSelectedTrackIndex(null);
    const newBg = getWeightedBackground(playlist.id, activeBg);
    setActiveBg(newBg);
    showToast(`Tape Inserted: ${playlist.name}`);
  };

  // Direct track selection from Drawer or Cassette
  const handleSelectTrack = (playlist: Playlist, trackIndex: number) => {
    if (playlist.id !== currentPlaylist.id) {
      setCurrentPlaylist(playlist);
      const newBg = getWeightedBackground(playlist.id, activeBg);
      setActiveBg(newBg);
    }
    setSelectedTrackIndex(trackIndex);
    const track = playlist.tracks[trackIndex];
    if (track) {
      showToast(`Playing: ${track.title}`);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = currentPlaylist.tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    setSelectedTrackIndex(nextIndex);
  };

  const handlePrevTrack = () => {
    const currentIndex = currentPlaylist.tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length;
    setSelectedTrackIndex(prevIndex);
  };

  // Visibility logic:
  // When mobileHidden is true (double-clicked/timed-out), ALL components hide/scale down immediately!
  // When mobileHidden is false (single-tapped), ALL components show at full visibility!
  const isControlsVisible = !mobileHidden && (!isDynamic || forceShowAll || isMobileScreen);
  const isPlayerExpanded = !mobileHidden && (!isDynamic || forceShowAll || isPlayerNear || isMobileScreen);

  return (
    <>
      {/* Dynamic Background Scene Layer (-z-20) with smooth 1000ms transition */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center transition-all duration-1000 ease-in-out pointer-events-none transform-gpu will-change-[background-image]"
        style={{ backgroundImage: `url('${activeBg}')` }}
      />

      {/* Dull Mode Black Dimming Overlay (-z-15) */}
      <div
        className="fixed inset-0 -z-15 bg-black transition-opacity duration-300 pointer-events-none transform-gpu will-change-[opacity]"
        style={{ opacity: dullOpacity / 100 }}
      />

      {/* Top Bar (Lucknow Clock, Dull Mode, GitHub & YouTube Playlist Button) */}
      <TopBar
        currentPlaylist={currentPlaylist}
        dullOpacity={dullOpacity}
        onDullOpacityChange={handleDullOpacityChange}
        forceShow={isControlsVisible}
        showCenterTime={showCenterTime}
      />

      {/* Leftmost Border-Docked Vertical Controls (Dynamic ON/OFF, Scene, Fullscreen & Time) */}
      <LeftControls
        onRandomBg={handleRandomBg}
        forceShow={isControlsVisible}
        isDynamic={isDynamic}
        onToggleDynamic={handleToggleDynamic}
        showCenterTime={showCenterTime}
        onToggleCenterTime={handleToggleCenterTime}
      />

      {/* Upper Layer: Massive Cinematic Typography with optional live Center Clock (PC Only) */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 sm:pt-10 md:pt-12 pb-0 z-10 px-4">
        <NostalgicTitle activeBg={activeBg} showCenterTime={showCenterTime} />
      </div>

      {/* Bottom Area: Centerpiece Vinyl Player + Mobile Cassette Bay (Stacked, ZERO Overlap) */}
      <div className="w-full flex flex-col items-center justify-end gap-2 pb-[max(1rem,env(safe-area-inset-bottom))] px-[max(0.75rem,env(safe-area-inset-left))] z-30">
        {/* Main Centerpiece Vinyl Player (Classic Smooth Scale Down to 78% on idle) */}
        <div
          onMouseEnter={() => setIsPlayerNear(true)}
          className={`w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom will-change-[transform,opacity] transform-gpu ${
            isPlayerExpanded
              ? "scale-100 opacity-100 translate-y-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "scale-[0.78] md:scale-[0.76] opacity-60 md:opacity-60 md:hover:scale-100 md:hover:opacity-100"
          }`}
        >
          <Player
            currentPlaylist={currentPlaylist}
            selectedTrackIndex={selectedTrackIndex}
            onPlaylistChange={handlePlaylistChange}
            onOpenPlaylistDrawer={() => setIsDrawerOpen(true)}
            onRandomBg={handleRandomBg}
            onPlayStateChange={setIsPlaying}
            onCurrentTrackChange={setCurrentTrack}
          />
        </div>

        {/* Cassette Rack (Desktop: Fixed Right Edge Viewport Dock | Mobile: Vertically Stacked Below Player) */}
        <CassetteRack
          currentPlaylist={currentPlaylist}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectPlaylist={handlePlaylistChange}
          onSelectTrack={handleSelectTrack}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onOpenPlaylistDrawer={() => setIsDrawerOpen(true)}
          forceShow={isControlsVisible}
        />
      </div>

      {/* Playlist / Song / Scene Drawer Modal */}
      <PlaylistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentPlaylist={currentPlaylist}
        currentTrack={currentTrack}
        onSelectPlaylist={handlePlaylistChange}
        onSelectTrack={handleSelectTrack}
        onSelectScene={handleSelectScene}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-28 z-50 left-1/2 -translate-x-1/2 glass-badge px-4 py-2 rounded-full text-xs font-semibold text-amber-300 shadow-2xl border border-amber-400/40 animate-bounce pointer-events-none">
          {toastMessage}
        </div>
      )}
    </>
  );
}
