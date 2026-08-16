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
    tagline: "53 late night phonk, anime loops, sped up & lo-fi beats",
    themeBackground: "/bg/spider.webp",
    cassetteColor: "from-amber-600 to-amber-900",
    cassetteLabel: "SIDE A • NOTINDIAN (53 HITS)",
    youtubeUrl: "https://open.spotify.com/playlist/6rxCjM9lJPAXpoRO5872bw",
    tracks: [
      { id: "notind-1", title: "Misery. (Best Part Sped Up)", artist: "pupsies", film: "Subaru Natsuki", year: 2024, duration: 133, videoId: "9XHrWGJtO1A" },
      { id: "notind-2", title: "Sunflower", artist: "Post Malone & Swae Lee", film: "Spider-Man: Into the Spider-Verse", year: 2018, duration: 159, videoId: "ApXoWvfEYVU" },
      { id: "notind-3", title: "Sweet little Bumble Bee", artist: "Bemax", film: "Nightcore Edit", year: 2021, duration: 135, videoId: "hlSAmp5CATo" },
      { id: "notind-4", title: "SugarCrash!", artist: "Bemax", film: "Hyperpop Vibes", year: 2021, duration: 98, videoId: "hWFJHJ1ue10" },
      { id: "notind-5", title: "Cupid - Nightcore", artist: "neko", film: "FIFTY FIFTY", year: 2023, duration: 145, videoId: "Aws8IsxtVaY" },
      { id: "notind-6", title: "YOUNG GIRL A (Slowed + Reverb)", artist: "aceton", film: "Siinamota", year: 2023, duration: 282, videoId: "MVqAVepMBlU" },
      { id: "notind-7", title: "TREINAMENTO DE FORÇA", artist: "TRXVELER", film: "Brazilian Phonk", year: 2023, duration: 141, videoId: "afyJSx8loI8" },
      { id: "notind-8", title: "Discord X My Ordinary Life", artist: "The Living Tombstone", film: "Mashup Anthem", year: 2022, duration: 226, videoId: "z48NMDb66eQ" },
      { id: "notind-9", title: "My Ordinary Life (Slowed)", artist: "The Living Tombstone", film: "Lo-Fi Midnight", year: 2022, duration: 285, videoId: "1cO3d03GqFE" },
      { id: "notind-10", title: "Losing Interest", artist: "Stract & Shiloh Dynasty", film: "Shiloh Lo-Fi", year: 2019, duration: 137, videoId: "30XyW8-c4E4" },
      { id: "notind-11", title: "Stay With Me", artist: "1nonly", film: "Japanese City Pop Flip", year: 2020, duration: 142, videoId: "Q1f0H5o153U" },
      { id: "notind-12", title: "Mask Off (Marshmello Remix)", artist: "Future & Marshmello", film: "Trap Edit", year: 2017, duration: 179, videoId: "xvZqHgFz51I" },
      { id: "notind-13", title: "Living Life, In The Night", artist: "Cheriimoya & Sierra Kidd", film: "Night Vibes", year: 2021, duration: 123, videoId: "o6p_g_P07bU" },
      { id: "notind-14", title: "Hoes No Jutsu", artist: "ovg!", film: "Naruto Phonk", year: 2022, duration: 148, videoId: "rQ3T5L33K_w" },
      { id: "notind-15", title: "She Make It Clap", artist: "Soulja Boy", film: "TikTok Viral", year: 2021, duration: 232, videoId: "3mD8l15zR94" },
      { id: "notind-16", title: "Money Rain (Phonk Remix)", artist: "Vtornik", film: "Phonk Drift", year: 2021, duration: 211, videoId: "c9JmZz_5V4A" },
      { id: "notind-17", title: "Face Off", artist: "Tech N9ne & Dwayne Johnson", film: "Workout Beast", year: 2021, duration: 220, videoId: "E9T78bT26sk" },
      { id: "notind-18", title: "LOVELY BASTARDS", artist: "ZWE1HVNDXR & yatashigang", film: "Phonk Anthem", year: 2023, duration: 116, videoId: "O_V_U71qX_4" },
      { id: "notind-19", title: "MONTAGEM - PR FUNK", artist: "S3BZS & Mc Gw", film: "Brazilian Baile", year: 2023, duration: 62, videoId: "d690J9qB44k" },
      { id: "notind-20", title: "Dubidubidu (Chipi Chipi Chapa Chapa)", artist: "Christell", film: "Viral Meme Edit", year: 2003, duration: 226, videoId: "bI9Zt92G748" },
      { id: "notind-21", title: "Bling-Bang-Bang-Born", artist: "Creepy Nuts", film: "MASHLE: Magic and Muscles", year: 2024, duration: 70, videoId: "mLW35ymz1gk" },
      { id: "notind-22", title: "Me Gustas Tu", artist: "Manu Chao", film: "Próxima Estación: Esperanza", year: 2001, duration: 240, videoId: "rs6Y4bZPOBo" },
      { id: "notind-23", title: "Nyanpasu Yabure Kabure", artist: "HonestResolv3", film: "Non Non Biyori", year: 2020, duration: 130, videoId: "Jg_w142uT60" },
      { id: "notind-24", title: "loli selling ice cream", artist: "ancient heiakim", film: "Heiakim Beats", year: 2019, duration: 113, videoId: "N7B_Z5R80vE" },
      { id: "notind-25", title: "On My Own (Skeler Vision)", artist: "Darci & Skeler", film: "Wave Drift", year: 2020, duration: 200, videoId: "W_iB6w2B8xQ" },
      { id: "notind-26", title: "CUTE DEPRESSED", artist: "Dyan Dxddy", film: "Cyber Wave", year: 2022, duration: 97, videoId: "1u_nN3hO8hY" },
      { id: "notind-27", title: "Those Eyes (Slowed + Reverb)", artist: "New West", film: "Midnight Nostalgia", year: 2021, duration: 273, videoId: "_s84Gv081Ww" },
      { id: "notind-28", title: "Young Girl A (After Another Remix)", artist: "Siinamota & sasanomaly", film: "Anime Anthem", year: 2023, duration: 231, videoId: "pT2Z4-Z-gVw" },
      { id: "notind-29", title: "Hope", artist: "XXXTENTACION", film: "? Album", year: 2018, duration: 111, videoId: "nk_rW_9f1W8" },
      { id: "notind-30", title: "Past Lives", artist: "sapientdream & BØRNS", film: "Dream Lo-Fi", year: 2020, duration: 153, videoId: "T_lC2O1oIew" },
      { id: "notind-31", title: "Losing Interest (Remix)", artist: "Stract & Shiloh Dynasty", film: "Lo-Fi Sunset", year: 2020, duration: 270, videoId: "jQ_G0R5e8-U" },
      { id: "notind-32", title: "Mockingbird (Lo-Fi Sped Up)", artist: "fenekot", film: "Eminem Remix", year: 2023, duration: 93, videoId: "Z9v-4w7q8x8" },
      { id: "notind-33", title: "GigaChad Theme (Phonk Remix)", artist: "g3ox_em", film: "Can You Feel My Heart", year: 2022, duration: 142, videoId: "k2qgadSvNyU" },
      { id: "notind-34", title: "Metamorphosis", artist: "INTERWORLD", film: "Drift Phonk", year: 2021, duration: 143, videoId: "w-sQRS-Mun8" },
      { id: "notind-35", title: "Murder In My Mind", artist: "KORDHELL", film: "Phonk Killer", year: 2022, duration: 145, videoId: "clXm4Sk45vY" },
      { id: "notind-36", title: "Rave", artist: "Dxrk \u5147", film: "Rave Phonk", year: 2022, duration: 169, videoId: "TW9d8vYrVFQ" },
      { id: "notind-37", title: "After Dark", artist: "Mr.Kitty", film: "Time", year: 2014, duration: 259, videoId: "sVx1mJDeUj8" },
      { id: "notind-38", title: "Resonance", artist: "HOME", film: "Odyssey", year: 2014, duration: 212, videoId: "8GW6sLrK40k" },
      { id: "notind-39", title: "Memory Reboot", artist: "V\u00d8J & Narvent", film: "Cyberpunk Horizon", year: 2023, duration: 162, videoId: "F8K5_oY8bQw" },
      { id: "notind-40", title: "Endless Love (Slowed)", artist: "Dharmx", film: "Midnight Drive", year: 2022, duration: 215, videoId: "N_v9L73x1W8" },
      { id: "notind-41", title: "Little Dark Age", artist: "MGMT", film: "Little Dark Age", year: 2017, duration: 300, videoId: "rtL5oMyBFPs" },
      { id: "notind-42", title: "Midnight City", artist: "M83", film: "Hurry Up, We're Dreaming", year: 2011, duration: 243, videoId: "dX3k_PDnzHE" },
      { id: "notind-43", title: "Goth", artist: "Sidewalks and Skeletons", film: "White Light", year: 2015, duration: 153, videoId: "966qW1KzR1M" },
      { id: "notind-44", title: "SimpsonWave1995", artist: "FrankJavCee", film: "Vaporwave Classics", year: 2016, duration: 174, videoId: "rTfa-9aCTYg" },
      { id: "notind-45", title: "Snowfall", artist: "\u00d8neheart & reidenshi", film: "Ambient Midnight", year: 2022, duration: 123, videoId: "LlN8MPS7KQs" },
      { id: "notind-46", title: "Limbo", artist: "Freddie Dredd", film: "Freddie's Inferno", year: 2022, duration: 171, videoId: "2u_07m4b5YQ" },
      { id: "notind-47", title: "Close Eyes", artist: "DVRST", film: "Drift King", year: 2021, duration: 132, videoId: "r7_sH6q7W48" },
      { id: "notind-48", title: "Override", artist: "KSLV Noh", film: "Phonk Override", year: 2021, duration: 114, videoId: "F77T9N9bX_E" },
      { id: "notind-49", title: "Shadow", artist: "ONIMXRU & SMITHMANE", film: "Shadow Phonk", year: 2022, duration: 134, videoId: "Qv_z0vL48bQ" },
      { id: "notind-50", title: "Warning", artist: "MC Orsen", film: "Warning Shot", year: 2021, duration: 140, videoId: "uY3_N17x8YQ" },
      { id: "notind-51", title: "Automotivo Bibi Fogosa", artist: "Bibi Babydoll & DJ Brunin XM", film: "Brazilian Funk", year: 2023, duration: 135, videoId: "h9X4_W9z1L8" },
      { id: "notind-52", title: "Montagem Diamante Rosa", artist: "VTZEAT", film: "Phonk Diamante", year: 2023, duration: 110, videoId: "Y_7b9X1L4Q8" },
      { id: "notind-53", title: "Montagem Orquestra Sinfonica", artist: "DJ TScar", film: "Sinfonica Baile", year: 2023, duration: 125, videoId: "K_8b9X1L4Q7" },
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
      { id: "ind-3", title: "Phir Se Ud Chala", artist: "Mohit Chauhan & A.R. Rahman", film: "Rockstar", year: 2011, duration: 271, videoId: "2mWaqank5EI" },
      { id: "ind-4", title: "Kya Mujhe Pyar Hai", artist: "KK & Pritam", film: "Woh Lamhe", year: 2006, duration: 278, videoId: "t-GtmB1z2_8" },
      { id: "ind-5", title: "Kahin To Hogi Woh", artist: "Rashid Ali & Vasundhara Das", film: "Jaane Tu Ya Jaane Na", year: 2008, duration: 305, videoId: "iW2y1aXpB-0" },
      { id: "ind-6", title: "Zara Zara", artist: "Bombay Jayashri & Harris Jayaraj", film: "RHTDM", year: 2001, duration: 300, videoId: "b4Wq0cWJ2G8" },
      { id: "ind-7", title: "Pee Loon", artist: "Mohit Chauhan & Pritam", film: "Once Upon A Time In Mumbaai", year: 2010, duration: 287, videoId: "39A_1Pcrq9A" },
      { id: "ind-8", title: "Tune Jo Na Kaha", artist: "Mohit Chauhan & Pritam", film: "New York", year: 2009, duration: 310, videoId: "v_wL6e3jI_4" },
      { id: "ind-9", title: "Dil Diyan Gallan", artist: "Atif Aslam & Vishal-Shekhar", film: "Tiger Zinda Hai", year: 2017, duration: 260, videoId: "mevO4I0f5lg" },
      { id: "ind-10", title: "Beete Lamhein", artist: "KK & Mithoon", film: "The Train", year: 2007, duration: 318, videoId: "b8rY-t5c0mU" },
      { id: "ind-11", title: "Tujhe Bhula Diya", artist: "Mohit Chauhan, Shekhar & Shruti Pathak", film: "Anjaana Anjaani", year: 2010, duration: 280, videoId: "p1Zt47VWTtg" },
      { id: "ind-12", title: "Maahi", artist: "Toshi Sabri", film: "Raaz: The Mystery Continues", year: 2009, duration: 270, videoId: "r9n9rW_hW8w" },
      { id: "ind-13", title: "Aadat", artist: "Atif Aslam & Jal", film: "Kalyug", year: 2005, duration: 334, videoId: "JpUjV_9663Y" },
      { id: "ind-14", title: "Subhanallah", artist: "Sreerama Chandra & Shilpa Rao", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 249, videoId: "w_Q8b9zWqDk" },
      { id: "ind-15", title: "Labon Ko", artist: "KK & Pritam", film: "Bhool Bhulaiyaa", year: 2007, duration: 343, videoId: "l1V8iQ2z9jA" },
      { id: "ind-16", title: "Kabira", artist: "Tochi Raina & Rekha Bhardwaj", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 223, videoId: "jHNNMj5bNQw" },
      { id: "ind-17", title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali & Mohit Chauhan", film: "Rockstar", year: 2011, duration: 472, videoId: "T94PHkuydcw" },
      { id: "ind-18", title: "Mitwa", artist: "Shafqat Amanat Ali & Shankar Mahadevan", film: "Kabhi Alvida Naa Kehna", year: 2006, duration: 382, videoId: "X3jA7w6vSik" },
      { id: "ind-19", title: "Tera Hone Laga Hoon", artist: "Atif Aslam & Alisha Chinai", film: "Ajab Prem Ki Ghazab Kahani", year: 2009, duration: 300, videoId: "rTuxUAuJRyY" },
      { id: "ind-20", title: "Tu Jaane Na", artist: "Atif Aslam & Pritam", film: "Ajab Prem Ki Ghazab Kahani", year: 2009, duration: 341, videoId: "P8PWN1OmZOA" },
      { id: "ind-21", title: "Hairat", artist: "Lucky Ali & Vishal-Shekhar", film: "Anjaana Anjaani", year: 2010, duration: 245, videoId: "K08w_d0-GHY" },
      { id: "ind-22", title: "Safarnama", artist: "Lucky Ali & A.R. Rahman", film: "Tamasha", year: 2015, duration: 251, videoId: "0G2VxhV_P6I" },
      { id: "ind-23", title: "O Humdum Suniyo Re", artist: "KK, Shaan & A.R. Rahman", film: "Saathiya", year: 2002, duration: 298, videoId: "yL_LzG-e5oQ" },
      { id: "ind-24", title: "Saathiya", artist: "Sonu Nigam & A.R. Rahman", film: "Saathiya", year: 2002, duration: 357, videoId: "3Uf2A8d0xG0" },
      { id: "ind-25", title: "Rehna Tu", artist: "A.R. Rahman", film: "Delhi-6", year: 2009, duration: 411, videoId: "X9C8xL5ZgT8" },
      { id: "ind-26", title: "Masakali", artist: "Mohit Chauhan & A.R. Rahman", film: "Delhi-6", year: 2009, duration: 290, videoId: "SSz1nK4tWcE" },
      { id: "ind-27", title: "Jashn-E-Bahaaraa", artist: "Javed Ali & A.R. Rahman", film: "Jodhaa Akbar", year: 2008, duration: 315, videoId: "GHhF_7L_7kU" },
      { id: "ind-28", title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", film: "Jodhaa Akbar", year: 2008, duration: 418, videoId: "rf9_xM_4T8Q" },
      { id: "ind-29", title: "Guzarish", artist: "Javed Ali & A.R. Rahman", film: "Ghajini", year: 2008, duration: 329, videoId: "_l9Tq_zLgqY" },
      { id: "ind-30", title: "Kaise Mujhe", artist: "Benny Dayal & Shreya Ghoshal", film: "Ghajini", year: 2008, duration: 346, videoId: "qP0X5Y6eM8k" },
      { id: "ind-31", title: "Pehli Nazar Mein", artist: "Atif Aslam & Pritam", film: "Race", year: 2008, duration: 314, videoId: "BadBAMnpXsc" },
      { id: "ind-32", title: "Zara Sa", artist: "KK & Pritam", film: "Jannat", year: 2008, duration: 303, videoId: "5y_6H9D0_p8" },
      { id: "ind-33", title: "Haan Tu Hain", artist: "KK & Pritam", film: "Jannat", year: 2008, duration: 326, videoId: "W8z3Z2q5xX8" },
      { id: "ind-34", title: "Judai", artist: "Kamran Ahmed & Pritam", film: "Jannat", year: 2008, duration: 303, videoId: "3QGZ7tQ9V4Q" },
      { id: "ind-35", title: "Mat Aazma Re", artist: "KK & Pritam", film: "Murder 3", year: 2013, duration: 250, videoId: "7C9Zk8T4V5Q" },
      { id: "ind-36", title: "Hale Dil", artist: "Harshit Saxena", film: "Murder 2", year: 2011, duration: 348, videoId: "w4T9V2y0L6Q" },
      { id: "ind-37", title: "Aye Khuda", artist: "Kshitij Tarey & Mithoon", film: "Murder 2", year: 2011, duration: 380, videoId: "6tY0P8z2L9Q" },
      { id: "ind-38", title: "Tu Hi Meri Shab Hai", artist: "KK & Pritam", film: "Gangster", year: 2006, duration: 388, videoId: "kL8Z7X9V1Q8" },
      { id: "ind-39", title: "Ya Ali", artist: "Zubeen Garg & Pritam", film: "Gangster", year: 2006, duration: 294, videoId: "Yq7X9V8z1L4" },
      { id: "ind-40", title: "Bheegi Bheegi", artist: "James & Pritam", film: "Gangster", year: 2006, duration: 344, videoId: "Vp8X9z2L7Q4" },
      { id: "ind-41", title: "Alvida", artist: "KK & Pritam", film: "Life in a... Metro", year: 2007, duration: 340, videoId: "Xk9V8z1L4Q7" },
      { id: "ind-42", title: "In Dino", artist: "Soham Chakraborty & Pritam", film: "Life in a... Metro", year: 2007, duration: 396, videoId: "9tZ1L4Q7X8V" },
      { id: "ind-43", title: "O Meri Jaan", artist: "KK & Pritam", film: "Life in a... Metro", year: 2007, duration: 302, videoId: "8yX1L4Q7Z9V" },
      { id: "ind-44", title: "Baatein Kuch Ankahee Si", artist: "Suhail Kaul & Pritam", film: "Life in a... Metro", year: 2007, duration: 280, videoId: "1zL4Q7X8V9T" },
      { id: "ind-45", title: "Chaar Kadam", artist: "Shaan & Shreya Ghoshal", film: "PK", year: 2014, duration: 242, videoId: "4kZ8X9V1L7Q" },
      { id: "ind-46", title: "Ilahi", artist: "Arijit Singh & Pritam", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 229, videoId: "fdubeMFwuGs" },
      { id: "ind-47", title: "Balam Pichkari", artist: "Vishal Dadlani & Shalmali Kholgade", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 289, videoId: "0WtRNGubWGA" },
      { id: "ind-48", title: "Badtameez Dil", artist: "Benny Dayal & Shefali Alvares", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 252, videoId: "II2EO3NwUrQ" },
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
      { id: "chat-1", title: "Fevicol Se", artist: "Mamta Sharma & Wajid", film: "Dabangg 2", year: 2012, duration: 290, videoId: "zE7PWgl6gLA" },
      { id: "chat-2", title: "Munni Badnaam", artist: "Mamta Sharma & Aishwarya", film: "Dabangg", year: 2010, duration: 305, videoId: "Jn5h4rSHCol" },
      { id: "chat-3", title: "Character Dheela", artist: "Neeraj Shridhar & Amrita Kak", film: "Ready", year: 2011, duration: 226, videoId: "v5v1G3pC7T8" },
      { id: "chat-4", title: "Dilliwaali Girlfriend", artist: "Arijit Singh & Sunidhi Chauhan", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 261, videoId: "1cDoRqPn9mM" },
      { id: "chat-5", title: "Tum Hi Ho Bandhu", artist: "Neeraj Shridhar & Kavita Seth", film: "Cocktail", year: 2012, duration: 284, videoId: "o1RZX4V1Xg8" },
      { id: "chat-6", title: "Afghan Jalebi", artist: "Asrar & Akhtar Chinnal", film: "Phantom", year: 2015, duration: 224, videoId: "1_I4wg7Z70I" },
      { id: "chat-7", title: "Lat Lag Gayee", artist: "Benny Dayal & Shalmali Kholgade", film: "Race 2", year: 2013, duration: 280, videoId: "Z_b8H_4tG7w" },
      { id: "chat-8", title: "Ooh La La", artist: "Bappi Lahiri & Shreya Ghoshal", film: "The Dirty Picture", year: 2011, duration: 256, videoId: "1R_d5kX3vL8" },
      { id: "chat-9", title: "Wakhra Swag", artist: "Navv Inder & Badshah", film: "Wakhra Swag", year: 2015, duration: 191, videoId: "rgXplb1kK8Q" },
      { id: "chat-10", title: "Laila Main Laila", artist: "Pawni Pandey", film: "Raees", year: 2017, duration: 307, videoId: "95I5VaR7GeU" },
      { id: "chat-11", title: "Baby Doll", artist: "Kanika Kapoor & Meet Bros", film: "Ragini MMS 2", year: 2014, duration: 214, videoId: "kthh48z03vU" },
      { id: "chat-12", title: "Sheila Ki Jawani", artist: "Sunidhi Chauhan & Vishal Dadlani", film: "Tees Maar Khan", year: 2010, duration: 283, videoId: "ZTmF2v59CtI" },
      { id: "chat-13", title: "Chikni Chameli", artist: "Shreya Ghoshal", film: "Agneepath", year: 2012, duration: 303, videoId: "MQM7CNoAsBI" },
      { id: "chat-14", title: "Kajra Re", artist: "Alisha Chinai & Shankar Mahadevan", film: "Bunty Aur Babli", year: 2005, duration: 483, videoId: "k4mR2l6iS_c" },
      { id: "chat-15", title: "Beedi", artist: "Sunidhi Chauhan & Sukhwinder Singh", film: "Omkara", year: 2006, duration: 305, videoId: "1eYq7fDk8t4" },
      { id: "chat-16", title: "Crazy Kiya Re", artist: "Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 294, videoId: "N19Yj9W2hJg" },
      { id: "chat-17", title: "Dard-E-Disco", artist: "Sukhwinder Singh", film: "Om Shanti Om", year: 2007, duration: 271, videoId: "y9q5m1u4g8E" },
      { id: "chat-18", title: "Desi Girl", artist: "Shankar Mahadevan & Sunidhi Chauhan", film: "Dostana", year: 2008, duration: 306, videoId: "P9BsmgM9K_s" },
      { id: "chat-19", title: "Subha Hone Na De", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 288, videoId: "7v3j9r7Pq0I" },
      { id: "chat-20", title: "Saree Ke Fall Sa", artist: "Antara Mitra & Nakash Aziz", film: "R... Rajkumar", year: 2013, duration: 233, videoId: "K2W6f3X8k_k" },
      { id: "chat-21", title: "Gandi Baat", artist: "Mika Singh & Kalpana Patowary", film: "R... Rajkumar", year: 2013, duration: 253, videoId: "Y5h4Gv6L9tQ" },
      { id: "chat-22", title: "Dhating Naach", artist: "Shefali Alvares & Nakash Aziz", film: "Phata Poster Nikhla Hero", year: 2013, duration: 191, videoId: "0q4G7m4X9lA" },
      { id: "chat-23", title: "Ucha Lamba Kad", artist: "Anand Raj Anand & Kalpana Patowary", film: "Welcome", year: 2007, duration: 278, videoId: "Jn5h4rSHCol" },
      { id: "chat-24", title: "Hoth Rasiley", artist: "Shankar Mahadevan & Shreya Ghoshal", film: "Welcome", year: 2007, duration: 279, videoId: "v5v1G3pC7T8" },
      { id: "chat-25", title: "Kiya Kiya", artist: "Anand Raj Anand & Shweta Pandit", film: "Welcome", year: 2007, duration: 301, videoId: "1cDoRqPn9mM" },
      { id: "chat-26", title: "Aa Re Pritam Pyaare", artist: "Mamta Sharma & Sarosh Sami", film: "Rowdy Rathore", year: 2012, duration: 260, videoId: "zE7PWgl6gLA" },
      { id: "chat-27", title: "Pinky", artist: "Mamta Sharma & Meet Bros", film: "Zanjeer", year: 2013, duration: 251, videoId: "o1RZX4V1Xg8" },
      { id: "chat-28", title: "Jadoo Ki Jhappi", artist: "Mika Singh & Neha Kakkar", film: "Ramaiya Vastavaiya", year: 2013, duration: 217, videoId: "1_I4wg7Z70I" },
      { id: "chat-29", title: "Aa Toh Sahi", artist: "Meet Bros & Neha Kakkar", film: "Judwaa 2", year: 2017, duration: 221, videoId: "Z_b8H_4tG7w" },
      { id: "chat-30", title: "Mera Naam Mary", artist: "Chinmayi Sripada", film: "Brothers", year: 2015, duration: 311, videoId: "1R_d5kX3vL8" },
      { id: "chat-31", title: "Aao Kabhi Haveli Pe", artist: "Badshah & Nikhita Gandhi", film: "Stree", year: 2018, duration: 173, videoId: "rgXplb1kK8Q" },
      { id: "chat-32", title: "Jhalla Wallah", artist: "Shreya Ghoshal", film: "Ishaqzaade", year: 2012, duration: 351, videoId: "95I5VaR7GeU" },
      { id: "chat-33", title: "Pink Lips", artist: "Meet Bros Anjjan & Khushboo Grewal", film: "Hate Story 2", year: 2014, duration: 255, videoId: "MQM7CNoAsBI" },
      { id: "chat-34", title: "Paani Waala Dance", artist: "Ikka, Arko & Shraddha Pandit", film: "Kuch Kuch Locha Hai", year: 2015, duration: 238, videoId: "k4mR2l6iS_c" },
      { id: "chat-35", title: "Aga Bai", artist: "Shalmali Kholgade & Monali Thakur", film: "Aiyyaa", year: 2012, duration: 264, videoId: "1eYq7fDk8t4" },
      { id: "chat-36", title: "Tattoo", artist: "Shefali Alvares & Mayur Puri", film: "ABCD", year: 2013, duration: 260, videoId: "N19Yj9W2hJg" },
      { id: "chat-37", title: "Piya More", artist: "Mika Singh, Neeti Mohan & Ankit Tiwari", film: "Baadshaho", year: 2017, duration: 258, videoId: "y9q5m1u4g8E" },
      { id: "chat-38", title: "Laila", artist: "Mika Singh & Anand Raj Anand", film: "Shootout at Wadala", year: 2013, duration: 215, videoId: "kthh48z03vU" },
      { id: "chat-39", title: "Babli Badmaash", artist: "Sunidhi Chauhan & Anu Malik", film: "Shootout at Wadala", year: 2013, duration: 268, videoId: "ZTmF2v59CtI" },
      { id: "chat-40", title: "Ram Chahe Leela", artist: "Bhoomi Trivedi", film: "Goliyon Ki Raasleela Ram-Leela", year: 2013, duration: 244, videoId: "P9BsmgM9K_s" },
      { id: "chat-41", title: "Drama Queen", artist: "Shreya Ghoshal & Vishal Dadlani", film: "Hasee Toh Phasee", year: 2014, duration: 199, videoId: "7v3j9r7Pq0I" },
      { id: "chat-42", title: "Chokra Jawaan", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Ishaqzaade", year: 2012, duration: 310, videoId: "K2W6f3X8k_k" },
      { id: "chat-43", title: "Chhaliya", artist: "Sunidhi Chauhan & Vishal-Shekhar", film: "Tashan", year: 2008, duration: 286, videoId: "Y5h4Gv6L9tQ" },
      { id: "chat-44", title: "Tu Mera Hero", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 292, videoId: "0q4G7m4X9lA" },
      { id: "chat-45", title: "Zara Zara Touch Me", artist: "Monali Thakur & Pritam", film: "Race", year: 2008, duration: 286, videoId: "zE7PWgl6gLA" },
      { id: "chat-46", title: "Namak Ishq Ka", artist: "Rekha Bhardwaj", film: "Omkara", year: 2006, duration: 295, videoId: "Jn5h4rSHCol" },
      { id: "chat-47", title: "Dhoom Again", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 302, videoId: "v5v1G3pC7T8" },
      { id: "chat-48", title: "Anarkali Disco Chali", artist: "Mamta Sharma & Sukhwinder Singh", film: "Housefull 2", year: 2012, duration: 232, videoId: "1cDoRqPn9mM" },
      { id: "chat-49", title: "Right Here Right Now", artist: "Abhishek Bachchan & Sunidhi Chauhan", film: "Bluffmaster!", year: 2005, duration: 243, videoId: "o1RZX4V1Xg8" },
      { id: "chat-50", title: "Maa Da Laadla", artist: "Master Saleem", film: "Dostana", year: 2008, duration: 245, videoId: "1_I4wg7Z70I" },
    ],
  },
];
