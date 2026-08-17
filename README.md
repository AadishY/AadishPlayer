# 📻 AadishPlayer — 24/7 Nostalgia Radio

A cozy, single-page retro web radio station crafted with **luminous glassmorphism**, vintage **cassette & vinyl deck aesthetics**, curated **Bollywood classics**, **midnight lo-fi beats**, **7 dynamic clock styles**, and **ultra-smooth GPU-accelerated interaction physics**.

---

## 🌐 Live Deployments

- 🚀 **Primary Live Demo (Cloudflare Pages)**: [https://aadishplayer.pages.dev/](https://aadishplayer.pages.dev/)
- ⚡ **Alternate Mirror (Vercel)**: [https://aadishplayer.vercel.app/](https://aadishplayer.vercel.app/)
- 📦 **GitHub Repository**: [https://github.com/AadishY/AadishPLayer](https://github.com/AadishY/AadishPLayer)

---

## 👨‍💻 About the Creator

Created with ❤️ by **Aadish Yadav**

- **GitHub Profile**: [@AadishY](https://github.com/AadishY)
- **Project Repository**: [AadishPlayer](https://github.com/AadishY/AadishPLayer)
- **Live URL**: [aadishplayer.pages.dev](https://aadishplayer.pages.dev/)
- **Mirror**: [aadishplayer.vercel.app](https://aadishplayer.vercel.app/)

---

## 📻 Curated Radio Stations (162 Tracks)

1. **`NotIndian` (Side A • 9 Tracks)**:
   - Handpicked late night anime loops, sped-up edits & lo-fi beats (*Sunflower*, *Misery.*, *Discord x My Ordinary Life*, *Montagem Santa Fe 2*, *birds for some reason*, *Bayle the Dread*, *CURSE YOU BAYLE*, *Young Girl A*, *Babydoll*).
   - Atmospheric cyberpunk & neon skyline scenes (*spider.webp*, *spider2.webp*).

2. **`Indian Saloon` (Side B • 50 Tracks)**:
   - Evergreen 2000s monsoon melodies & road trip anthems (*Iktara*, *Tum Se Hi*, *Phir Se Ud Chala*, *Kya Mujhe Pyar Hai*, *Zara Zara*, *Pee Loon*, *Aadat*, *Kabira*, *Kun Faya Kun*, *Mitwa*, etc.).
   - Weighted background probability: **48% Vintage Indian Saloon**, **48% Urban House Stall DJ**, **4% Retro Scenes**.

3. **`Chatpate Gaane` (Side C • 50 Tracks 🫦)**:
   - Spicy desi dance hits, item bangers & party anthems (*Pink Lips*, *Paani Waala Dance*, *Aga Bai*, *Fevicol Se*, *Dilliwaali Girlfriend*, *Munni Badnaam*, *Character Dheela*, *Afghan Jalebi*, *Baby Doll*, *Chikni Chameli*, *Sheila Ki Jawani*, etc.).
   - High-energy distribution across retro consoles, midnight jazz clubs, and study lamps.

4. **`Gaming` (Side D • 53 Tracks 🎮)**:
   - 53 late night phonk, anime loops, sped-up & gaming beats (*Sunflower*, *Misery.*, *Sweet little Bumble Bee*, *SugarCrash!*, *Cupid*, *Young Girl A*, *Brazilian Phonk*, *After Dark*, *Resonance*, *Memory Reboot*, *GigaChad Theme*, *Rave*, *Snowfall*, etc.).
   - Weighted background probability: **84% prioritized across 90s Retro Console (`console.webp`), Vintage Twilight Cassette (`music-box.webp`), and Morning Balcony Table (`table.webp`)**, with 16% distributed across other scenes.

---

## ✨ Features & Architecture

- **🎚️ Dynamic Mode & Gesture Interaction Engine**:
  - **`DYN ON` (Default)**: On page load or playlist change, all controls, headers, and cassette decks remain visible for **10 seconds**, then smoothly tuck away into screen edges for a clean cinematic view.
  - **Single-Tap / Single-Click**: Instantly reveals **TopBar, LeftControls, DVD station cards, and Full Vinyl Player** at 100% full scale for 10 seconds.
  - **Double-Tap / Double-Click**: Unconditionally hides all UI elements into pure wallpaper mode **regardless of whether Dynamic mode is ON or OFF**.
  - **Proximity Edge Gliding (PC)**: Moving cursor towards any screen edge smoothly slides out that respective control drawer (`< 110px` top for Header, `< 220px` left for Controls, `> window.innerWidth - 260px` right for 3D Cassette Deck).

- **🕰️ 7 Click-to-Cycle Live Clock Styles (PC Only)**:
  - **Format 0**: Luminous Glass Badge (`● 11:56:33 AM`).
  - **Format 1**: Massive Bold Raw Typography.
  - **Format 2**: Retro Studio Digital LED (`REC ● 11:56:33 AM`).
  - **Format 3**: Minimalist Wide-Tracked Clean White (`11 : 56 : 33 AM • LUCKNOW`).
  - **Format 4**: Cyberpunk Glowing Neon Pill (`⚡ 11:56:33 AM`).
  - **Format 5**: Giant Centerpiece Clock (Quote scales down into header, Time numbers expand to massive hero size).
  - **Format 6**: Futuristic Geometric Day & Date format (`MONDAY`, `17 AUG 2026`, `-11:56:33-`).
  - **Dynamic Calendar Logic**: Weekday name dynamically advances (`MONDAY` ➔ `TUESDAY` at midnight IST) with zero hardcoded strings.
  - **Clean Mobile Typography**: Mobile screens remain pristine with clean retro Hindi/English quote typography (`गली`, `सुकून`, `VIBING`, etc.).

- **🖼️ 30-Second Automatic Wallpaper Rotation**:
  - Automatically transitions to a new weighted background scene every **30 seconds** with smooth 1000ms cross-fades.
  - Decoupled from center quote rotation (quotes rotate smoothly every 1 minute).

- **🌙 Dull Mode (Background Dim Controller)**:
  - Default **15% blackness overlay** for optimal visual contrast.
  - 1-tap cycle (`0% -> 15% -> 40% -> 70% -> 0%`) and slider control with quick presets.

- **💾 LocalStorage Settings Persistence**:
  - Automatically saves and restores your preferred **Dullness Opacity**, **Dynamic Auto-Hide Mode**, **Center Time Toggle**, and **Clock Style**.

- **💿 Interactive Vinyl Turntable Centerpiece**:
  - Tactile rotating vinyl disc with live cover art, center spindle, and tap-to-play/pause.
  - Proximity-based idle scale-down (`78%`) with hardware-accelerated 700ms `cubic-bezier(0.22, 1, 0.36, 1)` easing.

- **📼 3D Desktop Cassette Deck & Mobile DVD Station Bay**:
  - **Desktop**: Anchored directly to the true **rightmost border of the browser window** (`fixed right-0 top-1/2 -translate-y-1/2`) with dual spinning tape reels when playing.
  - **Mobile**: Zero-overlap vertically stacked bottom station bay with collapsible slide physics.

- **⚡ Instant 144p Streaming & Zero Buffer**:
  - Streamlined low-latency audio using YouTube's `tiny` (144p) quality profile.
  - Pre-connected CDNs, DNS prefetching, and prioritized background scene preloading.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / Pause Toggle |
| `→` (Right Arrow) | Next Track |
| `←` (Left Arrow) | Previous Track |
| `M` | Mute / Unmute Volume |
| `S` | Randomize Background Scene |
| `F` | Toggle Fullscreen Mode |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/AadishY/AadishPLayer.git

# Enter the project directory
cd AadishPLayer

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Cloud Deployment

### Deploying to Cloudflare Pages (Recommended)

1. Connect your GitHub repository [https://github.com/AadishY/AadishPLayer](https://github.com/AadishY/AadishPLayer) in Cloudflare Pages.
2. Configure build settings:
   - **Framework preset**: `Next.js (Static HTML Export)` or `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
3. Click **Save and Deploy**.

### Deploying to Vercel

1. Import the repository in [Vercel Dashboard](https://vercel.com/new).
2. Framework preset: `Next.js`
3. Click **Deploy**.

---

## 🛠️ Built With

- [Next.js 15 App Router](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/) (Rozha One, Yatra One, Inter, Outfit)
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)
- [Vercel Analytics & Speed Insights](https://vercel.com/analytics)

---

## 📜 License

MIT License — Created with ❤️ by [Aadish Yadav](https://github.com/AadishY)
