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

  // Chatpate Gaane: Very low probability for Saloon & House (3% each), 94% distributed across console, music-box, study, etc.
  if (playlistId === "chatpate-gaane" || playlistId === "retro-chill") {
    const roll = Math.random() * 100;
    if (roll < 3) {
      return "/bg/saloon.avif";
    } else if (roll < 6) {
      return "/bg/House.webp";
    } else {
      const partyScenes = [
        "/bg/console.webp",
        "/bg/music-box.webp",
        "/bg/music-player.webp",
        "/bg/music-player2.webp",
        "/bg/study.webp",
        "/bg/table.webp",
      ].filter((f) => f !== currentBg);
      const rand = Math.floor(Math.random() * partyScenes.length);
      return partyScenes[rand] || "/bg/console.webp";
    }
  }

  // Gaming Playlist: High focus on retro console, cyberpunk skylines & study lamp
  if (playlistId === "gaming") {
    const gameScenes = [
      "/bg/console.webp",
      "/bg/spider.webp",
      "/bg/spider2.webp",
      "/bg/study.webp",
      "/bg/music-player.webp",
      "/bg/music-box.webp",
    ].filter((f) => f !== currentBg);
    const rand = Math.floor(Math.random() * gameScenes.length);
    return gameScenes[rand] || "/bg/console.webp";
  }

  // Fallback for any other playlists
  const pool = ALL_OTHER_BACKGROUNDS.filter((b) => b.file !== currentBg);
  const candidateList = pool.length > 0 ? pool : ALL_OTHER_BACKGROUNDS;
  const rand = Math.floor(Math.random() * candidateList.length);
  return candidateList[rand]?.file || "/bg/console.webp";
}

export const PLAYLISTS: Playlist[] = [
  {
    id: "nostalgia-mix",
    name: "NotIndian",
    tagline: "9 late night anime loops, sped up & lo-fi beats",
    themeBackground: "/bg/spider.webp",
    cassetteColor: "from-amber-600 to-amber-900",
    cassetteLabel: "SIDE A • NOTINDIAN (9 HITS)",
    youtubeUrl: "https://open.spotify.com/playlist/6rxCjM9lJPAXpoRO5872bw",
    tracks: [
      { id: "notind-1", title: "Misery. (Best Part Sped Up)", artist: "pupsies", film: "Subaru Natsuki", year: 2024, duration: 133, videoId: "9XHrWGJtO1A" },
      { id: "notind-2", title: "Sunflower", artist: "Post Malone & Swae Lee", film: "Spider-Man: Into the Spider-Verse", year: 2018, duration: 158, videoId: "ApXoWvfEYVU" },
      { id: "notind-3", title: "Discord x My Ordinary Life (Slowed + Reverb)", artist: "The Living Tombstone", film: "Spiderman Edit", year: 2022, duration: 212, videoId: "XAHztHeaAfU" },
      { id: "notind-4", title: "MONTAGEM SANTA FE 2 (Super Slowed & Reverb)", artist: "QARAQSHY", film: "TikTok Drift", year: 2023, duration: 145, videoId: "okOyX4zmjOU" },
      { id: "notind-5", title: "birds for some reason", artist: "Avocado Animations", film: "Meme Edit", year: 2023, duration: 120, videoId: "bp4_7T9J6Fg" },
      { id: "notind-6", title: "Bayle the Dread (4K Edit)", artist: "Universal Clipz", film: "Elden Ring", year: 2024, duration: 130, videoId: "hQE7IxvnGQU" },
      { id: "notind-7", title: "CURSE YOU BAYLE (Edit 4K)", artist: "Maidenless", film: "Elden Ring", year: 2024, duration: 125, videoId: "ZiN2MmUBw0w" },
      { id: "notind-8", title: "Young Girl A (少女A)", artist: "siinamota (椎名もた)", film: "Anime Classic", year: 2013, duration: 198, videoId: "AqI97zHMoQw" },
      { id: "notind-9", title: "Babydoll", artist: "Dominic Fike", film: "Sunburn", year: 2023, duration: 104, videoId: "pTmwTQrY3Ts" },
    ],
  },
  {
    id: "indian-nostalgia",
    name: "Indian Saloon",
    tagline: "50 unforgettable 2000s monsoon melodies & road trips",
    themeBackground: "/bg/saloon.avif",
    cassetteColor: "from-rose-700 to-amber-800",
    cassetteLabel: "SIDE B • INDIAN SALOON (50 HITS)",
    youtubeUrl: "https://www.youtube.com/watch?v=fSS_R91Nimw&list=RDfSS_R91Nimw",
    tracks: [
      { id: "ind-1", title: "Iktara", artist: "Kavita Seth & Amit Trivedi", film: "Wake Up Sid", year: 2009, duration: 254, videoId: "fSS_R91Nimw" },
      { id: "ind-2", title: "Tum Se Hi", artist: "Mohit Chauhan & Pritam", film: "Jab We Met", year: 2007, duration: 323, videoId: "mt9xg0mmt28" },
      { id: "ind-3", title: "Phir Se Ud Chala", artist: "Mohit Chauhan & A.R. Rahman", film: "Rockstar", year: 2011, duration: 271, videoId: "2mWaqsC3U7k" },
      { id: "ind-4", title: "Kya Mujhe Pyar Hai", artist: "KK & Pritam", film: "Woh Lamhe", year: 2006, duration: 279, videoId: "bOmsz8L4wVs" },
      { id: "ind-5", title: "Zara Zara", artist: "Bombay Jayashri & Harris Jayaraj", film: "Rehnaa Hai Terre Dil Mein", year: 2001, duration: 302, videoId: "3vV85Jk1h5c" },
      { id: "ind-6", title: "Pee Loon", artist: "Mohit Chauhan & Pritam", film: "Once Upon a Time in Mumbaai", year: 2010, duration: 288, videoId: "M0_LgqQhQxE" },
      { id: "ind-7", title: "Aadat", artist: "Atif Aslam & Jal", film: "Kalyug", year: 2005, duration: 268, videoId: "b3fC2Q5Fj1o" },
      { id: "ind-8", title: "Labon Ko", artist: "KK & Pritam", film: "Bhool Bhulaiyaa", year: 2007, duration: 343, videoId: "bE9G06gB_V4" },
      { id: "ind-9", title: "Tu Hi Meri Shab Hai", artist: "KK & Pritam", film: "Gangster", year: 2006, duration: 388, videoId: "HT-BGBbOD9I" },
      { id: "ind-10", title: "Woh Lamhe Woh Baatein", artist: "Atif Aslam & Mithoon", film: "Zeher", year: 2005, duration: 318, videoId: "4_8G4s_R_8Y" },
      { id: "ind-11", title: "Beete Lamhein", artist: "KK & Mithoon", film: "The Train", year: 2007, duration: 310, videoId: "l89WzZ9g7r8" },
      { id: "ind-12", title: "Javeda Zindagi (Tose Naina Laage)", artist: "Kshitij Tarey & Mithoon", film: "Anwar", year: 2007, duration: 342, videoId: "mN284jJ0J0Y" },
      { id: "ind-13", title: "Maahi", artist: "Toshi Sabri & Sharib Sabri", film: "Raaz: The Mystery Continues", year: 2009, duration: 269, videoId: "y6r2Q3H8-mE" },
      { id: "ind-14", title: "Soniyo", artist: "Sonu Nigam & Shreya Ghoshal", film: "Raaz: The Mystery Continues", year: 2009, duration: 311, videoId: "Qp4-o4gH6Y4" },
      { id: "ind-15", title: "Khuda Jaane", artist: "KK & Shilpa Rao", film: "Bachna Ae Haseeno", year: 2008, duration: 333, videoId: "5_6eZz9Y3V4" },
      { id: "ind-16", title: "Kabira", artist: "Tochi Raina & Rekha Bhardwaj", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 251, videoId: "jHNNMj5bNQw" },
      { id: "ind-17", title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali & Mohit Chauhan", film: "Rockstar", year: 2011, duration: 472, videoId: "T94PHkuydcw" },
      { id: "ind-18", title: "Mitwa", artist: "Shafqat Amanat Ali & Shankar Mahadevan", film: "Kabhi Alvida Naa Kehna", year: 2006, duration: 382, videoId: "ru_5PA8cwkE" },
      { id: "ind-19", title: "Tera Hone Laga Hoon", artist: "Atif Aslam & Alisha Chinai", film: "Ajab Prem Ki Ghazab Kahani", year: 2009, duration: 300, videoId: "rTuxUAuJRyY" },
      { id: "ind-20", title: "Tu Jaane Na", artist: "Atif Aslam & Pritam", film: "Ajab Prem Ki Ghazab Kahani", year: 2009, duration: 341, videoId: "P8PWN1OmZOA" },
      { id: "ind-21", title: "Hairat", artist: "Lucky Ali & Vishal-Shekhar", film: "Anjaana Anjaani", year: 2010, duration: 245, videoId: "wqTQNs9sO6M" },
      { id: "ind-22", title: "Safarnama", artist: "Lucky Ali & A.R. Rahman", film: "Tamasha", year: 2015, duration: 251, videoId: "7mTDBsdfw88" },
      { id: "ind-23", title: "O Humdum Suniyo Re", artist: "KK, Shaan & A.R. Rahman", film: "Saathiya", year: 2002, duration: 298, videoId: "_9geEbZIAJM" },
      { id: "ind-24", title: "Saathiya", artist: "Sonu Nigam & A.R. Rahman", film: "Saathiya", year: 2002, duration: 357, videoId: "eMA6GHTQ4WA" },
      { id: "ind-25", title: "Rehna Tu", artist: "A.R. Rahman", film: "Delhi-6", year: 2009, duration: 411, videoId: "ZkcyYqwJq9s" },
      { id: "ind-26", title: "Masakali", artist: "Mohit Chauhan & A.R. Rahman", film: "Delhi-6", year: 2009, duration: 290, videoId: "SS3lIQdKP-A" },
      { id: "ind-27", title: "Jashn-E-Bahaaraa", artist: "Javed Ali & A.R. Rahman", film: "Jodhaa Akbar", year: 2008, duration: 315, videoId: "4h1WFyOQv0Y" },
      { id: "ind-28", title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", film: "Jodhaa Akbar", year: 2008, duration: 418, videoId: "4YbAaRFk70o" },
      { id: "ind-29", title: "Guzarish", artist: "Javed Ali & A.R. Rahman", film: "Ghajini", year: 2008, duration: 329, videoId: "ztPa6vkM-yY" },
      { id: "ind-30", title: "Kaise Mujhe", artist: "Benny Dayal & Shreya Ghoshal", film: "Ghajini", year: 2008, duration: 346, videoId: "uC1iJcYOyeY" },
      { id: "ind-31", title: "Pehli Nazar Mein", artist: "Atif Aslam & Pritam", film: "Race", year: 2008, duration: 314, videoId: "BadBAMnPX0I" },
      { id: "ind-32", title: "Zara Sa", artist: "KK & Pritam", film: "Jannat", year: 2008, duration: 303, videoId: "ZsAOnmByy38" },
      { id: "ind-33", title: "Haan Tu Hain", artist: "KK & Pritam", film: "Jannat", year: 2008, duration: 326, videoId: "V1fbOsHBlZE" },
      { id: "ind-34", title: "Judai", artist: "Kamran Ahmed & Pritam", film: "Jannat", year: 2008, duration: 303, videoId: "sSFM_hCFgko" },
      { id: "ind-35", title: "Mat Aazma Re", artist: "KK & Pritam", film: "Murder 3", year: 2013, duration: 250, videoId: "p_dtI2bLWhY" },
      { id: "ind-36", title: "Hale Dil", artist: "Harshit Saxena", film: "Murder 2", year: 2011, duration: 348, videoId: "uSibwB2TQC4" },
      { id: "ind-37", title: "Aye Khuda", artist: "Kshitij Tarey & Mithoon", film: "Murder 2", year: 2011, duration: 380, videoId: "K6SsC42pZWg" },
      { id: "ind-38", title: "Tu Hi Meri Shab Hai", artist: "KK & Pritam", film: "Gangster", year: 2006, duration: 388, videoId: "HT-BGBbOD9I" },
      { id: "ind-39", title: "Ya Ali", artist: "Zubeen Garg & Pritam", film: "Gangster", year: 2006, duration: 294, videoId: "-EcjhZaepn8" },
      { id: "ind-40", title: "Bheegi Bheegi", artist: "James & Pritam", film: "Gangster", year: 2006, duration: 344, videoId: "WeY9hdsmIaQ" },
      { id: "ind-41", title: "Alvida", artist: "KK & Pritam", film: "Life in a... Metro", year: 2007, duration: 340, videoId: "dlBX5YKuanI" },
      { id: "ind-42", title: "In Dino", artist: "Soham Chakraborty & Pritam", film: "Life in a... Metro", year: 2007, duration: 396, videoId: "dXFVOkq41us" },
      { id: "ind-43", title: "O Meri Jaan", artist: "KK & Pritam", film: "Life in a... Metro", year: 2007, duration: 302, videoId: "jZi8TI050ec" },
      { id: "ind-44", title: "Baatein Kuch Ankahee Si", artist: "Suhail Kaul & Pritam", film: "Life in a... Metro", year: 2007, duration: 280, videoId: "LdFFPkiS-9w" },
      { id: "ind-45", title: "Chaar Kadam", artist: "Shaan & Shreya Ghoshal", film: "PK", year: 2014, duration: 242, videoId: "WKbwopSXLWU" },
      { id: "ind-46", title: "Ilahi", artist: "Arijit Singh & Pritam", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 229, videoId: "fdubeMFwuGs" },
      { id: "ind-47", title: "Balam Pichkari", artist: "Vishal Dadlani & Shalmali Kholgade", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 289, videoId: "0WtRNGubWGA" },
      { id: "ind-48", title: "Badtameez Dil", artist: "Benny Dayal & Shefali Alvares", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 252, videoId: "II2EO3Nw4m0" },
      { id: "ind-49", title: "Agar Tum Saath Ho", artist: "Alka Yagnik & Arijit Singh", film: "Tamasha", year: 2015, duration: 341, videoId: "sK7riqg2mr4" },
      { id: "ind-50", title: "Matargashti", artist: "Mohit Chauhan & A.R. Rahman", film: "Tamasha", year: 2015, duration: 328, videoId: "6vKucgAeF_Q" },
    ],
  },
  {
    id: "retro-chill",
    name: "Chatpate Gaane",
    tagline: "50 desi dance hits, spicy item bangers & party anthems",
    themeBackground: "/bg/console.webp",
    cassetteColor: "from-indigo-800 to-slate-900",
    cassetteLabel: "SIDE C • CHATPATE GAANE (50 HITS) 🫦",
    youtubeUrl: "https://open.spotify.com/playlist/1DatcBStkkmYNY6KKvPbv4",
    tracks: [
      { id: "chat-1", title: "Fevicol Se", artist: "Mamta Sharma & Wajid", film: "Dabangg 2", year: 2012, duration: 290, videoId: "zE7Pwgl6sLA" },
      { id: "chat-2", title: "Munni Badnaam", artist: "Mamta Sharma & Aishwarya", film: "Dabangg", year: 2010, duration: 305, videoId: "Jn5hsfbhWx4" },
      { id: "chat-3", title: "Character Dheela", artist: "Neeraj Shridhar & Amrita Kak", film: "Ready", year: 2011, duration: 226, videoId: "ruEQPQX90fI" },
      { id: "chat-4", title: "Dilliwaali Girlfriend", artist: "Arijit Singh & Sunidhi Chauhan", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 261, videoId: "1cDoRqPnCXU" },
      { id: "chat-5", title: "Tum Hi Ho Bandhu", artist: "Neeraj Shridhar & Kavita Seth", film: "Cocktail", year: 2012, duration: 284, videoId: "o1RducJbUdc" },
      { id: "chat-6", title: "Afghan Jalebi", artist: "Asrar & Akhtar Chinnal", film: "Phantom", year: 2015, duration: 224, videoId: "zC3UbTf4qrM" },
      { id: "chat-7", title: "Lat Lag Gayee", artist: "Benny Dayal & Shalmali Kholgade", film: "Race 2", year: 2013, duration: 280, videoId: "KxCjVIFxZNo" },
      { id: "chat-8", title: "Ooh La La", artist: "Bappi Lahiri & Shreya Ghoshal", film: "The Dirty Picture", year: 2011, duration: 256, videoId: "BFMzpC5PNCU" },
      { id: "chat-9", title: "Wakhra Swag", artist: "Navv Inder & Badshah", film: "Wakhra Swag", year: 2015, duration: 191, videoId: "iMdH_G4N9nY" },
      { id: "chat-10", title: "Laila Main Laila", artist: "Pawni Pandey", film: "Raees", year: 2017, duration: 307, videoId: "95I5VaR7GeU" },
      { id: "chat-11", title: "Baby Doll", artist: "Kanika Kapoor & Meet Bros", film: "Ragini MMS 2", year: 2014, duration: 214, videoId: "lt_X5xPFftI" },
      { id: "chat-12", title: "Sheila Ki Jawani", artist: "Sunidhi Chauhan & Vishal Dadlani", film: "Tees Maar Khan", year: 2010, duration: 283, videoId: "ZTmF2v59CtI" },
      { id: "chat-13", title: "Chikni Chameli", artist: "Shreya Ghoshal", film: "Agneepath", year: 2012, duration: 303, videoId: "MQM7CNoAsBI" },
      { id: "chat-14", title: "Kajra Re", artist: "Alisha Chinai & Shankar Mahadevan", film: "Bunty Aur Babli", year: 2005, duration: 483, videoId: "4dsFQFCvVGU" },
      { id: "chat-15", title: "Beedi", artist: "Sunidhi Chauhan & Sukhwinder Singh", film: "Omkara", year: 2006, duration: 305, videoId: "uUPBMV3DAck" },
      { id: "chat-16", title: "Crazy Kiya Re", artist: "Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 294, videoId: "J2Bh68GTUOU" },
      { id: "chat-17", title: "Dard-E-Disco", artist: "Sukhwinder Singh", film: "Om Shanti Om", year: 2007, duration: 271, videoId: "cKs83ZQxYKA" },
      { id: "chat-18", title: "Desi Girl", artist: "Shankar Mahadevan & Sunidhi Chauhan", film: "Dostana", year: 2008, duration: 306, videoId: "wDIrpvH8MzE" },
      { id: "chat-19", title: "Subha Hone Na De", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 288, videoId: "Y7G-tYRzwYY" },
      { id: "chat-20", title: "Saree Ke Fall Sa", artist: "Antara Mitra & Nakash Aziz", film: "R... Rajkumar", year: 2013, duration: 233, videoId: "EkxOXF9J77w" },
      { id: "chat-21", title: "Gandi Baat", artist: "Mika Singh & Kalpana Patowary", film: "R... Rajkumar", year: 2013, duration: 253, videoId: "vvLBXO94EfA" },
      { id: "chat-22", title: "Dhating Naach", artist: "Shefali Alvares & Nakash Aziz", film: "Phata Poster Nikhla Hero", year: 2013, duration: 191, videoId: "NBw5Gdmb1Pg" },
      { id: "chat-23", title: "Ucha Lamba Kad", artist: "Anand Raj Anand & Kalpana Patowary", film: "Welcome", year: 2007, duration: 278, videoId: "WZ_U_nDi-Zs" },
      { id: "chat-24", title: "Hoth Rasiley", artist: "Shankar Mahadevan & Shreya Ghoshal", film: "Welcome", year: 2007, duration: 279, videoId: "UQeh4mzqemo" },
      { id: "chat-25", title: "Kiya Kiya", artist: "Anand Raj Anand & Shweta Pandit", film: "Welcome", year: 2007, duration: 301, videoId: "qEsAp_rLwa0" },
      { id: "chat-26", title: "Aa Re Pritam Pyaare", artist: "Mamta Sharma & Sarosh Sami", film: "Rowdy Rathore", year: 2012, duration: 260, videoId: "ljF4BrbFijg" },
      { id: "chat-27", title: "Pinky", artist: "Mamta Sharma & Meet Bros", film: "Zanjeer", year: 2013, duration: 251, videoId: "b-COwruFUyY" },
      { id: "chat-28", title: "Jadoo Ki Jhappi", artist: "Mika Singh & Neha Kakkar", film: "Ramaiya Vastavaiya", year: 2013, duration: 217, videoId: "wb6I65vk1cE" },
      { id: "chat-29", title: "Aa Toh Sahi", artist: "Meet Bros & Neha Kakkar", film: "Judwaa 2", year: 2017, duration: 221, videoId: "AYmy75tnmTU" },
      { id: "chat-30", title: "Mera Naam Mary", artist: "Chinmayi Sripada", film: "Brothers", year: 2015, duration: 311, videoId: "MHtLjTRdFBE" },
      { id: "chat-31", title: "Aao Kabhi Haveli Pe", artist: "Badshah & Nikhita Gandhi", film: "Stree", year: 2018, duration: 173, videoId: "PkgStlsVaqw" },
      { id: "chat-32", title: "Jhalla Wallah", artist: "Shreya Ghoshal", film: "Ishaqzaade", year: 2012, duration: 351, videoId: "95I5VaR7GeU" },
      { id: "chat-33", title: "Pink Lips", artist: "Meet Bros Anjjan & Khushboo Grewal", film: "Hate Story 2", year: 2014, duration: 255, videoId: "MQM7CNoAsBI" },
      { id: "chat-34", title: "Paani Waala Dance", artist: "Ikka, Arko & Shraddha Pandit", film: "Kuch Kuch Locha Hai", year: 2015, duration: 238, videoId: "D_CJ4lJ12Us" },
      { id: "chat-35", title: "Aga Bai", artist: "Shalmali Kholgade & Monali Thakur", film: "Aiyyaa", year: 2012, duration: 264, videoId: "CHwlXtF3zXs" },
      { id: "chat-36", title: "Tattoo", artist: "Shefali Alvares & Mayur Puri", film: "ABCD", year: 2013, duration: 260, videoId: "zf1P6R-9K-Q" },
      { id: "chat-37", title: "Piya More", artist: "Mika Singh, Neeti Mohan & Ankit Tiwari", film: "Baadshaho", year: 2017, duration: 258, videoId: "F6wn3Cw-o0g" },
      { id: "chat-38", title: "Laila", artist: "Mika Singh & Anand Raj Anand", film: "Shootout at Wadala", year: 2013, duration: 215, videoId: "31wLxwewzlM" },
      { id: "chat-39", title: "Babli Badmaash", artist: "Sunidhi Chauhan & Anu Malik", film: "Shootout at Wadala", year: 2013, duration: 268, videoId: "ZTmF2v59CtI" },
      { id: "chat-40", title: "Ram Chahe Leela", artist: "Bhoomi Trivedi", film: "Goliyon Ki Raasleela Ram-Leela", year: 2013, duration: 244, videoId: "BDSsW194IJU" },
      { id: "chat-41", title: "Drama Queen", artist: "Shreya Ghoshal & Vishal Dadlani", film: "Hasee Toh Phasee", year: 2014, duration: 199, videoId: "0Qs-Suk42dY" },
      { id: "chat-42", title: "Chokra Jawaan", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Ishaqzaade", year: 2012, duration: 310, videoId: "T4tedh_11hg" },
      { id: "chat-43", title: "Chhaliya", artist: "Sunidhi Chauhan & Vishal-Shekhar", film: "Tashan", year: 2008, duration: 286, videoId: "YPpOqfIQ5ME" },
      { id: "chat-44", title: "Tu Mera Hero", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 292, videoId: "Y7G-tYRzwYY" },
      { id: "chat-45", title: "Zara Zara Touch Me", artist: "Monali Thakur & Pritam", film: "Race", year: 2008, duration: 286, videoId: "Sv_kEdNwYtQ" },
      { id: "chat-46", title: "Namak Ishq Ka", artist: "Rekha Bhardwaj", film: "Omkara", year: 2006, duration: 295, videoId: "NJ-N3OjTWA4" },
      { id: "chat-47", title: "Dhoom Again", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 302, videoId: "WGXmDsOwW4k" },
      { id: "chat-48", title: "Anarkali Disco Chali", artist: "Mamta Sharma & Sukhwinder Singh", film: "Housefull 2", year: 2012, duration: 232, videoId: "sONw3dihCRs" },
      { id: "chat-49", title: "Right Here Right Now", artist: "Abhishek Bachchan & Sunidhi Chauhan", film: "Bluffmaster!", year: 2005, duration: 243, videoId: "JX409_Bq7m0" },
      { id: "chat-50", title: "Maa Da Laadla", artist: "Master Saleem", film: "Dostana", year: 2008, duration: 245, videoId: "LCqEVvBcg04" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    tagline: "53 late night phonk, anime loops, sped up & gaming beats",
    themeBackground: "/bg/console.webp",
    cassetteColor: "from-emerald-600 via-teal-800 to-slate-950",
    cassetteLabel: "SIDE D • GAMING (53 HITS) 🎮",
    youtubeUrl: "https://open.spotify.com/playlist/6rxCjM9lJPAXpoRO5872bw",
    tracks: [
      { id: "game-1", title: "Misery. (Best Part Sped Up)", artist: "pupsies", film: "Subaru Natsuki", year: 2024, duration: 133, videoId: "9XHrWGJtO1A" },
      { id: "game-2", title: "Sunflower", artist: "Post Malone & Swae Lee", film: "Spider-Man: Into the Spider-Verse", year: 2018, duration: 159, videoId: "ApXoWvfEYVU" },
      { id: "game-3", title: "Sweet little Bumble Bee", artist: "Bemax", film: "Nightcore Edit", year: 2021, duration: 135, videoId: "hlSAmp5CATo" },
      { id: "game-4", title: "SugarCrash!", artist: "Bemax", film: "Hyperpop Vibes", year: 2021, duration: 98, videoId: "hWFJHJ1ue10" },
      { id: "game-5", title: "Cupid - Nightcore", artist: "neko", film: "FIFTY FIFTY", year: 2023, duration: 145, videoId: "Aws8IsxtVaY" },
      { id: "game-6", title: "YOUNG GIRL A (Slowed + Reverb)", artist: "aceton", film: "Siinamota", year: 2023, duration: 282, videoId: "MVqAVepMBlU" },
      { id: "game-7", title: "TREINAMENTO DE FORÇA", artist: "TRXVELER", film: "Brazilian Phonk", year: 2023, duration: 141, videoId: "afyJSx8loI8" },
      { id: "game-8", title: "Discord X My Ordinary Life", artist: "The Living Tombstone", film: "Mashup Anthem", year: 2022, duration: 226, videoId: "EaX_J3z8GuU" },
      { id: "game-9", title: "My Ordinary Life (Slowed)", artist: "The Living Tombstone", film: "Lo-Fi Midnight", year: 2022, duration: 285, videoId: "kRg7IEGmYco" },
      { id: "game-10", title: "Losing Interest", artist: "Stract & Shiloh Dynasty", film: "Shiloh Lo-Fi", year: 2019, duration: 137, videoId: "m4ZcTU43Anc" },
      { id: "game-11", title: "Stay With Me", artist: "1nonly", film: "Japanese City Pop Flip", year: 2020, duration: 142, videoId: "ETecZsoA0jo" },
      { id: "game-12", title: "Mask Off (Marshmello Remix)", artist: "Future & Marshmello", film: "Trap Edit", year: 2017, duration: 179, videoId: "xvZqHgFz51I" },
      { id: "game-13", title: "Living Life, In The Night", artist: "Cheriimoya & Sierra Kidd", film: "Night Vibes", year: 2021, duration: 123, videoId: "wHqKkiHlvJc" },
      { id: "game-14", title: "Hoes No Jutsu", artist: "ovg!", film: "Naruto Phonk", year: 2022, duration: 148, videoId: "BkizwI_R9_4" },
      { id: "game-15", title: "She Make It Clap", artist: "Soulja Boy", film: "TikTok Viral", year: 2021, duration: 232, videoId: "80ZDN2Py7DI" },
      { id: "game-16", title: "Money Rain (Phonk Remix)", artist: "Vtornik", film: "Phonk Drift", year: 2021, duration: 211, videoId: "qMjP-I2haOU" },
      { id: "game-17", title: "Face Off", artist: "Tech N9ne & Dwayne Johnson", film: "Workout Beast", year: 2021, duration: 220, videoId: "E9T78bT26sk" },
      { id: "game-18", title: "LOVELY BASTARDS", artist: "ZWE1HVNDXR & yatashigang", film: "Phonk Anthem", year: 2023, duration: 116, videoId: "_G0zUqdDdoo" },
      { id: "game-19", title: "MONTAGEM - PR FUNK", artist: "S3BZS & Mc Gw", film: "Brazilian Baile", year: 2023, duration: 62, videoId: "sOmLdai2ohw" },
      { id: "game-20", title: "Dubidubidu (Chipi Chipi Chapa Chapa)", artist: "Christell", film: "Viral Meme Edit", year: 2003, duration: 226, videoId: "pHALwt0Hgow" },
      { id: "game-21", title: "Bling-Bang-Bang-Born", artist: "Creepy Nuts", film: "MASHLE: Magic and Muscles", year: 2024, duration: 70, videoId: "mLW35YMzELE" },
      { id: "game-22", title: "Me Gustas Tu", artist: "Manu Chao", film: "Próxima Estación: Esperanza", year: 2001, duration: 240, videoId: "rs6Y4kZ8qtw" },
      { id: "game-23", title: "Nyanpasu Yabure Kabure", artist: "HonestResolv3", film: "Non Non Biyori", year: 2020, duration: 130, videoId: "EUPBImVoRgI" },
      { id: "game-24", title: "loli selling ice cream", artist: "ancient heiakim", film: "Heiakim Beats", year: 2019, duration: 113, videoId: "hBwSGjXCeFY" },
      { id: "game-25", title: "On My Own (Skeler Vision)", artist: "Darci & Skeler", film: "Wave Drift", year: 2020, duration: 200, videoId: "TW9RirTCbcM" },
      { id: "game-26", title: "CUTE DEPRESSED", artist: "Dyan Dxddy", film: "Cyber Wave", year: 2022, duration: 97, videoId: "J_Jt3VOVpoI" },
      { id: "game-27", title: "Those Eyes (Slowed + Reverb)", artist: "New West", film: "Midnight Nostalgia", year: 2021, duration: 273, videoId: "ex2rRxM8VqE" },
      { id: "game-28", title: "Young Girl A (After Another Remix)", artist: "Siinamota & sasanomaly", film: "Anime Anthem", year: 2023, duration: 231, videoId: "rRlAJWi6rgM" },
      { id: "game-29", title: "Hope", artist: "XXXTENTACION", film: "? Album", year: 2018, duration: 111, videoId: "66Hc7kfc7DA" },
      { id: "game-30", title: "Past Lives", artist: "sapientdream & BØRNS", film: "Dream Lo-Fi", year: 2020, duration: 153, videoId: "T_lC2O1oIew" },
      { id: "game-31", title: "Losing Interest (Remix)", artist: "Stract & Shiloh Dynasty", film: "Lo-Fi Sunset", year: 2020, duration: 270, videoId: "l7BcasZARlw" },
      { id: "game-32", title: "Mockingbird (Lo-Fi Sped Up)", artist: "fenekot", film: "Eminem Remix", year: 2023, duration: 93, videoId: "Q-jHGuqPhjk" },
      { id: "game-33", title: "GigaChad Theme (Phonk Remix)", artist: "g3ox_em", film: "Can You Feel My Heart", year: 2022, duration: 142, videoId: "k2qgadSvNyU" },
      { id: "game-34", title: "Metamorphosis", artist: "INTERWORLD", film: "Drift Phonk", year: 2021, duration: 143, videoId: "317RHaFF7Xk" },
      { id: "game-35", title: "Murder In My Mind", artist: "KORDHELL", film: "Phonk Killer", year: 2022, duration: 145, videoId: "w-sQRS-Lc9k" },
      { id: "game-36", title: "Rave", artist: "Dxrk \u5147", film: "Rave Phonk", year: 2022, duration: 169, videoId: "TW9d8vYrVFQ" },
      { id: "game-37", title: "After Dark", artist: "Mr.Kitty", film: "Time", year: 2014, duration: 259, videoId: "sVx1mJDeUjY" },
      { id: "game-38", title: "Resonance", artist: "HOME", film: "Odyssey", year: 2014, duration: 212, videoId: "8GW6sLrK40k" },
      { id: "game-39", title: "Memory Reboot", artist: "V\u00d8J & Narvent", film: "Cyberpunk Horizon", year: 2023, duration: 162, videoId: "wL8DVHuWI7Y" },
      { id: "game-40", title: "Endless Love (Slowed)", artist: "Dharmx", film: "Midnight Drive", year: 2022, duration: 215, videoId: "QF4YPOQ3rXU" },
      { id: "game-41", title: "Little Dark Age", artist: "MGMT", film: "Little Dark Age", year: 2017, duration: 300, videoId: "rtL5oMyBHPs" },
      { id: "game-42", title: "Midnight City", artist: "M83", film: "Hurry Up, We're Dreaming", year: 2011, duration: 243, videoId: "dX3k_QDnzHE" },
      { id: "game-43", title: "Goth", artist: "Sidewalks and Skeletons", film: "White Light", year: 2015, duration: 153, videoId: "qqOkOcrHZ50" },
      { id: "game-44", title: "SimpsonWave1995", artist: "FrankJavCee", film: "Vaporwave Classics", year: 2016, duration: 174, videoId: "rTfa-9aCTYg" },
      { id: "game-45", title: "Snowfall", artist: "\u00d8neheart & reidenshi", film: "Ambient Midnight", year: 2022, duration: 123, videoId: "LlN8MPS7KQs" },
      { id: "game-46", title: "Limbo", artist: "Freddie Dredd", film: "Freddie's Inferno", year: 2022, duration: 171, videoId: "-Jeusl_Y_PE" },
      { id: "game-47", title: "Close Eyes", artist: "DVRST", film: "Drift King", year: 2021, duration: 132, videoId: "S8-z26rBPLw" },
      { id: "game-48", title: "Override", artist: "KSLV Noh", film: "Phonk Override", year: 2021, duration: 114, videoId: "2OOzgf9uvF0" },
      { id: "game-49", title: "Shadow", artist: "ONIMXRU & SMITHMANE", film: "Shadow Phonk", year: 2022, duration: 134, videoId: "jqbSVBS1x0w" },
      { id: "game-50", title: "Warning", artist: "MC Orsen", film: "Warning Shot", year: 2021, duration: 140, videoId: "yT5Nhm2MpZI" },
      { id: "game-51", title: "Automotivo Bibi Fogosa", artist: "Bibi Babydoll & DJ Brunin XM", film: "Brazilian Funk", year: 2023, duration: 135, videoId: "N0pDBF00ygQ" },
      { id: "game-52", title: "Montagem Diamante Rosa", artist: "VTZEAT", film: "Phonk Diamante", year: 2023, duration: 110, videoId: "7QQ4ZrLY_JU" },
      { id: "game-53", title: "Montagem Orquestra Sinfonica", artist: "DJ TScar", film: "Sinfonica Baile", year: 2023, duration: 125, videoId: "xhvrNuVEoYs" },
    ],
  },
];
