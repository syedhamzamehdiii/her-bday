import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "A Birthday Surprise 💖",
  description: "A romantic birthday experience — frontend only."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable}`}
        style={{
          fontFamily:
            "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        }}
      >
        {children}
      </body>
    </html>
  );
}



