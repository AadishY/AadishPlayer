import NostalgiaApp from "@/components/NostalgiaApp";

export default function Home() {
  return (
    <main className="isolate relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* 1. Fixed Background Layer (-z-20) with default scene-wide / scene-tall and Gradient Overlay */}
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/35 via-transparent to-black/80 pointer-events-none" />

      {/* 2. Fixed Grain Overlay (-z-10) with SVG feTurbulence */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.3,
        }}
      />

      {/* 3 & 4. Fixed Top Row, Floating Centerpiece Player & Dynamic Background Controls */}
      <NostalgiaApp />
    </main>
  );
}
