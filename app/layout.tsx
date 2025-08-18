import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "./provider";
import "./globals.css";
import "@mantine/core/styles.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',  
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spot Lock",
  description: "Store your passwords",
  icons: {
    icon: "/logo.jpg",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-gradient-to-b from-blue-700 via-blue-400 to-blue-300 min-h-screen`} >
        <Providers>
          <NavBar />
            <main>{children}</main>
          <Footer />
          </Providers>
      </body>
    </html>
  );
}