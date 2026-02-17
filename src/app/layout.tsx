import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const nunitoSans = localFont({
  src: [
    { path: "../fonts/NunitoSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/NunitoSans-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../fonts/NunitoSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/NunitoSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/NunitoSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/NunitoSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/NunitoSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/NunitoSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../fonts/NunitoSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/NunitoSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../fonts/NunitoSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/NunitoSans-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "../fonts/NunitoSans-Black.ttf", weight: "900", style: "normal" },
    { path: "../fonts/NunitoSans-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-nunito-sans",
});

const cerebriSans = localFont({
  src: [
    { path: "../fonts/CerebriSansPro-Thin.ttf", weight: "100", style: "normal" },
    { path: "../fonts/CerebriSansPro-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../fonts/CerebriSansPro-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/CerebriSansPro-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../fonts/CerebriSansPro-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/CerebriSansPro-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/CerebriSansPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/CerebriSansPro-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/CerebriSansPro-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/CerebriSansPro-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/CerebriSansPro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/CerebriSansPro-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../fonts/CerebriSansPro-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/CerebriSansPro-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../fonts/CerebriSansPro-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/CerebriSansPro-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "../fonts/CerebriSansPro-Heavy.ttf", weight: "900", style: "normal" },
    { path: "../fonts/CerebriSansPro-HeavyItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-cerebri-sans",
});

export const metadata: Metadata = {
  title: "mOtz.dev",
  description:
    "Fullstack developer with a passion for frontend, UX, and animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${nunitoSans.variable} ${cerebriSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
