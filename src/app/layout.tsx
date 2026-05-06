import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fob.club"),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
  },
  title: "FOB Golf League | fob.club",
  description:
    "The Friends of Bellevue Golf League — 100 players, 8 rounds, premier courses across Greater Boston. Season standings, schedule, and more.",
  keywords: [
    "FOB Golf League",
    "Friends of Bellevue",
    "golf league",
    "Bellevue Golf Club",
    "Boston golf",
    "fob.club",
  ],
  openGraph: {
    title: "FOB Golf League",
    description:
      "100 players. 8 rounds. Premier courses. The FOB Golf League — Greater Boston's premier member golf league.",
    type: "website",
    images: [
      {
        url: "/images/fob-golf-logo.png",
        width: 800,
        height: 800,
        alt: "FOB Golf League",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
