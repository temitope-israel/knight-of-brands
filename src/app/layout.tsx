import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import PageTransition from "@/components/layout/PageTransition";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Knight of Brands | Branding, Advertising & Digital Strategy",
  description:
    "Knight of Brands is a Nigerian branding and advertising agency helping ambitious businesses build memorable brands through strategy, design, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Preloader />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
