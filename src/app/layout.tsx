import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/components/providers/root-providers";
import { portfolioData } from "@/data/portfolio-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: portfolioData.personal.name,
  description: portfolioData.personal.bio,
  keywords: [
    "Product Owner",
    "Business Analyst",
    "System Design",
    "Backlog Management",
    "PRDs & FRDs",
    "Scrum & Agile",
    "Next.js",
    "PostgreSQL",
    "Wongel Wondyifraw",
    "Portfolio",
  ],
  authors: [{ name: portfolioData.personal.name }],
  openGraph: {
    title: portfolioData.personal.name,
    description: portfolioData.personal.bio,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.personal.name,
    description: portfolioData.personal.bio,
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
