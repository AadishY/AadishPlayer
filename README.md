# 📻 AadishPlayer — 24/7 Nostalgia Radio

A cozy, single-page retro web radio station crafted with **luminous glassmorphism**, vintage **cassette & vinyl deck aesthetics**, curated **Bollywood classics**, and **midnight lo-fi beats**.

---

## ✨ Features

- **📼 Right-Border Cassette / DVD Deck Bay**:
  - Interactive multi-tape bay featuring all 3 stations (*Midnight Reverie*, *Golden Bollywood*, and *Retro Twilight Lo-Fi*).
  - Active tape pops out with real-time spinning dual spools and direct track navigation buttons.
  - Dedicated **Song Selection Popup Modal** with track durations, movie info, and one-tap playback.
- **💿 Rotating Vinyl Turntable**:
  - Tactile interactive vinyl disc with spring feedback and tap-to-play/pause.
  - Smooth seekbar, responsive track metadata, volume slider with live amplitude feedback, and minimizeable live YouTube canvas.
- **🎨 Cinematic Typography (Hindi & English)**:
  - High-impact Devanagari lettering (*"गली"*, *"सुकून"*, *"यादें"*, *"सफ़र"*, *"बरसात"*) rendered with classic serif styling.
  - Automatic switch to English *"VIBING"* quote pool on Spider-Verse themes.
  - Synchronized smooth crossfades on scene change with manual click-to-cycle support.
- **🕹️ Left-Border Quick Controls**:
  - 90-degree rotated **Scene Randomizer** button.
  - **Fullscreen Toggle** button for immersive desktop listening.
- **⏱️ Live Lucknow Studio Clock**:
  - Click-to-toggle between **12-Hour IST** (with AM/PM) and **24-Hour Studio Time**.
- **▶️ Glassmorphic YouTube Playlist Access**:
  - Header button directly opening the current station's playlist on YouTube.
- **⚡ Ultra Performance & Instant Preloading**:
  - All backdrop scenes preloaded on mount for 0ms transition latency.
  - Turbopack-powered dev server (`next dev --turbo`) with zero cache conflicts.
  - 100% responsive on mobile, tablet, and ultra-wide screens.

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

## 🌐 Deployment Compatibility

### Deploying to Vercel

1. Push your code to GitHub: [https://github.com/AadishY/AadishPLayer](https://github.com/AadishY/AadishPLayer)
2. Import the repository in [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Click **Deploy**.

### Deploying to Cloudflare Pages

1. In Cloudflare Dashboard, navigate to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
2. Select `AadishPLayer` repository.
3. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages` (or `npm run build`)
   - **Build output directory**: `.vercel/output/static` (or `.next`)
4. Click **Save and Deploy**.

---

## 🛠️ Built With

- [Next.js 15 App Router](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/) (Rozha One, Yatra One, Inter)
- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)
- [Vercel Analytics & Speed Insights](https://vercel.com/analytics)

---

## 📜 License

MIT License — Created with ❤️ by [AadishY](https://github.com/AadishY/AadishPLayer)
