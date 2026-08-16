# 📻 AadishPlayer — 24/7 Nostalgia Radio

A cozy, single-page retro web radio station crafted with **luminous glassmorphism**, vintage **cassette & vinyl deck aesthetics**, curated **Bollywood classics**, **midnight lo-fi beats**, and **ultra-smooth GPU-accelerated interaction physics**.

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

## 📻 Curated Radio Stations (153 Tracks)

1. **`NotIndian` (Side A • 53 Tracks)**:
   - Late night phonk, anime loops, sped-up & lo-fi beats (*Sunflower*, *Misery.*, *Sweet little Bumble Bee*, *SugarCrash!*, *Cupid*, *Young Girl A*, *Brazilian Phonk*, *After Dark*, *Resonance*, *Memory Reboot*, etc.).
   - Atmospheric cyberpunk & neon skyline scenes (*spider.webp*, *spider2.webp*).

2. **`Indian Saloon` (Side B • 50 Tracks)**:
   - Evergreen 2000s monsoon melodies & road trip anthems (*Iktara*, *Tum Se Hi*, *Phir Se Ud Chala*, *Kya Mujhe Pyar Hai*, *Zara Zara*, *Pee Loon*, *Aadat*, *Kabira*, *Kun Faya Kun*, *Mitwa*, etc.).
   - Weighted background probability: **48% Vintage Indian Saloon**, **48% Urban House Stall DJ**, **4% Retro Scenes**.

3. **`Chatpate Gaane` (Side C • 50 Tracks 🫦)**:
   - Spicy desi dance hits, item bangers & party anthems (*Pink Lips*, *Paani Waala Dance*, *Aga Bai*, *Fevicol Se*, *Dilliwaali Girlfriend*, *Munni Badnaam*, *Character Dheela*, *Afghan Jalebi*, *Baby Doll*, *Chikni Chameli*, *Sheila Ki Jawani*, etc.).
   - High-energy distribution across retro consoles, midnight jazz clubs, and study lamps.

---

## ✨ Features & Architecture

- **🎚️ Dynamic Mode (Auto-Hide ON / OFF)**:
   - **`DYN ON` (Default)**: On page load or playlist change, all controls, headers, and cassette decks are visible for **10 seconds**, then smoothly tuck away into the screen edges for a clean cinematic view.
   - **Proximity Edge Gliding**: Moving the cursor towards any screen edge instantly slides out that respective control drawer (`< 110px` top for Header, `< 220px` left for Scene/Fullscreen, `> window.innerWidth - 260px` right for 3D Cassette Deck).
   - **`DYN OFF`**: Keeps all controls permanently visible and fully expanded.
- **🌙 Dull Mode (Background Dim Controller)**:
   - Default **15% blackness overlay** for optimal visual contrast.
   - 1-tap cycle (`0% -> 15% -> 40% -> 70% -> 0%`) and slider control with quick presets.
- **💾 LocalStorage Settings Persistence**:
   - Automatically saves and restores your preferred **Dullness Opacity** and **Dynamic Auto-Hide Mode**.
- **💿 Interactive Vinyl Turntable Centerpiece**:
   - Tactile rotating vinyl disc with live cover art, center spindle, and tap-to-play/pause.
   - Proximity-based idle scale-down (`76%`) with hardware-accelerated 700ms `cubic-bezier(0.22, 1, 0.36, 1)` easing.
- **📼 3D Cassette Deck & Mobile DVD Spool Rack**:
   - **Desktop**: Right-docked 3D cassette rack with dual spinning hubs when playing.
   - **Mobile**: Docked bottom station changer featuring mini vintage cassette artwork with spinning spools, glowing amber active borders, and in-player `♫ 53` song drawer button.
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
