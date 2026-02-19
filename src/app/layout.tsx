import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import GoogleAnalyticsWrapper from "@/components/analytics/GoogleAnalyticsWrapper";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import SmoothScroll from "@/components/ui/SmoothScroll";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Injam Hossan Mamun",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId="GTM-KRM9XMBR" />
        <GoogleAnalyticsWrapper />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
