import type { Metadata } from "next";
import {
  Zen_Old_Mincho,
  Press_Start_2P,
  Inter,
  Erica_One,
  Road_Rage,
} from "next/font/google";

import "./globals.css";

const display = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const ericaOne = Erica_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-erica",
});

const roadRage = Road_Rage({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-road-rage",
});

export const metadata: Metadata = {
  title: "HANAFUBUKI — Sakura Mint",
  description: "A falling-petal mint experience. Check eligibility, then claim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${pixel.variable} ${body.variable} ${ericaOne.variable} ${roadRage.variable}`}
    >
      <body className="bg-ink text-sakura-50 font-body antialiased">
        {children}
      </body>
    </html>
  );
}