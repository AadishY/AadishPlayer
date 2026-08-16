export interface Track {
  id: string;
  title: string;
  artist: string;
  film?: string;
  year?: number;
  duration: number; // in seconds
  videoId: string;
}

export interface Playlist {
  id: string;
  name: string;
  tagline: string;
  themeBackground: string;
  cassetteColor: string; // Theme color for cassette deck
  cassetteLabel: string;
  youtubeUrl: string;
  tracks: Track[];
}

// Midnight playlist: ONLY spiderman 1 and 2
export const MIDNIGHT_BACKGROUNDS = [
  { id: "spider", name: "Cyberpunk Neon Skyline", file: "/bg/spider.webp", mood: "High Energy & Phonk" },
  { id: "spider2", name: "Neon City Dusk", file: "/bg/spider2.webp", mood: "Synthwave Horizon" },
];

// All other playlists: other backgrounds with 4x increased probability for House background
export const OTHER_BACKGROUNDS = [
  { id: "house", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "house-fav-1", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "house-fav-2", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "house-fav-3", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "console", name: "90s Retro Room & PS1", file: "/bg/console.webp", mood: "90s Nostalgia & Gaming" },
  { id: "music-box", name: "Vintage Cassette at Twilight", file: "/bg/music-box.webp", mood: "Midnight Jazz" },
  { id: "music-player", name: "Studio Flatbed Deck", file: "/bg/music-player.webp", mood: "Indie Pop & Sunshine" },
  { id: "music-player2", name: "Study Desk & Books", file: "/bg/music-player2.webp", mood: "Lo-Fi Study Beats" },
  { id: "study", name: "Late-Night Study Lamp", file: "/bg/study.webp", mood: "Deep Focus & Cassettes" },
  { id: "table", name: "Sunlit Morning Balcony", file: "/bg/table.webp", mood: "Morning Acoustic & Coffee" },
];

export const BACKGROUND_SCENES = [
  ...MIDNIGHT_BACKGROUNDS,
  { id: "house", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "console", name: "90s Retro Room & PS1", file: "/bg/console.webp", mood: "90s Nostalgia & Gaming" },
  { id: "music-box", name: "Vintage Cassette at Twilight", file: "/bg/music-box.webp", mood: "Midnight Jazz" },
  { id: "music-player", name: "Studio Flatbed Deck", file: "/bg/music-player.webp", mood: "Indie Pop & Sunshine" },
  { id: "music-player2", name: "Study Desk & Books", file: "/bg/music-player2.webp", mood: "Lo-Fi Study Beats" },
  { id: "study", name: "Late-Night Study Lamp", file: "/bg/study.webp", mood: "Deep Focus & Cassettes" },
  { id: "table", name: "Sunlit Morning Balcony", file: "/bg/table.webp", mood: "Morning Acoustic & Coffee" },
];

export function getBackgroundsForPlaylist(playlistId: string) {
  if (playlistId === "nostalgia-mix") {
    return MIDNIGHT_BACKGROUNDS;
  }
  return OTHER_BACKGROUNDS;
}

export const PLAYLISTS: Playlist[] = [
  {
    id: "nostalgia-mix",
    name: "NotIndian",
    tagline: "Late night nostalgia, anime loops & mellow beats",
    themeBackground: "/bg/spider.webp",
    cassetteColor: "from-amber-600 to-amber-900",
    cassetteLabel: "SIDE A • NOTINDIAN LO-FI",
    youtubeUrl: "https://www.youtube.com/watch?v=9XHrWGJtO1A&list=RD9XHrWGJtO1A",
    tracks: [
      { id: "rev-1", title: "Misery. (Best Part Sped Up)", artist: "pupsies", film: "Subaru Natsuki", year: 2024, duration: 133, videoId: "9XHrWGJtO1A" },
      { id: "rev-2", title: "Sunflower", artist: "Post Malone & Swae Lee", film: "Into the Spider-Verse", year: 2018, duration: 159, videoId: "Dghmoi7XZmc" },
      { id: "rev-3", title: "After Dark", artist: "Mr.Kitty", film: "Time", year: 2014, duration: 259, videoId: "waAlgFq9Xq8" },
      { id: "rev-4", title: "Gilded Lily", artist: "Cults", film: "Static", year: 2013, duration: 178, videoId: "c3dG5nB2RZs" },
      { id: "rev-5", title: "Romantic Homicide", artist: "d4vd", film: "Petals to Thorns", year: 2022, duration: 132, videoId: "T3_j0X3zHwE" },
      { id: "rev-6", title: "Past Lives", artist: "sapientdream & BØRNS", film: "Dopamine", year: 2020, duration: 153, videoId: "1e9iO2Yc_nU" },
    ],
  },
  {
    id: "indian-nostalgia",
    name: "Indian Saloon",
    tagline: "Unforgettable 2000s monsoon melodies & road trips",
    themeBackground: "/bg/House.webp",
    cassetteColor: "from-rose-700 to-amber-800",
    cassetteLabel: "SIDE B • INDIAN SALOON",
    youtubeUrl: "https://www.youtube.com/watch?v=fSS_R91Nimw&list=RDfSS_R91Nimw",
    tracks: [
      { id: "ind-1", title: "Iktara", artist: "Kavita Seth & Amit Trivedi", film: "Wake Up Sid", year: 2009, duration: 254, videoId: "fSS_R91Nimw" },
      { id: "ind-2", title: "Tum Se Hi", artist: "Mohit Chauhan & Pritam", film: "Jab We Met", year: 2007, duration: 323, videoId: "mt9xg0mmt28" },
      { id: "ind-3", title: "Phir Se Ud Chala", artist: "Mohit Chauhan & A.R. Rahman", film: "Rockstar", year: 2011, duration: 271, videoId: "2mWaqank5EI" },
      { id: "ind-4", title: "Kya Mujhe Pyar Hai", artist: "KK & Pritam", film: "Woh Lamhe", year: 2006, duration: 278, videoId: "t-GtmB1z2_8" },
      { id: "ind-5", title: "Kahin To Hogi Woh", artist: "Rashid Ali & Vasundhara Das", film: "Jaane Tu Ya Jaane Na", year: 2008, duration: 305, videoId: "iW2y1aXpB-0" },
      { id: "ind-6", title: "Zara Zara", artist: "Bombay Jayashri & Harris Jayaraj", film: "RHTDM", year: 2001, duration: 300, videoId: "b4Wq0cWJ2G8" },
    ],
  },
  {
    id: "retro-chill",
    name: "Chatpate Gaane",
    tagline: "Cassette vibes, warm study lamps & vintage synth",
    themeBackground: "/bg/console.webp",
    cassetteColor: "from-indigo-800 to-slate-900",
    cassetteLabel: "SIDE C • CHATPATE GAANE",
    youtubeUrl: "https://www.youtube.com/watch?v=8GW6sLrK40k&list=RD8GW6sLrK40k",
    tracks: [
      { id: "ret-1", title: "Resonance", artist: "HOME", film: "Odyssey", year: 2014, duration: 212, videoId: "8GW6sLrK40k" },
      { id: "ret-2", title: "Space Song", artist: "Beach House", film: "Depression Cherry", year: 2015, duration: 320, videoId: "RBtlPT23PTM" },
      { id: "ret-3", title: "Chamber of Reflection", artist: "Mac DeMarco", film: "Salad Days", year: 2014, duration: 231, videoId: "NY8IS0ss-zk" },
      { id: "ret-4", title: "Ylang Ylang", artist: "FKJ", film: "Ylang Ylang EP", year: 2019, duration: 208, videoId: "kXms4k_1c-E" },
      { id: "ret-5", title: "5:32 PM", artist: "The Deli", film: "Vibes 2", year: 2016, duration: 138, videoId: "FjHGZj2IjBk" },
    ],
  },
];
