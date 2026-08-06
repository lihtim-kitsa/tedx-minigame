import type { Metadata } from "next";
import { Silkscreen, VT323 } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
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
        className={`${silkscreen.variable} ${vt323.variable} antialiased`}
      >
        <div className="retro-grid"></div>
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
