"use client";

import { useState, useEffect, useRef, memo } from "react";

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
  showCenterTime?: boolean;
}

const NostalgicTitle = memo(function NostalgicTitle({ activeBg, showCenterTime = false }: NostalgicTitleProps) {
  const isSpiderman = Boolean(activeBg?.includes("spider"));
  const currentPool = isSpiderman ? SPIDERMAN_QUOTES : GENERAL_HINDI_QUOTES;

  // Deterministic SSR default (Quote 0)
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Time & Date formatting states
  const [centerTime, setCenterTime] = useState<string>("");
  const [hoursMin, setHoursMin] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [ampm, setAmpm] = useState<string>("");
  const [dayName, setDayName] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [timeStyle, setTimeStyle] = useState<number>(0); // 0 to 6 formats

  // Load saved time style from localStorage on client mount
  useEffect(() => {
    try {
      const savedStyle = localStorage.getItem("aadishplayer_time_style");
      if (savedStyle !== null) {
        const parsed = Number(savedStyle);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 6) {
          setTimeStyle(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load time style:", e);
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const parts = timeFormatter.formatToParts(now);
      const h = parts.find((p) => p.type === "hour")?.value || "12";
      const m = parts.find((p) => p.type === "minute")?.value || "00";
      const s = parts.find((p) => p.type === "second")?.value || "00";
      const period = parts.find((p) => p.type === "dayPeriod")?.value || "AM";

      // Dynamically computed weekday name (automatically changes to Tuesday, Wednesday, etc.)
      const dayFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
      });
      // Dynamically formatted date (e.g. AUG 17, 2026)
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setHoursMin(`${h}:${m}`);
      setSeconds(s);
      setAmpm(period);
      setDayName(dayFormatter.format(now).toUpperCase());
      setDateStr(dateFormatter.format(now).toUpperCase());
      setCenterTime(`${h}:${m}:${s} ${period}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initial client mount: set random quote from pool
  useEffect(() => {
    const rand = Math.floor(Math.random() * currentPool.length);
    setQuoteIndex(rand);
  }, [isSpiderman]);

  // Rotate center text every 1 minute (60 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => {
          const available = currentPool.map((_, i) => i).filter((i) => i !== prev);
          const nextIndex = available[Math.floor(Math.random() * available.length)];
          return typeof nextIndex === "number" ? nextIndex : (prev + 1) % currentPool.length;
        });
        setIsFading(false);
      }, 220);
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, [currentPool]);

  const handleCycleQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % currentPool.length);
      setIsFading(false);
    }, 180);
  };

  const handleCycleTimeStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeStyle((prev) => {
      const next = (prev + 1) % 7; // 7 formats (0 to 6)
      try {
        localStorage.setItem("aadishplayer_time_style", String(next));
      } catch (err) {
        console.warn("Could not save time style:", err);
      }
      return next;
    });
  };

  const current = currentPool[quoteIndex] || currentPool[0];

  // =========================================================================
  // FORMAT 6: FUTURISTIC GEOMETRIC DAY & DATE (PC / DESKTOP ONLY)
  // =========================================================================
  if (showCenterTime && timeStyle === 6) {
    return (
      <>
        {/* Desktop View: Day & Date Geometric Display */}
        <div
          onClick={handleCycleTimeStyle}
          title="Click to cycle time format"
          className={`pointer-events-auto cursor-pointer hidden md:flex flex-col items-center justify-center text-center select-none max-w-[92vw] mx-auto px-2 transition-all duration-500 ease-out transform ${
            isFading ? "opacity-0 scale-95 translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          {/* Sleek, Perfectly Balanced Day of the Week Header */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] 2xl:text-[8.5rem] font-black text-white leading-none tracking-[0.30em] sm:tracking-[0.40em] uppercase select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] ml-[0.30em] sm:ml-[0.40em]"
            style={{
              fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {dayName || "MONDAY"}
          </h1>

          {/* Date Row: e.g. AUG 17, 2026 */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white/90 tracking-[0.30em] uppercase mt-2 sm:mt-2.5 drop-shadow-md select-none">
            {dateStr || "17 AUG 2026"}
          </p>

          {/* Dashed Time Row: e.g. -11:56:33- */}
          <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-mono font-bold text-amber-300 tracking-[0.25em] uppercase mt-1 select-none tabular-nums drop-shadow-md">
            -{hoursMin}:{seconds}-
          </p>
        </div>

        {/* Mobile View: Clean Quote Centerpiece (NO Time) */}
        <div
          onClick={handleCycleQuote}
          title="Click to cycle quote"
          className={`pointer-events-auto cursor-pointer md:hidden flex flex-col items-center justify-center text-center select-none max-w-[76vw] mx-auto px-2 transition-all duration-500 ease-out transform hover:scale-[1.02] ${
            isFading ? "opacity-0 scale-95 translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <h1
            className="text-7xl sm:text-8xl font-black text-white leading-none select-none uppercase tracking-tight break-words"
            style={{
              fontFamily: current.isHindi
                ? "'Rozha One', 'Yatra One', 'Tiro Devanagari Hindi', serif"
                : "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-white tracking-[0.35em] uppercase mt-2.5 select-none">
            {current.subtitle}
          </p>
        </div>
      </>
    );
  }

  // =========================================================================
  // FORMAT 5: GIANT TIME CENTERPIECE (PC / DESKTOP ONLY)
  // =========================================================================
  if (showCenterTime && timeStyle === 5) {
    return (
      <>
        {/* Desktop View: Giant Clock */}
        <div
          className={`pointer-events-auto hidden md:flex flex-col items-center justify-center text-center select-none max-w-[85vw] mx-auto px-2 transition-all duration-500 ease-out transform ${
            isFading ? "opacity-0 scale-95 translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          {/* Scaled-Down Clickable Centerpiece Headline */}
          <div
            onClick={handleCycleQuote}
            title="Click to cycle quote"
            className="cursor-pointer hover:scale-105 transition-transform duration-200 mb-1"
          >
            <span
              className="text-base sm:text-xl md:text-2xl font-bold tracking-[0.35em] uppercase text-white/90 drop-shadow-md"
              style={{
                fontFamily: current.isHindi
                  ? "'Rozha One', 'Yatra One', 'Tiro Devanagari Hindi', serif"
                  : "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {current.title}
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-widest text-amber-300/80 uppercase ml-2.5">
              • {current.subtitle}
            </span>
          </div>

          {/* Scaled-UP Giant Time Centerpiece */}
          <div
            onClick={handleCycleTimeStyle}
            title="Click to cycle time format"
            className="cursor-pointer group transition-transform duration-300 active:scale-95 flex items-baseline justify-center"
          >
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[13.5rem] font-black text-white leading-none tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] tabular-nums flex items-baseline">
              <span>{hoursMin}</span>
              <span className="text-amber-400 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ml-1.5 sm:ml-3 animate-pulse">
                :{seconds}
              </span>
              <span className="text-xs sm:text-base md:text-xl lg:text-2xl font-extrabold uppercase text-white/60 ml-2 sm:ml-4 tracking-widest">
                {ampm}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile View: Clean Quote Centerpiece (NO Time) */}
        <div
          onClick={handleCycleQuote}
          title="Click to cycle quote"
          className={`pointer-events-auto cursor-pointer md:hidden flex flex-col items-center justify-center text-center select-none max-w-[76vw] mx-auto px-2 transition-all duration-500 ease-out transform hover:scale-[1.02] ${
            isFading ? "opacity-0 scale-95 translate-y-1" : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <h1
            className="text-7xl sm:text-8xl font-black text-white leading-none select-none uppercase tracking-tight break-words"
            style={{
              fontFamily: current.isHindi
                ? "'Rozha One', 'Yatra One', 'Tiro Devanagari Hindi', serif"
                : "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-white tracking-[0.35em] uppercase mt-2.5 select-none">
            {current.subtitle}
          </p>
        </div>
      </>
    );
  }

  // =========================================================================
  // STANDARD FORMATS (0 to 4): Full Big Headline + Optional Center Time Badge (PC Only)
  // =========================================================================
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

      {/* Center Live Time with Interactive Click-to-Cycle Styles */}
      {showCenterTime && centerTime && (
        <div
          onClick={handleCycleTimeStyle}
          title="Click to change time format/style"
          className="block mt-3 sm:mt-4 cursor-pointer transition-all duration-300 active:scale-95 group select-none"
        >
          {/* Format 0: Luminous Glass Badge */}
          {timeStyle === 0 && (
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full glass-badge border border-white/25 bg-black/40 text-amber-300 shadow-2xl backdrop-blur-2xl animate-fadeIn hover:border-amber-400/60">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs sm:text-sm md:text-base font-mono font-black tracking-wider text-white tabular-nums">
                {centerTime}
              </span>
            </div>
          )}

          {/* Format 1: Massive Bold Raw Typography (NO Glassmorphism) */}
          {timeStyle === 1 && (
            <div className="flex flex-col items-center justify-center animate-fadeIn group-hover:scale-105 transition-transform">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tabular-nums">
                {hoursMin}
                <span className="text-amber-400 text-lg sm:text-2xl font-bold ml-1.5">:{seconds}</span>
                <span className="text-xs sm:text-sm font-extrabold uppercase text-white/70 ml-2 tracking-widest">{ampm}</span>
              </div>
            </div>
          )}

          {/* Format 2: Retro Digital LED Studio Display */}
          {timeStyle === 2 && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-black/80 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-fadeIn text-amber-400 font-mono">
              <span className="text-xs font-bold text-amber-400/70">REC ●</span>
              <span className="text-sm sm:text-lg font-black tracking-widest tabular-nums drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
                {hoursMin}:{seconds} {ampm}
              </span>
            </div>
          )}

          {/* Format 3: Minimalist Wide-Tracked Clean White (NO Box / Minimal) */}
          {timeStyle === 3 && (
            <div className="flex items-center gap-2 text-white/90 font-mono text-sm sm:text-base tracking-[0.25em] uppercase font-bold drop-shadow-md animate-fadeIn">
              <span>{hoursMin}</span>
              <span className="text-amber-400 animate-pulse">:</span>
              <span>{seconds}</span>
              <span className="text-amber-300 font-extrabold">{ampm}</span>
              <span className="text-white/40 text-xs tracking-widest">• LUCKNOW</span>
            </div>
          )}

          {/* Format 4: Cyberpunk Glowing Neon Pill */}
          {timeStyle === 4 && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 via-black/80 to-amber-900/60 border border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-fadeIn">
              <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200 tracking-wider tabular-nums font-mono">
                ⚡ {centerTime}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default NostalgicTitle;
