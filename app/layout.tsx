import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { projects } from "@/data/projects";
import { getSiteUrl, site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${site.intro} ${projects.length} live client sites, filterable by platform.`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: site.title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/yrnr.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
