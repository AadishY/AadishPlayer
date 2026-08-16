"use client";

import { useState, useEffect } from "react";
import { PLAYLISTS, Playlist, getBackgroundsForPlaylist, Track } from "@/data/playlists";
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

  // Client-side mount: pick random background from allowed pool & preload all images
  useEffect(() => {
    const pool = getBackgroundsForPlaylist(PLAYLISTS[0].id);
    const rand = Math.floor(Math.random() * pool.length);
    if (pool[rand]?.file) {
      setActiveBg(pool[rand].file);
    }

    // Preload all 11 unique background scenes for 0ms instant switching
    const allBgs = [
      "/bg/spider.webp",
      "/bg/spider2.webp",
      "/bg/console.webp",
      "/bg/music-box.webp",
      "/bg/House.webp",
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

  // Manual Random Background Button Click (100% guarantee never repeating current activeBg)
  const handleRandomBg = () => {
    const pool = getBackgroundsForPlaylist(currentPlaylist.id);
    const available = pool.filter((s) => s.file !== activeBg);
    const candidateList = available.length > 0 ? available : pool;
    const randomIndex = Math.floor(Math.random() * candidateList.length);
    const chosen = candidateList[randomIndex];
    setActiveBg(chosen.file);
    showToast(`Scene: ${chosen.name}`);
  };

  const handleSelectScene = (sceneFile: string) => {
    setActiveBg(sceneFile);
  };

  // Playlist Change: 100% guarantee changing to a different random background without repeating activeBg
  const handlePlaylistChange = (playlist: Playlist) => {
    if (playlist.id === currentPlaylist.id) return;
    setCurrentPlaylist(playlist);
    setSelectedTrackIndex(null);
    const pool = getBackgroundsForPlaylist(playlist.id);
    const available = pool.filter((b) => b.file !== activeBg);
    const candidateList = available.length > 0 ? available : pool;
    const rand = Math.floor(Math.random() * candidateList.length);
    const newBg = candidateList[rand]?.file || playlist.themeBackground;
    setActiveBg(newBg);
    showToast(`Tape Inserted: ${playlist.name}`);
  };

  // Direct track selection from Drawer or Cassette
  const handleSelectTrack = (playlist: Playlist, trackIndex: number) => {
    if (playlist.id !== currentPlaylist.id) {
      setCurrentPlaylist(playlist);
      const pool = getBackgroundsForPlaylist(playlist.id);
      const available = pool.filter((b) => b.file !== activeBg);
      const candidateList = available.length > 0 ? available : pool;
      const rand = Math.floor(Math.random() * candidateList.length);
      setActiveBg(candidateList[rand]?.file || playlist.themeBackground);
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

      {/* Top Bar (Lucknow Clock, GitHub & YouTube Playlist Button) */}
      <TopBar currentPlaylist={currentPlaylist} />

      {/* Leftmost Border-Docked Vertical Controls (Rotated 90° Scene & Fullscreen) */}
      <LeftControls onRandomBg={handleRandomBg} />

      {/* Rightmost Border-Docked Vertical Cassette / DVD Rack (Desktop) */}
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

      {/* Upper Layer: Massive Cinematic Typography (Positioned higher upward with safe sidebar margin) */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 sm:pt-12 md:pt-14 pb-0 z-10 px-4">
        <NostalgicTitle activeBg={activeBg} />
      </div>

      {/* Bottom Area: Centerpiece Vinyl Player + Mobile Cassette Bay */}
      <div className="w-full flex flex-col items-center justify-end gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] px-[max(1rem,env(safe-area-inset-left))] z-30">
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

        {/* Mobile Cassette Deck Bay (docked beneath player on mobile screens) */}
        <div className="md:hidden w-full max-w-xl">
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
