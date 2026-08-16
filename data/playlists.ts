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

// NotIndian playlist: ONLY spiderman 1 and 2
export const MIDNIGHT_BACKGROUNDS = [
  { id: "spider", name: "Cyberpunk Neon Skyline", file: "/bg/spider.webp", mood: "High Energy & Phonk" },
  { id: "spider2", name: "Neon City Dusk", file: "/bg/spider2.webp", mood: "Synthwave Horizon" },
];

// All background scenes
export const ALL_OTHER_BACKGROUNDS = [
  { id: "saloon", name: "Vintage Indian Saloon", file: "/bg/saloon.avif", mood: "Classic Barber & Retro Radio" },
  { id: "house", name: "Urban Street Stall DJ", file: "/bg/House.webp", mood: "Vinyl Hub & Culture" },
  { id: "console", name: "90s Retro Room & PS1", file: "/bg/console.webp", mood: "90s Nostalgia & Gaming" },
  { id: "music-box", name: "Vintage Cassette at Twilight", file: "/bg/music-box.webp", mood: "Midnight Jazz" },
  { id: "music-player", name: "Studio Flatbed Deck", file: "/bg/music-player.webp", mood: "Indie Pop & Sunshine" },
  { id: "music-player2", name: "Study Desk & Books", file: "/bg/music-player2.webp", mood: "Lo-Fi Study Beats" },
  { id: "study", name: "Late-Night Study Lamp", file: "/bg/study.webp", mood: "Deep Focus & Cassettes" },
  { id: "table", name: "Sunlit Morning Balcony", file: "/bg/table.webp", mood: "Morning Acoustic & Coffee" },
];

export const BACKGROUND_SCENES = [
  ...MIDNIGHT_BACKGROUNDS,
  ...ALL_OTHER_BACKGROUNDS,
];

export function getBackgroundsForPlaylist(playlistId: string) {
  if (playlistId === "nostalgia-mix") {
    return MIDNIGHT_BACKGROUNDS;
  }
  return ALL_OTHER_BACKGROUNDS;
}

// 48% saloon, 48% House, 4% rest for Indian Saloon playlist
export function getWeightedBackground(playlistId: string, currentBg?: string): string {
  if (playlistId === "nostalgia-mix") {
    const pool = MIDNIGHT_BACKGROUNDS.filter((b) => b.file !== currentBg);
    const candidateList = pool.length > 0 ? pool : MIDNIGHT_BACKGROUNDS;
    const rand = Math.floor(Math.random() * candidateList.length);
    return candidateList[rand]?.file || "/bg/spider.webp";
  }

  if (playlistId === "indian-nostalgia") {
    const roll = Math.random() * 100;
    if (roll < 48) {
      if (currentBg !== "/bg/saloon.avif") return "/bg/saloon.avif";
      return "/bg/House.webp";
    } else if (roll < 96) {
      if (currentBg !== "/bg/House.webp") return "/bg/House.webp";
      return "/bg/saloon.avif";
    } else {
      const rest = [
        "/bg/music-box.webp",
        "/bg/console.webp",
        "/bg/music-player.webp",
        "/bg/music-player2.webp",
        "/bg/study.webp",
        "/bg/table.webp",
      ].filter((f) => f !== currentBg);
      return rest[Math.floor(Math.random() * rest.length)] || "/bg/music-box.webp";
    }
  }

  // Chatpate Gaane & other playlists
  const pool = ALL_OTHER_BACKGROUNDS.filter((b) => b.file !== currentBg);
  const candidateList = pool.length > 0 ? pool : ALL_OTHER_BACKGROUNDS;
  const rand = Math.floor(Math.random() * candidateList.length);
  return candidateList[rand]?.file || "/bg/console.webp";
}

export const PLAYLISTS: Playlist[] = [
  {
    id: "nostalgia-mix",
    name: "NotIndian",
    tagline: "Late night nostalgia, anime loops & mellow beats",
    themeBackground: "/bg/spider.webp",
    cassetteColor: "from-amber-600 to-amber-900",
    cassetteLabel: "SIDE A • NOTINDIAN LO-FI",
    youtubeUrl: "https://music.youtube.com/playlist?list=PLSjBl_-2kaPU",
    tracks: [
      {
        id: "notind-1",
        title: "Misery. (Best Part Sped Up)",
        artist: "pupsies",
        film: "Subaru Natsuki",
        year: 2024,
        duration: 133,
        videoId: "9XHrWGJtO1A",
      },
      {
        id: "notind-2",
        title: "Sunflower",
        artist: "Post Malone & Swae Lee",
        film: "Spider-Man: Into the Spider-Verse",
        year: 2018,
        duration: 159,
        videoId: "Dghmoi7XZmc",
      },
    ],
  },
  {
    id: "indian-nostalgia",
    name: "Indian Saloon",
    tagline: "Unforgettable 2000s monsoon melodies & road trips",
    themeBackground: "/bg/saloon.avif",
    cassetteColor: "from-rose-700 to-amber-800",
    cassetteLabel: "SIDE B • INDIAN SALOON",
    youtubeUrl: "https://www.youtube.com/watch?v=fSS_R91Nimw&list=RDfSS_R91Nimw",
    tracks: [
      {
        id: "ind-1",
        title: "Iktara",
        artist: "Kavita Seth & Amit Trivedi",
        film: "Wake Up Sid",
        year: 2009,
        duration: 254,
        videoId: "fSS_R91Nimw",
      },
      {
        id: "ind-2",
        title: "Tum Se Hi",
        artist: "Mohit Chauhan & Pritam",
        film: "Jab We Met",
        year: 2007,
        duration: 323,
        videoId: "mt9xg0mmt28",
      },
      {
        id: "ind-3",
        title: "Phir Se Ud Chala",
        artist: "Mohit Chauhan & A.R. Rahman",
        film: "Rockstar",
        year: 2011,
        duration: 271,
        videoId: "2mWaqank5EI",
      },
      {
        id: "ind-4",
        title: "Kya Mujhe Pyar Hai",
        artist: "KK & Pritam",
        film: "Woh Lamhe",
        year: 2006,
        duration: 278,
        videoId: "t-GtmB1z2_8",
      },
      {
        id: "ind-5",
        title: "Kahin To Hogi Woh",
        artist: "Rashid Ali & Vasundhara Das",
        film: "Jaane Tu Ya Jaane Na",
        year: 2008,
        duration: 305,
        videoId: "iW2y1aXpB-0",
      },
      {
        id: "ind-6",
        title: "Zara Zara",
        artist: "Bombay Jayashri & Harris Jayaraj",
        film: "RHTDM",
        year: 2001,
        duration: 300,
        videoId: "b4Wq0cWJ2G8",
      },
      {
        id: "ind-7",
        title: "Pee Loon",
        artist: "Mohit Chauhan & Pritam",
        film: "Once Upon A Time In Mumbaai",
        year: 2010,
        duration: 287,
        videoId: "39A_1Pcrq9A",
      },
      {
        id: "ind-8",
        title: "Tune Jo Na Kaha",
        artist: "Mohit Chauhan & Pritam",
        film: "New York",
        year: 2009,
        duration: 310,
        videoId: "v_wL6e3jI_4",
      },
      {
        id: "ind-9",
        title: "Dil Diyan Gallan",
        artist: "Atif Aslam & Vishal-Shekhar",
        film: "Tiger Zinda Hai",
        year: 2017,
        duration: 260,
        videoId: "mevO4I0f5lg",
      },
      {
        id: "ind-10",
        title: "Beete Lamhein",
        artist: "KK & Mithoon",
        film: "The Train",
        year: 2007,
        duration: 318,
        videoId: "b8rY-t5c0mU",
      },
      {
        id: "ind-11",
        title: "Tujhe Bhula Diya",
        artist: "Mohit Chauhan, Shekhar & Shruti Pathak",
        film: "Anjaana Anjaani",
        year: 2010,
        duration: 280,
        videoId: "p1Zt47VWTtg",
      },
      {
        id: "ind-12",
        title: "Maahi",
        artist: "Toshi Sabri",
        film: "Raaz: The Mystery Continues",
        year: 2009,
        duration: 270,
        videoId: "r9n9rW_hW8w",
      },
      {
        id: "ind-13",
        title: "Aadat",
        artist: "Atif Aslam & Jal",
        film: "Kalyug",
        year: 2005,
        duration: 334,
        videoId: "JpUjV_9663Y",
      },
      {
        id: "ind-14",
        title: "Subhanallah",
        artist: "Sreerama Chandra & Shilpa Rao",
        film: "Yeh Jawaani Hai Deewani",
        year: 2013,
        duration: 249,
        videoId: "w_Q8b9zWqDk",
      },
      {
        id: "ind-15",
        title: "Labon Ko",
        artist: "KK & Pritam",
        film: "Bhool Bhulaiyaa",
        year: 2007,
        duration: 343,
        videoId: "l1V8iQ2z9jA",
      },
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
      {
        id: "ret-1",
        title: "Resonance",
        artist: "HOME",
        film: "Odyssey",
        year: 2014,
        duration: 212,
        videoId: "8GW6sLrK40k",
      },
      {
        id: "ret-2",
        title: "Space Song",
        artist: "Beach House",
        film: "Depression Cherry",
        year: 2015,
        duration: 320,
        videoId: "RBtlPT23PTM",
      },
      {
        id: "ret-3",
        title: "Chamber of Reflection",
        artist: "Mac DeMarco",
        film: "Salad Days",
        year: 2014,
        duration: 231,
        videoId: "NY8IS0ss-zk",
      },
      {
        id: "ret-4",
        title: "Ylang Ylang",
        artist: "FKJ",
        film: "Ylang Ylang EP",
        year: 2019,
        duration: 208,
        videoId: "kXms4k_1c-E",
      },
      {
        id: "ret-5",
        title: "5:32 PM",
        artist: "The Deli",
        film: "Vibes 2",
        year: 2016,
        duration: 138,
        videoId: "FjHGZj2IjBk",
      },
    ],
  },
];
