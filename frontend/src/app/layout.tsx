import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zorth — Discover Curated Entertainment Resources",
  description:
    "Explore organized streaming, anime, gaming, reading, AI, and internet resources in one beautifully designed platform.",
  keywords:
    "entertainment, resources, streaming, anime, gaming, reading, AI, directory",
  openGraph: {
    title: "Zorth — Curated Entertainment Directory",
    description:
      "Discover the best entertainment and internet resources, organized and searchable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-[var(--color-body-bg)] text-[var(--color-body-text)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
