"use client";

import { useState, useEffect, useRef } from "react";

export interface TitleItem {
  title: string;
  subtitle: string;
  isHindi: boolean;
}

export const SPIDERMAN_QUOTES: TitleItem[] = [
  { title: "VIBING", subtitle: "MIDNIGHT ROOFTOP FREQUENCIES", isHindi: false },
  { title: "DRIFTING", subtitle: "INTO THE SPIDER-VERSE", isHindi: false },
  { title: "NIGHT CITY", subtitle: "SUNFLOWER DREAMS & RAIN", isHindi: false },
  { title: "CHILLING", subtitle: "LATE NIGHT LO-FI VIBES", isHindi: false },
  { title: "AFTER DARK", subtitle: "MIDNIGHT REVERIE RADIO", isHindi: false },
  { title: "LEAP OF FAITH", subtitle: "WHAT'S UP DANGER", isHindi: false },
  { title: "ECHOES", subtitle: "LOST IN NEON FREQUENCIES", isHindi: false },
  { title: "SOLITUDE", subtitle: "BROOKLYN 2:00 AM", isHindi: false },
];

export const GENERAL_HINDI_QUOTES: TitleItem[] = [
  { title: "गली", subtitle: "A LITTLE PIECE OF INDIA", isHindi: true },
  { title: "सुकून", subtitle: "WHERE TIME SLOWS DOWN", isHindi: true },
  { title: "यादें", subtitle: "STORIES WOVEN IN CASSETTES", isHindi: true },
  { title: "सफ़र", subtitle: "LOST IN RETRO FREQUENCIES", isHindi: true },
  { title: "बरसात", subtitle: "CHAI, RAIN & 2000s MELODIES", isHindi: true },
  { title: "शाम", subtitle: "GOLDEN HOUR NOSTALGIA", isHindi: true },
  { title: "धड़कन", subtitle: "ECHOES OF VINTAGE BOLLYWOOD", isHindi: true },
  { title: "ख्वाब", subtitle: "DREAMING IN NEON & CHILL", isHindi: true },
  { title: "राब्ता", subtitle: "CONNECTED ACROSS MEMORIES", isHindi: true },
  { title: "महफ़िल", subtitle: "LATE NIGHT NOSTALGIA VIBES", isHindi: true },
  { title: "फुर्सत", subtitle: "MOMENTS FROZEN IN RETRO TAPE", isHindi: true },
  { title: "आशिकी", subtitle: "MELODIES OF YESTERDAY", isHindi: true },
  { title: "पहचान", subtitle: "ROOTS & RETRO BEATS", isHindi: true },
];

interface NostalgicTitleProps {
  activeBg?: string;
}

export default function NostalgicTitle({ activeBg }: NostalgicTitleProps) {
  const isSpiderman = Boolean(activeBg?.includes("spider"));
  const currentPool = isSpiderman ? SPIDERMAN_QUOTES : GENERAL_HINDI_QUOTES;

  // Deterministic SSR default (Quote 0)
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const isFirstMount = useRef(true);

  // When background changes or on client mount, pick random quote from matching pool
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      const rand = Math.floor(Math.random() * currentPool.length);
      setQuoteIndex(rand);
      return;
    }

    setIsFading(true);
    const timeout = setTimeout(() => {
      setQuoteIndex((prev) => {
        const available = currentPool.map((_, i) => i).filter((i) => i !== prev);
        const nextIndex = available[Math.floor(Math.random() * available.length)];
        return typeof nextIndex === "number" ? nextIndex : (prev + 1) % currentPool.length;
      });
      setIsFading(false);
    }, 220);

    return () => clearTimeout(timeout);
  }, [activeBg, isSpiderman]);

  const handleCycleQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % currentPool.length);
      setIsFading(false);
    }, 180);
  };

  const current = currentPool[quoteIndex] || currentPool[0];

  return (
    <div
      onClick={handleCycleQuote}
      title="Click to cycle quote"
      className={`pointer-events-auto cursor-pointer flex flex-col items-center justify-center text-center select-none ${
        current.isHindi
          ? "max-w-[76vw] sm:max-w-[68vw] md:max-w-[62vw] lg:max-w-[56vw]"
          : "max-w-[72vw] sm:max-w-[64vw] md:max-w-[58vw] lg:max-w-[52vw]"
      } mx-auto px-2 transition-all duration-500 ease-out transform hover:scale-[1.02] ${
        isFading ? "opacity-0 scale-95 translate-y-1" : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      {/* Massive Clean Headline with Classic Serif / Modern Typography */}
      <h1
        className={`${
          current.isHindi
            ? "text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12.5rem] 2xl:text-[14.5rem]"
            : "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] 2xl:text-[10rem]"
        } font-black text-white leading-none select-none uppercase tracking-tight break-words`}
        style={{
          fontFamily: current.isHindi
            ? "'Rozha One', 'Yatra One', 'Tiro Devanagari Hindi', serif"
            : "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {current.title}
      </h1>

      {/* Clean Tracked Subtitle without shadow */}
      <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white tracking-[0.35em] uppercase mt-2.5 sm:mt-3 select-none">
        {current.subtitle}
      </p>
    </div>
  );
}
