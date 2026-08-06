import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEDxBITSHyderabad - Which Speaker Are You?",
  description: "Find out which TEDxBITSHyderabad speaker matches your personality in this quick quiz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ParticleBackground />
        <div className="crosses-container">
          <div className="floating-cross cross-1">+</div>
          <div className="floating-cross cross-2">+</div>
          <div className="floating-cross cross-3">+</div>
          <div className="floating-cross cross-4">+</div>
        </div>
        <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 100 }}>
          <img src="/logo-white.png" alt="TEDxBITSHyderabad Logo" style={{ height: '40px', width: 'auto' }} />
        </div>
        {children}
      </body>
    </html>
  );
}
