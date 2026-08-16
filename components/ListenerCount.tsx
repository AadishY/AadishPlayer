"use client";

interface ListenerCountProps {
  isPlaying?: boolean;
}

export default function ListenerCount({ isPlaying = false }: ListenerCountProps) {
  return (
    <div className="glass-badge flex items-center gap-3 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-sm text-white/90 backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-white/[0.15] select-none shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]">
      {/* Live pulsating dot indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/40" />
        )}
      </span>

      {/* Aadish Live Views Counter Badge (High Visibility & Prominent Size) */}
      <div className="flex items-center gap-2 h-7 sm:h-8">
        <img
          src="https://aadishcounter.vercel.app/@playlist:1657?theme=random-animation&padding=7&crop=true&count-view=true"
          alt="Live Listened Views"
          className="h-6 sm:h-7.5 w-auto object-contain shrink-0 filter drop-shadow-md rounded-xs"
          loading="eager"
        />
        <span className="text-white/80 font-medium text-xs sm:text-[13px] tracking-wide">
          listened
        </span>
      </div>
    </div>
  );
}
