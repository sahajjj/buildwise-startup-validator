import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildWise — AI-Powered Startup Validation Platform",
  description:
    "Validate your startup idea in minutes. BuildWise researches your market, competitors, and pricing, then delivers an investor-ready business report powered by AI.",
  keywords: [
    "startup validation",
    "business plan generator",
    "market research AI",
    "competitor analysis",
    "TAM SAM SOM",
    "MVP roadmap",
    "pitch deck",
    "AI co-founder",
  ],
  openGraph: {
    title: "BuildWise — Validate Your Startup Idea in Minutes",
    description:
      "AI-powered market research, competitor analysis, and business planning. Get an investor-ready report before your coffee gets cold.",
    siteName: "BuildWise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );

  if (clerkKey) {
    return <ClerkProvider publishableKey={clerkKey}>{content}</ClerkProvider>;
  }

  return content;
}
