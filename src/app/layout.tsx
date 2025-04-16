import React from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Initialize fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

// Metadata
export const metadata = {
  title: "Personal Portfolio",
  description: "A showcase of my work and skills as a web developer.",
};

export default function RootLayout({
  children,
}: {
  children: any;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-20 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
