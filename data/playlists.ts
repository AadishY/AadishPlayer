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
      { id: "chat-1", title: "Pink Lips", artist: "Meet Bros Anjjan & Khushboo Grewal", film: "Hate Story 2", year: 2014, duration: 255, videoId: "f6M8u7y1V9k" },
      { id: "chat-2", title: "Paani Waala Dance", artist: "Ikka, Arko & Shraddha Pandit", film: "Kuch Kuch Locha Hai", year: 2015, duration: 238, videoId: "kL8Z7X9V1Q8" },
      { id: "chat-3", title: "Aga Bai", artist: "Shalmali Kholgade & Monali Thakur", film: "Aiyyaa", year: 2012, duration: 264, videoId: "yX1L4Q7Z9V8" },
      { id: "chat-4", title: "Tattoo", artist: "Shefali Alvares & Mayur Puri", film: "ABCD", year: 2013, duration: 260, videoId: "p1Zt47VWTtg" },
      { id: "chat-5", title: "Piya More", artist: "Mika Singh, Neeti Mohan & Ankit Tiwari", film: "Baadshaho", year: 2017, duration: 258, videoId: "Z0y3tK4qT8k" },
      { id: "chat-6", title: "Fevicol Se", artist: "Mamta Sharma & Wajid", film: "Dabangg 2", year: 2012, duration: 290, videoId: "zE7PWgl6gLA" },
      { id: "chat-7", title: "Dilliwaali Girlfriend", artist: "Arijit Singh & Sunidhi Chauhan", film: "Yeh Jawaani Hai Deewani", year: 2013, duration: 261, videoId: "1cDoRqPn9mM" },
      { id: "chat-8", title: "Tum Hi Ho Bandhu", artist: "Neeraj Shridhar & Kavita Seth", film: "Cocktail", year: 2012, duration: 284, videoId: "o1RZX4V1Xg8" },
      { id: "chat-9", title: "Munni Badnaam", artist: "Mamta Sharma & Aishwarya", film: "Dabangg", year: 2010, duration: 305, videoId: "Jn5h4rSHCol" },
      { id: "chat-10", title: "Character Dheela", artist: "Neeraj Shridhar & Amrita Kak", film: "Ready", year: 2011, duration: 226, videoId: "v5v1G3pC7T8" },
      { id: "chat-11", title: "Ucha Lamba Kad", artist: "Anand Raj Anand & Kalpana Patowary", film: "Welcome", year: 2007, duration: 278, videoId: "V3b9X1L4Q7Z" },
      { id: "chat-12", title: "Afghan Jalebi", artist: "Asrar & Akhtar Chinnal", film: "Phantom", year: 2015, duration: 224, videoId: "1_I4wg7Z70I" },
      { id: "chat-13", title: "Hoth Rasiley", artist: "Shankar Mahadevan & Shreya Ghoshal", film: "Welcome", year: 2007, duration: 279, videoId: "g1v4Q7Z9xL8" },
      { id: "chat-14", title: "Kiya Kiya", artist: "Anand Raj Anand & Shweta Pandit", film: "Welcome", year: 2007, duration: 301, videoId: "t8xL4Q7Z9v1" },
      { id: "chat-15", title: "Lat Lag Gayee", artist: "Benny Dayal & Shalmali Kholgade", film: "Race 2", year: 2013, duration: 280, videoId: "Z_b8H_4tG7w" },
      { id: "chat-16", title: "Aa Re Pritam Pyaare", artist: "Mamta Sharma & Sarosh Sami", film: "Rowdy Rathore", year: 2012, duration: 260, videoId: "6Z8X9v1L4Q7" },
      { id: "chat-17", title: "Pinky", artist: "Mamta Sharma & Meet Bros", film: "Zanjeer", year: 2013, duration: 251, videoId: "q4X9v1L7Z8T" },
      { id: "chat-18", title: "Ooh La La", artist: "Bappi Lahiri & Shreya Ghoshal", film: "The Dirty Picture", year: 2011, duration: 256, videoId: "1R_d5kX3vL8" },
      { id: "chat-19", title: "Wakhra Swag", artist: "Navv Inder & Badshah", film: "Wakhra Swag", year: 2015, duration: 191, videoId: "rgXplb1kK8Q" },
      { id: "chat-20", title: "Laila Main Laila", artist: "Pawni Pandey", film: "Raees", year: 2017, duration: 307, videoId: "95I5VaR7GeU" },
      { id: "chat-21", title: "Jadoo Ki Jhappi", artist: "Mika Singh & Neha Kakkar", film: "Ramaiya Vastavaiya", year: 2013, duration: 217, videoId: "yX1L4Q7Z9V8" },
      { id: "chat-22", title: "Aa Toh Sahi", artist: "Meet Bros & Neha Kakkar", film: "Judwaa 2", year: 2017, duration: 221, videoId: "4X7y9v1L4Q8" },
      { id: "chat-23", title: "Mera Naam Mary", artist: "Chinmayi Sripada", film: "Brothers", year: 2015, duration: 311, videoId: "8X9v1L4Q7Z8" },
      { id: "chat-24", title: "Aao Kabhi Haveli Pe", artist: "Badshah & Nikhita Gandhi", film: "Stree", year: 2018, duration: 173, videoId: "v_X9L14Q7Z8" },
      { id: "chat-25", title: "Jhalla Wallah", artist: "Shreya Ghoshal", film: "Ishaqzaade", year: 2012, duration: 351, videoId: "p1L4Q7Z8X9V" },
      { id: "chat-26", title: "Baby Doll", artist: "Kanika Kapoor & Meet Bros", film: "Ragini MMS 2", year: 2014, duration: 214, videoId: "kthh48z03vU" },
      { id: "chat-27", title: "Laila", artist: "Mika Singh & Anand Raj Anand", film: "Shootout at Wadala", year: 2013, duration: 215, videoId: "z8X9v1L4Q7T" },
      { id: "chat-28", title: "Babli Badmaash", artist: "Sunidhi Chauhan & Anu Malik", film: "Shootout at Wadala", year: 2013, duration: 268, videoId: "1L4Q7Z8X9v2" },
      { id: "chat-29", title: "Ram Chahe Leela", artist: "Bhoomi Trivedi", film: "Goliyon Ki Raasleela Ram-Leela", year: 2013, duration: 244, videoId: "Q8xL4Q7Z9V1" },
      { id: "chat-30", title: "Drama Queen", artist: "Shreya Ghoshal & Vishal Dadlani", film: "Hasee Toh Phasee", year: 2014, duration: 199, videoId: "9V8xL4Q7Z1T" },
      { id: "chat-31", title: "Chokra Jawaan", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Ishaqzaade", year: 2012, duration: 310, videoId: "7X9v1L4Q8Z1" },
      { id: "chat-32", title: "Chhaliya", artist: "Sunidhi Chauhan & Vishal-Shekhar", film: "Tashan", year: 2008, duration: 286, videoId: "X9v1L4Q7Z8T" },
      { id: "chat-33", title: "Tu Mera Hero", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 292, videoId: "k4Q7Z8X9v1L" },
      { id: "chat-34", title: "Zara Zara Touch Me", artist: "Monali Thakur & Pritam", film: "Race", year: 2008, duration: 286, videoId: "d3X9v1L4Q7Z" },
      { id: "chat-35", title: "Dard-E-Disco", artist: "Sukhwinder Singh & Marianne", film: "Om Shanti Om", year: 2007, duration: 271, videoId: "8x1L4Q7Z9V2" },
      { id: "chat-36", title: "Kajra Re", artist: "Alisha Chinai, Shankar Mahadevan & Javed Ali", film: "Bunty Aur Babli", year: 2005, duration: 483, videoId: "x_7V1L4Q7Z8" },
      { id: "chat-37", title: "Beedi", artist: "Sunidhi Chauhan & Sukhwinder Singh", film: "Omkara", year: 2006, duration: 305, videoId: "m4Q7Z8X9v1L" },
      { id: "chat-38", title: "Namak Ishq Ka", artist: "Rekha Bhardwaj", film: "Omkara", year: 2006, duration: 295, videoId: "k4Q7Z8X9v1L" },
      { id: "chat-39", title: "Crazy Kiya Re", artist: "Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 294, videoId: "6Z8X9v1L4Q7" },
      { id: "chat-40", title: "Dhoom Again", artist: "Vishal Dadlani & Sunidhi Chauhan", film: "Dhoom 2", year: 2006, duration: 302, videoId: "1R_d5kX3vL8" },
      { id: "chat-41", title: "Chikni Chameli", artist: "Shreya Ghoshal", film: "Agneepath", year: 2012, duration: 303, videoId: "rgXplb1kK8Q" },
      { id: "chat-42", title: "Sheila Ki Jawani", artist: "Sunidhi Chauhan & Vishal Dadlani", film: "Tees Maar Khan", year: 2010, duration: 283, videoId: "95I5VaR7GeU" },
      { id: "chat-43", title: "Anarkali Disco Chali", artist: "Mamta Sharma & Sukhwinder Singh", film: "Housefull 2", year: 2012, duration: 232, videoId: "yX1L4Q7Z9V8" },
      { id: "chat-44", title: "Right Here Right Now", artist: "Abhishek Bachchan & Sunidhi Chauhan", film: "Bluffmaster!", year: 2005, duration: 243, videoId: "4X7y9v1L4Q8" },
      { id: "chat-45", title: "Desi Girl", artist: "Shankar Mahadevan & Sunidhi Chauhan", film: "Dostana", year: 2008, duration: 306, videoId: "8X9v1L4Q7Z8" },
      { id: "chat-46", title: "Maa Da Laadla", artist: "Master Saleem", film: "Dostana", year: 2008, duration: 245, videoId: "v_X9L14Q7Z8" },
      { id: "chat-47", title: "Subha Hone Na De", artist: "Mika Singh & Shefali Alvares", film: "Desi Boyz", year: 2011, duration: 288, videoId: "p1L4Q7Z8X9V" },
      { id: "chat-48", title: "Dhating Naach", artist: "Shefali Alvares & Nakash Aziz", film: "Phata Poster Nikhla Hero", year: 2013, duration: 191, videoId: "kthh48z03vU" },
      { id: "chat-49", title: "Gandi Baat", artist: "Mika Singh & Kalpana Patowary", film: "R... Rajkumar", year: 2013, duration: 253, videoId: "z8X9v1L4Q7T" },
      { id: "chat-50", title: "Saree Ke Fall Sa", artist: "Antara Mitra & Nakash Aziz", film: "R... Rajkumar", year: 2013, duration: 233, videoId: "1L4Q7Z8X9v2" },
    ],
  },
];
