"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [timeState, setTimeState] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    period: string;
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Asia/Kolkata is the standard IANA timezone for Lucknow & IST
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: !is24Hour,
      });

      const parts = formatter.formatToParts(now);
      const hours = parts.find((p) => p.type === "hour")?.value || "";
      const minutes = parts.find((p) => p.type === "minute")?.value || "";
      const seconds = parts.find((p) => p.type === "second")?.value || "";
      const period = parts.find((p) => p.type === "dayPeriod")?.value || "";

      setTimeState({ hours, minutes, seconds, period });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  const toggleFormat = () => {
    setIs24Hour((prev) => !prev);
  };

  if (!timeState) {
    return (
      <div className="glass-badge flex items-center gap-1.5 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs text-white/90 backdrop-blur-md shadow-lg border border-white/20">
        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-400/80 animate-pulse" />
        <span className="tabular-nums font-medium tracking-wide">--:--</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleFormat}
      title="Click to toggle 12h / 24h Studio Time"
      className="glass-badge group flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-white/[0.18] active:scale-95 shadow-lg border border-white/20 cursor-pointer select-none"
    >
      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] group-hover:scale-125 transition-transform shrink-0" />
      <span className="tabular-nums font-bold tracking-wider text-[11.5px] sm:text-[13px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {timeState.hours}
        <span className="animate-colon-blink inline-block text-amber-400 font-extrabold mx-[1px]">:</span>
        {timeState.minutes}
        {!is24Hour && (
          <span className="ml-0.5 text-[9.5px] sm:text-[11px] uppercase font-medium text-amber-200/90 tracking-normal">
            {timeState.period}
          </span>
        )}
      </span>
      <span className="text-[8.5px] sm:text-[10px] uppercase font-mono tracking-widest text-amber-300/90 border-l border-white/20 pl-1.5 sm:pl-2 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        <span className="hidden sm:inline">LUCKNOW </span>{is24Hour ? "24H" : "IST"}
      </span>
    </button>
  );
}
