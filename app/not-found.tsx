import Link from "next/link";

export default function NotFound() {
  return (
    <main className="isolate relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden text-center p-6">
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/50 via-black/30 to-black/80 pointer-events-none" />
      <div className="glass-card rounded-[28px] p-8 max-w-md w-full border border-white/15 shadow-2xl flex flex-col items-center">
        <span className="text-4xl mb-2">📻</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Station Off-Air (404)</h1>
        <p className="text-sm text-white/70 mt-2">
          The requested nostalgic frequency could not be tuned.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 font-semibold text-xs tracking-wider uppercase shadow-lg hover:scale-105 transition-transform"
        >
          Return to Radio
        </Link>
      </div>
    </main>
  );
}
