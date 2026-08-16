import type { Metadata, Viewport } from "next";
import VercelAnalytics from "@/components/VercelAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "AadishPlayer",
  description:
    "AadishPlayer is a cozy 24/7 nostalgia radio web player with vintage vinyl and cassette aesthetics, curated Bollywood classics, and midnight lo-fi.",
  keywords: ["AadishPlayer", "nostalgia", "radio", "lofi", "retro", "vinyl", "music player", "cassette player"],
  authors: [{ name: "AadishPlayer" }],
  openGraph: {
    title: "AadishPlayer",
    description: "A cozy 24/7 nostalgia radio web player with vintage vinyl and cassette aesthetics.",
    siteName: "AadishPlayer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AadishPlayer",
    description: "A cozy 24/7 nostalgia radio web player with vintage vinyl and cassette aesthetics.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rozha+One&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://googlevideo.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://googlevideo.com" />
        <script src="https://www.youtube.com/iframe_api" async defer />
      </head>
      <body className="antialiased bg-[#050508] text-white selection:bg-amber-500/30 selection:text-amber-200">
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
