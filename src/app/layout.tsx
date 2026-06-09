import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Garcia | Full Stack Engineer & UI/UX Designer",
  description: "Portfolio of Juan Garcia, a Systems Engineer specializing in Full-Stack web development, mobile apps, and premium brand identities. Delivering high-performance solutions for international clients.",
  openGraph: {
    title: "Juan Garcia | Full Stack Engineer & UI/UX Designer",
    description: "Portfolio of Juan Garcia, a Systems Engineer specializing in Full-Stack web development, mobile apps, and premium brand identities. Delivering high-performance solutions for international clients.",
    type: "website",
    locale: "en_US",
    siteName: "Juan Garcia Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
