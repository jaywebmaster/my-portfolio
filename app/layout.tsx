import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { getSiteUrl, site } from "@/data/site";
import "./globals.css";

// Display: a grotesque with enough character to carry a personal brand.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Body: neutral and highly legible at small sizes.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Mono: labels and meta text only, a nod to the developer craft. Not
// preloaded, so it doesn't compete with the hero photo on slow connections;
// the small labels show in the fallback mono for a moment instead.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: site.title,
  description: site.intro,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.intro,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d11",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[70] rounded-md bg-accent px-4 py-2 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
