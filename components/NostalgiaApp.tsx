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
  const [dullOpacity, setDullOpacity] = useState<number>(0);

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

  return (
    <>
      {/* Dynamic Background Scene Layer (-z-20) with smooth 1000ms transition */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center transition-all duration-1000 ease-in-out pointer-events-none"
        style={{ backgroundImage: `url('${activeBg}')` }}
      />

      {/* Dull Mode Black Dimming Overlay (-z-15) */}
      <div
        className="fixed inset-0 -z-15 bg-black transition-opacity duration-300 pointer-events-none"
        style={{ opacity: dullOpacity / 100 }}
      />

      {/* Top Bar (Lucknow Clock, Dull Mode, GitHub & YouTube Playlist Button) */}
      <TopBar
        currentPlaylist={currentPlaylist}
        dullOpacity={dullOpacity}
        onDullOpacityChange={setDullOpacity}
      />

      {/* Leftmost Border-Docked Vertical Controls (Rotated 90° Scene & Fullscreen) */}
      <LeftControls onRandomBg={handleRandomBg} />

      {/* Upper Layer: Massive Cinematic Typography */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 sm:pt-12 md:pt-14 pb-0 z-10 px-4">
        <NostalgicTitle activeBg={activeBg} />
      </div>

      {/* Bottom Area: Centerpiece Vinyl Player + Mobile Cassette Bay */}
      <div className="w-full flex flex-col items-center justify-end gap-2.5 pb-[max(1.25rem,env(safe-area-inset-bottom))] px-[max(0.75rem,env(safe-area-inset-left))] z-30">
        {/* Main Centerpiece Vinyl Player */}
        <div className="w-full max-w-xl">
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

        {/* Cassette Rack (Desktop: Fixed Right Border Dock | Mobile: Clean Bottom Station Bay) */}
        <div className="w-full max-w-xl">
          <CassetteRack
            currentPlaylist={currentPlaylist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onSelectPlaylist={handlePlaylistChange}
            onSelectTrack={handleSelectTrack}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
            onOpenPlaylistDrawer={() => setIsDrawerOpen(true)}
          />
        </div>
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
